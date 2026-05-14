import type { CPUPricePointType } from '@/types/price_point_types/CPUPricePointType.ts';
import type { CPUDataAndPricePointType } from '@/types/hybrid_types/CPUDataAndPricePointType.ts';
import type { PageResponse } from '@/types/PageResponse.ts';

export const getCPUPricePoints = async (): Promise<CPUPricePointType[]> => {

    const response = await fetch('/api/cpu_pricepoints?size=10000');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return ((await response.json()) as PageResponse<CPUPricePointType>).content;
}

export const getCPUPricePointsByModel
    = async (modelNumber: string): Promise<CPUDataAndPricePointType> => {

    const response = await fetch(`/api/cpu_pricepoints/${modelNumber}?size=10000`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as CPUDataAndPricePointType;
}