import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

import { Result } from '../../models/results';
import { TableComponent } from '../table/table.component';

import { EndPointsService }  from '../../services/endPoints.service';
import { bridgeService }  from '../../services/bridge.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() myResults!: any[];
  @Input('master') masterName = '';

  card!: any;
  outdoors: string[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _endPoint: EndPointsService,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    // provicional
    this.ParsingResult(this.myResults);
  }

  // verificar que funcione
  VerifyParamsComplete(params: any){
    let haveValueNull!:boolean; 

    for (let key in params) {
        let element = params[key];
        haveValueNull = Object.values(element).some(x => x === null);
    }

    if (haveValueNull == false){
      this.Search();
    }

  }

  PreparetoGetResults(){

    let body = {
      'commerceInfo': '',
      'nominalSize': '',
      'fuelSource': '',
      'levelOneSystemTypeId': '',
      'levelTwoSystemTypeId': '',
      'sizingConstraint': '',
      'filters': '',
      'availableRebates':'' 
    }

    return body
  }

  Search(){

    /* this._endPoint.Search(this.PreparetoGetResults()).subscribe({
      next: (resp) => {
        this.ParsingResult(resp);
      },
      error: (e) => alert(e.error)
    }) */

  }

  ParsingResult(results: any[]){

    let options=  this.ParsingOptions(results);
    let Firstcombination = this.getFirstCombinationsData(results);

    this.card = {
      outdoorUnit: Firstcombination[1],
      properties: Firstcombination[0],
      allOptions: options,
      bestOption: ''
    }

    console.log(this.card);
  }

  getFirstCombinationsData(results: any[]): any[]{

    let myResults: Result[] = results;  // for extract the properties
    let interimStructure: object = {};
    let prepareOutdoor!: any;
    let myOutdoor!: string;

    // extract all the properties without outdoor unit
    first: for (let i = 0; i < myResults.length; i++) {
      if (i == 0){
        let {EER, AFUE, HSPF, SEER, Hcap17, Hcap47, fuelTypes, AHRIReferences, availableRebates, furnaceInputBTUH, furnaceOutputBTUH, configurationOptions, coolingCapacityRated, furnaceConfigurations, totalAvailableRebates, components} = myResults[i];

        interimStructure = {
          EER: EER,
          AFUE: AFUE,
          HSPF: HSPF,
          SEER: SEER,
          Hcap17: Hcap17,
          Hcap47: Hcap47,
          fuelTypes: fuelTypes,
          AHRIReferences: AHRIReferences,
          availableRebates: availableRebates,
          furnaceInputBTUH: furnaceInputBTUH,
          furnaceOutputBTUH: furnaceOutputBTUH,
          configurationOptions: configurationOptions,
          coolingCapacityRated: coolingCapacityRated,
          furnaceConfigurations: furnaceConfigurations,
          totalAvailableRebates: totalAvailableRebates
        }

        prepareOutdoor = components;
        break first; 
      }
    }

    // extract the outdoor unit
    for (const iPO of prepareOutdoor) {
      if (iPO.type == 'outdoorUnit'){
        myOutdoor = iPO.id;
      }
    }

    return [interimStructure, myOutdoor]

  } 

  ParsingOptions(results: any[]): object[] {
    let rawOptions: any[] = []; // all the options
    let typeOptions: string[] = []; // type of options
    let cleanOptions: any[] = [];
    
    // select indoors and furnace options
    for (let iR of results) {
      for (let iC of iR.components) {
        if (iC.type != 'outdoorUnit'){
          rawOptions.push(iC);
          typeOptions.push(iC.type);
        }
      }
    }

    // delete duplicate elements 
    let myTypeOptions = new Set (typeOptions);

    // separating indoors from furnace
    myTypeOptions.forEach(type => {
      let myRawOptions = JSON.stringify(rawOptions);
      let a = this.selectOptions(type, myRawOptions);
      cleanOptions.push(a);
    });

    return cleanOptions;
  }


  selectOptions(typeUnit: string, rawOptions: string): object{ 
    let myRawOptions = JSON.parse(rawOptions); // all the options
    let options: string[] = []; // id options by typeUnit
    
    for (let iRO of myRawOptions) {
      if (typeUnit == iRO.type){
        options.push(iRO.id);
      }
    }

    // delete duplicate elements
    let myOptions = new Set(options);

    let optionsByType = {
      nameOption: typeUnit,
      options: myOptions
    }

    return optionsByType; 
    
  }

  // open view in table 
  openDialog() {

    this.dialogRef.open(TableComponent, {
      data: 'esto es provicional'
    });
  }

}
