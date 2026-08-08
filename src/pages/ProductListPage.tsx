import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getModelNumber } from '@/services/productServices/AnyProductService.ts'
import { getIsActive } from "@/services/productServices/AnyProductService.ts";
import { getGPUs } from '@/services/productServices/GPUService';
import { getCPUs } from '@/services/productServices/CPUService';
import { getRAMs } from '@/services/productServices/RAMService';
import { getGPUWorkstations } from '@/services/productServices/GPUWorkstationService';
import { getSSDs } from '@/services/productServices/SSDService';
import { getHDDs } from '@/services/productServices/HDDService';
import { getNVMEs } from '@/services/productServices/NVMEService';
import { getGPUPricePoints } from '@/services/pricePointServices/GPUPricePointService';
import { getCPUPricePoints } from '@/services/pricePointServices/CPUPricePointService';
import { getRAMPricePoints } from '@/services/pricePointServices/RAMPricePointService';
import { getGPUWorkstationPricePoints } from '@/services/pricePointServices/GPUWorkstationPricePointService';
import { getSSDPricePoints } from '@/services/pricePointServices/SSDPricePointService';
import { getHDDPricePoints } from '@/services/pricePointServices/HDDPricePointService';
import { getNVMEPricePoints } from '@/services/pricePointServices/NVMEPricePointService';
import {TYPE_CONFIG} from "@/configuration/TypeConfiguration.ts";
import type { AnyProduct} from "@/types/productTypes/AnyProductType.ts";
import type { GPUData } from '@/types/productTypes/GPUType';
import type { CPUData } from '@/types/productTypes/CPUType';
import type { RAMData } from '@/types/productTypes/RAMType';
import type { GPUWorkstationData } from '@/types/productTypes/GPUWorkstationType';
import type { SSDData } from '@/types/productTypes/SSDType';
import type { HDDData } from '@/types/productTypes/HDDType';
import type { NVMEData } from '@/types/productTypes/NVMEType';
import type {AbstractPricePointType} from "@/types/pricePointTypes/AbstractPricePointType.ts";

export type ProductType = 'gpu' | 'cpu' | 'ram' | 'workstation_gpu' | 'ssd' | 'hdd' | 'nvme';

// LOCAL TYPES
type ViewMode = 'grid' | 'list';

function getLastPrice(pricePoints: AbstractPricePointType[]): number | null {
    let latest: AbstractPricePointType | null = null;
    for (const pp of pricePoints) {
        if (pp.price === null || !pp.scrapedAt) continue;
        if (!latest?.scrapedAt || new Date(pp.scrapedAt).getTime() > new Date(latest.scrapedAt).getTime()) {
            latest = pp;
        }
    }
    return latest?.price ?? null;
}

function LastPriceLabel({ price }: { price: number | null }) {
    if (price === null) return null;
    return (
        <p className="text-xs font-mono mt-1.5" style={{ color: 'var(--accent)' }}>
            Last Price: ${price.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
        </p>
    );
}

// --- CARD RENDERS ---
function GenericGridCard({ product, onClick, pricePoints, children }: {
    product: AnyProduct;
    onClick: () => void;
    pricePoints: AbstractPricePointType[];
    children?: React.ReactNode;
})

{
    const lastPrice = getLastPrice(pricePoints);
    return (
        <button
            onClick={onClick}
            className="text-left p-4 rounded-lg border transition-all cursor-pointer w-full"
            style={{ background: 'var(--bg)', borderColor: getIsActive(product) ? 'var(--border)' : 'var(--border)',
                opacity: getIsActive(product) ? 1 : 0.55 }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)';
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-bg)';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg)';
            }}
        >
            <div className="flex justify-between items-start mb-2">
                <span
                    className="text-xs font-mono px-1.5 py-0.5 rounded"
                    style={{
                        background: product.isActive ? 'rgba(16,185,129,0.12)' : 'var(--code-bg)',
                        color: product.isActive ? '#10b981' : 'var(--text)',
                    }}
                >
                    {product.isActive ? 'active' : 'inactive'}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    {product.modelNumber}
                </span>
            </div>
            <p className="font-semibold mb-0.5 leading-tight" style={{ color: 'var(--text-h)', fontSize: '0.9rem' }}>
                {product.name}
            </p>
            {children}
            <LastPriceLabel price={lastPrice} />
        </button>
    )
}

