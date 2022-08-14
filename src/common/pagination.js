import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = props => {
    // console.log( props.itemsCount/props.pageSize + " "+ pagesCount)

    const {itemsCount,pageSize,currentPage,onPageChange} = props;

    // console.log(itemsCount/pageSize);
    console.log(currentPage + " page");

    const pagesCount = Math.ceil(itemsCount/pageSize)

    const pages = _.range(1,pagesCount + 1)

    return(
        <React.Fragment>
            <nav>
            <ul className="pagination">
                {pages.map((page)=>(
                <li  className={page==currentPage?'page-item active':'page-item'} key={page} >
                    <a  className="page-link" href="/#" onClick={() => onPageChange(page)}>{page}</a>
                   {/* { console.log(page)} */}
                </li>
                ))}
            </ul>
        </nav>
        </React.Fragment>

    )
}
Pagination.propTypes = {
    itemsCount : PropTypes.number.isRequired,
    pageSize : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired
}
export default Pagination  
