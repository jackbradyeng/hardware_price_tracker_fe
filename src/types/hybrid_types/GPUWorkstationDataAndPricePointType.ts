import type { GPUWorkstationData } from '@/types/product_types/GPUWorkstationType.ts';
import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';

export interface GPUWorkstationDataAndPricePointType {
    gpuWorkstationDTO: GPUWorkstationData;
    gpuWorkstationPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}