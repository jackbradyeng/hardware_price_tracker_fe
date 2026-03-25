import type { GPUPricePointType } from '@/types/price_point_types/GPUPricePointType.ts';

export const getGPUPricePoints = async (): Promise<GPUPricePointType[]> => {

    const response = await fetch('/api/gpu_pricepoints');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as GPUPricePointType[];
}