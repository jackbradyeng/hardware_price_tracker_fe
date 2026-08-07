import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';
import type { GPUWorkstationDataAndPricePointType } from '@/types/hybridProductPricePointTypes/GPUWorkstationDataAndPricePointType.ts';
import type { PageResponse } from '@/types/PageResponse.ts';

export const getGPUWorkstationPricePoints = async (): Promise<AbstractPricePointType[]> => {

    const response = await fetch('/api/v1/workstation-gpu-pricepoints?size=10000');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return ((await response.json()) as PageResponse<AbstractPricePointType>).content;
}

export const getGPUWorkstationPricePointsByModel
    = async (modelNumber: string): Promise<GPUWorkstationDataAndPricePointType> => {

    const response = await fetch(`/api/v1/workstation-gpu-pricepoints/${modelNumber}?size=10000`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as GPUWorkstationDataAndPricePointType;
}
