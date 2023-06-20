import { useState } from "react"
import { Table } from "../sharing/table/Table";
import { Input } from "../sharing/form";
import { toastError, toastSuccess } from "@/utils/toast";
import fetchClient from "../../../api/fetchClient";
import { Loading } from "../layout/Loading";

export const UserList = ({
    userList, setCurrentIndex, deletUser, loading, refreshUser
}) => {
    const [loadingIndex, setLoadingIndex] = useState(-1)
    const onDelete = async (index, id) => {
        setLoadingIndex(index);
        try {
            await fetchClient.post(`/user/delete`, {
                ids: [id]
            })
            setTimeout(() => {
                setLoadingIndex(-1);
                toastSuccess("Deleted data")
                deletUser(id);
            }, 2000)
        }
        catch (error) {
            setLoadingIndex(-1);
            toastError(error);
        }
    }
    return (
        <div className="">
            {loading && (<div classNames="min-h-screen mx-auto" ><Loading classNames="text-green-400 mx-auto w-[50px] h-[256px]" /></div>)}
            {
                !loading &&
                <Table
                    tableHeading={["Name", "Email", "Role", "Verified", "Address", ""]}
                    render={
                        () => (
                            <>
                                {userList.map((value, index) => (
                                    <tr key={value?._id}>
                                        <th>{index + 1}</th>
                                        <td>{value?.name}</td>
                                        <td>{value?.email}</td>
                                        <td className="uppercase">{String(value?.role)}</td>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                className="toggle toggle-success"
                                                readOnly={true}
                                                {
                                                ...(value?.isVerified ? { checked: true } : { checked: false })
                                                }
                                            />
                                        </td>
                                        <td>{value?.address?.first || "N/A"} {value?.address?.second}</td>
                                        <td>
                                            <div className={`${loadingIndex === index ? "opacity-40 pointer-events-none" : ""}`}>
                                                <>
                                                    <label
                                                        htmlFor="my-modal"
                                                        onClick={() => { setCurrentIndex(index); }}
                                                        className=""
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                            className="w-6 h-6 inline text-green-500 cursor-pointer hover:text-blue-500"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                    </label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                        className="ml-3 w-6 h-6 inline cursor-pointer text-red-500 hover:text-blue-500"
                                                        onClick={() => { onDelete(index, value?._id); }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    onClick={() => { refreshUser() }}
                                                    className="ml-3 w-6 h-6 inline cursor-pointer text-blue-700 hover:text-blue-500"
                                                >
                                                    <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
  
                                                </>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )
                    }
                />
            }
        </div>
    );
};
