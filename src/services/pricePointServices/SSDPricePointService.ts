import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';
import type { SSDDataAndPricePointType } from '@/types/hybridProductPricePointTypes/SSDDataAndPricePointType.ts';
import type { PageResponse } from '@/types/PageResponse.ts';

export const getSSDPricePoints = async (): Promise<AbstractPricePointType[]> => {

    const response = await fetch('/api/v1/ssd-pricepoints?size=10000');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return ((await response.json()) as PageResponse<AbstractPricePointType>).content;
}

export const getSSDPricePointsByModel
    = async (modelNumber: string): Promise<SSDDataAndPricePointType> => {

    const response = await fetch(`/api/v1/ssd-pricepoints/${modelNumber}?size=10000`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as SSDDataAndPricePointType;
}