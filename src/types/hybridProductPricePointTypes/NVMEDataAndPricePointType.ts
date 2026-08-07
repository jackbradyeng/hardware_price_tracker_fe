import type { NVMEData } from '@/types/productTypes/NVMEType.ts';
import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType.ts';

export interface NVMEDataAndPricePointType {
    nvmeDTO: NVMEData;
    nvmePricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}