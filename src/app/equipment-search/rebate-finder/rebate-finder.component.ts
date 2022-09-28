import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})

export class RebateFinderComponent implements OnInit {


  my_size:any= '------';
  my_cooling_heating: any= '-----';


  mysearchInputs:any = {
    my_size: this.my_size,
    my_cooling_heating: this.my_cooling_heating
  }

  constructor() { }

  ngOnInit(): void {
  }
 
}
