import React, { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface PricePoint {
    vendor: string | null;
    price: number | null;
    currency: string | null;
    scrapedAt: string | null;
}

interface Props {
    pricePoints: PricePoint[];
}

const VENDOR_COLORS = [
    '#00e676',
    '#ff1744',
    '#00bcd4',
    '#ffab00',
    '#76ff03',
    '#ff6d00',
    '#e040fb',
];

export const PriceChart: React.FC<Props> = ({ pricePoints }) => {
    const { chartData, vendors, currency } = useMemo(() => {
        const filtered = pricePoints.filter(
            (p) => p.scrapedAt && p.vendor && p.price !== null,
        );

        const currency = filtered[0]?.currency ?? 'AUD';
        const vendorSet = new Set<string>();
        for (const p of filtered) vendorSet.add(p.vendor!);
        const vendors = [...vendorSet].sort();

        // group by date string, keep latest price per vendor per day
        const byDate = new Map<string, { _ts: number; [key: string]: number }>();
        for (const p of filtered) {
            const ts = new Date(p.scrapedAt!).getTime();
            const dateKey = new Date(p.scrapedAt!).toLocaleDateString('en-AU', {
                day: '2-digit',
                month: 'short',
                year: '2-digit',
            });

            if (!byDate.has(dateKey)) {
                byDate.set(dateKey, { _ts: ts } as { _ts: number; [k: string]: number });
            }
            const entry = byDate.get(dateKey)!;

            // keep the latest entry per vendor on the same day
            const vendorTsKey = `_ts_${p.vendor!}`;
            if (!entry[vendorTsKey] || ts >= entry[vendorTsKey]) {
                entry[p.vendor!] = p.price!;
                entry[vendorTsKey] = ts;
            }

            // keep _ts as the minimum timestamp for stable sort ordering
            if (ts < entry._ts) entry._ts = ts;
        }

        const chartData = [...byDate.entries()]
            .sort(([, a], [, b]) => a._ts - b._ts)
            .map(([date, values]) => {
                const rest = Object.fromEntries(
                    Object.entries(values).filter(([k]) => !k.startsWith('_')),
                );
                return { date, ...rest };
            });

        return { chartData, vendors, currency };
    }, [pricePoints]);

    if (chartData.length === 0) {
        return (
            <div
                className="flex items-center justify-center h-64 rounded-lg border"
                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
                No price data available yet.
            </div>
        );
    }

    const formatPrice = (value: number) =>
        `${currency} $${value.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`;

    return (
        <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                    dataKey="date"
                    tick={{ fill: 'var(--text)', fontSize: 11, fontFamily: 'var(--mono)' }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--border)' }}
                />
                <YAxis
                    tickFormatter={(v) => `$${v.toLocaleString()}`}
                    tick={{ fill: 'var(--text)', fontSize: 11, fontFamily: 'var(--mono)' }}
                    tickLine={false}
                    axisLine={false}
                    width={72}
                />
                <Tooltip
                    formatter={(value: number, name: string) => [formatPrice(value), name]}
                    contentStyle={{
                        background: 'var(--code-bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontFamily: 'var(--mono)',
                        color: 'var(--text-h)',
                    }}
                    labelStyle={{ color: 'var(--text)', marginBottom: '4px' }}
                />
                <Legend
                    wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--mono)', paddingTop: '12px' }}
                />
                {vendors.map((vendor, i) => (
                    <Line
                        key={vendor}
                        type="monotone"
                        dataKey={vendor}
                        stroke={VENDOR_COLORS[i % VENDOR_COLORS.length]}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        connectNulls={false}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};
