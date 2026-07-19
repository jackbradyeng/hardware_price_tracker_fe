import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';
import type { NVMEDataAndPricePointType } from '@/types/hybrid_types/NVMEDataAndPricePointType.ts';
import type { PageResponse } from '@/types/PageResponse.ts';

export const getNVMEPricePoints = async (): Promise<AbstractPricePointType[]> => {

    const response = await fetch('/api/v1/nvme_pricepoints?size=10000');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return ((await response.json()) as PageResponse<AbstractPricePointType>).content;
}

export const getNVMEPricePointsByModel
    = async (modelNumber: string): Promise<NVMEDataAndPricePointType> => {

    const response = await fetch(`/api/v1/nvme_pricepoints/${modelNumber}?size=10000`);

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as NVMEDataAndPricePointType;
}