import { Injectable, Output,  EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })


export class bridgeService {

    @Output() HVACInputs: EventEmitter<any> = new EventEmitter(); 

    // send data hvac inputs
    @Output() paramsQuestionsRequirements: EventEmitter<any> = new EventEmitter();

    @Output() resultsRebateFinder: EventEmitter<any> = new EventEmitter(); // send to order

    constructor(
    ) { } 
  
};

