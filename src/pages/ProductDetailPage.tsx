import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGPUPricePointsByModel } from '@/services/pricePointServices/GPUPricePointService';
import { getCPUPricePointsByModel } from '@/services/pricePointServices/CPUPricePointService';
import { getRAMPricePointsByModel } from '@/services/pricePointServices/RAMPricePointService';
import { getGPUWorkstationPricePointsByModel } from '@/services/pricePointServices/GPUWorkstationPricePointService';
import { getSSDPricePointsByModel } from '@/services/pricePointServices/SSDPricePointService';
import { getHDDPricePointsByModel } from '@/services/pricePointServices/HDDPricePointService';
import { getNVMEPricePointsByModel } from '@/services/pricePointServices/NVMEPricePointService';
import type { GPUDataAndPricePointType } from '@/types/hybridProductPricePointTypes/GPUDataAndPricePointType';
import type { CPUDataAndPricePointType } from '@/types/hybridProductPricePointTypes/CPUDataAndPricePointType';
import type { RAMDataAndPricePointType } from '@/types/hybridProductPricePointTypes/RAMDataAndPricePointType';
import type { GPUWorkstationDataAndPricePointType } from '@/types/hybridProductPricePointTypes/GPUWorkstationDataAndPricePointType';
import type { SSDDataAndPricePointType } from '@/types/hybridProductPricePointTypes/SSDDataAndPricePointType';
import type { HDDDataAndPricePointType } from '@/types/hybridProductPricePointTypes/HDDDataAndPricePointType';
import type { NVMEDataAndPricePointType } from '@/types/hybridProductPricePointTypes/NVMEDataAndPricePointType';
import type { AbstractPricePointType } from '@/types/pricePointTypes/AbstractPricePointType';
import { PriceChart } from '@/components/PriceChart';
import type { ProductType } from '@/pages/ProductListPage';

type AnyHybrid =
    | GPUDataAndPricePointType
    | CPUDataAndPricePointType
    | RAMDataAndPricePointType
    | GPUWorkstationDataAndPricePointType
    | SSDDataAndPricePointType
    | HDDDataAndPricePointType
    | NVMEDataAndPricePointType;

type AnyPricePoint = AbstractPricePointType;

interface InfoRow {
    label: string;
    value: string | number | boolean | null | undefined;
}

function formatValue(value: string | number | boolean | null | undefined): string {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
}

