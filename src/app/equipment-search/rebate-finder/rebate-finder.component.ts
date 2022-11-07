import { Component, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service';

import { Location, ListUtilities, DwellingInfo, HeatedCooled, Nominalsize, SystemDesing, indoorUnitTable } from '../models/rebate-finder-inputs';
import { FormGroup } from '@angular/forms';

// prueva
export const RESULTS1 = [ { "id":['25VNA424A003', '25HPB630A003', '24VNA624A003']}];

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
              "id": "24ACB724A003",
              "SKU": "24ACB724A003",
              "name": "Performance 17S 2-STG AC",
              "type": "outdoorUnit"
          },
          {
              "id": "CSPHP3612ALA",
              "SKU": "CSPHP3612ALA",
              "name": "ALUMINUM HORIZ SLAB EVAN COIL PURON 3.0T",
              "type": "indoorUnit"
          },
          {
              "id": "59MN7B080C21--20",
              "SKU": "59MN7B080C21--20",
              "name": "97 AFUE 80k Modulating Comm ECM Furnace",
              "type": "furnace"
          }
      ],
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
              "name": "Horizontal, Upflow",
              "type": "furnaceConfiguration"
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
                "id": "24ACB724A003",
                "SKU": "24ACB724A003",
                "name": "Performance 17S 2-STG AC",
                "type": "outdoorUnit"
            },
            {
                "id": "CSPHP3012ALA",
                "SKU": "CSPHP3012ALA",
                "name": "ALUMINUM HORIZ SLAB EVAN COIL PURON 2.5T",
                "type": "indoorUnit"
            },
            {
                "id": "59MN7B080C21--20",
                "SKU": "59MN7B080C21--20",
                "name": "97 AFUE 80k Modulating Comm ECM Furnace",
                "type": "furnace"
            }
        ],
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
                "name": "Horizontal, Upflow",
                "type": "furnaceConfiguration"
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
              "id": "24ACC630A003",
              "SKU": "24ACC630A003",
              "name": "16 SEER Performance AC, SE & North Only",
              "type": "outdoorUnit"
          },
          {
              "id": "CSPHP4212ALA",
              "SKU": "CSPHP4212ALA",
              "name": "ALUMINUM HORIZ SLAB EVAN COIL PURON 3.5T",
              "type": "indoorUnit"
          },
          {
              "id": "59MN7B080C21--20",
              "SKU": "59MN7B080C21--20",
              "name": "97 AFUE 80k Modulating Comm ECM Furnace",
              "type": "furnace"
          }
      ],
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
              "name": "Horizontal, Upflow",
              "type": "furnaceConfiguration"
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
                "id": "24ACC630A003",
                "SKU": "24ACC630A003",
                "name": "16 SEER Performance AC, SE & North Only",
                "type": "outdoorUnit"
            },
            {
                "id": "CSPHP3612ALA",
                "SKU": "CSPHP3612ALA",
                "name": "ALUMINUM HORIZ SLAB EVAN COIL PURON 3.0T",
                "type": "indoorUnit"
            },
            {
                "id": "59MN7B080C21--20",
                "SKU": "59MN7B080C21--20",
                "name": "97 AFUE 80k Modulating Comm ECM Furnace",
                "type": "furnace"
            }
        ],
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
                "name": "Horizontal, Upflow",
                "type": "furnaceConfiguration"
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
                "id": "24ACC630A003",
                "SKU": "24ACC630A003",
                "name": "16 SEER Performance AC, SE & North Only",
                "type": "outdoorUnit"
            },
            {
                "id": "CSPHP3012ALA",
                "SKU": "CSPHP3012ALA",
                "name": "ALUMINUM HORIZ SLAB EVAN COIL PURON 2.5T",
                "type": "indoorUnit"
            },
            {
                "id": "59MN7B080C21--20",
                "SKU": "59MN7B080C21--20",
                "name": "97 AFUE 80k Modulating Comm ECM Furnace",
                "type": "furnace"
            }
        ],
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
                "name": "Horizontal, Upflow",
                "type": "furnaceConfiguration"
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
              "id": "24ABC624A003",
              "SKU": "24ABC624A003",
              "name": "16 SEER AC, SE & North Only",
              "type": "outdoorUnit"
          },
          {
              "id": "CSPHP3612ALA",
              "SKU": "CSPHP3612ALA",
              "name": "ALUMINUM HORIZ SLAB EVAN COIL PURON 3.0T",
              "type": "indoorUnit"
          },
          {
              "id": "59MN7B080C21--20",
              "SKU": "59MN7B080C21--20",
              "name": "97 AFUE 80k Modulating Comm ECM Furnace",
              "type": "furnace"
          }
      ],
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
              "name": "Horizontal, Upflow",
              "type": "furnaceConfiguration"
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
                "id": "24ABC624A003",
                "SKU": "24ABC624A003",
                "name": "16 SEER AC, SE & North Only",
                "type": "outdoorUnit"
            },
            {
                "id": "CSPHP3012ALA",
                "SKU": "CSPHP3012ALA",
                "name": "ALUMINUM HORIZ SLAB EVAN COIL PURON 2.5T",
                "type": "indoorUnit"
            },
            {
                "id": "59MN7B080C21--20",
                "SKU": "59MN7B080C21--20",
                "name": "97 AFUE 80k Modulating Comm ECM Furnace",
                "type": "furnace"
            }
        ],
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
                "name": "Horizontal, Upflow",
                "type": "furnaceConfiguration"
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
                "id": "24ABC624A003",
                "SKU": "24ABC624A003",
                "name": "16 SEER AC, SE & North Only",
                "type": "outdoorUnit"
            },
            {
                "id": "CSPHP2412ALA",
                "SKU": "CSPHP2412ALA",
                "name": "ALUMINUM HORIZ SLAB EVAN COIL PURON 2.0T",
                "type": "indoorUnit"
            },
            {
                "id": "59MN7B080C21--20",
                "SKU": "59MN7B080C21--20",
                "name": "97 AFUE 80k Modulating Comm ECM Furnace",
                "type": "furnace"
            }
        ],
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
                "name": "Horizontal, Upflow",
                "type": "furnaceConfiguration"
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
                "id": "24ABC624A003",
                "SKU": "24ABC624A003",
                "name": "16 SEER AC, SE & North Only",
                "type": "outdoorUnit"
            },
            {
                "id": "CNPVP3621ALA",
                "SKU": "CNPVP3621ALA",
                "name": "CASED VERT N-ALUM",
                "type": "indoorUnit"
            },
            {
                "id": "59MN7B080C21--20",
                "SKU": "59MN7B080C21--20",
                "name": "97 AFUE 80k Modulating Comm ECM Furnace",
                "type": "furnace"
            }
        ],
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
                "name": "Horizontal, Upflow",
                "type": "furnaceConfiguration"
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
// prueva

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

  showProducLines!: boolean;


  outdoorGroup !: FormGroup;
