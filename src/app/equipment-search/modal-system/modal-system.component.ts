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

      energyDistribution: ['', Validators.required],   
      msUnitType: [null, Validators.required],
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
    console.log('aquí...');
    console.log(this.systemForm.get('unitType')!.value);
    console.log(this.systemForm.get('systemType')!.value);
    console.log(this.systemForm.get('HVACType')!.value);
    
  }

}


