import type {AnyProduct} from "@/types/productTypes/AnyProductType.ts";

export function getModelNumber(product: AnyProduct): string | null {
    return product.modelNumber;
}

export function getIsActive(product: AnyProduct): boolean {
    return product.isActive;
}