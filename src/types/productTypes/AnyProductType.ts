import type {GPUData} from "@/types/productTypes/GPUType.ts";
import type {CPUData} from "@/types/productTypes/CPUType.ts";
import type {RAMData} from "@/types/productTypes/RAMType.ts";
import type {GPUWorkstationData} from "@/types/productTypes/GPUWorkstationType.ts";
import type {SSDData} from "@/types/productTypes/SSDType.ts";
import type {HDDData} from "@/types/productTypes/HDDType.ts";
import type {NVMEData} from "@/types/productTypes/NVMEType.ts";

export type AnyProduct = GPUData | CPUData | RAMData | GPUWorkstationData | SSDData | HDDData | NVMEData;