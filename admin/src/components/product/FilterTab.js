import QueryString from "qs"

export const FilterTab = ({ setQuery }) => {
    const setPage = (type) => {
        setQuery((oldQuery) => {
            const searchParamObject = QueryString.parse(oldQuery);
            searchParamObject.type = type;
            if ('page' in searchParamObject) delete searchParamObject['page']
            if (type == 'all') delete searchParamObject['type']
            return QueryString.stringify(searchParamObject)
        })
    }
    return (
        <div className="-mt-1">
            <div className="tabs ml-4">
                {['accessories', 'boots', 'jerseys', 'all'].map((value, index) => {
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