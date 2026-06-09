import type { NVMEData } from '@/types/product_types/NVMEType.ts';
import type { AbstractPricePointType } from '@/types/price_point_types/AbstractPricePointType.ts';

export interface NVMEDataAndPricePointType {
    nvmeDTO: NVMEData;
    nvmePricePointDTOList: AbstractPricePointType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: bigint;
}