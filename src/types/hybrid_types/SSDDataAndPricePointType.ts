import type { SSDData } from '@/types/product_types/SSDType.ts';
import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';

export interface SSDDataAndPricePointType {
    ssdDTO: SSDData;
    ssdPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}