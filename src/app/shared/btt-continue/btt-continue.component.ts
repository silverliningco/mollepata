import { Component, OnInit } from '@angular/core';
import { bridgeService } from "../../equipment-search/services/bridge.service";

@Component({
  selector: 'app-btt-continue',
  templateUrl: './btt-continue.component.html',
  styleUrls: ['./btt-continue.component.css']
})
export class BttContinueComponent implements OnInit {

  desableButton: boolean = true;

  constructor(
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {

    this._bridge.buttonContinue
        .subscribe((payload: any) => {
          this.ActiveContinuebutton(payload.data);
        })

  }

  ActiveContinuebutton(input:any): boolean{
    
    let ArrayValues =  Object.values(input) ;

   completeI: for (const value of ArrayValues) {
    if (typeof value === 'object'){
      this.ActiveContinuebutton(value);
    } else {
      if (value == null || value == undefined || value === ''){
        this.desableButton = true;
        break completeI;
      } else {
        this.desableButton = false;
      }
    }
   }
    
    return this.desableButton;
}

}
