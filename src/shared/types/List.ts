export interface IResponseList<T> {
    content: Array<T>
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    size: number
    number: number
    sort: Sort
    first: boolean
    numberOfElements: number
    empty: boolean
}

interface Pageable {
    sort: Sort
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
}

interface Sort {
    empty: boolean
    sorted: boolean
    unsorted: boolean
}

export interface IGetListParams {
    first: number
    rows: number
    sortField?: string
    sortOrder?: number
}
