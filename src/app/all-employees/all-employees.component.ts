import { Component } from '@angular/core';
import { AllEmployeesService } from '../all-employees.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent {

employees: any=[];
column: any;
order: any;
address:any;


constructor( private _allemployee:AllEmployeesService){

  this.pageload();
}

pageload(){
  this._allemployee.getemployees().subscribe(
    (data:any)=>{
      console.log(data);
      this.employees=data;
    }
  )

}

delete(id:number){
  if(confirm('are you conform')==true){
    this._allemployee.deleteemployee(id).subscribe(
      (data:any)=>{
        console.log(data);
        alert('deleted');
        this.pageload();
      },(err:any)=>{
        alert('error')
      }
    )
  }else{
    alert("you are cancelled");
  }
}


sort(){
  this._allemployee.sortemployee(this.column,this.order).subscribe(
    (data:any)=>{
      this.employees=data;
      console.log(this.employees);

    },(err:any)=>{
      alert('error');
    }
  )
  
}

text:any="";

filter(){
  this._allemployee.filteremployee(this.text).subscribe(
    (data:any)=>{
      this.employees=data;
      console.log(this.employees);

    },(err:any)=>{
      alert('error');
    }
  )

}

limit:any="";
page:any="";

pagination(){
  this._allemployee.pageemployee(this.limit,this.page).subscribe(
    (data:any)=>{
      this.employees=data;
      console.log(this.employees);
    },(err:any)=>{
      alert('eroor');
    }

  )
}

}
