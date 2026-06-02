import type { HDDData } from '@/types/product_types/HDDType.ts';

export const getHDDs = async (): Promise<HDDData[]> => {

    const response = await fetch('/api/hdds');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as HDDData[];
}