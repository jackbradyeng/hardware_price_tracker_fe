import type { CPUData } from '@/types/productTypes/CPUType.ts';
import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';

export interface CPUDataAndPricePointType {
    cpuDTO: CPUData;
    cpuPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}