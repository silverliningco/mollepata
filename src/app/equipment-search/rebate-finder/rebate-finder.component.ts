import { Component, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service';
import { EndPointsService } from '../services/endPoints.service';

import { Location, ListUtilities, DwellingInfo, HeatedCooled, Nominalsize, SystemDesing } from '../models/rebate-finder-inputs';



export const RESULTS2 = [ 
    [
      {
        "EER": 14.00,
        "AFUE": 97.2,
        "HSPF": null,
        "SEER": 16.00,
        "Hcap17": null,
        "Hcap47": null,
        "fuelTypes": [
            "Natural Gas",
            "Propane Gas"
        ],
        "components": [
            {
                "description": "",
                "title": "24ACB724A003",
                "componentType": "outdoorUnit"
            },
            {
                "description": "",
                "title": "CSPHP3612ALA",
                "componentType": "indoorUnit"
            },
            {
                "description": "",
                "title": "59MN7B080C21--20",
                "componentType": "furnace"
            }
        ],
        "skus":[],
        "equipmentTags": null,
        "AHRIReferences": [
            "203882048",
            "204032248"
        ],
        "availableRebates": null,
        "furnaceInputBTUH": 80000,
        "furnaceOutputBTUH": 78000,
        "configurationOptions": [
            {
                "id": "Horizontal, Upflow",
                "title": "Horizontal, Upflow",
                "componentType": "furnaceConfiguration"
            }
        ],
        "coolingCapacityRated": 24800,
        "furnaceConfigurations": [
            "Horizontal",
            "Upflow"
        ],
        "totalAvailableRebates": 1
      },
      {
          "EER": 13.00,
          "AFUE": 97.2,
          "HSPF": null,
          "SEER": 16.00,
          "Hcap17": null,
          "Hcap47": null,
          "fuelTypes": [
              "Natural Gas",
              "Propane Gas"
          ],
          "components": [
              {
                  "description": "",
                  "title": "24ACB724A003",
                  "componentType": "outdoorUnit"
              },
              {  
                  "description": "",
                  "title": "CSPHP3012ALA",
                  "componentType": "indoorUnit"
              },
              {
                  "description": "59MN7B080C21--20",
                  "title": "97 AFUE 80k Modulating Comm ECM Furnace",
                  "componentType": "furnace"
              }
          ],
          "skus":[],
          "equipmentTags": null,
          "AHRIReferences": [
              "203881782",
              "204032248"
          ],
          "availableRebates": null,
          "furnaceInputBTUH": 80000,
          "furnaceOutputBTUH": 78000,
          "configurationOptions": [
              {
                  "id": "Horizontal, Upflow",
                  "title": "Horizontal, Upflow",
                  "componentType": "furnaceConfiguration"
              }
          ],
          "coolingCapacityRated": 24600,
          "furnaceConfigurations": [
              "Horizontal",
              "Upflow"
          ],
          "totalAvailableRebates": null
      }
    ], 
    [
      {
        "EER": 15.00,
        "AFUE": 97.2,
        "HSPF": null,
        "SEER": 16.00,
        "Hcap17": null,
        "Hcap47": null,
        "fuelTypes": [
            "Natural Gas",
            "Propane Gas"
        ],
        "components": [
            {
                "description": "",
                "title": "24ACC630A003",
                "componentType": "outdoorUnit"
            },
            {
                "description": "",
                "title": "CSPHP4212ALA",
                "componentType": "indoorUnit"
            },
            {
                "description": "",
                "title": "59MN7B080C21--20",
                "componentType": "furnace"
            }
        ],
        "skus":[],
        "equipmentTags": null,
        "AHRIReferences": [
            "203603478",
            "204032248"
        ],
        "availableRebates": null,
        "furnaceInputBTUH": 80000,
        "furnaceOutputBTUH": 78000,
        "configurationOptions": [
            {
                "id": "Horizontal, Upflow",
                "title": "Horizontal, Upflow",
                "componentType": "furnaceConfiguration"
            }
        ],
        "coolingCapacityRated": 28600,
        "furnaceConfigurations": [
            "Horizontal",
            "Upflow"
        ],
        "totalAvailableRebates": 3
      },
      {
          "EER": 13.00,
          "AFUE": 97.2,
          "HSPF": null,
          "SEER": 16.00,
          "Hcap17": null,
          "Hcap47": null,
          "fuelTypes": [
              "Natural Gas",
              "Propane Gas"
          ],
          "components": [
              {
                  "description": "",
                  "title": "24ACC630A003",
                  "componentType": "outdoorUnit"
              },
              {
                  "description": "",
                  "title": "CSPHP3612ALA",
                  "componentType": "indoorUnit"
              },
              {
                  "description": "",
                  "title": "59MN7B080C21--20",
                  "componentType": "furnace"
              }
          ],
          "skus":[],
          "equipmentTags": null,
          "AHRIReferences": [
              "203603416",
              "204032248"
          ],
          "availableRebates": null,
          "furnaceInputBTUH": 80000,
          "furnaceOutputBTUH": 78000,
          "configurationOptions": [
              {
                  "id": "Horizontal, Upflow",
                  "title": "Horizontal, Upflow",
                  "componentType": "furnaceConfiguration"
              }
          ],
          "coolingCapacityRated": 28400,
          "furnaceConfigurations": [
              "Horizontal",
              "Upflow"
          ],
          "totalAvailableRebates": 4
      },
      {
          "EER": 12.50,
          "AFUE": 97.2,
          "HSPF": null,
          "SEER": 15.00,
          "Hcap17": null,
          "Hcap47": null,
          "fuelTypes": [
              "Natural Gas",
              "Propane Gas"
          ],
          "components": [
              {
                  "description": "",
                  "title": "24ACC630A003",
                  "componentType": "outdoorUnit"
              },
              {
                  "description": "",
                  "title": "CSPHP3012ALA",
                  "componentType": "indoorUnit"
              },
              {
                  "description": "",
                  "title": "59MN7B080C21--20",
                  "componentType": "furnace"
              }
          ],
          "skus":[],
          "equipmentTags": null,
          "AHRIReferences": [
              "203603354",
              "204032248"
          ],
          "availableRebates": null,
          "furnaceInputBTUH": 80000,
          "furnaceOutputBTUH": 78000,
          "configurationOptions": [
              {
                  "id": "Horizontal, Upflow",
                  "title": "Horizontal, Upflow",
                  "componentType": "furnaceConfiguration"
              }
          ],
          "coolingCapacityRated": 27800,
          "furnaceConfigurations": [
              "Horizontal",
              "Upflow"
          ],
          "totalAvailableRebates": 1
      }
    ], 
    [
      {
        "EER": 16.00,
        "AFUE": 97.2,
        "HSPF": null,
        "SEER": 16.00,
        "Hcap17": null,
        "Hcap47": null,
        "fuelTypes": [
            "Natural Gas",
            "Propane Gas"
        ],
        "components": [
            {
                "description": "",
                "title": "24ABC624A003",
                "componentType": "outdoorUnit"
            },
            {
                "description": "",
                "title": "CSPHP3612ALA",
                "componentType": "indoorUnit"
            },
            {
                "description": "",
                "title": "59MN7B080C21--20",
                "componentType": "furnace"
            }
        ],
        "skus":[],
        "equipmentTags": null,
        "AHRIReferences": [
            "203548477",
            "204032248"
        ],
        "availableRebates": null,
        "furnaceInputBTUH": 80000,
        "furnaceOutputBTUH": 78000,
        "configurationOptions": [
            {
                "id": "Horizontal, Upflow",
                "title": "Horizontal, Upflow",
                "componentType": "furnaceConfiguration"
            }
        ],
        "coolingCapacityRated": 24600,
        "furnaceConfigurations": [
            "Horizontal",
            "Upflow"
        ],
        "totalAvailableRebates": 6
      },
      {
          "EER": 13.00,
          "AFUE": 97.2,
          "HSPF": null,
          "SEER": 16.00,
          "Hcap17": null,
          "Hcap47": null,
          "fuelTypes": [
              "Natural Gas",
              "Propane Gas"
          ],
          "components": [
              {
                  "description": "",
                  "title": "24ABC624A003",
                  "componentType": "outdoorUnit"
              },
              {
                  "description": "",
                  "title": "CSPHP3012ALA",
                  "componentType": "indoorUnit"
              },
              {
                  "description": "",
                  "title": "59MN7B080C21--20",
                  "componentType": "furnace"
              }
          ],
          "skus":[],
          "equipmentTags": null,
          "AHRIReferences": [
              "203548233",
              "204032248"
          ],
          "availableRebates": null,
          "furnaceInputBTUH": 80000,
          "furnaceOutputBTUH": 78000,
          "configurationOptions": [
              {
                  "id": "Horizontal, Upflow",
                  "title": "Horizontal, Upflow",
                  "componentType": "furnaceConfiguration"
              }
          ],
          "coolingCapacityRated": 24400,
          "furnaceConfigurations": [
              "Horizontal",
              "Upflow"
          ],
          "totalAvailableRebates": 7
      },
      {
          "EER": 13.00,
          "AFUE": 97.2,
          "HSPF": null,
          "SEER": 16.00,
          "Hcap17": null,
          "Hcap47": null,
          "fuelTypes": [
              "Natural Gas",
              "Propane Gas"
          ],
          "components": [
              {
                  "description": "",
                  "title": "24ABC624A003",
                  "componentType": "outdoorUnit"
              },
              {
                  "description": "",
                  "title": "CSPHP2412ALA",
                  "componentType": "indoorUnit"
              },
              {
                  "description": "",
                  "title": "59MN7B080C21--20",
                  "componentType": "furnace"
              }
          ],
          "skus":[],
          "equipmentTags": null,
          "AHRIReferences": [
              "203547999",
              "204032248"
          ],
          "availableRebates": null,
          "furnaceInputBTUH": 80000,
          "furnaceOutputBTUH": 78000,
          "configurationOptions": [
              {
                  "id": "Horizontal, Upflow",
                  "title": "Horizontal, Upflow",
                  "componentType": "furnaceConfiguration"
              }
          ],
          "coolingCapacityRated": 24400,
          "furnaceConfigurations": [
              "Horizontal",
              "Upflow"
          ],
          "totalAvailableRebates": 2
      },
      {
          "EER": 13.00,
          "AFUE": 97.2,
          "HSPF": null,
          "SEER": 16.00,
          "Hcap17": null,
          "Hcap47": null,
          "fuelTypes": [
              "Natural Gas",
              "Propane Gas"
          ],
          "components": [
              {
                  "description": "",
                  "title": "24ABC624A003",
                  "componentType": "outdoorUnit"
              },
              {
                  "description": "",
                  "title": "CNPVP3621ALA",
                  "componentType": "indoorUnit"
              },
              {
                  "description": "",
                  "title": "59MN7B080C21--20",
                  "componentType": "furnace"
              }
          ],
          "skus":[],
          "equipmentTags": null,
          "AHRIReferences": [
              "203546987",
              "204032248"
          ],
          "availableRebates": null,
          "furnaceInputBTUH": 80000,
          "furnaceOutputBTUH": 78000,
          "configurationOptions": [
              {
                  "id": "Horizontal, Upflow",
                  "title": "Horizontal, Upflow",
                  "componentType": "furnaceConfiguration"
              }
          ],
          "coolingCapacityRated": 23600,
          "furnaceConfigurations": [
              "Horizontal",
              "Upflow"
          ],
          "totalAvailableRebates": null
      }
    ]
  ];

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})

