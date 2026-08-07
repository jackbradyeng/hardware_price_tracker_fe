import type {ProductType} from "@/pages/ProductListPage.tsx";

export const TYPE_CONFIG: Record<ProductType, { label: string; detailBase: string }> = {
    gpu: { label: 'Consumer GPUs', detailBase: '/gpu_pricepoints' },
    cpu: { label: 'CPUs', detailBase: '/cpu_pricepoints' },
    ram: { label: 'RAM', detailBase: '/ram_pricepoints' },
    workstation_gpu: { label: 'Workstation GPUs', detailBase: '/workstation_gpu_pricepoints' },
    ssd: { label: 'SSDs', detailBase: '/ssd_pricepoints' },
    hdd: { label: 'HDDs', detailBase: '/hdd_pricepoints' },
    nvme: { label: 'NVMe Drives', detailBase: '/nvme_pricepoints' },
};