import { Injectable, Output,  EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })


export class bridgeService {

    @Output() HVACInputs: EventEmitter<any> = new EventEmitter(); 

    // send data hvac inputs
    @Output() paramsQuestionsRequirements: EventEmitter<any> = new EventEmitter();

    // send data to hvac results
    @Output() resultsRebateFinder: EventEmitter<any> = new EventEmitter(); // send to order
    @Output() OrderResultsRebateFinder: EventEmitter<any> = new EventEmitter(); // rebates in order

    constructor(
    ) { } 
  
};