// --- LIST ROW RENDERS ---
function ListRow({
    product,
    primary,
    secondary,
    onClick,
}: {
    product: AnyProduct;
    primary: string;
    secondary: string;
    onClick: () => void;
}) {
    const active = getIsActive(product);
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 px-4 py-3 border-b text-left transition-colors cursor-pointer"
            style={{
                borderColor: 'var(--border)',
                background: 'transparent',
                opacity: active ? 1 : 0.55,
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-bg)';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
        >
            <span
                className="shrink-0 w-2 h-2 rounded-full"
                style={{ background: active ? '#10b981' : 'var(--text)', opacity: active ? 1 : 0.4 }}
            />
            <span className="font-mono text-xs w-40 shrink-0 truncate" style={{ color: 'var(--text)', opacity: 0.7 }}>
                {getModelNumber(product)}
            </span>
            <span className="flex-1 font-medium truncate" style={{ color: 'var(--text-h)', fontSize: '0.875rem' }}>
                {primary}
            </span>
            <span className="text-xs truncate hidden sm:block" style={{ color: 'var(--text)' }}>
                {secondary}
            </span>
            <span className="shrink-0 ml-2" style={{ color: 'var(--accent)' }}>→</span>
        </button>
    );
}

// --- MAIN COMPONENT ---
interface Props {
    type: ProductType;
}

