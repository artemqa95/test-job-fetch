import './Pagination.css'
const Pagination = props => {
    const currentPage = props.info.currentPage;
    const pagesCount = Math.ceil(props.info.objectsCount / props.info.elementsPerPage)
    const paginationStart = 1
    const paginationEnd = pagesCount;
    const paginationCenter = [currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2]
        .filter(pageNumber => pageNumber > 1 && pageNumber < pagesCount )
    let pagination = [paginationStart, ...paginationCenter, paginationEnd].map((element,index) => {
        return (
            <span key={index} onClick={props.onChangePage} className={props.info.currentPage === element? 'active': ''}>
                {element}
            </span>
        )
    })
    if (pagesCount === 1) pagination = <span onClick={props.onChangePage} className={'active'}>1</span>
        return (
        <div className={'Pagination'}>
            {pagination}
        </div>
    )
}

export default Pagination