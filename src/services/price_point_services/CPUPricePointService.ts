import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';
import type { CPUDataAndPricePointType } from '@/types/hybrid_types/CPUDataAndPricePointType.ts';
import type { PageResponse } from '@/types/PageResponse.ts';

export const getCPUPricePoints = async (): Promise<AbstractPricePointType[]> => {

    const response = await fetch('/api/v1/cpu_pricepoints?size=10000');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return ((await response.json()) as PageResponse<AbstractPricePointType>).content;
}

export const getCPUPricePointsByModel
    = async (modelNumber: string): Promise<CPUDataAndPricePointType> => {

    const response = await fetch(`/api/v1/cpu_pricepoints/${modelNumber}?size=10000`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as CPUDataAndPricePointType;
}