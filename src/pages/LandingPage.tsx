import React from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
    {
        label: 'Consumer GPUs',
        description: 'Track pricing for consumer graphics cards across all major vendors.',
        path: '/gpus',
        meta: 'NVIDIA · AMD',
    },
    {
        label: 'CPUs',
        description: 'Monitor processor prices across Intel and AMD desktop lineups.',
        path: '/cpus',
        meta: 'Intel · AMD',
    },
    {
        label: 'RAM',
        description: 'Compare DDR4 and DDR5 memory kit pricing from major brands.',
        path: '/ram',
        meta: 'DDR4 · DDR5',
    },
    {
        label: 'Workstation GPUs',
        description: 'Professional graphics cards for compute and rendering workloads.',
        path: '/workstation_gpus',
        meta: 'NVIDIA · AMD',
    },
    {
        label: 'SSDs',
        description: 'Track SATA and NVMe solid state drive pricing across major brands.',
        path: '/ssds',
        meta: 'SATA · NVMe',
    },
    {
        label: 'HDDs',
        description: 'Monitor hard disk drive prices across capacities and form factors.',
        path: '/hdds',
        meta: 'HDD · SATA',
    },
    {
        label: 'NVMe Drives',
        description: 'Compare PCIe NVMe drive pricing across capacities and interfaces.',
        path: '/nvmes',
        meta: 'PCIe · M.2',
    },
];

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="px-6 py-10 max-w-4xl mx-auto" style={{ textAlign: 'left' }}>
            <header className="mb-10 text-center">
                <h1 className="font-chakra-petch" style={{ fontSize: '3.5rem', lineHeight: 1.2, margin: '0 0 6px' }}>
                    Hardware Price Tracker
                </h1>
                <p style={{ color: 'var(--text)', fontSize: '0.9rem' }}>
                    Select a category to browse tracked products and their price history.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.path}
                        onClick={() => { void navigate(cat.path); }}
                        className="text-left p-5 rounded-lg border transition-all cursor-pointer"
                        style={{
                            background: 'var(--bg)',
                            borderColor: 'var(--border)',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-border)';
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-bg)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg)';
                        }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p
                                    className="font-semibold mb-1"
                                    style={{ color: 'var(--text-h)', fontSize: '1rem' }}
                                >
                                    {cat.label}
                                </p>
                                <p style={{ color: 'var(--text)', fontSize: '0.82rem', lineHeight: '1.5' }}>
                                    {cat.description}
                                </p>
                            </div>
                            <span
                                className="shrink-0 mt-0.5"
                                style={{ color: 'var(--accent)', fontSize: '1.1rem' }}
                            >
                                →
                            </span>
                        </div>
                        <p
                            className="mt-3 font-mono"
                            style={{ color: 'var(--text)', fontSize: '0.75rem', opacity: 0.7 }}
                        >
                            {cat.meta}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};
