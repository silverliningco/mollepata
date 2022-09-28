import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-heated-cooled',
  templateUrl: './heated-cooled.component.html',
  styleUrls: ['./heated-cooled.component.css']
})

export class HeatedCooledComponent implements OnInit {

  @Output() cooling_heating = new EventEmitter();

  cooling = [
    {value: 'yes', viewValue: 'yes'},
    {value: 'no', viewValue: 'no'}
  ];

  heating = [
    {value: 'yes', viewValue: 'yes'},
    {value: 'no', viewValue: 'no'},
    {value: 'Existing-or-non-TDR-furnace', viewValue: 'Existing or non-TDR furnace'},
  ];

  c!: any;
  h!:any;

  constructor() { }

  ngOnInit(): void {
  }

  currentcooling(c:any){
    this.c = c;
  }

  curretheating(h:any){
    this.h = h;
  }

  emit(){
    let cooling_heating = {
      cooling: this.c,
      heating: this.h
    }

    this.cooling_heating.emit(cooling_heating);
  }

}
