import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGPUs } from '@/services/product_services/GPUService';
import { getCPUs } from '@/services/product_services/CPUService';
import { getRAMs } from '@/services/product_services/RAMService';
import { getGPUWorkstations } from '@/services/product_services/GPUWorkstationService';
import type { GPUData } from '@/types/product_types/GPUType';
import type { CPUData } from '@/types/product_types/CPUType';
import type { RAMData } from '@/types/product_types/RAMType';
import type { GPUWorkstationData } from '@/types/product_types/GPUWorkstationType';

export type ProductType = 'gpu' | 'cpu' | 'ram' | 'workstation_gpu';

type AnyProduct = GPUData | CPUData | RAMData | GPUWorkstationData;

type ViewMode = 'grid' | 'list';

const TYPE_CONFIG: Record<ProductType, { label: string; detailBase: string }> = {
    gpu: { label: 'Consumer GPUs', detailBase: '/gpu_pricepoints' },
    cpu: { label: 'CPUs', detailBase: '/cpu_pricepoints' },
    ram: { label: 'RAM', detailBase: '/ram_pricepoints' },
    workstation_gpu: { label: 'Workstation GPUs', detailBase: '/workstation_gpu_pricepoints' },
};

function getModelNumber(product: AnyProduct): string | null {
    return product.modelNumber;
}

function getIsActive(product: AnyProduct): boolean {
    return product.isActive;
}

// ---- Card renderers ----

function GPUGridCard({ gpu, onClick }: { gpu: GPUData; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="text-left p-4 rounded-lg border transition-all cursor-pointer w-full"
            style={{ background: 'var(--bg)', borderColor: getIsActive(gpu) ? 'var(--border)' : 'var(--border)', opacity: getIsActive(gpu) ? 1 : 0.55 }}
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
                        background: gpu.isActive ? 'rgba(16,185,129,0.12)' : 'var(--code-bg)',
                        color: gpu.isActive ? '#10b981' : 'var(--text)',
                    }}
                >
                    {gpu.isActive ? 'active' : 'inactive'}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    {gpu.modelNumber}
                </span>
            </div>
            <p className="font-semibold mb-0.5 leading-tight" style={{ color: 'var(--text-h)', fontSize: '0.9rem' }}>
                {gpu.boardManufacturer} {gpu.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--text)' }}>
                {gpu.chip} &middot; {gpu.chipManufacturer}
            </p>
        </button>
    );
}

function CPUGridCard({ cpu, onClick }: { cpu: CPUData; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="text-left p-4 rounded-lg border transition-all cursor-pointer w-full"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', opacity: cpu.isActive ? 1 : 0.55 }}
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
                        background: cpu.isActive ? 'rgba(16,185,129,0.12)' : 'var(--code-bg)',
                        color: cpu.isActive ? '#10b981' : 'var(--text)',
                    }}
                >
                    {cpu.isActive ? 'active' : 'inactive'}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    {cpu.modelNumber}
                </span>
            </div>
            <p className="font-semibold mb-0.5 leading-tight" style={{ color: 'var(--text-h)', fontSize: '0.9rem' }}>
                {cpu.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--text)' }}>
                {cpu.chipManufacturer} {cpu.series && `· ${cpu.series}`}
                {cpu.cores && ` · ${cpu.cores}C/${cpu.threads}T`}
            </p>
        </button>
    );
}

function RAMGridCard({ ram, onClick }: { ram: RAMData; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="text-left p-4 rounded-lg border transition-all cursor-pointer w-full"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', opacity: ram.isActive ? 1 : 0.55 }}
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
                        background: ram.isActive ? 'rgba(16,185,129,0.12)' : 'var(--code-bg)',
                        color: ram.isActive ? '#10b981' : 'var(--text)',
                    }}
                >
                    {ram.isActive ? 'active' : 'inactive'}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    {ram.modelNumber}
                </span>
            </div>
            <p className="font-semibold mb-0.5 leading-tight" style={{ color: 'var(--text-h)', fontSize: '0.9rem' }}>
                {ram.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--text)' }}>
                {ram.brand} · {ram.standard}
                {ram.volume && ` · ${ram.volume}GB`}
                {ram.clockRate && ` · ${ram.clockRate}MHz`}
            </p>
        </button>
    );
}

