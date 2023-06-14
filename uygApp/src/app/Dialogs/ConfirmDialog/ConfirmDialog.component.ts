import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ConfirmDialog',
  templateUrl: './ConfirmDialog.component.html',
  styleUrls: ['./ConfirmDialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  dialogMesaj !: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>

  ) { }

  ngOnInit() {
  }

}
