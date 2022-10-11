import { Injectable } from '@angular/core'
import { Subject, switchMap, throttleTime } from 'rxjs'
import { ProxyItem, retrieve_group } from '../lib/retrieve-group'
import { ApiService } from './api.service'

@Injectable({
    providedIn: 'root'
})
export class ProxiesService {

    public proxy_names: string[] = []
    public group_names: string[] = []
    public proxies: Record<string, ProxyItem> = {}
    public groups: Record<string, ProxyItem> = {}

    public request_proxies = new Subject()

    constructor(
        private _api: ApiService,
    ) {
        this.request_proxies.pipe(
            throttleTime(100),
            switchMap(() => this._api.proxies()),
        ).subscribe(({ proxies }) => {
            const [group_names, proxy_names] = retrieve_group(proxies)
            this.group_names = group_names
            this.proxy_names = proxy_names
            this.groups = Object.fromEntries(this.group_names.map(name => [name, proxies[name]]))
            this.proxies = proxies
        })
    }
}
