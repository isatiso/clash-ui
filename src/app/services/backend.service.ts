import { Injectable } from '@angular/core'
import { LocalService } from './local.service'

export interface BackendType {
    secure: boolean
    host: string
    hostname: string
    port: string
    url: string
}

const default_backend: BackendType = { secure: false, host: '127.0.0.1:9090', hostname: '127.0.0.1', port: '9090', url: 'http://127.0.0.1:9090' }

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    public backends: BackendType[] = []
    public current: BackendType

    constructor(
        private _local: LocalService,
    ) {
        this.backends = this._local.get('backends') ?? []
        this.current = this._local.get('current_backend') ?? default_backend
    }

    select(index: number) {
        if (this.backends[index]) {
            this.current = this.backends[index]
            this._local.set('current_backend', this.backends[index])
        }
    }

    parse(url: string): BackendType | undefined {
        try {
            const { protocol, host, hostname, port } = new URL(url)
            if (!protocol || !hostname || !host || !port || !['http', 'https'].includes(protocol)) {
                return
            }
            return {
                secure: protocol === 'https:',
                host,
                hostname,
                port,
                url: `${protocol}//${host}`
            }
        } catch (e) {
            return
        }
    }

    add(url: string): boolean {
        const backend = this.parse(url)
        if (!backend) {
            return false
        }
        if (!this.backends.find(b => b.url === backend.url)) {
            this.backends.push()
        }
        this._local.set('backends', this.backends)
        return true
    }
}
