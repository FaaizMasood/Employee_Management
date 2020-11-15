import { Component, OnInit, Input } from '@angular/core';
import { ServicefileService } from 'src/app/servicefile.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
})
export class AddEditEmpComponent implements OnInit {
  constructor(private service: ServicefileService) {}

  @Input() emp: any;
  DepartmentId: string;
  EmployeeName: string;
  Department: string;
  DateOfJoining: string;
  PhotoFileName: string;
  PhotoFilePath: string;

  // for drop down window
  DepartmentList: any[];

  ngOnInit(): void {
    //console.log(this.service.getAllDepNames());
    this.loadDepartmentList();
  }

  loadDepartmentList() {
    this.service.getAllDepNames().subscribe((data: any) => {
      this.DepartmentList = data;

      this.DepartmentId = this.emp.DepartmentId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }

  addEmployee() {
    var val = {
      DepartmentId: this.DepartmentId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };
    this.service.addEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = {
      DepartmentId: this.DepartmentId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };
    this.service.updateEmployee(val).subscribe((res) => {
      alert(res.toString());
      console.log(this.EmployeeName);
    });
  }

  uploadPhoto(event) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
    console.log(file);
  }
}
