export interface GPUWorkstationData {
    modelNumber: string | null;
    name: string | null;
    chipManufacturer: string | null;
    gpuMemory: number | null;
    memoryInterface: number | null; // in bits
    memoryBandwidth: number | null; // gigabytes/second
    cudaCores: number | null;
    tensorCores: number | null;
    raytracingCores: number | null;
    maxPower: number | null;
    systemInterface: string | null;
    isActive: boolean;
}