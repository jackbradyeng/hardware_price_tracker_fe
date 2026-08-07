import type {AnyProduct} from "@/types/product_types/AnyProductType.ts";

export function getModelNumber(product: AnyProduct): string | null {
    return product.modelNumber;
}

export function getIsActive(product: AnyProduct): boolean {
    return product.isActive;
}