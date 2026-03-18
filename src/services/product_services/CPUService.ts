import type { CPUData } from '@/types/product_types/CPUType.ts';

export const getCPUs = async (): Promise<CPUData[]> => {

    const response = await fetch('/api/cpus');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as CPUData[];
}