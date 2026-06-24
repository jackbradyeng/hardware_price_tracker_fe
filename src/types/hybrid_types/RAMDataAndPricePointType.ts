import type { RAMData } from '@/types/product_types/RAMType.ts';
import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';

export interface RAMDataAndPricePointType {
    ramDTO: RAMData;
    ramPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}