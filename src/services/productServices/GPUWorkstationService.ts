import type { GPUWorkstationData } from '@/types/productTypes/GPUWorkstationType';

export const getGPUWorkstations = async (): Promise<GPUWorkstationData[]> => {

    const response = await fetch('/api/v1/workstation_gpus');

    if (!response.ok) {
        throw new Error('Network response failed.');
    }

    return (await response.json()) as GPUWorkstationData[];
}