import { Component, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service'

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})
export class RebateFinderComponent implements OnInit {

  constructor(
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {
    this._bridge.sentLocationParams
        .subscribe((payload: any) => {

          console.log(payload.data);
        
          // crear el modelo al que se cargaran los datos
          // this.myPayloadForm = payload.data;
                    
         });
  }

}
