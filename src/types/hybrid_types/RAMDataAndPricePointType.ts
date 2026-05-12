import type { RAMData } from '@/types/product_types/RAMType.ts';
import type { RAMPricePointType } from '@/types/price_point_types/RAMPricePointType.ts';

export interface RAMDataAndPricePointType {
    ramDTO: RAMData;
    ramPricePointDTOList: RAMPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}