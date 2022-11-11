import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// url endpoint
import {URL_SERVICIOS}  from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class EndPointsService {

  constructor(
      private _http: HttpClient
    ) { }

    ProductLines(body: any): Observable<any> {

      let url = URL_SERVICIOS + '/product-lines'; 
  
      return this._http.post(url, body);
    }

    Filters(body: any): Observable<any> {

      let url = URL_SERVICIOS + '/filters'; 
  
      return this._http.post(url, body);
    }

    AvailableRebates(body: any): Observable<any> {

      let url = URL_SERVICIOS + '/available-rebates'; 
  
      return this._http.post(url, body);
    }

  ElegibilityQuestions(body: any): Observable<any> {

    let url = URL_SERVICIOS + '/eligibility-criteria' 

    return this._http.post(url, body);
  }

  Search(body: any): Observable<any> {

    let url = URL_SERVICIOS + '/search-equipment'; 
    let mybody = [ 
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
                  "title": "Performance 17S 2-STG AC",
                  "componentType": "outdoorUnit"
              },
              {
                  "description": "",
                  "title": "ALUMINUM HORIZ SLAB EVAN COIL PURON 3.0T",
                  "componentType": "indoorUnit"
              },
              {
                  "description": "",
                  "title": "97 AFUE 80k Modulating Comm ECM Furnace",
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
                    "title": "Performance 17S 2-STG AC",
                    "componentType": "outdoorUnit"
                },
                {  
                    "description": "",
                    "title": "ALUMINUM HORIZ SLAB EVAN COIL PURON 2.5T",
                    "componentType": "indoorUnit"
                },
                {
                    "description": "",
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
                  "title": "16 SEER Performance AC, SE & North Only",
                  "componentType": "outdoorUnit"
              },
              {
                  "description": "",
                  "title": "ALUMINUM HORIZ SLAB EVAN COIL PURON 3.5T",
                  "componentType": "indoorUnit"
              },
              {
                  "description": "",
                  "title": "97 AFUE 80k Modulating Comm ECM Furnace",
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
                    "title": "16 SEER Performance AC, SE & North Only",
                    "componentType": "outdoorUnit"
                },
                {
                    "description": "",
                    "title": "ALUMINUM HORIZ SLAB EVAN COIL PURON 3.0T",
                    "componentType": "indoorUnit"
                },
                {
                    "description": "",
                    "title": "97 AFUE 80k Modulating Comm ECM Furnace",
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
                    "title": "16 SEER Performance AC, SE & North Only",
                    "componentType": "outdoorUnit"
                },
                {
                    "description": "",
                    "title": "ALUMINUM HORIZ SLAB EVAN COIL PURON 2.5T",
                    "componentType": "indoorUnit"
                },
                {
                    "description": "",
                    "title": "97 AFUE 80k Modulating Comm ECM Furnace",
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
                  "title": "16 SEER AC, SE & North Only",
                  "componentType": "outdoorUnit"
              },
              {
                  "description": "",
                  "title": "ALUMINUM HORIZ SLAB EVAN COIL PURON 3.0T",
                  "componentType": "indoorUnit"
              },
              {
                  "description": "",
                  "title": "97 AFUE 80k Modulating Comm ECM Furnace",
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
                    "title": "16 SEER AC, SE & North Only",
                    "componentType": "outdoorUnit"
                },
                {
                    "description": "",
                    "title": "ALUMINUM HORIZ SLAB EVAN COIL PURON 2.5T",
                    "componentType": "indoorUnit"
                },
                {
                    "description": "",
                    "title": "97 AFUE 80k Modulating Comm ECM Furnace",
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
                    "title": "16 SEER AC, SE & North Only",
                    "componentType": "outdoorUnit"
                },
                {
                    "description": "",
                    "title": "ALUMINUM HORIZ SLAB EVAN COIL PURON 2.0T",
                    "componentType": "indoorUnit"
                },
                {
                    "description": "",
                    "title": "97 AFUE 80k Modulating Comm ECM Furnace",
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
                    "title": "16 SEER AC, SE & North Only",
                    "componentType": "outdoorUnit"
                },
                {
                    "description": "",
                    "title": "CASED VERT N-ALUM",
                    "componentType": "indoorUnit"
                },
                {
                    "description": "",
                    "title": "97 AFUE 80k Modulating Comm ECM Furnace",
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

    return this._http.post(url, body);
  }

  Utilities(state: any){

    let url = URL_SERVICIOS + '/utility-providers?country=US&state='+ state;
    let body = [
      {
          "title": "Berkshire Gas",
          "fossilFuel": true,
          "state": [ "MA" ],
          "description": "",
          "electricity": false,
          "utilityProviderId": 1
      },
      {
          "title": "Cape Light Compact",
          "fossilFuel": false,
          "state": [ "MA" ],
          "description": "",
          "electricity": true,
          "utilityProviderId": 2
      },
      {
          "title": "Eversource",
          "fossilFuel": true,
          "state": [ "CT","MA","NH" ],
          "description": "",
          "electricity": true,
          "utilityProviderId": 3
      },
      {
          "title": "Liberty",
          "fossilFuel": true,
          "state": [ "AR","CA","GA","IL","IA","MA","KS","MO","NH","NY","OK" ],
          "description": "",
          "electricity": true,
          "utilityProviderId": 4
      },
      {
          "title": "National Grid",
          "fossilFuel": true,
          "state": [ "MA","NY" ],
          "description": "",
          "electricity": true,
          "utilityProviderId": 5
      },
      {
          "title": "Unitil",
          "fossilFuel": true,
          "state": [ "MA","ME","NH" ],
          "description": "",
          "electricity": true,
          "utilityProviderId": 6
      },
      {
          "title": "Marblehead Municipal Light Department",
          "fossilFuel": false,
          "state": [ "MA" ],
          "description": "",
          "electricity": true,
          "utilityProviderId": 7
      },
      {
          "title": "New Hampshire Electric Coop",
          "fossilFuel": false,
          "state": [ "NH" ],
          "description": "",
          "electricity": true,
          "utilityProviderId": 8
      },
      {
          "title": "Rhode Island Energy",
          "fossilFuel": true,
          "state": [ "RI" ],
          "description": "",
          "electricity": true,
          "utilityProviderId": 9
      },
      {
          "title": "AEP Texas Central Company",
          "fossilFuel": false,
          "state": ["TX"],
          "description": "",
          "electricity": true,
          "utilityProviderId": 10
      },
      {
          "title": "Agralite Electric Coop",
          "fossilFuel": false,
          "state": ["MN"],
          "description": "",
          "electricity": true,
          "utilityProviderId": 11
      },
      {
          "title": "Alexandria Light and Power",
          "fossilFuel": false,
          "state": ["MN"],
          "description": "",
          "electricity": true,
          "utilityProviderId": 12
      },
      {
          "title": "Alger-Delta Coop Electric Assn",
          "fossilFuel": false,
          "state": ["MI"],
          "description": "",
          "electricity": true,
          "utilityProviderId": 13
      },
      {
          "title": "Algoma Utility Comm",
          "fossilFuel": false,
          "state": ["WI"],
          "description": "",
          "electricity": true,
          "utilityProviderId": 14
      }
  
  ];

    return this._http.get(url);
    
  }

  ModelNrs(body: any){
    let url = URL_SERVICIOS + '/model-nrs'; 

    return this._http.post(url, body);
  }

}