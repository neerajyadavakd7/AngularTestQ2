import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http : HttpClient) { }

  private url = "https://reqres.in/api/users?page=";
  public getEmployeeList(index : number)
  {
    return this.http.get(this.url+ index);
  }

}
