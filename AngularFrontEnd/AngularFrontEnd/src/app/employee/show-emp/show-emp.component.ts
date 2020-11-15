import { Component, OnInit } from '@angular/core';
import { ServicefileService } from 'src/app/servicefile.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  constructor(private service: ServicefileService) {}

  // valiable to store the list of department
  EmployeeList: any[];
  ActivateAddEditEmpComp: boolean = false;
  ModalTitle: string;
  emp: any;

  // this method is the first one to get called when we are in this component so we need to call our methods to
  // perform task in this specific method first
  ngOnInit(): void {
    this.EmpList();
  }

  // get data from the API method
  EmpList() {
    this.service.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
      //console.log(data[0]);
    });
  }

  addClick() {
    this.emp = {
      DepartmentId: 0,
      EmployeeName: '',
      Department: '',
      DateOfjoining: '',
      PhotoFileName: 'anon.png',
    };
    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item) {
    this.emp = item;
    this.ModalTitle = 'Edit Department';
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item) {
    if (confirm('Are you positive????')) {
      this.service.deleteEmployee(item.DepartmentId).subscribe((data) => {
        alert(data.toString());
        //console.log(data);
        this.EmpList();
      });
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.EmpList();
  }
}
