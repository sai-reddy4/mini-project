import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { AuthenticationGuard } from './authentication.guard';
const routes: Routes = [

{path:'',component:LoginComponent},
{path:'login', component:LoginComponent},
{path:'dashboard',canActivate:[AuthenticationGuard], component:DashboardComponent,children:[
  {path:'projets',component:ProjectsComponent},
  {path:'home',component:HomeComponent},
  {path:'all-employees',component:AllEmployeesComponent},
  {path:'view-employee/:id',component:ViewEmployeeComponent},
  {path:'create-employee',component:CreateEmployeeComponent},
  {path:'edit-employee/:id',component:CreateEmployeeComponent},
]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
