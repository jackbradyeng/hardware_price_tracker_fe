import type { RAMData } from '@/types/product_types/RAMType.ts';

export const getRAMs = async (): Promise<RAMData[]> => {

    const response = await fetch('/api/ram');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as RAMData[];
}