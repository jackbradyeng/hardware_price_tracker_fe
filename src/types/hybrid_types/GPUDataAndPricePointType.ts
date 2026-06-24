import type { GPUData } from '@/types/product_types/GPUType.ts';
import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';

export interface GPUDataAndPricePointType {
    gpuDTO: GPUData;
    gpuPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}