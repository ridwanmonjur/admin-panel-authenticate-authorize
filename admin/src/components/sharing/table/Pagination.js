import { ButtonPanel } from "../form";
import QueryString from 'querystring'
export const Pagination = ({
  totalPages, page, hasPrevPage, hasNextPage, setQuery
}) => {
  const editPage = (value) => {
    setQuery((oldQuery) => {
      const searchParamObject = QueryString.parse(oldQuery);
      searchParamObject['page'] = value;
      return QueryString.stringify(searchParamObject);
    })
  }
  totalPages = Number(totalPages);
  page = Number(page);
  return (
    <div className="btn-group btn-sm -ml-2 mb-4">
      <ButtonPanel
        {...(hasPrevPage == true ? {} : { disabled: true })}
        classNames="btn-sm btn-outline btn-primary"
        onClick={() => editPage(page - 1)}
      >
        «
      </ButtonPanel>
      {
        totalPages <= 5 &&
        <>
          {[1, 2, 3, 4, 5].map((value) => {
            return (<>
              {totalPages >= value &&
                <ButtonPanel
                  classNames={`btn-sm btn-outline btn-primary ${value === page ? 'btn-active' : ''}`}
                  onClick={() => editPage(value)}
                >{value}
                </ButtonPanel>}

            </>)
          })}
        </>
      }
      {
        totalPages > 5 &&
        <>
          {[1, 2, 3, totalPages - 2, totalPages - 1, totalPages].map((value) => {
            return (<>
              {(
                // 1,2,3
                totalPages >= value ||
                // page-1, page, page+1
                (value > 3)) &&
                <ButtonPanel
                  classNames={`btn-sm btn-outline btn-primary ${value === page ? 'btn-active' : ''}`}
                  onClick={() => editPage(value)}
                >{value}
                </ButtonPanel>}

            </>)
          })}
        </>
      }
      <ButtonPanel
        {...(hasNextPage == true ? {} : { disabled: true })}
        classNames="btn-sm btn-outline btn-primary"
        onClick={() => editPage(page + 1)}
      >
        »
      </ButtonPanel>
    </div >)
}
