import { forwardRef } from 'react';

export const Input = forwardRef(({
    type,
    classNames,
    text,
    defaultValue="",
    onClick, 
    ...props}, ref)=>{
    return (
        <input 
            type={type}
            ref={ref}
            defaultValue={defaultValue}
            onClick={onClick}
            className={`bg-gray-50 border border-gray-300 disabled:border-transparent text-gray-900 sm:text-sm rounded-lg` 
                +`focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 `
                +`dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500`
                +`dark:focus:border-blue-500 ${classNames!==undefined ? classNames : ""}`}
            {...props}                
        />
    )
})