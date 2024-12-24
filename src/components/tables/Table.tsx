import {useState} from "react";

export default function Table({titles, data, numberPerPage = 10, useFooter = false, cellClassname = "px-4 py-3"}: {
  titles: any[],
  data: any[][],
  numberPerPage?: number,
  useFooter?: boolean,
  cellClassname?: string
}) {
  const [pageNumber, setPageNumber] = useState(0);
  const maxPage = Math.ceil(data.length / numberPerPage);

  const handleSetPageNumber = (pageNumber: any) => {
    if (pageNumber >= 0 && pageNumber < maxPage)
      setPageNumber(pageNumber)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
        <tr>
          {titles.map((title, index) => {
            return <th key={index} scope="col" className="px-4 py-3">{title}</th>
          })}
        </tr>
        </thead>
        <tbody>
        {data.slice(pageNumber * numberPerPage, (pageNumber + 1) * numberPerPage).map((row, index) => {
          return (
            <tr key={index} className="border-b dark:border-gray-700 hover:bg-bgColor2">
              {row.map((cell, index) => {
                return (
                  <td key={index} className={cellClassname}>{cell}</td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
      {useFooter &&
          <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation">
            {data.length > 0
              ? <><span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Bản ghi
                                <span className="font-semibold text-gray-900 dark:text-white px-1">
                                  {`${data.length === 0 ? 0 : (pageNumber * numberPerPage + 1)} - ${pageNumber * numberPerPage + numberPerPage > data.length ? data.length : pageNumber * numberPerPage + numberPerPage}`}
                                </span>
                                trên tổng số
                                <span className="font-semibold text-gray-900 dark:text-white px-1">{data.length}</span>
                            </span>
                <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                    <button onClick={() => handleSetPageNumber(pageNumber - 1)}
                            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only">Previous</span>
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"/>
                      </svg>
                    </button>
                  </li>

                  <li>
                    <input type="text"
                           className="flex h-full border border-gray-300 hover:bg-gray-100 text-textColor1
                         dark:bg-gray-800 dark:border-gray-700  w-[40px] text-center focus-visible:ring-0"
                           value={pageNumber + 1}
                           onChange={(e) => handleSetPageNumber(e.target.value)}
                    />
                  </li>

                  <li>
                    <button onClick={() => handleSetPageNumber(pageNumber + 1)}
                            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only">Next</span>
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"/>
                      </svg>
                    </button>
                  </li>
                </ul>
              </>
              : <span className="text-textColor1 italic">Không có bản ghi nào!</span>}
          </nav>}
    </div>
  )
}