import type { GPUPricePointType } from '@/types/price_point_types/GPUPricePointType.ts';
import type { GPUDataAndPricePointType } from '@/types/hybrid_types/GPUDataAndPricePointType.ts';
import type { PageResponse } from '@/types/PageResponse.ts';

export const getGPUPricePoints = async (): Promise<GPUPricePointType[]> => {

    const response = await fetch('/api/gpu_pricepoints?size=10000');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return ((await response.json()) as PageResponse<GPUPricePointType>).content;
}

export const getGPUPricePointsByModel
    = async (modelNumber: string): Promise<GPUDataAndPricePointType> => {

    const response = await fetch(`/api/gpu_pricepoints/${modelNumber}?size=10000`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as GPUDataAndPricePointType;
}