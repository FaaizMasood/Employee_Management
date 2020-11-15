import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicefileService {
  readonly APIURL = 'https://localhost:5001/api';
  readonly PhotoUrl = 'https://localhost:5001/Photos';

  constructor(private http: HttpClient) {}

  // get departmen List
  // --observables are an interface to handle a variety of common asynchronous operations.
  getDepList(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/department');
  }

  //
  addDepartment(val: any) {
    return this.http.post(this.APIURL + '/department', val);
  }

  updateDepartment(val: any) {
    return this.http.put(this.APIURL + '/department', val);
  }

  deleteDepartment(val: any) {
    return this.http.delete(this.APIURL + '/department/' + val);
  }

  //--------------------------------------------------------------//

  getEmpList(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/employee');
  }

  addEmployee(val: any) {
    return this.http.post(this.APIURL + '/employee', val);
  }

  updateEmployee(val: any) {
    return this.http.put(this.APIURL + '/employee', val);
  }

  deleteEmployee(val: any) {
    return this.http.delete(this.APIURL + '/employee/' + val);
  }

  //--------------------------------------------------------------//

  UploadPhoto(val: any) {
    return this.http.post(this.APIURL + '/Employee/SaveFile/', val);
  }

  getAllDepNames(): Observable<any[]> {
    return this.http.get<any[]>(
      this.APIURL + '/Employee/GetAllDepartmentNames'
    );
  }
}
