import { Injectable } from '@angular/core'

export interface LocalStorageType {
    theme: 'dark' | 'light'
    lang: 'zh' | 'en'
    chart_style: 0 | 1 | 2 | 3
    backend: string
}

@Injectable({
    providedIn: 'root'
})
export class ConfigsService {

    constructor() {
        this._chart_style = this.get_local('chart_style') ?? 0
        this._language = this.get_local('lang') ?? 'en'
        this._language_name = this._figure_language_name(this._language)
        this._theme = this.get_local('theme') ?? 'dark'
        this._backend = this.get_local('backend')
    }

    private _language_name = ''
    get language_name(): string {
        return this._language_name
    }

    private _chart_style: LocalStorageType['chart_style'] = 0
    get chart_style(): LocalStorageType['chart_style'] {
        return this._chart_style
    }

    set chart_style(value: LocalStorageType['chart_style']) {
        this.set_local('chart_style', value)
        this._chart_style = value
    }

    private _language: LocalStorageType['lang']
    get language(): LocalStorageType['lang'] {
        return this._language
    }

    set language(value: LocalStorageType['lang']) {
        this.set_local('lang', value)
        this._language = value
        this._language_name = this._figure_language_name(this._language)
    }

    private _theme: LocalStorageType['theme']
    get theme(): LocalStorageType['theme'] {
        return this._theme
    }

    set theme(value: LocalStorageType['theme']) {
        this.set_local('theme', value)
        this._theme = value
    }

    private _backend: LocalStorageType['backend'] | undefined
    get backend(): LocalStorageType['backend'] | undefined {
        return this._backend
    }

    set backend(value: LocalStorageType['backend'] | undefined) {
        if (!value) {
            return
        }
        this.set_local('backend', value)
        this._backend = value
    }

    get_local<K extends keyof LocalStorageType>(key: K): LocalStorageType[K] | undefined {
        const new_key = 'isatiso.clash.material.' + key
        const value = localStorage.getItem(new_key)
        if (value) {
            return JSON.parse(value)
        }
        return
    }

    set_local<K extends keyof LocalStorageType>(key: K, value: LocalStorageType[K]) {
        const new_key = 'isatiso.clash.material.' + key
        localStorage.setItem(new_key, JSON.stringify(value))
    }

    private _figure_language_name(lang: string) {
        lang = lang || this._language
        switch (lang) {
            case 'zh':
                return '中文'
            case 'en':
                return 'English'
            default:
                return 'Unknown'
        }
    }
}
