export const Heading1 = ({
    classNames,
    children
})=>{
    return (
        <h1 
            className={`pb-5 text-xl font-bold ${classNames!==undefined ? classNames : ""}`}
        >
            {children}
        </h1>
    )
}