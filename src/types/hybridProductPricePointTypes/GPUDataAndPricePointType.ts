import type { GPUData } from '@/types/productTypes/GPUType.ts';
import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';

export interface GPUDataAndPricePointType {
    gpuDTO: GPUData;
    gpuPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}