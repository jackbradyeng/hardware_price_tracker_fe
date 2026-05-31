export interface HDDData {
    modelNumber: string | null;
    name: string | null;
    brand: string | null;
    capacity: number | null;
    sequentialRead: number | null;
    sequentialWrite: number | null;
    meanTimeBetweenFailures: number | null;
    rpm: number | null;
    cache: number | null;
    storageInterface: string | null;
    formFactor: number | null;
    isActive: boolean;
}