import { Component, OnInit } from '@angular/core';
import { bridgeService } from '../../services/bridge.service';

@Component({
  selector: 'app-available-rebates',
  templateUrl: './available-rebates.component.html',
  styleUrls: ['./available-rebates.component.css']
})
export class AvailableRebatesComponent implements OnInit {

  results: any;
  bestOption: any[] = [];

  constructor(
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {
    this._bridge.resultsRebateFinder
        .subscribe((payload: any) => {
          this.results = payload.data;
          this.selectingBestOption(this.results);
         });
  }

  selectingBestOption(results: any){
    let max!: any;

    results.forEach((element:any) => {
      // returns the results ordered from maximum to minimum
      element.forEach((element2: any) => {
        max =  element2.sort( function(a: any, b:any) {
          if (a.totalAvailableRebates < b.totalAvailableRebates || a.totalAvailableRebates === null) return +1;
          if (a.totalAvailableRebates > b.totalAvailableRebates || b.totalAvailableRebates === null) return -1;
          return 0;
        });
        this.bestOption.push( max);
      });
    }); 

    // return the rebatess in order
    this._bridge.OrderResultsRebateFinder.emit({
      data: this.bestOption
    });

  }



}