export const ProductListPage: React.FC<Props> = ({ type }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<AnyProduct[]>([]);
    const [pricePointMap, setPricePointMap] = useState<Map<string, AbstractPricePointType[]>>(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [priceSort, setPriceSort] = useState<string>('default');
    const [chipFilter, setChipFilter] = useState<string | null>(null);
    const [brandFilter, setBrandFilter] = useState<string | null>(null);

    const config = TYPE_CONFIG[type];

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            setError(null);
            setPriceSort('default');
            setChipFilter(null);
            setBrandFilter(null);
            try {
                let data: AnyProduct[];
                let pricePoints: AbstractPricePointType[];
                if (type === 'gpu') {
                    [data, pricePoints] = await Promise.all([getGPUs(), getGPUPricePoints()]);
                } else if (type === 'cpu') {
                    [data, pricePoints] = await Promise.all([getCPUs(), getCPUPricePoints()]);
                } else if (type === 'ram') {
                    [data, pricePoints] = await Promise.all([getRAMs(), getRAMPricePoints()]);
                } else if (type === 'ssd') {
                    [data, pricePoints] = await Promise.all([getSSDs(), getSSDPricePoints()]);
                } else if (type === 'hdd') {
                    [data, pricePoints] = await Promise.all([getHDDs(), getHDDPricePoints()]);
                } else if (type === 'nvme') {
                    [data, pricePoints] = await Promise.all([getNVMEs(), getNVMEPricePoints()]);
                } else {
                    [data, pricePoints] = await Promise.all([getGPUWorkstations(), getGPUWorkstationPricePoints()]);
                }

                setProducts(data.sort((a, b) => Number(b.isActive) - Number(a.isActive)));

                const map = new Map<string, AbstractPricePointType[]>();
                for (const pp of pricePoints) {
                    if (!pp.modelNumber) continue;
                    if (!map.has(pp.modelNumber)) map.set(pp.modelNumber, []);
                    map.get(pp.modelNumber)?.push(pp);
                }
                setPricePointMap(map);
            } catch {
                setError('Failed to connect to the backend. Check that the API is running on port 8080.');
            } finally {
                setIsLoading(false);
            }
        };
        void load();
    }, [type]);

    // --- GPU FILTERS ---
    const gpuChipOptions = type === 'gpu'
        ? [...new Set(products.map(p => (p as GPUData).chip).filter(Boolean))] as string[]
        : [];

    const gpuBrandOptions = type === 'gpu'
        ? [...new Set(products.map(p => (p as GPUData).boardManufacturer).filter(Boolean))] as string[]
        : [];

    // --- CPU FILTERS ---
    const cpuBrandOptions = type === 'cpu'
        ? [...new Set(products.map(p => (p as CPUData).chipManufacturer).filter(Boolean))] as string[]
        : [];

    // --- PRODUCT FILTER ---
    const filteredProducts
        = type === 'gpu'
        ? products.filter(p => {
            const gpu = p as GPUData;
            return (!chipFilter || gpu.chip == chipFilter) && (!brandFilter || gpu.boardManufacturer === brandFilter);
        })
        : type === 'cpu'
            ? products.filter(p => {
                const cpu = p as CPUData;
                return (!brandFilter || cpu.chipManufacturer === brandFilter);
            })
        : products

    // --- PRODUCT SORT ---
    const sortedProducts = priceSort === 'default'
        ? filteredProducts
        : [...filteredProducts].sort((a, b) => {
            const priceA = getLastPrice(pricePointMap.get(getModelNumber(a) ?? '') ?? []);
            const priceB = getLastPrice(pricePointMap.get(getModelNumber(b) ?? '') ?? []);
            if (priceA === null) return priceB === null ? 0 : 1;
            if (priceB === null) return -1;
            return priceSort === 'asc' ? priceA - priceB : priceB - priceA;
        });

    const handleClick = (product: AnyProduct) => {
        const model = getModelNumber(product);
        if (model) void navigate(`${config.detailBase}/${encodeURIComponent(model)}`);
    };

    // --- HANDLE DROP DOWN MENU CHANGE ---
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceSort(e.target.value);
    };

    // --- LOADING RENDER ---
    if (isLoading) {
        return (
            <div className="px-6 py-10 max-w-5xl mx-auto" style={{ textAlign: 'left' }}>
                <p className="font-mono text-sm" style={{ color: 'var(--text)' }}>Loading...</p>
            </div>
        );
    }

    // --- ERROR RENDER ---
    if (error) {
        return (
            <div className="px-6 py-10 max-w-5xl mx-auto" style={{ textAlign: 'left' }}>
                <p className="text-sm" style={{ color: '#ef4444' }}>{error}</p>
            </div>
        );
    }

    return (

        // VIEW MODE BUTTON
        <div className="px-6 py-8 max-w-5xl mx-auto" style={{ textAlign: 'left' }}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1
                        className="font-semibold"
                        style={{ color: 'var(--text-h)', fontSize: '1.15rem', margin: 0 }}
                    >
                        {config.label}
                    </h1>
                    <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text)', opacity: 0.7 }}>
                        {filteredProducts.length} products tracked
                    </p>
                </div>

                <div
                    className="flex rounded-md overflow-hidden border"
                    style={{ borderColor: 'var(--border)' }}
                >
                    {(['grid', 'list'] as ViewMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => { setViewMode(mode); }}
                            className="px-3 py-1.5 text-xs font-mono transition-colors"
                            style={{
                                background: viewMode === mode ? 'var(--accent-bg)' : 'var(--bg)',
                                color: viewMode === mode ? 'var(--accent)' : 'var(--text)',
                                borderRight: mode === 'grid' ? `1px solid var(--border)` : 'none',
                            }}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-start gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-mono" style={{ color: 'var(--text)', opacity: 0.7}}>
                        price sort
                    </label>
                    <select
                        value={priceSort}
                        onChange={handleChange}
                        className="text-xs font-mono px-2 py-1 rounded border"
                        style={{
                            background: 'var(--bg)',
                            color: 'var(--text)',
                            borderColor: priceSort ? 'var(--accent-border)' : 'var(--border)',
                        }}
                    >
                        <option value="default">default</option>
                        <option value="asc">asc</option>
                        <option value="desc">desc</option>
                    </select>
                </div>

                {type === 'gpu' && (gpuChipOptions.length > 0 || gpuBrandOptions.length > 0) && (

                    // GPU CHIP & BRAND FILTER BUTTONS
                    <div className="flex items-center gap-4">
                        {gpuChipOptions.length > 0 && (
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-mono" style={{ color: 'var(--text)', opacity: 0.7 }}>
                                    chip filter
                                </label>
                                <select
                                    value={chipFilter ?? ''}
                                    onChange={(e) => { setChipFilter(e.target.value || null); }}
                                    className="text-xs font-mono px-2 py-1 rounded border"
                                    style={{
                                        background: 'var(--bg)',
                                        color: 'var(--text)',
                                        borderColor: chipFilter ? 'var(--accent-border)' : 'var(--border)',
                                    }}
                                >
                                    <option value="">all</option>
                                    {gpuChipOptions.map(chip => (
                                        <option key={chip} value={chip}>{chip}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {gpuBrandOptions.length > 0 && (
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-mono" style={{ color: 'var(--text)', opacity: 0.7 }}>
                                    brand filter
                                </label>
                                <select
                                    value={brandFilter ?? ''}
                                    onChange={(e) => { setBrandFilter(e.target.value || null); }}
                                    className="text-xs font-mono px-2 py-1 rounded border"
                                    style={{
                                        background: 'var(--bg)',
                                        color: 'var(--text)',
                                        borderColor: brandFilter ? 'var(--accent-border)' : 'var(--border)',
                                    }}
                                >
                                    <option value="">all</option>
                                    {gpuBrandOptions.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                )}

                {type === 'cpu' && (cpuBrandOptions.length > 0) && (

                    // CPU BRAND FILTER BUTTON
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <label className="text-xs font-mono" style={{ color: 'var(--text)', opacity: 0.7 }}>
                                brand filter
                            </label>
                            <select
                                value={brandFilter ?? ''}
                                onChange={(e) => { setBrandFilter(e.target.value || null); }}
                                className="text-xs font-mono px-2 py-1 rounded border"
                                style={{
                                    background: 'var(--bg)',
                                    color: 'var(--text)',
                                    borderColor: brandFilter ? 'var(--accent-border)' : 'var(--border)',
                                }}
                            >
                                <option value="">all</option>
                                {cpuBrandOptions.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sortedProducts.map((product, i) => {
                        const pts = pricePointMap.get(getModelNumber(product) ?? '') ?? [];
                        const onClick = () => { handleClick(product); };

                        if (type === 'gpu') {
                            const gpu = product as GPUData;
                            return (
                                <GenericGridCard key={i} product={gpu} onClick={onClick} pricePoints={pts}>
                                    <p className="text-xs" style={{ color: 'var(--text)' }}>
                                        {gpu.chip} &middot; {gpu.chipManufacturer}
                                    </p>
                                </GenericGridCard>
                            );
                        }
                        if (type === 'cpu') {
                            const cpu = product as CPUData;
                            return (
                                <GenericGridCard key={i} product={cpu} onClick={onClick} pricePoints={pts}>
                                    <p className="text-xs" style={{ color: 'var(--text)' }}>
                                        {cpu.chipManufacturer} {cpu.series && `· ${cpu.series}`}
                                        {cpu.cores && ` · ${String(cpu.cores)}C/${String(cpu.threads)}T`}
                                    </p>
                                </GenericGridCard>
                            );
                        }
                        if (type === 'ram') {
                            const ram = product as RAMData;
                            return (
                                <GenericGridCard key={i} product={ram} onClick={onClick} pricePoints={pts}>
                                    <p className="text-xs" style={{ color: 'var(--text)' }}>
                                        {ram.brand} · {ram.standard}
                                        {ram.volume && ` · ${String(ram.volume)}GB`}
                                        {ram.clockRate && ` · ${String(ram.clockRate)}MHz`}
                                    </p>
                                </GenericGridCard>
                            );
                        }
                        if (type === 'ssd') {
                            const ssd = product as SSDData;
                            return (
                                <GenericGridCard key={i} product={ssd} onClick={onClick} pricePoints={pts}>
                                    <p className="text-xs" style={{ color: 'var(--text)' }}>
                                        {ssd.brand}
                                        {ssd.capacity && ` · ${String(ssd.capacity)}GB`}
                                        {ssd.storageInterface && ` · ${ssd.storageInterface}`}
                                    </p>
                                </GenericGridCard>
                            );
                        }
                        if (type === 'hdd') {
                            const hdd = product as HDDData;
                            return (
                                <GenericGridCard key={i} product={hdd} onClick={onClick} pricePoints={pts}>
                                    <p className="text-xs" style={{ color: 'var(--text)' }}>
                                        {hdd.brand}
                                        {hdd.capacity && ` · ${String(hdd.capacity)}GB`}
                                        {hdd.rpm && ` · ${String(hdd.rpm)}RPM`}
                                        {hdd.formFactor && ` · ${String(hdd.formFactor)}"`}
                                    </p>
                                </GenericGridCard>
                            );
                        }
                        if (type === 'nvme') {
                            const nvme = product as NVMEData;
                            return (
                                <GenericGridCard key={i} product={nvme} onClick={onClick} pricePoints={pts}>
                                    <p className="text-xs" style={{ color: 'var(--text)' }}>
                                        {nvme.brand}
                                        {nvme.capacity && ` · ${String(nvme.capacity)}GB`}
                                        {nvme.storageInterface && ` · ${nvme.storageInterface}`}
                                        {nvme.includesHeatSink && ' · heatsink'}
                                    </p>
                                </GenericGridCard>
                            );
                        }

                        const gpuWS = product as GPUWorkstationData;
                        return (
                            <GenericGridCard key={i} product={gpuWS} onClick={onClick} pricePoints={pts}>
                                <p className="text-xs" style={{ color: 'var(--text)' }}>
                                    {gpuWS.chipManufacturer}
                                    {gpuWS.gpuMemory && ` · ${String(gpuWS.gpuMemory)}GB`}
                                    {gpuWS.cudaCores && ` · ${String(gpuWS.cudaCores)} CUDA`}
                                </p>
                            </GenericGridCard>
                        );
                    })}
                </div>
            ) : (
                <div
                    className="rounded-lg border overflow-hidden"
                    style={{ borderColor: 'var(--border)' }}
                >
                    {sortedProducts.map((product, i) => {
                        let primary;
                        let secondary;

                        if (type === 'gpu') {
                            const g = product as GPUData;
                            primary = `${g.boardManufacturer ?? ''} ${g.name ?? ''}`.trim();
                            secondary = `${g.chip ?? ''} · ${g.chipManufacturer ?? ''}`;
                        } else if (type === 'cpu') {
                            const c = product as CPUData;
                            primary = c.name ?? '';
                            secondary = [c.chipManufacturer, c.series, c.cores ?
                                `${String(c.cores)}C/${String(c.threads)}T` : null]
                                .filter(Boolean).join(' · ');
                        } else if (type === 'ram') {
                            const r = product as RAMData;
                            primary = r.name ?? '';
                            secondary = [r.brand, r.standard, r.volume ? `${String(r.volume)}GB` : null,
                                r.clockRate ? `${String(r.clockRate)}MHz` : null]
                                .filter(Boolean).join(' · ');
                        } else if (type === 'ssd') {
                            const s = product as SSDData;
                            primary = s.name ?? '';
                            secondary = [s.brand, s.capacity ? `${String(s.capacity)}GB` : null,
                                s.storageInterface]
                                .filter(Boolean).join(' · ');
                        } else if (type === 'hdd') {
                            const h = product as HDDData;
                            primary = h.name ?? '';
                            secondary = [h.brand, h.capacity ? `${String(h.capacity)}GB` : null,
                                h.rpm ? `${String(h.rpm)}RPM` : null,
                                h.formFactor ? `${String(h.formFactor)}"` : null]
                                .filter(Boolean).join(' · ');
                        } else if (type === 'nvme') {
                            const n = product as NVMEData;
                            primary = n.name ?? '';
                            secondary = [n.brand, n.capacity ? `${String(n.capacity)}GB` : null,
                                n.storageInterface]
                                .filter(Boolean).join(' · ');
                        } else {
                            const g = product as GPUWorkstationData;
                            primary = g.name ?? '';
                            secondary = [g.chipManufacturer, g.gpuMemory ? `${String(g.gpuMemory)}GB` : null,
                                g.cudaCores ? `${String(g.cudaCores)} CUDA` : null]
                                .filter(Boolean).join(' · ');
                        }

                        return (
                            <ListRow
                                key={i}
                                product={product}
                                primary={primary}
                                secondary={secondary}
                                onClick={() => { handleClick(product); }}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};