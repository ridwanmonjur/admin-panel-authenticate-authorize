export const Label = ({
    htmlFor,
    classNames,
    children,
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${classNames !== undefined ? classNames : ""}`}>{children}</label>
    )
}

export const LabelModal = ({
    text
}) => {
    return (
        <label className="label">
            <span className="label-text">{text}</span>
        </label>
    )
}