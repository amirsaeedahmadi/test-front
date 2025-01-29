import { ProductData, TProductResponseType } from '../../constants/apiTypes';
import { sendRequest } from './axiosInstance';
import { PRODUCT } from './urls';
import mockData from '../../mockData.json';  // use for mocking APIs


export async function createProductWithImages(productData: ProductData, imageFiles: File[]) {
    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));

    imageFiles.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
    });

    return sendRequest<TProductResponseType>(
        PRODUCT.CREATE,
        'POST',
        formData,
        {},
        'multipart/form-data'
    );
}

export async function deleteAd(adId: number) {
    return sendRequest(
        PRODUCT.DELETE(adId),
        'PUT',
    );
}

export async function updateAd(productId: number, productData: TProductResponseType) {
    return sendRequest<TProductResponseType>(
        PRODUCT.UPDATE(productId),
        'PUT',
        productData,
        {},
        'multipart/form-data'
    );
}

export async function updateAdStatus(productId: number, status: string) {
    return sendRequest<TProductResponseType>(
        PRODUCT.UPDATE_STATUS(productId),
        'PUT',
        { status },
        {},
        'application/json'
    );
}

export async function getSingleProduct(adId: number) {
    return sendRequest<TProductResponseType | null>(
        PRODUCT.GET_SINGLE(adId),
        'GET',
    );
}

export async function getProductsByCategory(category: string): Promise<TProductResponseType[]> {
    const response = await sendRequest(
        PRODUCT.GET_BY_CATEGORY(category),
        'GET',
    );
    return response.data as TProductResponseType[];
}

export async function getSellersProducts() {
    return sendRequest<TProductResponseType[]>(
        PRODUCT.GET_BY_SELLER,
        'GET',
    );
}

export async function getSellersProductsById(sellerId: number) {
    return sendRequest<TProductResponseType[]>(
        PRODUCT.GET_BY_SELLER_ID(sellerId),
        'GET',
    );
}


// export async function getSellersProducts(token: string | null): Promise<TProductResponseType[]> {
//     try {
//         const response = await sendRequest(
//             PRODUCT.GET_BY_SELLER,
//             'GET',
//             token
//         );

//         return response.data as TProductResponseType[];
//     } catch (error) {
//         console.error('Error fetching seller’s products:', error);
//         return [];
//     }
// }





// **************** Mock Functions ****************
// export const getSingleProduct = async (itemId: number) => {
//     return new Promise((resolve, reject) => {
//         const item = mockData.items.find(product => product.id === String(itemId));
//         if (item) {
//             resolve(item);
//         } else {
//             reject(new Error('Item not found'));
//         }
//     });
// };

// export const getProductsByCategory = async (category: string) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(mockData.items);
//         }, 1000);
//     });
// };