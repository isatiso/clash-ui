import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { filter, Observable, tap } from 'rxjs'
import { BackendComponent } from '../components/backend/backend.component'
import { LocalService } from './local.service'

export interface BackendType {
    secure: boolean
    host: string
    hostname: string
    port: string
    url: string
    secret: string
}

const default_backend: BackendType = {
    secure: false,
    host: '127.0.0.1:9090',
    hostname: '127.0.0.1',
    port: '9090',
    url: 'http://127.0.0.1:9090',
    secret: '',
}

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(
        private _dialog: MatDialog,
        private _local: LocalService,
    ) {
        this._backend = this._local.get('backend') ?? default_backend
        const [http, ws] = this._generate_url()
        this._http_url = http
        this._ws_url = ws
    }

    private _backend: BackendType
    get backend(): BackendType {
        return this._backend
    }

    private _http_url: string
    get http_url(): string {
        return this._http_url
    }

    private _ws_url: string
    get ws_url(): string {
        return this._ws_url
    }

    switch(): Observable<BackendType> {
        return this._dialog.open<BackendComponent, BackendType, BackendType>(BackendComponent,
            { width: '100%', maxWidth: '900px', data: this.backend })
            .afterClosed().pipe(
                filter((data): data is BackendType => !!data),
                tap(data => this.set(data))
            )
    }

    parse(url: string): BackendType | undefined {
        try {
            const { protocol, host, hostname, port } = new URL(url)
            if (!protocol || !hostname || !host || !port || !['http:', 'https:'].includes(protocol)) {
                return
            }
            return {
                secure: protocol === 'https:',
                host,
                hostname,
                port,
                url: `${protocol}//${host}`,
                secret: ''
            }
        } catch (e) {
            return
        }
    }

    set(backend: BackendType) {
        console.log(backend)
        this._backend = backend
        this._local.set('backend', this._backend)
        const [http, ws] = this._generate_url()
        this._http_url = http
        this._ws_url = ws
    }

    private _generate_url(): [http: string, ws: string] {
        const protocol_http = this._backend.secure ? 'https' : 'http'
        const protocol_websocket = this._backend.secure ? 'wss' : 'ws'
        return [`${protocol_http}://${this._backend.host}`, `${protocol_websocket}://${this._backend.host}`]
    }
}
