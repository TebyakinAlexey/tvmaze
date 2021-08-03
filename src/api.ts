export const baseUrl = 'http://api.tvmaze.com'
export const pageUrl = '/shows?page='
export const searchUrl = '/search/shows?q='

export interface TVShowItem {
    id: number,
    name: string,
    image: {
        medium: string
    },
    genres: string[],
    webChannel: {
        country: {
            name: string
        }
    },
    network: {
        country: {
            name: string
        }
    },
    runtime: number,
    rating: {
        average: number
    }
}

export interface SearchItem {
    show: TVShowItem
}