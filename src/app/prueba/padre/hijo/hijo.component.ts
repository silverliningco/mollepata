import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.css']
})
export class HijoComponent implements OnInit {

  @Input() nombreHijo: string = 'sin nombre'
  @Output() cambioNombrehijo = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }


  combiarnombre () {
    this.nombreHijo = 'juan carlos';
    this.cambioNombrehijo.emit(this.nombreHijo);
  }

}
