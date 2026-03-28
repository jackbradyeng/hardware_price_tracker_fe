import type { GPUData } from '@/types/product_types/GPUType.ts';
import type { GPUPricePointType } from '@/types/price_point_types/GPUPricePointType.ts';

export interface GPUDataAndPricePointType {
    gpuData: GPUData;
    pricePoints: GPUPricePointType[];
}