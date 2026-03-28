import type { GPUWorkstationPricePointType } from '@/types/price_point_types/GPUWorkstationPricePointType.ts';
import type { GPUWorkstationDataAndPricePointType } from '@/types/hybrid_types/GPUWorkstationDataAndPricePointType.ts';

export const getGPUWorkstationPricePoints = async (): Promise<GPUWorkstationPricePointType[]> => {

    const response = await fetch('/api/workstation_gpu_pricepoints');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as GPUWorkstationPricePointType[];
}

export const getGPUWorkstationPricePointsByModel
    = async (modelNumber: string): Promise<GPUWorkstationDataAndPricePointType> => {

    const response = await fetch(`/api/workstation_gpu_pricepoints/${modelNumber}`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as GPUWorkstationDataAndPricePointType;
}
