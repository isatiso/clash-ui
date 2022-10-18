import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { BackendService, BackendType } from '../../services/backend.service'
import { ConfigsService } from '../../services/configs.service'

@Component({
    selector: 'cm-backend',
    templateUrl: './backend.component.html',
    styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit, OnDestroy {

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

    private url?: BackendType
    form_subscription = this.form.controls.url.valueChanges
        .subscribe(v => this.url = this._backend.parse(v))

    constructor(
        private _backend: BackendService,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public configs: ConfigsService,
        public ref: MatDialogRef<BackendComponent, BackendType>,
        @Inject(MAT_DIALOG_DATA) public data: BackendType,
    ) {
        this.url = data
        this.form.setValue({
            url: data.url,
            secret: data.secret ?? '',
        })
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.form_subscription.unsubscribe()
    }

    finish() {
        if (!this.url) {
            return
        }
        this.ref.close({ ...this.url, secret: this.form.controls.secret.value })
    }
}
