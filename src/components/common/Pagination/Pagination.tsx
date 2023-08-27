import React, {useState} from 'react';
import styles from "./Paginator.module.css";
import cn from "classnames";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    portionSize?: number
}
const Pagination: React.FC<PropsType> = (props) => {
    const {
        totalItemsCount,
        pageSize,
        currentPage,
        onPageChanged,
        portionSize = 10
    } = props;
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return <div className={styles.paginator}>
        {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span
                    key={p}
                    className={cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                    onClick={(e) => {
                        onPageChanged(p);
                    }}>{p}</span>
            })}
        {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>Sled</button>}
    </div>

}

export default Pagination;