export class RebateFinderComponent implements OnInit {

  // local variables save data of stepper
  myLocation: Location = new Location(null, new ListUtilities(null, null), true); 
  myDwellingInfo: DwellingInfo = new DwellingInfo(null, null, true);
  myHeatedCooled: HeatedCooled = new HeatedCooled(null, null, true);
  myNominalSize: Nominalsize = new Nominalsize(null, null, true);
  mySystemDesing: SystemDesing = new SystemDesing(null, null, null, null, null, true);

  bestOption: any[] = [];
  filters!: string[];
  filtesApplied!: string[];

  showProducLines!: boolean;

  myResults: any[] = RESULTS2;
  master = 'Master';

  constructor(
    public _bridge: bridgeService,
    private _endPoint: EndPointsService
  ) { }

  ngOnInit(): void {
    this._bridge.sentLocationParams
        .subscribe((payload: any) => {
          this.myLocation = payload.data[0];
          this.myLocation.desableButton = payload.data[1];
          this.ParamsRebates();
         });
    
    this._bridge.dwellingInfoParams
         .subscribe((payload: any) => {
           this.myDwellingInfo = payload.data[0];
           this.myDwellingInfo.desableButton = payload.data[1];
           this.ParamsRebates();
           console.log(payload.data[0]);
          });

    this._bridge.heatedCooledParams
        .subscribe((payload: any) => {
            this.myHeatedCooled = payload.data[0];
            this.myHeatedCooled.desableButton = payload.data[1];                
           });

    this._bridge.nominalSizeParams
        .subscribe((payload: any) => {
            this.myNominalSize = payload.data[0];
            this.myNominalSize.desableButton = payload.data[1];
            this.ParamsRebateSystemDesing();
          });

    this._bridge.OrderResultsRebateFinder
        .subscribe((payload: any) => {
            this.myResults = payload.data;
          }); 

    this._bridge.systemDesingParams
        .subscribe((payload: any) => {
            this.mySystemDesing = payload.data[0];
            this.mySystemDesing.desableButton = payload.data[1];
            this.showProducLines = false;
            this.ParamsRebates();
            // temporal
          this.search();
        });

    // from system desing 
    this._bridge.showAllResults
        .subscribe((payload: any) => {
            this.showProducLines = true;
            this.mySystemDesing.desableButton = payload.data;
            console.log(payload.data);
        });

    this._bridge.filters
        .subscribe((payload: any) => {
            this.filters = payload.data;
            this.SendListFilters(this.filters);
        });

    this._bridge.filter
        .subscribe((payload: any) => {
            this.filtesApplied = payload.data;
            this.SendFilterApplied(this.filtesApplied);
        });
    
    this.OrderCards();
  }

