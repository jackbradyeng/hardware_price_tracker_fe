import type { GPUData } from '@/types/product_types/GPUType.ts';

export const getGPUs = async (): Promise<GPUData[]> => {

    const response = await fetch('/api/gpus');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as GPUData[];
}