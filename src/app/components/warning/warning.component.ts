import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
    selector: 'cm-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {

    constructor(
        public ref: MatDialogRef<WarningComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { msg_id: string, pass?: any },
    ) {
    }

    ngOnInit(): void {
    }
}
