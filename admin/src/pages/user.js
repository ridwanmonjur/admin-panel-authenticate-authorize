import { useEffect, useMemo, useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { UserList } from '@/components/user/UserList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/sharing/table/Pagination';
import { ButtonPanel, Modal } from '@/components/sharing/form';
import { UserForm } from '@/components/user/UserForm';
import Drawer from '@/components/layout/Drawer';
import fetchClient from '../../api/fetchClient';
import { SortUser } from '@/components/user/SortUser';
import { FilterTab } from '@/components/user/FilterTab';

export default function UserPage({ _userList }) {
    const [userList, setUserList] = useState(_userList)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [query, setQuery] = useState('')
    const [isFirstTime, setIsFirstTime] = useState(true)
    const [loading, setLoading] = useState(false)
    const addToUser = (newUser) => {
        setUserList((oldList) => ({ ...oldList, docs: [...oldList?.docs, newUser] }))
    }
    const refreshUser = async () => {
        setLoading(true)
        const userList = await fetchClient.get(`user?${query}`)
        setTimeout(() => {
            setLoading(false)
            setUserList(userList)
        }, [2000],
        )
    }
    const editUser = (id, newUser) => {
        setUserList((oldList) => {
            return {
                ...oldList, docs: oldList.docs.map(value => {
                    return value._id != id ? value : newUser
                })
            }
        })
    }
    useEffect(() => {
        if (!isFirstTime) refreshUser()
    }, [query])
    useEffect(() => {
        setIsFirstTime(false)
    }, [])
    const deletUser = (id) => setUserList((oldList) => ({ ...oldList, docs: userList.docs.filter(value => value._id !== id) }))
    return (
        <Layout>
            <main
            >
                <Modal>
                    <UserForm
                        setCurrentIndex={setCurrentIndex}
                        addToUser={addToUser}
                        editUser={editUser}
                        currentIndex={currentIndex}
                        currentUser={currentIndex > -1 ? userList.docs[currentIndex] : null}
                    />
                </Modal>
                <Drawer>
                    <div className="px-12 py-12">
                        <Heading1 classNames="flex">
                            <span>Users</span>
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
                                Add User
                            </ButtonPanel>
                            <SortUser setQuery={setQuery} />
                        </div>
                        <UserList
                            loading={loading}
                            userList={userList?.docs}
                            deletUser={deletUser}
                            setCurrentIndex={setCurrentIndex}
                            refreshUser={refreshUser}
                        />
                        <div className="mt-4">
                            <Pagination
                                hasPrevPage={userList?.hasPrevPage}
                                hasNextPage={userList?.hasNextPage}
                                page={userList?.page}
                                totalPages={userList?.totalPages}
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
        const userList = await fetchSSR({ req, res }).get("user")
        return {
            props: { _userList: userList || [] },
        }
    }
    catch (error) {
        return {
            props: { _userList: [] },
        }
    }
}
