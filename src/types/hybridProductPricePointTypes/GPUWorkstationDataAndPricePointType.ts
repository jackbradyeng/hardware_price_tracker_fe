import type { GPUWorkstationData } from '@/types/productTypes/GPUWorkstationType.ts';
import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';

export interface GPUWorkstationDataAndPricePointType {
    gpuWorkstationDTO: GPUWorkstationData;
    gpuWorkstationPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}