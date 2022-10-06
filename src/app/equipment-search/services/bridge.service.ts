import { Injectable, Output,  EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })


export class bridgeService {

    @Output() sentLocationParams: EventEmitter<any> = new EventEmitter();
    @Output() dwellingInfoParams: EventEmitter<any> = new EventEmitter();
    @Output() paramsRebateEligibility: EventEmitter<any> = new EventEmitter();

    @Output() buttonContinue: EventEmitter<any> = new EventEmitter();


    constructor(
    ) { } 
  
};

