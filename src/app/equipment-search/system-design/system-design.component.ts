import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { ModalSystemComponent } from '../modal-system/modal-system.component';

@Component({
  selector: 'app-system-design',
  templateUrl: './system-design.component.html',
  styleUrls: ['./system-design.component.css']
})
export class SystemDesignComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addEditSystemDesign() {    
    this.dialog.open(ModalSystemComponent, {
      width: '30%',
      data: ''
    })
  }

}
