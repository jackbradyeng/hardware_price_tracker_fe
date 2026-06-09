export interface NVMEData {
    modelNumber: string | null;
    name: string | null;
    brand: string | null;
    capacity: number | null;
    sequentialRead: number | null;
    sequentialWrite: number | null;
    meanTimeBetweenFailures: number | null;
    storageInterface: string | null;
    includesHeatSink: boolean | null;
    isActive: boolean;
}