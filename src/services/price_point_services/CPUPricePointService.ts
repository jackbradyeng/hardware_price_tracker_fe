import type { CPUPricePointType } from '@/types/price_point_types/CPUPricePointType.ts';

export const getCPUPricePoints = async (): Promise<CPUPricePointType[]> => {

    const response = await fetch('/api/cpu_pricepoints');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as CPUPricePointType[];
}