  search(){
    let body = {}
    /* this._endPoint.Search(body).subscribe({
      next: (resp) => {
        this.sendResults();
      },
    //   error: (e) => alert(e.error)
    }) */
  }

  SendListFilters(filters: string[]){
    this._bridge.filter.emit({
        data: filters
    })
  }


  ParamsRebateSystemDesing(){
    let payload = this.myNominalSize.coolingTons;
    this._bridge.paramsSystemDesing.emit({
        data: payload
    });
  }  

  ParamsRebates(){

    let payload = {
        'location': {
            'state': this.myLocation.state,
            'utilityProvider': this.myLocation.utilityProviders
        },
        'dwellingInfo': {
            'fuelSource': this.myDwellingInfo.fuelSource,
            'ConstructionType': this.myDwellingInfo.constructionType
        },
        'systemDesign': {
            'outdoor': this.mySystemDesing.outdoor,
            'indoor': this.mySystemDesing.indoor,
            'furnace': this.mySystemDesing.furnace
        }
    }

    this._bridge.paramsRebates.emit({
        data: payload
    })
  }

  sendResults(){
     this._bridge.resultsRebateFinder.emit({
        data: [this.myResults]
      });
  }

  OrderCards(){

    let size = this.myResults.length;
    let slot!: any;
    let tmp!: any;
    let array!: any;
    
    for ( let item = 0; item < size; item++) {
        tmp = this.myResults[item][0].totalAvailableRebates;
        array = this.myResults[item];

        for ( slot = item -1; slot >= 0 && this.myResults[slot][0].totalAvailableRebates > tmp; slot --) {
            this.myResults[slot+1]= this.myResults[slot];
        }
        this.myResults[slot+1] = array;
    }

    this.myResults = this.myResults.reverse();
    
  }

  SendFilterApplied(filtesApplied: string[]){
    this._bridge.filters.emit({
      data: filtesApplied  
    })
  }

}