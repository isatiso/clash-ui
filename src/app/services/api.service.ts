import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { ProxyItem } from '../lib/retrieve-group'

export interface TrafficData {
    up: number
    down: number
}

export interface ConnectionMeta {
    network: string
    type: string
    sourceIP: string
    destinationIP: string
    sourcePort: string
    destinationPort: string
    host: string
    dnsMode: string
    processPath: string
}

export interface Connection {
    id: string
    upload: number
    download: number
    start: string
    chains: string[]
    rule: string
    rulePayload: string
    metadata: ConnectionMeta
}

export interface ConnectionsData {
    uploadTotal: number
    downloadTotal: number
    connections: Connection[]
}

export interface RuleDef {
    type: string
    payload: string
    proxy: string
    color?: string
}

export interface Config {
    'allow-lan': boolean
    authentication: any[]
    'bind-address': string
    ipv6: boolean
    'log-level': 'debug' | 'info' | 'warning' | 'error' | 'silent'
    'mixed-port': number
    mode: 'global' | 'rule' | 'direct'
    port: number
    'redir-port': number
    'socks-port': number
    'tproxy-port': number
}

export interface LogType {
    type: 'debug' | 'info' | 'warning' | 'error'
    payload: string
    time: number
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private _traffic_socket: WebSocketSubject<TrafficData> | undefined
    private _connections_socket: WebSocketSubject<ConnectionsData> | undefined
    private _logs_socket: WebSocketSubject<LogType> | undefined
    public backend = '127.0.0.1:9090'

    constructor(
        private _http: HttpClient
    ) {

    }

    traffic() {
        if (!this._traffic_socket) {
            this._traffic_socket = webSocket<TrafficData>(`ws://${this.backend}/traffic`)
        }
        return this._traffic_socket
    }

    connections() {
        if (!this._connections_socket) {
            this._connections_socket = webSocket<ConnectionsData>(`ws://${this.backend}/connections`)
        }
        return this._connections_socket
    }

    logs() {
        if (!this._logs_socket) {
            this._logs_socket = webSocket<any>(`ws://${this.backend}/logs`)
        }
        return this._logs_socket
    }

    proxies() {
        return this._http.get<{ proxies: Record<string, ProxyItem> }>(`http://${this.backend}/proxies`)
    }

    switch_proxies(group: string, name: string) {
        return this._http.put(`http://${this.backend}/proxies/${group}`, { name })
    }

    rules() {
        return this._http.get<{ rules: RuleDef[] }>(`http://${this.backend}/rules`)
    }

    configs() {
        return this._http.get<Config>(`http://${this.backend}/configs`)
    }
}
