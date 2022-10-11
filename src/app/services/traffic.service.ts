import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { pretty_bytes } from '../lib/pretty-bytes'
import { ApiService } from './api.service'

function rollout(arr: number[], value: number) {
    arr.shift()
    arr.push(value)
}

@Injectable({
    providedIn: 'root'
})
export class TrafficService {

    $update = new Subject()

    _size = 150

    labels = Array(this._size).fill(0)
    up_arr = Array(this._size)
    down_arr = Array(this._size)

    up = 0
    up_str = '0 B/s'
    down = 0
    down_str = '0 B/s'

    constructor(
        private _api: ApiService
    ) {
        this._api.traffic().subscribe(value => {
            rollout(this.labels, Date.now())
            rollout(this.up_arr, this.up = value.up)
            rollout(this.down_arr, this.down = value.down)

            this.up_str = pretty_bytes(value.up) + '/s'
            this.down_str = pretty_bytes(value.down) + '/s'

            this.$update.next(null)
        })
    }
}
