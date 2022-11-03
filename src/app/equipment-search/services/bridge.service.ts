import { Injectable, Output,  EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })


export class bridgeService {

    // send data to app-rebate-finder
    @Output() sentLocationParams: EventEmitter<any> = new EventEmitter();
    @Output() dwellingInfoParams: EventEmitter<any> = new EventEmitter();
    @Output() nominalSizeParams: EventEmitter<any> = new EventEmitter();
    @Output() showAllResults: EventEmitter<any> = new EventEmitter();

    // send data hvac inputs
    @Output() paramsRebateEligibility: EventEmitter<any> = new EventEmitter();
    @Output() paramsSystemDesing: EventEmitter<any> = new EventEmitter();

    // send data to hvac results
    @Output() resultsRebateFinder: EventEmitter<any> = new EventEmitter(); // send to order
    @Output() OrderResultsRebateFinder: EventEmitter<any> = new EventEmitter(); // rebates in order

    constructor(
    ) { } 
  
};

