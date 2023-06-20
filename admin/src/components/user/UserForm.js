import fetchClient from "../../../api/fetchClient";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonPanel, Input, LabelModal, Select } from "../sharing/form";
import { toastSuccess, toastError } from "@/utils/toast";

export const UserForm = ({
    currentUser, setCurrentIndex, addToUser, editUser, currentIndex
}) => {
    const isAddMode = currentUser === null;
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
        mode: "all"
    });
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        data.isVerified = Boolean(document.querySelector('#token').value)
        let formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (typeof (value) == 'object') {
                value = JSON.stringify(value);
            }
            formData.append(key, value)
        })
        formData.set("image", data.image[0]);
        if (isAddMode) {
            try {
                const response = await fetchClient.post('/user', formData)
                await setTimeout(() => {
                    setLoading(false);
                    toastSuccess("Successfully added user")
                    addToUser({ ...response?.user });
                }, 2000);
            }
            catch (error) {
                setLoading(false);
                toastError(error);
            }
        }
        else {
            try {
                const response = await fetchClient.put(`/user/${currentUser._id}`, formData)
                await setTimeout(() => {
                    setLoading(false);
                    toastSuccess("Managed to edit user")
                    editUser(currentUser._id, response.user);
                }, 2000);
            } catch (error) {
                setLoading(false);
                toastError(error);
            }
        }
    }
    const formRef = useRef(null)
    useEffect(() => {
        if (isAddMode) {
            reset({
                address: { first: '', second: '' },
                creditCard: { number: '', CVV: '' },
                email: '',
                name: '',
                role: '',
                isVerified: false 
            })
            setValue("isVerified", false)
        }
        else {
            setValue("isVerified", currentUser?.isVerified || false)
            reset({
                address: { first: currentUser?.address?.first, second: currentUser?.address?.second },
                creditCard: { number: currentUser?.creditCard?.number, CVV: currentUser?.creditCard?.CVV },
                email: currentUser?.email,
                name: currentUser?.name,
                role: currentUser?.role,
                isVerified: currentUser?.isVerified 
            })
        }
    }, [currentIndex])
    return (
        <div>
            <h1 className='pb-5 text-xl font-bold'>
                {isAddMode ? <> Add Users... </> : <> Edit Users... </>}
            </h1>

            <form
                formRef={formRef}
                className="font-medium"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mx-auto">

                    {!isAddMode ?
                        <>
                            {currentUser?.image ?
                                <img
                                    className="avatar w-32" src={`${process.env.PRODUCTION}/${currentUser?.image}`} alt={`${currentUser?.name}`} />
                                :
                                <>No user image</>

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

                            <LabelModal text="User id" />
                            <Input
                                type="text"
                                defaultValue={currentUser?._id}
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
                    {/* User name */}
                    {!isAddMode
                        &&
                        <>
                            <LabelModal text="User id" />
                            <Input
                                type="text"
                                defaultValue={currentUser?._id}
                                disabled
                                placeholder="Enter user name..."
                            />

                        </>
                    }
                    <LabelModal text="User name" />
                    <Input
                        type="text"
                        defaultValue={currentUser?.name}
                        {...register("name", {
                            required: "This field is required",
                            minLength: { value: 3, message: "Minimum length 3" }
                        })}
                        placeholder="Enter user name..."
                    />
                    {errors.name && <p className="text-warning">{errors.name.message}</p>}

                    {/* Email */}
                    <LabelModal text="Email" />
                    <Input
                        type="text"
                        defaultValue={currentUser?.email}
                        {...register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            },
                            required: "This field is required",
                        })}
                        placeholder="Enter email..."
                    />
                    {errors.email && <p className="text-warning">{errors.email.message}</p>}

                    <div className="grid lg:grid-cols-2">
                        {isAddMode &&
                            <>
                                <div>
                                    {/* Password */}
                                    <LabelModal text="Password" />
                                    <Input
                                        type="password"
                                        placeholder="*********"
                                        {...register("password", {
                                            required: "This field is required",
                                            minLength: { value: 6, message: "Minimum length 6" }
                                        })}
                                    />
                                    {errors.password && <p className="text-warning">{errors.password.message}</p>}
                                </div>
                                <div>
                                    {/* Confirm Password */}
                                    <LabelModal text="Confirm Password" />
                                    <Input
                                        type="password"
                                        placeholder="*********"
                                        {...register("confirmPassword", {
                                            validate: (val) => {
                                                if (watch('password') != val) {
                                                    return "Your passwords do no match";
                                                }
                                            },
                                        })}
                                    />
                                    {errors.confirmPassword && <p className="text-warning">{errors.confirmPassword.message}</p>}
                                </div>
                            </>
                        }
                        <div>
                            {/* IsVerified */}
                            <LabelModal text="Verified" />
                            <Select
                                id='token'
                                optionNames={["True", "False"]}
                                optionValues={[true, false]}
                                defaultValue={currentUser?.isVerified ? true : false}
                            />

                        </div>
                        <div>
                            {/* Role */}
                            <LabelModal text="Role" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.role}
                                {...register("role", {
                                    required: "This field is required",
                                    validate: (val) => {
                                        if (!['admin', 'customer', 'seller'].includes(val)) {
                                            return "Values can be only: 'admin', 'customer', 'seller'";
                                        }
                                    },
                                })}
                                placeholder="Enter user role..."
                            />
                            {errors.role && <p className="text-warning">{errors.role.message}</p>}
                        </div>
                        <div>
                            {/* Address First */}
                            <LabelModal text="Address First Line" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.address?.first}
                                {...register("address.first", {
                                    minLength: { value: 6, message: "Minimum length 6" }
                                })}
                                placeholder="Enter address first line..."
                            />
                            {/* {errors.address && errors.address.first && <p className="text-warning">{errors.address.first.message}</p>} */}

                        </div>
                        <div>
                            {/* Manufacturer */}
                            <LabelModal text="Address Second Line" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.address?.second}
                                {...register("address.second", {
                                    minLength: { value: 3, message: "Minimum length 3" }
                                })}
                                placeholder="Enter address second line..."
                            />
                            {/* {errors.address && errors.address.second && <p className="text-warning">{errors.address.second.message}</p>} */}
                        </div>
                        <div>
                            {/* Credit card number */}
                            <LabelModal text="Credit Card Number" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.creditCard?.number}
                                {...register("creditCard.number", {
                                })}
                                placeholder="Enter Credit Card Number..."
                            />
                            {/* {errors.creditCard && errors.creditCard.number && <p className="text-warning">{errors.creditCard.second.message}</p>} */}

                        </div>
                        <div>
                            {/* Credit Card CVV */}
                            <LabelModal text="Credit Card CVV" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.creditCard?.CVV}
                                {...register("creditCard.CVV", {
                                    minLength: { value: 3, message: "Minimum length 3" },
                                    maxLength: { value: 4, message: "Maximum length 4" }
                                })}
                                placeholder="Enter Credit Card CVV..."
                            />
                            {/* {errors.creditCard && errors.creditCard.CVV && <p className="text-warning">{errors.creditCard.CVV.message}</p>} */}

                        </div>
                    </div>

                    <div className="flex justify-around mt-4">
                        {
                            isAddMode ?
                                <>
                                    <ButtonPanel classNames={`mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add User
                                    </ButtonPanel>
                                </>
                                :
                                <>
                                    <ButtonPanel classNames={`mt-4 ${loading ? "loading" : ""}`} type="submit">
                                        Edit User
                                    </ButtonPanel>
                                    <ButtonPanel classNames={`mt-4 ml-5}`}
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