import type { NVMEData } from '@/types/productTypes/NVMEType.ts';

export const getNVMEs = async (): Promise<NVMEData[]> => {

    const response = await fetch('/api/v1/nvmes');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as NVMEData[];
}