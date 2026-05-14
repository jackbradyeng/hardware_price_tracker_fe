import type { GPUWorkstationData } from '@/types/product_types/GPUWorkstationType.ts';
import type { GPUWorkstationPricePointType } from '@/types/price_point_types/GPUWorkstationPricePointType.ts';

export interface GPUWorkstationDataAndPricePointType {
    gpuWorkstationDTO: GPUWorkstationData;
    gpuWorkstationPricePointDTOList: GPUWorkstationPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}