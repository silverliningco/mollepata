import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-nominal-size',
  templateUrl: './nominal-size.component.html',
  styleUrls: ['./nominal-size.component.css']
})

export class NominalSizeComponent implements OnInit {

  @Output() nominalsize = new EventEmitter();

  size = [1, 2, 3, 4 ];


  constructor() { }

  ngOnInit(): void {
  }

  emit(s:any){
    this.nominalsize.emit(s);
  }

}
