import { Injectable } from '@angular/core'
import { ApiService } from './api.service'

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    private _backends: string[] = []

    constructor(
        private api: ApiService,
    ) {
    }

    select() {

    }

    add(url: string) {

    }
}
