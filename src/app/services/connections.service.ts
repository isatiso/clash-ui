import { Injectable } from '@angular/core'
import { FilterArray } from '../lib/filter'
import { pretty_bytes } from '../lib/pretty-bytes'
import { ApiService } from './api.service'

export interface FormattedConnection {
    id: string
    upload: number
    pretty_upload: string
    download: number
    pretty_download: string
    start: number
    chains: string
    rule: string
    destinationPort: string
    destinationIP: string
    sourceIP: string
    sourcePort: string
    source: string
    host: string
    type: string
    network: string
}

@Injectable({
    providedIn: 'root'
})
export class ConnectionsService {

    upload_total = 0
    upload_total_str = ''
    download_total = 0
    download_total_str = ''
    count = 0
    connection_ids: Set<string> = new Set()
    connection_map: Record<string, FormattedConnection> = {}
    readonly connections = new FilterArray<FormattedConnection>(
        (key, obj) => obj.host.indexOf(key) !== -1)
    readonly connection_history = new FilterArray<FormattedConnection>(
        (key, obj) => obj.host.indexOf(key) !== -1)

    constructor(
        private api: ApiService
    ) {
    }

    filter(value: string) {
        this.connections.update_target(value)
        this.connection_history.update_target(value)
    }

    init() {
        this.api.connections().subscribe(value => {
            this.upload_total = value.uploadTotal
            this.upload_total_str = pretty_bytes(value.uploadTotal)
            this.download_total = value.downloadTotal
            this.download_total_str = pretty_bytes(value.downloadTotal)
            this.count = value.connections.length

            const now = Date.now()
            const prev_connection_ids = this.connection_ids

            const connection_entries = value.connections.map(item => {
                const { id, metadata, upload, download, start, chains, rule, rulePayload } = item
                const { host, destinationPort, destinationIP, network, type, sourceIP, sourcePort } = metadata
                const host2 = host || destinationIP
                if (prev_connection_ids.has(id)) {
                    prev_connection_ids.delete(id)
                }
                return [id, {
                    id,
                    upload,
                    download,
                    pretty_upload: pretty_bytes(upload),
                    pretty_download: pretty_bytes(download),
                    start: now - new Date(start).valueOf(),
                    chains: chains.reverse().join(' / '),
                    rule: !rulePayload ? rule : `${rule}(${rulePayload})`,
                    ...metadata,
                    host: `${host2}:${destinationPort}`,
                    type: `${type}(${network})`,
                    source: `${sourceIP}:${sourcePort}`,
                }] as const
            })

            for (const id of prev_connection_ids) {
                this.connection_history.origin.push(this.connection_map[id])
            }
            this.connection_history.update_origin(this.connection_history.origin)

            this.connection_map = Object.fromEntries(connection_entries)
            const connections = connection_entries.map(([_, conn]) => conn)
            connections.sort((c1, c2) => c2.download - c1.download)
            this.connections.update_origin(connections)
            this.connection_ids = new Set(connection_entries.map(([id]) => id))

        })
    }
}
