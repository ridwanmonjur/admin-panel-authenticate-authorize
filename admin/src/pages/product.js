import { useEffect, useMemo, useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { ProductList } from '@/components/product/ProductList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/sharing/table/Pagination';
import { ButtonPanel, Modal } from '@/components/sharing/form';
import { ProductForm } from '@/components/product/ProductForm';
import Drawer from '@/components/layout/Drawer';
import fetchClient from '../../api/fetchClient';
import { SortProduct } from '@/components/product/SortProduct';
import { FilterTab } from '@/components/product/FilterTab';

export default function ProductPage({ _productList }) {
    const [productList, setProductList] = useState(_productList)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [query, setQuery] = useState('')
    const [isFirstTime, setIsFirstTime] = useState(true)
    const [loading, setLoading] = useState(false)
    const addToProduct = (newProduct) => {
        setProductList((oldList) => ({ ...oldList, docs: [...oldList?.docs, newProduct] }))
    }
    const refreshProduct = async () => {
        setLoading(true)
        const productList = await fetchClient.get(`product?${query}`)
        setTimeout(() => {
            setLoading(false)
            setProductList(productList)
        }, [2000],
        )
    }
    const editProduct = (id, newProduct) => {
        setProductList((oldList) => {
            return {
                ...oldList, docs: oldList.docs.map(value => {
                    return value._id != id ? value : newProduct
                })
            }
        })
    }
    useEffect(() => {
        if (!isFirstTime) refreshProduct()
    }, [query])
    useEffect(() => {
        setIsFirstTime(false)
    }, [])
    const deletProduct = (id) => setProductList((oldList) => ({ ...oldList, docs: productList.docs.filter(value => value._id !== id) }))
    return (
        <Layout>
            <main
            >
                <Modal>
                    <ProductForm
                        setCurrentIndex={setCurrentIndex}
                        addToProduct={addToProduct}
                        editProduct={editProduct}
                        currentIndex={currentIndex}
                        currentProduct={currentIndex > -1 ? productList.docs[currentIndex] : null}
                    />
                </Modal>
                <Drawer>
                    <div className="px-12 py-12">
                        <Heading1 classNames="flex">
                            <span>Products</span>
                            <span><FilterTab setQuery={setQuery} /></span>
                            </Heading1>
                        <div className='flex mb-4'>
                            <ButtonPanel
                                classNames="inline mr-4 mt-1"
                                onClick={() => {
                                    setCurrentIndex(-1);
                                    document.getElementById("my-modal").checked = !document.getElementById("my-modal").checked
                                }}
                            >
                                Add Product
                            </ButtonPanel>
                            <SortProduct setQuery={setQuery} />
                        </div>
                        <ProductList
                            loading={loading}
                            productList={productList?.docs}
                            deletProduct={deletProduct}
                            setCurrentIndex={setCurrentIndex}
                            refreshProduct={refreshProduct}
                        />
                        <div className="mt-4">
                            <Pagination
                                hasPrevPage={productList?.hasPrevPage}
                                hasNextPage={productList?.hasNextPage}
                                page={productList?.page}
                                totalPages={productList?.totalPages}
                                setQuery={setQuery}
                            />
                        </div>
                    </div>
                </Drawer>
            </main>
        </Layout>
    )
}
export async function getServerSideProps({ req, res }) {
    try {
        const productList = await fetchSSR({ req, res }).get("product")
        return {
            props: { _productList: productList || [] },
        }
    }
    catch (error) {
        return {
            props: { _productList: [] },
        }
    }
}
