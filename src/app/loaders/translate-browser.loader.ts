import { PlatformLocation } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser'
import { TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { Observable } from 'rxjs'

@Injectable()
export class TranslateBrowserLoader implements TranslateLoader {

    constructor(
        private http: HttpClient,
        private transferState: TransferState,
        private location: PlatformLocation,
    ) {
    }

    public getTranslation(lang: string): Observable<any> {
        const key: StateKey<number> = makeStateKey<number>(
            'transfer-translate-' + lang
        )
        const data = this.transferState.get(key, null)

        // First we are looking for the translations in transfer-state,
        // if none found, http load as fallback
        if (data) {
            return new Observable((observer) => {
                observer.next(data)
                observer.complete()
            })
        } else {
            const loader = new TranslateHttpLoader(this.http)
            const base_href = this.location.getBaseHrefFromDOM()
            if (base_href) {
                loader.prefix = base_href.replace(/\/\s*$/, '') + '/assets/i18n/'
            }
            return loader.getTranslation(lang)
        }
    }
}
