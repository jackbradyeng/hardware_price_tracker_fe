import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BREADCRUMBS: Record<string, string> = {
    '/gpus': 'Consumer GPUs',
    '/cpus': 'CPUs',
    '/ram': 'RAM',
    '/workstation_gpus': 'Workstation GPUs',
};

export const Navbar: React.FC = () => {
    const location = useLocation();

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const listPath = pathSegments.length > 0 ? `/${pathSegments[0]}` : null;
    const listLabel = listPath ? BREADCRUMBS[listPath] : null;
    const isDetail = pathSegments.length > 1;

    return (
        <nav
            className="sticky top-0 z-10 flex items-center gap-2 px-6 py-3 text-sm border-b"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
        >
            <Link
                to="/"
                className="font-mono font-bold tracking-tight"
                style={{ color: 'var(--text-h)' }}
            >
                hw-price-tracker
            </Link>

            {listLabel && (
                <>
                    <span style={{ color: 'var(--border)' }}>/</span>
                    {isDetail ? (
                        <Link to={listPath!} style={{ color: 'var(--text)' }}>
                            {listLabel}
                        </Link>
                    ) : (
                        <span style={{ color: 'var(--text)' }}>{listLabel}</span>
                    )}
                </>
            )}

            {isDetail && (
                <>
                    <span style={{ color: 'var(--border)' }}>/</span>
                    <span className="font-mono" style={{ color: 'var(--text)' }}>
                        {decodeURIComponent(pathSegments[1])}
                    </span>
                </>
            )}
        </nav>
    );
};
