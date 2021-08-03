import React from 'react'
import { initPage, nextPage, prevPage } from '../../actions'
import { useAppReducer } from '../../hooks/useAppReducer'
import { ITEMS_PER_PAGE } from '../../consts'
import homeIcon from './home.png'
import backIcon from './back.png'
import forwIcon from './forw.png'


const PageControl = () => {
    const [ state, dispatch] = useAppReducer();

    const canPrevPage = state.currInnerPageNum > 0 || state.prevOuterPageData;

    const canNextPage = state.nextOuterPageData && state.nextOuterPageData.length > 0 || 
                        state.currOuterPageData && state.currOuterPageData.length - state.currInnerPageNum * ITEMS_PER_PAGE <= ITEMS_PER_PAGE && state.currOuterPageData.length > ITEMS_PER_PAGE;

    return (
        <div>
            <button disabled={ !canPrevPage} onClick={ () => dispatch(prevPage()) }>
                <img src={backIcon} width={20} height={20}/>
            </button>
            <button disabled={ !canNextPage} onClick={ () => dispatch(nextPage()) }>
                <img src={forwIcon} width={20} height={20}/>
            </button>
            <button onClick={ () => dispatch(initPage()) }>
                <img src={homeIcon} width={20} height={20}/>
            </button>
        </div>
    )
}

export default PageControl;