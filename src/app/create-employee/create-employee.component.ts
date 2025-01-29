import { Component } from '@angular/core';
import { AllEmployeesService } from '../all-employees.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

id: any;
type:any;
// detailsFormArray: any;




constructor(private _allemployeesService:AllEmployeesService, private _activateRoute:ActivatedRoute, private _router:Router){

  _activateRoute.params.subscribe(
    (data:any)=>{
      console.log(data.id);
      this.id=data.id;



      _allemployeesService.viewemployee(data.id).subscribe(
        (data:any)=>{
          console.log(data);

          this.empForm.patchValue(data);
        }
      )
    }

    
  )
  this.empForm.get('type')?.valueChanges.subscribe(
    (data:any)=>{
      if(data=='remote'){
        this.empForm.addControl('wifibill',new FormControl());
        this.empForm.removeControl('transbill')
      }
      else{
        this.empForm.addControl('transbill',new FormControl());
        this.empForm.removeControl('wifibill');
      }
    }
  )
}

public empForm:FormGroup=new FormGroup(
  {name:new FormControl(),
  company:new FormControl(),
  role:new FormControl(),
  package:new FormControl(),
  email:new FormControl(),
  dob:new FormControl(),

       address: new FormGroup({
        addressLine:new FormControl(),
        city:new FormControl(),
        state:new FormControl(),
        pincode:new FormControl(),
       }),
     
     
       type:new FormControl(),
       details:new FormArray([]),
}
);

get detailsFormArray(){
  return this.empForm.get('details') as FormArray
}

moredetails(){
  this.detailsFormArray.push(
    new FormGroup({
      hike:new FormControl(),
      workMode:new FormControl(),
      travelBill:new FormControl(),

    })
  )
}

delete(i:number){

  this.detailsFormArray.removeAt(i);
}



submit(){
  //update

  if(this.id){
    console.log(this.id,this.empForm.value);
    this._allemployeesService.editemployee(this.id,this.empForm.value).subscribe(
      (data:any)=>{
        console.log(data.id);

        alert('updated');
          this._router.navigateByUrl('/dashboard/all-employees');
       },(err:any)=>{
        alert('error')
       }

    )

  }

  //create
  else{
    console.log(this.empForm.value);
    this._allemployeesService.createemployee(this.empForm.value).subscribe(
      (data:any)=>{
        console.log(data);
        alert('created')
        this._router.navigateByUrl('/dashboard/all-employees');
      },
    )
  }(err:any)=>{
    alert('error');
  }
}

}
