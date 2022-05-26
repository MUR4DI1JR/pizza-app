import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './pagination.module.scss'

const Pagination = ({onChangePage}) => {
    return (
        <div className={styles.main}>
            <ReactPaginate
                breakLabel="..."
                className={styles.root}
                nextLabel=">"
                previousLabel="<"
                onPageChange={(event) => onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;