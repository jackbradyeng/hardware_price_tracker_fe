import type { CPUData } from '@/types/product_types/CPUType.ts';
import type { CPUPricePointType } from '@/types/price_point_types/CPUPricePointType.ts';

export interface CPUDataAndPricePointType {
    cpuData: CPUData;
    pricePoints: CPUPricePointType[];
}