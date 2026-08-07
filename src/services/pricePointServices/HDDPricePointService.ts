import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';
import type { HDDDataAndPricePointType } from '@/types/hybridProductPricePointTypes/HDDDataAndPricePointType.ts';
import type { PageResponse } from '@/types/PageResponse.ts';

export const getHDDPricePoints = async (): Promise<AbstractPricePointType[]> => {

    const response = await fetch('/api/v1/hdd-pricepoints?size=10000');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return ((await response.json()) as PageResponse<AbstractPricePointType>).content;
}

export const getHDDPricePointsByModel
    = async (modelNumber: string): Promise<HDDDataAndPricePointType> => {

    const response = await fetch(`/api/v1/hdd-pricepoints/${modelNumber}?size=10000`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as HDDDataAndPricePointType;
}