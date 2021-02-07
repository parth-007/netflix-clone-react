export interface RowProps {
    title: string
}

export interface Movie {
    id: number,
    src: string,
    name: string,
    original_name: string,
    title: string
    poster_path: string,
    backdrop_path: string,
    overview: string | undefined
}