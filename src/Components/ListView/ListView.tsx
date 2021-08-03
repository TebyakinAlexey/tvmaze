import React, { useEffect } from 'react'
import { useAppReducer } from '../../hooks/useAppReducer'
import { LoadPages } from '../../actions'
import { ITEMS_PER_PAGE } from '../../consts'
import { useMemo } from 'react'
import styles from './ListView.module.css'

const ListView = () => {
    const [state, dispatch] = useAppReducer();

    const getHeader = () => {
        return (
            <tr>
                <th>Обложка</th><th>Название</th><th>Жанр</th><th>Страна</th><th>Длительность</th><th>Рейтинг</th>
            </tr>
        )
    }

    const getRows = () => {
        const rows: any[] = [];
        const fromOuterIdx = state.currInnerPageNum * ITEMS_PER_PAGE;
        const toIdx = Math.min(fromOuterIdx + ITEMS_PER_PAGE, state.currOuterPageData!.length);
        for (let i = fromOuterIdx; i < toIdx; i++) {
            const tvShowItem = state.currOuterPageData![i];
            const row = (
                <tr key={tvShowItem.id}>
                    <td>
                        <img src={tvShowItem.image?.medium} className={styles.Img}/>
                    </td>
                    <td>
                        <h4>
                            {tvShowItem.name}
                        </h4>
                    </td>
                    <td>
                        <h4>
                            {tvShowItem.genres?.toString()}
                        </h4>
                    </td>
                    <td>
                        <h4>
                            {tvShowItem.network?.country?.name ?? tvShowItem.webChannel?.country?.name}
                        </h4>
                    </td>
                    <td>
                        <h4>
                            {tvShowItem.runtime} min
                        </h4>
                    </td>
                    <td>
                        <h4>
                            {tvShowItem.rating?.average}
                        </h4>
                    </td>
                </tr>
            );
            
            rows.push(row);
        }

        return rows;
    }

    const items = useMemo( () => {
        if (state.currOuterPageData) {
            return getRows();
        }
    }, [state.currOuterPageData, state.currInnerPageNum]);

    if (state.isLoading && !state.currOuterPageData) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.TableContainer}>
            <table>
                <thead>
                    {getHeader()}
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}

export default ListView;