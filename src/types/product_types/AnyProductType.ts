import type {GPUData} from "@/types/product_types/GPUType.ts";
import type {CPUData} from "@/types/product_types/CPUType.ts";
import type {RAMData} from "@/types/product_types/RAMType.ts";
import type {GPUWorkstationData} from "@/types/product_types/GPUWorkstationType.ts";
import type {SSDData} from "@/types/product_types/SSDType.ts";
import type {HDDData} from "@/types/product_types/HDDType.ts";
import type {NVMEData} from "@/types/product_types/NVMEType.ts";

export type AnyProduct = GPUData | CPUData | RAMData | GPUWorkstationData | SSDData | HDDData | NVMEData;