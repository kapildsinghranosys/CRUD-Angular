import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  constructor(public thisDialogRef:MatDialogRef<DialogConfirmComponent>,
  @Inject(MAT_DIALOG_DATA) public data:string) { }

  ngOnInit() {
  }

}
