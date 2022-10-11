import { Injectable } from '@angular/core'
import { FilterArray } from '../lib/filter'
import { ApiService, LogType } from './api.service'

@Injectable({
    providedIn: 'root'
})
export class LogsService {

    readonly list = new FilterArray<LogType>((key, obj) => obj.payload.indexOf(key) !== -1)

    constructor(
        private _api: ApiService
    ) {
        this._api.logs().subscribe(log => {
            log.time = Date.now()
            this.list.origin.unshift(log)
            this.list.update_origin(this.list.origin.slice(0, 100))
        })
    }

    filter(value: string) {
        this.list.update_target(value)
    }
}
