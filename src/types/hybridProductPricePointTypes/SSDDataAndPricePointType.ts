import type { SSDData } from '@/types/productTypes/SSDType.ts';
import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';

export interface SSDDataAndPricePointType {
    ssdDTO: SSDData;
    ssdPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}