import { isPlatformBrowser } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { map, Subject } from 'rxjs'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { ProxyItem } from '../lib/retrieve-group'
import { BackendService } from './backend.service'

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
    allow_lan: boolean
    authentication: any[]
    bind_address: string
    ipv6: boolean
    log_level: 'debug' | 'info' | 'warning' | 'error' | 'silent'
    mixed_port: number
    mode: 'global' | 'rule' | 'direct'
    port: number
    redir_port: number
    socks_port: number
    tproxy_port: number
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
    private _is_browser = isPlatformBrowser(this.platform_id)

    constructor(
        private _backend: BackendService,
        private _http: HttpClient,
        @Inject(PLATFORM_ID) private platform_id: any,
    ) {
    }

    traffic() {
        if (!this._is_browser) {
            return new Subject<TrafficData>()
        }
        if (!this._traffic_socket) {
            this._traffic_socket = webSocket<TrafficData>(`${this._backend.ws_url}/traffic?token=${this._backend.backend.secret}`)
        }
        return this._traffic_socket
    }

    connections() {
        if (!this._is_browser) {
            return new Subject<ConnectionsData>()
        }
        if (!this._connections_socket) {
            this._connections_socket = webSocket<ConnectionsData>(`${this._backend.ws_url}/connections?token=${this._backend.backend.secret}`)
        }
        return this._connections_socket
    }

    logs() {
        if (!this._is_browser) {
            return new Subject<any>()
        }
        if (!this._logs_socket) {
            this._logs_socket = webSocket<any>(`${this._backend.ws_url}/logs?token=${this._backend.backend.secret}`)
        }
        return this._logs_socket
    }

    proxies() {
        return this._http.get<{ proxies: Record<string, ProxyItem> }>(`${this._backend.http_url}/proxies`)
    }

    switch_proxies(group: string, name: string) {
        return this._http.put(`${this._backend.http_url}/proxies/${group}`, { name })
    }

    rules() {
        return this._http.get<{ rules: RuleDef[] }>(`${this._backend.http_url}/rules`)
    }

    version() {
        return this._http.get<{ version: string }>(`${this._backend.http_url}/version`)
    }

    close_all_connections() {
        return this._http.delete(`${this._backend.http_url}/connections`)
    }

    close_connection(id: string) {
        return this._http.delete(`${this._backend.http_url}/connections/${id}`)
    }

    configs() {
        return this._http.get<Config>(`${this._backend.http_url}/configs`).pipe(
            map(res => Object.entries(res).map(([k, v]) => [k.replace(/-/g, '_'), v])),
            map(entries => Object.fromEntries(entries) as Config)
        )
    }

    update_config(config: Partial<Config>) {
        const new_config = Object.fromEntries(Object.keys(config).map(k => [k.replace(/_/g, '-'), config[k as keyof Config]]))
        return this._http.patch<void>(`${this._backend.http_url}/configs`, new_config)
    }
}
