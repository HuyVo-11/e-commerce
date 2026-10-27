import { useState } from 'react';
import styles from './Pagination.module.scss'

const Pagination = () => {

    const [setcurrentPage] = useState(1);
    const totalPages = 8;

    return (
        <div className={styles.paginationWrapper}>
            <div className={styles.pagination}>
                <button className={styles.btnLR}>&larr; Previous</button>

                <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={styles.pageBtn}
                            onClick={() => setcurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button className={styles.btnLR}>Next &rarr;</button>
            </div>
        </div>
    )
}

export default Pagination;