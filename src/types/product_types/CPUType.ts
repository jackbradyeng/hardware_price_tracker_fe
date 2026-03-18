export interface CPUData {
    modelNumber: string | null;
    name: string | null;
    chipManufacturer: string | null;
    series: string | null;
    cores: number | null;
    threads: number | null;
    baseClock: number | null;
    boostClock: number | null;
    l1Cache: number | null;
    l2Cache: number | null;
    l3Cache: number | null;
    thermalDesignPower: number | null;
    maxTemperature: number | null;
    maxMemory: number | null;
    memorySupported: string | null;
    hasIntegratedGPU: boolean | null;
    isActive: boolean;
}