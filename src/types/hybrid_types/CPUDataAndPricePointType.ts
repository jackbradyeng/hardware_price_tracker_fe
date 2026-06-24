import type { CPUData } from '@/types/product_types/CPUType.ts';
import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';

export interface CPUDataAndPricePointType {
    cpuDTO: CPUData;
    cpuPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}