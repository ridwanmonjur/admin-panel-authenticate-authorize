export const ButtonSignIn = ({
    type,
    classNames,
    children,
    onClick,
    id
}) => {
    return (
        <button
            id={id}
            onClick={onClick}
            className={`w-full btn-sm text-white bg-blue-600 hover:blue-blue-700 focus:ring-4`
                + `focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center`
                + `dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${classNames != undefined ? classNames : ""}`}
            {...(type !== null ? { type } : {})}                >
            {children}
        </button>
    )
}

export const ButtonPanel = ({
    type,
    classNames,
    children,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            className={`btn btn-sm btn-primary ${classNames != undefined ? classNames : ""}`}
            {...(type !== null ? { type } : {})}                >
            {children}
        </button>
    )
}