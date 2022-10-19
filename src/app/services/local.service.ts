import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { BackendType } from './backend.service'

export interface LocalStorageType {
    theme: 'dark' | 'light'
    lang: 'zh' | 'en'
    chart_style: 0 | 1 | 2 | 3
    backend: BackendType
    speed_url: string
}

class LocalStorage implements Storage {
    readonly length: number = 0
    readonly clear = (): void => undefined
    readonly getItem = (_key: string): string | null => null
    readonly key = (_index: number): string | null => null
    readonly removeItem = (_key: string): void => undefined
    readonly setItem = (_key: string, _value: string): void => undefined
}

@Injectable({
    providedIn: 'root'
})
export class LocalService {

    private _storage: Storage

    constructor(
        @Inject(PLATFORM_ID) private platform_id: any,
    ) {
        if (isPlatformBrowser(platform_id)) {
            this._storage = localStorage
        } else {
            this._storage = new LocalStorage()
        }
    }

    get<K extends keyof LocalStorageType>(key: K): LocalStorageType[K] | undefined {
        const new_key = 'isatiso.clash.material.' + key
        const value = this._storage.getItem(new_key)
        if (value) {
            return JSON.parse(value)
        }
        return
    }

    set<K extends keyof LocalStorageType>(key: K, value: LocalStorageType[K]) {
        const new_key = 'isatiso.clash.material.' + key
        this._storage.setItem(new_key, JSON.stringify(value))
    }
}
