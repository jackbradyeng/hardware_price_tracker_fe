import type { RAMPricePointType } from '@/types/price_point_types/RAMPricePointType.ts';
import type { RAMDataAndPricePointType } from '@/types/hybrid_types/RAMDataAndPricePointType.ts';

export const getRAMPricePoints = async (): Promise<RAMPricePointType[]> => {

    const response = await fetch('/api/ram_pricepoints');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as RAMPricePointType[];
}

export const getRAMPricePointsByModel
    = async (modelNumber: string): Promise<RAMDataAndPricePointType> => {

    const response = await fetch(`/api/ram_pricepoints/${modelNumber}`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as RAMDataAndPricePointType;
}