function buildInfoRows(type: ProductType, data: AnyHybrid): InfoRow[] {
    if (type === 'gpu') {
        const { gpuDTO: g } = data as GPUDataAndPricePointType;
        return [
            { label: 'Model Number', value: g.modelNumber },
            { label: 'Name', value: g.name },
            { label: 'Board Manufacturer', value: g.boardManufacturer },
            { label: 'Chip', value: g.chip },
            { label: 'Chip Manufacturer', value: g.chipManufacturer },
            { label: 'Status', value: g.isActive ? 'Active' : 'Inactive' },
        ];
    }
    if (type === 'cpu') {
        const { cpuDTO: c } = data as CPUDataAndPricePointType;
        return [
            { label: 'Model Number', value: c.modelNumber },
            { label: 'Name', value: c.name },
            { label: 'Manufacturer', value: c.chipManufacturer },
            { label: 'Series', value: c.series },
            { label: 'Cores / Threads', value: c.cores && c.threads ? `${c.cores} / ${c.threads}` : null },
            { label: 'Base Clock', value: c.baseClock ? `${c.baseClock} GHz` : null },
            { label: 'Boost Clock', value: c.boostClock ? `${c.boostClock} GHz` : null },
            { label: 'TDP', value: c.thermalDesignPower ? `${c.thermalDesignPower}W` : null },
            { label: 'Max Memory', value: c.maxMemory ? `${c.maxMemory}GB` : null },
            { label: 'Memory Support', value: c.memorySupported },
            { label: 'Integrated GPU', value: c.hasIntegratedGPU },
            { label: 'Status', value: c.isActive ? 'Active' : 'Inactive' },
        ];
    }
    if (type === 'ram') {
        const { ramDTO: r } = data as RAMDataAndPricePointType;
        return [
            { label: 'Model Number', value: r.modelNumber },
            { label: 'Name', value: r.name },
            { label: 'Brand', value: r.brand },
            { label: 'Standard', value: r.standard },
            { label: 'Capacity', value: r.volume ? `${r.volume}GB` : null },
            { label: 'DIMM Count', value: r.dimmCount },
            { label: 'Clock Rate', value: r.clockRate ? `${r.clockRate}MHz` : null },
            { label: 'Latency', value: r.latency },
            { label: 'Voltage', value: r.voltage ? `${r.voltage}V` : null },
            { label: 'Status', value: r.isActive ? 'Active' : 'Inactive' },
        ];
    }
    if (type === 'ssd') {
        const { ssdDTO: s } = data as SSDDataAndPricePointType;
        return [
            { label: 'Model Number', value: s.modelNumber },
            { label: 'Name', value: s.name },
            { label: 'Brand', value: s.brand },
            { label: 'Capacity', value: s.capacity ? `${s.capacity}GB` : null },
            { label: 'Interface', value: s.storageInterface },
            { label: 'Seq. Read', value: s.sequentialRead ? `${s.sequentialRead} MB/s` : null },
            { label: 'Seq. Write', value: s.sequentialWrite ? `${s.sequentialWrite} MB/s` : null },
            { label: 'MTBF', value: s.meanTimeBetweenFailures ? `${s.meanTimeBetweenFailures}h` : null },
            { label: 'Status', value: s.isActive ? 'Active' : 'Inactive' },
        ];
    }
    if (type === 'hdd') {
        const { hddDTO: h } = data as HDDDataAndPricePointType;
        return [
            { label: 'Model Number', value: h.modelNumber },
            { label: 'Name', value: h.name },
            { label: 'Brand', value: h.brand },
            { label: 'Capacity', value: h.capacity ? `${h.capacity}GB` : null },
            { label: 'Interface', value: h.storageInterface },
            { label: 'RPM', value: h.rpm },
            { label: 'Cache', value: h.cache ? `${h.cache}MB` : null },
            { label: 'Form Factor', value: h.formFactor ? `${h.formFactor}"` : null },
            { label: 'Seq. Read', value: h.sequentialRead ? `${h.sequentialRead} MB/s` : null },
            { label: 'Seq. Write', value: h.sequentialWrite ? `${h.sequentialWrite} MB/s` : null },
            { label: 'MTBF', value: h.meanTimeBetweenFailures ? `${h.meanTimeBetweenFailures}h` : null },
            { label: 'Status', value: h.isActive ? 'Active' : 'Inactive' },
        ];
    }
    if (type === 'nvme') {
        const { nvmeDTO: n } = data as NVMEDataAndPricePointType;
        return [
            { label: 'Model Number', value: n.modelNumber },
            { label: 'Name', value: n.name },
            { label: 'Brand', value: n.brand },
            { label: 'Capacity', value: n.capacity ? `${n.capacity}GB` : null },
            { label: 'Interface', value: n.storageInterface },
            { label: 'Seq. Read', value: n.sequentialRead ? `${n.sequentialRead} MB/s` : null },
            { label: 'Seq. Write', value: n.sequentialWrite ? `${n.sequentialWrite} MB/s` : null },
            { label: 'MTBF', value: n.meanTimeBetweenFailures ? `${n.meanTimeBetweenFailures}h` : null },
            { label: 'Includes Heatsink', value: n.includesHeatSink },
            { label: 'Status', value: n.isActive ? 'Active' : 'Inactive' },
        ];
    }
    // gpu_workstation
    const { gpuWorkstationDTO: g } = data as GPUWorkstationDataAndPricePointType;
    return [
        { label: 'Model Number', value: g.modelNumber },
        { label: 'Name', value: g.name },
        { label: 'Chip Manufacturer', value: g.chipManufacturer },
        { label: 'GPU Memory', value: g.gpuMemory ? `${g.gpuMemory}GB` : null },
        { label: 'Memory Interface', value: g.memoryInterface ? `${g.memoryInterface}-bit` : null },
        { label: 'Memory Bandwidth', value: g.memoryBandwidth ? `${g.memoryBandwidth} GB/s` : null },
        { label: 'CUDA Cores', value: g.cudaCores },
        { label: 'Tensor Cores', value: g.tensorCores },
        { label: 'RT Cores', value: g.raytracingCores },
        { label: 'Max Power', value: g.maxPower ? `${g.maxPower}W` : null },
        { label: 'System Interface', value: g.systemInterface },
        { label: 'Status', value: g.isActive ? 'Active' : 'Inactive' },
    ];
}

function getProductName(type: ProductType, data: AnyHybrid): string {
    if (type === 'gpu') {
        const { gpuDTO: g } = data as GPUDataAndPricePointType;
        return `${g.boardManufacturer ?? ''} ${g.name ?? ''}`.trim();
    }
    if (type === 'cpu') return (data as CPUDataAndPricePointType).cpuDTO.name ?? '';
    if (type === 'ram') return (data as RAMDataAndPricePointType).ramDTO.name ?? '';
    if (type === 'ssd') return (data as SSDDataAndPricePointType).ssdDTO.name ?? '';
    if (type === 'hdd') return (data as HDDDataAndPricePointType).hddDTO.name ?? '';
    if (type === 'nvme') return (data as NVMEDataAndPricePointType).nvmeDTO.name ?? '';
    return (data as GPUWorkstationDataAndPricePointType).gpuWorkstationDTO.name ?? '';
}

