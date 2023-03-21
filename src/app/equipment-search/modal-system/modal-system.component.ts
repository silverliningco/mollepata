import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SystemDesign } from '../interfaces/equipment-search.interface'


@Component({
  selector: 'app-modal-system',
  templateUrl: './modal-system.component.html',
  styleUrls: ['./modal-system.component.css']
})
export class ModalSystemComponent implements OnInit {  

  actionBtn: string = "Save"    
  systemForm !: FormGroup;  

  //myData: SystemDesign = Array<any>[];
  constructor(private formBuilder : FormBuilder,@Inject(MAT_DIALOG_DATA) public editData: any,private dialogRef: MatDialogRef<ModalSystemComponent>) { }

  ngOnInit(): void {
    this.systemForm = this.formBuilder.group({
      unitType: [null, Validators.required],
      systemType: [null, Validators.required],
      HVACType: [null, Validators.required],

      energyDistribution: [null, Validators.required],   
      msIndoorUnitStyle: [null, Validators.required],
      coolingCapacity: [null, Validators.required],
      quantity: [null, Validators.required],       
    });

   

    //console.log(this.editData);
    /*if(this.editData) {
      this.actionBtn = "Update"
      this.systemForm.controls['unitType'].setValue(this.editData.title);
      this.systemForm.controls['systemType'].setValue(this.editData.description);
      this.systemForm.controls['HVACType'].setValue(this.editData.link);     
    }*/
  }

  addEditSystem() {

    // Exclude empty fields on form submit.
    let myFormValue = { ...this.systemForm.value };

    for (let prop in myFormValue) {
      if (!myFormValue[prop]) {
        delete myFormValue[prop];
      }
    }

    console.log(myFormValue);
  
  }

}


