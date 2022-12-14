import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { debounceTime, Subject, switchMap } from 'rxjs'
import { ApiService, Config } from './api.service'
import { BackendService } from './backend.service'
import { LocalService, LocalStorageType } from './local.service'

@Injectable({
    providedIn: 'root'
})
export class ConfigsService {

    $update = new Subject<Partial<Config>>()

    constructor(
        private _api: ApiService,
        private _backend: BackendService,
        private _local: LocalService,
        @Inject(DOCUMENT) private document: Document,
    ) {
        this._chart_style = this._local.get('chart_style') ?? 0
        this._language = this._local.get('lang') ?? 'en'
        this._theme = this._local.get('theme') ?? 'dark'
        this._speed_url = this._local.get('speed_url') ?? 'http://www.gstatic.com/generate_204'
        this.document.getElementById('body')?.setAttribute('data-theme', this._theme)
        this.$update.pipe(
            debounceTime(300),
            switchMap(data => this._api.update_config(data))
        ).subscribe()
    }

    private _speed_url: LocalStorageType['speed_url']
    get speed_url(): LocalStorageType['speed_url'] {
        return this._speed_url
    }

    set speed_url(value: LocalStorageType['speed_url']) {
        this._local.set('speed_url', value)
        this._speed_url = value
    }

    private _chart_style: LocalStorageType['chart_style'] = 0
    get chart_style(): LocalStorageType['chart_style'] {
        return this._chart_style
    }

    set chart_style(value: LocalStorageType['chart_style']) {
        this._local.set('chart_style', value)
        this._chart_style = value
    }

    private _language: LocalStorageType['lang']
    get language(): LocalStorageType['lang'] {
        return this._language
    }

    set language(value: LocalStorageType['lang']) {
        this._local.set('lang', value)
        this._language = value
    }

    private _theme: LocalStorageType['theme']
    get theme(): LocalStorageType['theme'] {
        return this._theme
    }

    set theme(value: LocalStorageType['theme']) {
        this.document.getElementById('body')?.setAttribute('data-theme', value)
        this._local.set('theme', value)
        this._theme = value
    }
}
