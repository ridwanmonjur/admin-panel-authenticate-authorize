import fetchClient from "../../../api/fetchClient";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, LabelModal, Select, ButtonPanel } from "../sharing/form";
import { toastError, toastSuccess } from "@/utils/toast";

export const ProductForm = ({
    currentProduct, setCurrentIndex, addToProduct, editProduct, currentIndex
}) => {
    const isAddMode = currentProduct === null;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "all"
    });
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        const typeSwitcher = document.getElementById('type')
        let formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            console.log({ key, value })
            formData.append(key, value)
        })
        if (data.image[0]) formData.set("image", data.image[0]);
        formData.set("type", typeSwitcher.value)
        if (isAddMode) {
            try {
                const response = await fetchClient.post('/product', formData)
                setLoading(false);
                toastSuccess("Added product successfully");
                addToProduct(response.product);
                setCurrentIndex(-1);
            }
            catch (error) {
                setLoading(false);
                toastError(error);
            }
        }
        else {
            try {
                const response = await fetchClient.put(`/product/${currentProduct._id}`, formData)
                setLoading(false);
                toastSuccess("Edited product successfully");
                editProduct(currentProduct._id, response.product);
            } catch (error) {
                setLoading(false);
                toastError(error);
            }
        }
    }
    const formRef = useRef(null)
    useEffect(() => {
        const typeSwitcher = document.getElementById('type')
        if (typeSwitcher != undefined) typeSwitcher.value = currentProduct?.type;
        if (isAddMode) {
            typeSwitcher.value = "no-value"
            reset({
                type: 'no-value',
                manufacturer: '',
                name: "",
                price: 0,
                seller: "",
                stock: 0,
            })
        }
        else {
            reset({
                type: currentProduct?.type,
                manufacturer: currentProduct?.manufacturer,
                name: currentProduct?.name,
                price: currentProduct?.price,
                seller: currentProduct?.seller?._id,
                stock: currentProduct?.stock,
            })
        }
    }, [currentIndex])
    return (
        <div>
            <h1 className='pb-5 text-xl font-bold'>
                {isAddMode ? <> Add Products... </> : <> Edit Products... </>}
            </h1>

            <form
                formRef={formRef}
                className="font-medium"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mx-auto">
                    {!isAddMode ?
                        <>
                            {currentProduct?.image ?
                                <img
                                    className="avatar w-32" src={`${process.env.PRODUCTION}/${currentProduct?.image}`} alt={`${currentProduct?.name}`} />
                                :
                                <>No product image</>

                            }
                            <LabelModal text="Upload Image" />
                            <Input
                                type="file"
                                id="image"
                                name="image"
                                className="ml-n1"
                                multiple={false}
                                {...register("image")}
                            />

                            <LabelModal text="Product id" />
                            <Input
                                type="text"
                                defaultValue={currentProduct?._id}
                                disabled={true}
                            />
                        </>
                        :
                        <>
                            <Input
                                type="file"
                                id="image"
                                name="image"
                                className="ml-n1"
                                multiple={false}
                                {...register("image", {
                                    required: "Must be provided"
                                })}
                            />
                            {errors.image && <p className="text-warning">{errors.image.message}</p>}

                        </>
                    }

                    <LabelModal text="Product name" />
                    <Input
                        type="text"
                        defaultValue={currentProduct?.name}
                        {...register("name", {
                            required: "This field is required",
                            minLength: { value: 3, message: "Min Length must be 3" },
                        })}
                        placeholder="Enter product name..."
                    />
                    {errors.name && <p className="text-warning">{errors.name.message}</p>}

                    {/* Seller id */}
                    <LabelModal text="Seller id" />
                    <Input
                        type="text"
                        {...register("seller", {
                            required: "This field is required",
                            minLength: { value: 3, message: "Min Length must be 3" },
                        })}
                        defaultValue={currentProduct?.seller?._id}
                        placeholder="Enter seller id..."
                    />
                    {errors.seller && <p className="text-warning">{errors.seller.message}</p>}

                    {/* Seller name */}
                    {!isAddMode
                        &&
                        <>
                            <LabelModal text="Seller name" />
                            <Input
                                type="text"
                                defaultValue={currentProduct?.seller?.name}
                                disabled={true}
                            />
                        </>
                    }
                    <div className="grid lg:grid-cols-2">
                        <div>
                            {/* Type */}
                            <>
                                <LabelModal text="Type" />
                                <Select
                                    // daisyui broken so need it
                                    id="type"
                                    name="type"
                                    {...register("type")}
                                    defaultValue={currentProduct?.type}
                                    optionNames={["Jerseys", "Accessories", "Boots"]}
                                    optionValues={["jerseys", "accessories", "boots"]}
                                />
                            </>
                        </div>
                        <div>
                            {/* Manufacturer */}
                            <LabelModal text="Manufacturer" />
                            <Input
                                type="text"
                                defaultValue={currentProduct?.manufacturer}
                                {...register("manufacturer", {
                                    required: "This field is required",
                                })}
                                placeholder="Enter product manufacturer..."
                            />
                            {errors.manufacturer && <p className="text-warning">{errors.manufacturer.message}</p>}
                        </div>
                        <div>
                            {/* Price */}
                            <LabelModal text="Price (£)" />
                            <Input
                                type="number"
                                defaultValue={currentProduct?.price}
                                {...register("price",
                                    {
                                        valueAsNumber: true,
                                        min: { value: 1, message: "Value must be minimum 1" }

                                    })}
                                placeholder="Enter price..."
                            />
                            {errors.price && <p className="text-warning">{errors.price.message}</p>}

                        </div>
                        <div>
                            {/* Manufacturer */}
                            <LabelModal text="Stock" />
                            <Input
                                type="number"
                                defaultValue={currentProduct?.stock}
                                {...register("stock",
                                    {
                                        valueAsNumber: true,
                                        min: { value: 1, message: "Value must be minimum 1" }
                                    })}
                                placeholder="Enter stock..."
                            />
                            {errors.stock && <p className="text-warning">{errors.stock.message}</p>}

                        </div>
                    </div>

                    <div className="flex justify-center">
                        {
                            isAddMode ?
                                <>
                                    <ButtonPanel classNames={`mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add Product
                                    </ButtonPanel>
                                </>
                                :
                                <>
                                    <ButtonPanel classNames={`mt-4 ${loading ? "loading" : ""}`} type="submit">
                                        Edit Product
                                    </ButtonPanel>
                                    <ButtonPanel classNames={`mt-4 ml-5`}
                                        onClick={() => { reset(); setCurrentIndex(-1); }}>
                                        Add mode
                                    </ButtonPanel>
                                </>
                        }
                    </div>

                </div>
            </form>
        </div>
    )
}