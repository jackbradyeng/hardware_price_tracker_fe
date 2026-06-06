import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';
import type { HDDDataAndPricePointType } from '@/types/hybrid_types/HDDDataAndPricePointType.ts';
import type { PageResponse } from '@/types/PageResponse.ts';

export const getHDDPricePoints = async (): Promise<AbstractPricePointType[]> => {

    const response = await fetch('/api/hdd_pricepoints?size=10000');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return ((await response.json()) as PageResponse<AbstractPricePointType>).content;
}

export const getHDDPricePointsByModel
    = async (modelNumber: string): Promise<HDDDataAndPricePointType> => {

    const response = await fetch(`/api/hdd_pricepoints/${modelNumber}?size=10000`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as HDDDataAndPricePointType;
}