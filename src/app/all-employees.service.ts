import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllEmployeesService {

  empUrl:string="https://6572df5d192318b7db412dfe.mockapi.io/employees"

  constructor(private _httpClient:HttpClient) { }

  getemployees(){
    return this. _httpClient.get(this.empUrl);
  }

  deleteemployee(id:number):Observable<any>{
    return this._httpClient.delete(this.empUrl+"/"+id);

  }
  sortemployee(column:string,order:string){
    return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees?sortBy="+column+"&order="+order);
  }

  filteremployee(text:any):Observable<any>{
    return this._httpClient.get(this.empUrl+"?filter="+text)
  }

  pageemployee(limit:any,page:any):Observable<any>{
    return this._httpClient.get(this.empUrl + "?limit=" + limit + "&page=" + page);
  }

  viewemployee(id:number):Observable<any>{
    return this._httpClient.get(this.empUrl+"/"+id);
  }
  createemployee(data:any){
    return this._httpClient.post(this.empUrl,data);
  }
  editemployee(data:any,id:number){
    return this._httpClient.put(this.empUrl+"/"+data,id);
  }
}
