import type { HDDData } from '@/types/product_types/HDDType.ts';
import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';

export interface HDDDataAndPricePointType {
    hddDTO: HDDData;
    hddPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}