function GPUWSGridCard({ gpu, onClick }: { gpu: GPUWorkstationData; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="text-left p-4 rounded-lg border transition-all cursor-pointer w-full"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', opacity: gpu.isActive ? 1 : 0.55 }}
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
                        background: gpu.isActive ? 'rgba(16,185,129,0.12)' : 'var(--code-bg)',
                        color: gpu.isActive ? '#10b981' : 'var(--text)',
                    }}
                >
                    {gpu.isActive ? 'active' : 'inactive'}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    {gpu.modelNumber}
                </span>
            </div>
            <p className="font-semibold mb-0.5 leading-tight" style={{ color: 'var(--text-h)', fontSize: '0.9rem' }}>
                {gpu.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--text)' }}>
                {gpu.chipManufacturer}
                {gpu.gpuMemory && ` · ${gpu.gpuMemory}GB`}
                {gpu.cudaCores && ` · ${gpu.cudaCores} CUDA`}
            </p>
        </button>
    );
}

// ---- List row renderers ----

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

// ---- Main component ----

interface Props {
    type: ProductType;
}

export const ProductListPage: React.FC<Props> = ({ type }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<AnyProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const config = TYPE_CONFIG[type];

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let data: AnyProduct[];
                if (type === 'gpu') data = await getGPUs();
                else if (type === 'cpu') data = await getCPUs();
                else if (type === 'ram') data = await getRAMs();
                else data = await getGPUWorkstations();
                setProducts((data ?? []).sort((a, b) => Number(b.isActive) - Number(a.isActive)));
            } catch {
                setError('Failed to connect to the backend. Check that the API is running on port 8080.');
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [type]);

    const handleClick = (product: AnyProduct) => {
        const model = getModelNumber(product);
        if (model) navigate(`${config.detailBase}/${encodeURIComponent(model)}`);
    };

    if (isLoading) {
        return (
            <div className="px-6 py-10 max-w-5xl mx-auto" style={{ textAlign: 'left' }}>
                <p className="font-mono text-sm" style={{ color: 'var(--text)' }}>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-6 py-10 max-w-5xl mx-auto" style={{ textAlign: 'left' }}>
                <p className="text-sm" style={{ color: '#ef4444' }}>{error}</p>
            </div>
        );
    }

    return (
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
                        {products.length} products tracked
                    </p>
                </div>

                <div
                    className="flex rounded-md overflow-hidden border"
                    style={{ borderColor: 'var(--border)' }}
                >
                    {(['grid', 'list'] as ViewMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
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

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {products.map((product, i) => {
                        if (type === 'gpu') return <GPUGridCard key={i} gpu={product as GPUData} onClick={() => handleClick(product)} />;
                        if (type === 'cpu') return <CPUGridCard key={i} cpu={product as CPUData} onClick={() => handleClick(product)} />;
                        if (type === 'ram') return <RAMGridCard key={i} ram={product as RAMData} onClick={() => handleClick(product)} />;
                        return <GPUWSGridCard key={i} gpu={product as GPUWorkstationData} onClick={() => handleClick(product)} />;
                    })}
                </div>
            ) : (
                <div
                    className="rounded-lg border overflow-hidden"
                    style={{ borderColor: 'var(--border)' }}
                >
                    {products.map((product, i) => {
                        let primary = '';
                        let secondary = '';

                        if (type === 'gpu') {
                            const g = product as GPUData;
                            primary = `${g.boardManufacturer ?? ''} ${g.name ?? ''}`.trim();
                            secondary = `${g.chip ?? ''} · ${g.chipManufacturer ?? ''}`;
                        } else if (type === 'cpu') {
                            const c = product as CPUData;
                            primary = c.name ?? '';
                            secondary = [c.chipManufacturer, c.series, c.cores ? `${c.cores}C/${c.threads}T` : null].filter(Boolean).join(' · ');
                        } else if (type === 'ram') {
                            const r = product as RAMData;
                            primary = r.name ?? '';
                            secondary = [r.brand, r.standard, r.volume ? `${r.volume}GB` : null, r.clockRate ? `${r.clockRate}MHz` : null].filter(Boolean).join(' · ');
                        } else {
                            const g = product as GPUWorkstationData;
                            primary = g.name ?? '';
                            secondary = [g.chipManufacturer, g.gpuMemory ? `${g.gpuMemory}GB` : null, g.cudaCores ? `${g.cudaCores} CUDA` : null].filter(Boolean).join(' · ');
                        }

                        return (
                            <ListRow
                                key={i}
                                product={product}
                                primary={primary}
                                secondary={secondary}
                                onClick={() => handleClick(product)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};
