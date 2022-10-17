import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
    selector: 'cm-backend',
    templateUrl: './backend.component.html',
    styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit {

    constructor(
        public ref: MatDialogRef<BackendComponent>,
    ) {
    }

    ngOnInit(): void {
    }

}
