import type { HDDData } from '@/types/productTypes/HDDType.ts';
import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';

export interface HDDDataAndPricePointType {
    hddDTO: HDDData;
    hddPricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}