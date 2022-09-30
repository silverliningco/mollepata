import { Injectable, Output,  EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })


export class bridgeService {

    @Output() sentLocationParams: EventEmitter<any> = new EventEmitter();

    constructor(
    ) { } 
  
};

