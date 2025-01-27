import React, { createContext, useState, useContext } from 'react';
import { getProductsByCategory, getSingleProduct } from '../api/services/ProductService';
import { getSearchByKeyword, getSearchByPriceRange, getSearchByMultipleFilters } from '../api/services/SearchService';
import { TProductResponseType } from '../constants/apiTypes';


interface ProductContextType {
    products: TProductResponseType[];
    singleProduct: TProductResponseType | null;
    loading: boolean;
    error: string;
    fetchProductsByCategory: (category: string) => void;
    fetchSingleProduct: (id: number) => Promise<TProductResponseType | null>;
    applyFilters: (minPrice: number | 0, maxPrice: number | 0, timeFilter: string | '') => void;
    searchProductsByKeyword: (keyword: string) => void;
    searchProductsByPriceRange: (minPrice: number | 0, maxPrice: number | 0) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<TProductResponseType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [singleProduct, setSingleProduct] = useState<TProductResponseType | null>(null);

    const fetchProductsByCategory = async (category: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await getProductsByCategory(category);
            console.log(response);
            const filteredProducts = response.filter((product: TProductResponseType) =>
                product.status === 'ACTIVE' || product.status === 'RESERVED'
            );
            setProducts(filteredProducts);
            console.log(filteredProducts);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchSingleProduct = async (id: number) => {
        setLoading(true);
        setError('');
        try {
            const response = await getSingleProduct(id);
            setSingleProduct(response.data);
        } catch (err) {
            setError('Failed to fetch the product');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async (minPrice: number | 0, maxPrice: number | 0, timeFilter: string | '') => {
        setLoading(true);
        setError('');
        try {
            const response = await getSearchByMultipleFilters('', minPrice, maxPrice, timeFilter);
            setProducts(response.content);
        } catch (err) {
            setError('Failed to apply filters');
        } finally {
            setLoading(false);
        }
    };

    const searchProductsByKeyword = async (keyword: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await getSearchByKeyword(keyword);
            setProducts(response.content);
        } catch (err) {
            setError('Failed to search products');
        } finally {
            setLoading(false);
        }
    };

    const searchProductsByPriceRange = async (minPrice: number | 0, maxPrice: number | 0) => {
        setLoading(true);
        setError('');
        try {
            const response = await getSearchByPriceRange(minPrice, maxPrice);
            setProducts(response.content);
        } catch (err) {
            setError('Failed to search products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            singleProduct,
            loading,
            error,
            fetchProductsByCategory,
            fetchSingleProduct,
            applyFilters,
            searchProductsByKeyword,
            searchProductsByPriceRange
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};
