import { Injectable } from '@angular/core'
import { catchError, debounceTime, forkJoin, mergeMap, of, Subject, switchMap, tap, throttleTime } from 'rxjs'
import { ProxyItem, retrieve_group } from '../lib/retrieve-group'
import { ApiService } from './api.service'
import { ConfigsService } from './configs.service'

@Injectable({
    providedIn: 'root'
})
export class ProxiesService {

    public proxy_names: string[] = []
    public group_names: string[] = []
    public proxies: Record<string, ProxyItem> = {}
    public groups: Record<string, ProxyItem> = {}

    public request$ = new Subject()
    public speed_test$ = new Subject<string>()
    public speed_test_finish$ = new Subject()

    constructor(
        private _api: ApiService,
        private _configs: ConfigsService,
    ) {
        this.request$.pipe(
            throttleTime(100),
            switchMap(() => this._api.proxies()),
        ).subscribe(({ proxies }) => {
            const [group_names, proxy_names] = retrieve_group(proxies)
            this.group_names = group_names
            this.proxy_names = proxy_names
            this.groups = Object.fromEntries(this.group_names.map(name => [name, proxies[name]]))
            proxy_names.forEach(name => proxies[name].delay = proxies[name].history[proxies[name].history.length - 1]?.delay)
            this.proxies = proxies
        })
        this.speed_test$.pipe(
            mergeMap(name => forkJoin([of(name), this._api.proxy_delay(name, this._configs.speed_url)]), 5),
            catchError((err, caught) => caught),
            tap(([name, res]) => this.proxies[name].delay = res.delay),
            debounceTime(5000),
            tap(() => this.speed_test_finish$.next(null))
        ).subscribe()
    }

    speed_test() {
        this.proxy_names.forEach(name => this.speed_test$.next(name))
    }
}
