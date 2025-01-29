import { sendRequest } from './axiosInstance';
import { SEARCH } from './urls';
import { SortOrder } from '../../constants/types';
import { PageableResponseType, TProductResponseType } from '../../constants/apiTypes';


export async function getSearchByKeyword(keyword: string) : Promise<TProductResponseType[]> {
    const response = await sendRequest(
        SEARCH.BY_KEYWORD(keyword),
        'GET',
    );
    return response.data as TProductResponseType[];
}



export async function getSearchByPriceRange(minPrice: number, maxPrice: number) : Promise<TProductResponseType[]> {
    const response = await sendRequest(
        SEARCH.BY_PRICE_RANGE(minPrice, maxPrice),
        'GET',
    );
    return response.data as TProductResponseType[];
}

export async function getSearchByBrandWithSorting(keyword: string, sortBy: string, sortOrder: SortOrder) : Promise<TProductResponseType[]> {
    const response = await sendRequest(
        SEARCH.BY_KEYWORD_SORTED(keyword, sortBy, sortOrder),
        'GET',
    );
    return response.data as TProductResponseType[];
}

export async function getSearchByMultipleFilters(keyword: string | '', minPrice: number | 0, maxPrice: number | 0, timeFilter: string | null) : Promise<TProductResponseType[]> {
    console.log(keyword, minPrice, maxPrice, timeFilter);
    const response = await sendRequest(
        SEARCH.FILTERED(keyword, minPrice, maxPrice, timeFilter),
        'GET',
    );
    return response.data as TProductResponseType[];
}

export async function getPaginatedSearch(page: number, size: number) : Promise<TProductResponseType[]> {
    const response = await sendRequest(
        SEARCH.PAGINATED(page, size),
        'GET',
    );
    return response.data as TProductResponseType[];
}