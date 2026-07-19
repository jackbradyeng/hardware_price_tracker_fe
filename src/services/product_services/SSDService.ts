import type { SSDData } from '@/types/product_types/SSDType.ts';

export const getSSDs = async (): Promise<SSDData[]> => {

    const response = await fetch('/api/v1/ssds');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as SSDData[];
}