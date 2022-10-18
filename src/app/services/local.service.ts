import { Injectable } from '@angular/core'
import { BackendType } from './backend.service'

export interface LocalStorageType {
    theme: 'dark' | 'light'
    lang: 'zh' | 'en'
    chart_style: 0 | 1 | 2 | 3
    backend: BackendType
    speed_url: string
}

@Injectable({
    providedIn: 'root'
})
export class LocalService {

    constructor() {
    }

    get<K extends keyof LocalStorageType>(key: K): LocalStorageType[K] | undefined {
        const new_key = 'isatiso.clash.material.' + key
        const value = localStorage.getItem(new_key)
        if (value) {
            return JSON.parse(value)
        }
        return
    }

    set<K extends keyof LocalStorageType>(key: K, value: LocalStorageType[K]) {
        const new_key = 'isatiso.clash.material.' + key
        localStorage.setItem(new_key, JSON.stringify(value))
    }
}
