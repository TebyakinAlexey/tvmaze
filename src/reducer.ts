import { TVShowItem, SearchItem  } from './api'
import { ActionTypes } from './actionTypes'
import { ITEMS_PER_PAGE } from './consts'

export interface AppState {
    currOuterPageNum: number,//текущий номер страницы maze
    prevOuterPageData?: TVShowItem[], //предыдущая страница
    currOuterPageData?: TVShowItem[],//текущая страница maze
    nextOuterPageData?: TVShowItem[],//след странца
    currInnerPageNum: number,//внутренний номер странцицы внутри страницы maze
    isLoading: boolean,//признак загрузки
    needLoadPageNums?: number[],//номера страниц которые требуется загрузить
}

export function initState(): AppState {
    return {
        currOuterPageNum: Number.NaN,
        currInnerPageNum: Number.NaN,
        isLoading: false,
    }
}

export const AppReducer = (state: AppState, action) => {
    switch (action.type) {
        case ActionTypes.BeginLoading: {
            const newState: AppState = 
            { 
                ...state,
                isLoading: true
            };
            return newState;
        }
        case ActionTypes.EndLoading: {
            let newState: AppState = {
                ...state,
                isLoading: false,
                needLoadPageNums: undefined
            }

            if (action.pageNum == state.currOuterPageNum) {
                newState.currOuterPageData = action.data;
            } else if (action.pageNum > state.currOuterPageNum) {
                newState.nextOuterPageData = action.data;
            } else {
                newState.prevOuterPageData = action.data;
            }

            return newState;
        }
        case ActionTypes.EndSearchLoading: {
            let newState: AppState = {
                ...state,
                isLoading: false,
                currOuterPageData: (action.data as []).map( i => (i as SearchItem).show),
                prevOuterPageData: undefined,
                nextOuterPageData: undefined
            }

            return newState;
        }
        case ActionTypes.InitPage: {
            const newState: AppState = 
            { 
                ...state,
                currOuterPageNum: 0,
                currOuterPageData: undefined,
                prevOuterPageData: undefined,
                nextOuterPageData: undefined,
                currInnerPageNum: 0,
                needLoadPageNums: [0, 1],
            };
            return newState;
        }
        case ActionTypes.NextPage: {
            let newState: AppState;

            if (!state.currOuterPageData) {
                return state;
            }

            function isLastInnerPage(state: AppState) {
                return state.currOuterPageData && state.currOuterPageData.length - state.currInnerPageNum * ITEMS_PER_PAGE <= ITEMS_PER_PAGE;
            }

            const innerPageIsLast = isLastInnerPage(state);
            if (innerPageIsLast) {
                if (!state.nextOuterPageData) {
                    return state;
                }

                newState = { 
                    ...state,
                    currInnerPageNum: 0,
                    currOuterPageNum: state.currOuterPageNum + 1,
                    currOuterPageData: state.nextOuterPageData,
                    prevOuterPageData: state.currOuterPageData,
                    needLoadPageNums: [ state.currOuterPageNum + 2],
                };
            } else {
                newState = {
                    ...state,
                    currInnerPageNum: state.currInnerPageNum + 1,
                }
            }

            return newState;
        }
        case ActionTypes.PrevPage: {
            let newState: AppState;

            const innerPageIsFirst = state.currInnerPageNum == 0;
            if (innerPageIsFirst) {
                if (!state.prevOuterPageData) {
                    return state;
                }

                newState = { 
                    ...state,
                    currInnerPageNum: Math.floor(state.prevOuterPageData.length / ITEMS_PER_PAGE),
                    currOuterPageData: state.prevOuterPageData,
                    currOuterPageNum: state.currOuterPageNum - 1,
                    nextOuterPageData: state.currOuterPageData,
                    prevOuterPageData: undefined,
                    needLoadPageNums: state.currOuterPageNum > 1 ? [state.currOuterPageNum - 2] : undefined
                };
            } else {
                newState = {
                    ...state,
                    currInnerPageNum: state.currInnerPageNum - 1
                }
            }

            return newState;
        }
        default: return state;
    }
}