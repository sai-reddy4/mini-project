import { Component } from '@angular/core';
import { AllEmployeesService } from '../all-employees.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {

employees:any="";
id:number=0;

constructor(private _allemployeesService:AllEmployeesService,private _activatedRoute:ActivatedRoute){

  _activatedRoute.params.subscribe(
    (data:any)=>{
      console.log(data.id);

      _allemployeesService.viewemployee(data.id).subscribe(
        (data:any)=>{
          this.employees=data;
          console.log(data);
        }
      )
    }
  )

}
}
