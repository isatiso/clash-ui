type LatencyHistoryItem = { time: string; delay: number }
export type LatencyHistory = LatencyHistoryItem[]

export type ProxyItem = {
    name: string
    type: string
    history: LatencyHistory
    all?: string[]
    now?: string

    __provider?: string;
};

export const NonProxyTypes = [
    'Direct',
    'Reject',
    'Relay',
    'Selector',
    'Fallback',
    'URLTest',
    'LoadBalance',
    'Unknown',
]

export function retrieve_group(proxies: Record<string, ProxyItem>) {
    const group_names: string[] = []
    const global_group = Object.values(proxies).find(v => v.name === 'GLOBAL')
    const proxy_names: string[] = []
    for (const prop in proxies) {
        const p = proxies[prop]
        if (p.all && Array.isArray(p.all)) {
            group_names.push(prop)
        } else if (NonProxyTypes.indexOf(p.type) < 0) {
            proxy_names.push(prop)
        }
    }
    if (global_group) {
        const global_names = Array.from(global_group.all ?? [])
        global_names.push('GLOBAL')
        const sorted_group_names = group_names
            .map((name) => [global_names.indexOf(name), name] as const)
            .sort((a, b) => a[0] - b[0])
            .map((group) => group[1])
        return [sorted_group_names, proxy_names] as const
    } else {
        return [group_names, proxy_names] as const
    }
}
