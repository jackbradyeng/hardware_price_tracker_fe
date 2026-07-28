import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';
import type { RAMDataAndPricePointType } from '@/types/hybrid_types/RAMDataAndPricePointType.ts';
import type { PageResponse } from '@/types/PageResponse.ts';

export const getRAMPricePoints = async (): Promise<AbstractPricePointType[]> => {

    const response = await fetch('/api/v1/ram-pricepoints?size=10000');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return ((await response.json()) as PageResponse<AbstractPricePointType>).content;
}

export const getRAMPricePointsByModel
    = async (modelNumber: string): Promise<RAMDataAndPricePointType> => {

    const response = await fetch(`/api/v1/ram-pricepoints/${modelNumber}?size=10000`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as RAMDataAndPricePointType;
}