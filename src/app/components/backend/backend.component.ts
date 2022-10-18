import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnDestroy } from '@angular/core'
import { AbstractControl, FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { catchError, Subject, switchMap, tap, throttleTime } from 'rxjs'
import { AutoUnsubscribe } from '../../lib/auto-unsubscribe'
import { BackendService, BackendType } from '../../services/backend.service'

@Component({
    selector: 'cm-backend',
    templateUrl: './backend.component.html',
    styleUrls: ['./backend.component.scss']
})
export class BackendComponent extends AutoUnsubscribe implements OnDestroy {

    form = this._fb.nonNullable.group({
        secret: '',
        url: ['', (control: AbstractControl) => {
            if (!control.value.startsWith('http')) {
                return { msg: 'must start with "http"' }
            } else if (!this._backend.parse(control.value)) {
                return { msg: 'can not parse url' }
            } else {
                return null
            }
        }]
    })

    connect_result = ''
    check$ = new Subject()
    private url?: BackendType

    constructor(
        private _backend: BackendService,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public ref: MatDialogRef<BackendComponent, BackendType>,
        @Inject(MAT_DIALOG_DATA) public data: BackendType,
    ) {
        super()
        this.url = data
        this.form.setValue({
            url: data.url,
            secret: data.secret ?? '',
        })
        this.subscription = [
            this.form.controls.url.valueChanges.pipe(
                tap(v => this.url = this._backend.parse(v)),
                tap(() => this.connect_result = '')
            ).subscribe(),
            this.form.controls.secret.valueChanges.pipe(
                tap(() => this.connect_result = '')
            ).subscribe(),
            this.check$.pipe(
                throttleTime(500),
                switchMap(() => this._http.get(`${this._backend.http_url}/version`, { headers: { 'Authorization': `Bearer ${this.form.controls.secret.value}` } })),
                catchError((_, caught) => (this.connect_result = 'cannot connect to the address') && caught),
                tap(() => this.ref.close({ ...this.url!, secret: this.form.controls.secret.value }))
            ).subscribe(),
        ]
    }
}
