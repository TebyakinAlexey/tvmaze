import axios, { AxiosResponse } from 'axios'
import { ActionTypes } from './actionTypes'
import { baseUrl, pageUrl, searchUrl } from './api'

export function initPage() {
    return {
        type: ActionTypes.InitPage
    }
}
export function nextPage() {
    return {
        type: ActionTypes.NextPage
    }
}
export function prevPage() {
    return {
        type: ActionTypes.PrevPage
    }
}

export function Search(query: string) {
    return {
        type: ActionTypes.Search,
        query: query
    }
}

function beginLoading() {
    return {
        type: ActionTypes.BeginLoading
    }
}
function endLoading(data, pageNum: number) {
    return {
        type: ActionTypes.EndLoading,
        data: data,
        pageNum: pageNum
    }
}
function endSearchLoading(data) {
    return {
        type: ActionTypes.EndSearchLoading,
        data: data,
    }
}

function getTVMazeAxios() {
    return axios.create({ baseURL: baseUrl });
}

export function LoadPages(pageNums: number[], dispatch) {
    const ax = getTVMazeAxios();

    dispatch(beginLoading());

    const loaders: Promise<AxiosResponse<any>>[] = []
    for (let pageNum of pageNums) {
        const queryUrl = `${pageUrl}${pageNum + 1}`;

        const loader = ax.get(queryUrl);
        
        loaders.push(loader);
    }

    Promise.all(loaders).then( (rs) => {
        for (let i = 0; i < rs.length; i++) {
            dispatch(endLoading(rs[i].data, pageNums[i]))
        }
    } );

}

export function LoadSearch(query: string, dispatch) {
    const ax = getTVMazeAxios();

    dispatch(beginLoading());

    const queryUrl = `${searchUrl}${query}`;

    ax.get(queryUrl).then( (res) => {
        dispatch(endSearchLoading(res.data));
    });
}