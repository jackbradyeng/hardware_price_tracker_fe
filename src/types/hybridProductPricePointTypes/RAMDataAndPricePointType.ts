import type { RAMData } from '@/types/productTypes/RAMType.ts';
import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';

export interface RAMDataAndPricePointType {
    ramDTO: RAMData;
    ramPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}