//   myResults: any[] = RESULTS1;
  myResults: any[][] = [];
  master = 'Master';
  // prueva

  constructor(
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this._bridge.sentLocationParams
        .subscribe((payload: any) => {
          this.myLocation = payload.data[0];
          this.myLocation.desableButton = payload.data[1];
          this.sendResults();
         });
    
    this._bridge.dwellingInfoParams
         .subscribe((payload: any) => {
           this.myDwellingInfo = payload.data[0];
           this.myDwellingInfo.desableButton = payload.data[1];                   
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
            this.myNominalSize = payload.data[0];
            this.myNominalSize.desableButton = payload.data[1];
          }); 

    this._bridge.systemDesingParams
        .subscribe((payload: any) => {
            this.mySystemDesing = payload.data[0];
            this.mySystemDesing.desableButton = payload.data[1];
        });

    // from system desing 
    this._bridge.showAllResults
        .subscribe((payload: any) => {
            this.showProducLines = payload.data;
        });
    
  }


  ParamsRebateSystemDesing(){
    let payload = this.myNominalSize.coolingTons;
    this._bridge.paramsSystemDesing.emit({
        data: payload
    });
  }  

  sendResults(){
    this.myResults= RESULTS2;
     /* sent the info to results-rebate */
     this._bridge.resultsRebateFinder.emit({
        data: [this.myResults]
      });
  }

}