function getPricePoints(type: ProductType, data: AnyHybrid): AnyPricePoint[] {
    if (type === 'gpu') return (data as GPUDataAndPricePointType).gpuPricePointDTOList;
    if (type === 'cpu') return (data as CPUDataAndPricePointType).cpuPricePointDTOList;
    if (type === 'ram') return (data as RAMDataAndPricePointType).ramPricePointDTOList;
    if (type === 'ssd') return (data as SSDDataAndPricePointType).ssdPricePointDTOList;
    if (type === 'hdd') return (data as HDDDataAndPricePointType).hddPricePointDTOList;
    if (type === 'nvme') return (data as NVMEDataAndPricePointType).nvmePricePointDTOList;
    return (data as GPUWorkstationDataAndPricePointType).gpuWorkstationPricePointDTOList;
}

interface Props {
    type: ProductType;
}

export const ProductDetailPage: React.FC<Props> = ({ type }) => {
    const { modelNumber: encodedModel } = useParams<{ modelNumber: string }>();
    const modelNumber = encodedModel ? decodeURIComponent(encodedModel) : '';

    const [data, setData] = useState<AnyHybrid | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!modelNumber) return;
        const load = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let result: AnyHybrid;
                if (type === 'gpu') result = await getGPUPricePointsByModel(modelNumber);
                else if (type === 'cpu') result = await getCPUPricePointsByModel(modelNumber);
                else if (type === 'ram') result = await getRAMPricePointsByModel(modelNumber);
                else if (type === 'ssd') result = await getSSDPricePointsByModel(modelNumber);
                else if (type === 'hdd') result = await getHDDPricePointsByModel(modelNumber);
                else if (type === 'nvme') result = await getNVMEPricePointsByModel(modelNumber);
                else result = await getGPUWorkstationPricePointsByModel(modelNumber);
                setData(result);
            } catch {
                setError('Failed to load product data. Check that the API is running on port 8080.');
            } finally {
                setIsLoading(false);
            }
        };
        void load();
    }, [type, modelNumber]);

    if (isLoading) {
        return (
            <div className="px-6 py-10" style={{ textAlign: 'left' }}>
                <p className="font-mono text-sm" style={{ color: 'var(--text)' }}>Loading...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="px-6 py-10" style={{ textAlign: 'left' }}>
                <p className="text-sm" style={{ color: '#ef4444' }}>{error ?? 'Product not found.'}</p>
            </div>
        );
    }

    const infoRows = buildInfoRows(type, data).filter((r) => r.value !== null && r.value !== undefined && r.value !== '');
    const pricePoints = getPricePoints(type, data);
    const productName = getProductName(type, data);

    return (
        <div className="px-6 py-8 max-w-6xl mx-auto" style={{ textAlign: 'left' }}>
            <h1
                className="font-semibold mb-6"
                style={{ color: 'var(--text-h)', fontSize: '1.15rem', margin: '0 0 1.5rem' }}
            >
                {productName}
            </h1>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Info panel */}
                <div
                    className="lg:w-72 shrink-0 rounded-lg border overflow-hidden self-start"
                    style={{ borderColor: 'var(--border)' }}
                >
                    <div
                        className="px-4 py-2.5 border-b"
                        style={{ borderColor: 'var(--border)', background: 'var(--code-bg)' }}
                    >
                        <p className="font-mono text-xs font-semibold" style={{ color: 'var(--text)' }}>
                            Product Info
                        </p>
                    </div>
                    <dl>
                        {infoRows.map(({ label, value }) => (
                            <div
                                key={label}
                                className="flex justify-between gap-4 px-4 py-2 border-b last:border-b-0"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                <dt className="text-xs shrink-0" style={{ color: 'var(--text)', opacity: 0.75 }}>
                                    {label}
                                </dt>
                                <dd
                                    className="text-xs font-mono text-right"
                                    style={{ color: 'var(--text-h)' }}
                                >
                                    {formatValue(value)}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Chart panel */}
                <div className="flex-1 min-w-0">
                    <div
                        className="rounded-lg border overflow-hidden"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <div
                            className="px-4 py-2.5 border-b flex items-center justify-between"
                            style={{ borderColor: 'var(--border)', background: 'var(--code-bg)' }}
                        >
                            <p className="font-mono text-xs font-semibold" style={{ color: 'var(--text)' }}>
                                Price History
                            </p>
                            <p className="font-mono text-xs" style={{ color: 'var(--text)', opacity: 0.6 }}>
                                {pricePoints.length} data point{pricePoints.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <div className="p-4">
                            <PriceChart pricePoints={pricePoints} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
