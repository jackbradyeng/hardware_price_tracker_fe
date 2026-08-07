import type { HDDData } from '@/types/productTypes/HDDType.ts';

export const getHDDs = async (): Promise<HDDData[]> => {

    const response = await fetch('/api/v1/hdds');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as HDDData[];
}