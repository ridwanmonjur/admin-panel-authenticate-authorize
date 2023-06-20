import QueryString from "qs"

export const FilterTab = ({ setQuery }) => {
    const setPage = (value) => {
        setQuery((oldQuery) => {
            const searchParamObject = QueryString.parse(oldQuery);
            searchParamObject.role= value;
            if ('page' in searchParamObject) delete searchParamObject['page']
            if (value == 'all') delete searchParamObject['role']
            return QueryString.stringify(searchParamObject)
        })
    }
    return (
        <div className="-mt-1">
            <div className="tabs ml-4">
                {['seller', 'admin', 'customer', 'superadmin', 'all'               
                ].map((value, index) => {
                    return (
                        <a className="tab tab-lifted" key={`${value}${index}`}
                            onClick={(event) => { setPage(value, event) }}>
                            {value}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}