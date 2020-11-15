import { Component, OnInit } from '@angular/core';
import { ServicefileService } from 'src/app/servicefile.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css'],
})
export class ShowDepComponent implements OnInit {
  constructor(private service: ServicefileService) {}

  // valiable to store the list of department
  DepartmentList: any[];
  ActivateAddEditDepComp: boolean = false;
  ModalTitle: string;
  dep: any;

  // this method is the first one to get called when we are in this component so we need to call our methods to
  // perform task in this specific method first
  ngOnInit(): void {
    this.DepList();
  }

  // get data from the API method
  DepList() {
    this.service.getDepList().subscribe((data) => {
      this.DepartmentList = data;
      console.log(data[0]);
    });
  }

  addClick() {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: '',
    };
    this.ModalTitle = 'Add Department';
    this.ActivateAddEditDepComp = true;
  }

  editClick(item) {
    this.dep = item;
    this.ModalTitle = 'Edit Department';
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item) {
    if (confirm('Are you positive????')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe((data) => {
        alert(data.toString());
        console.log(data);
        this.DepList();
      });
    }
  }

  closeClick() {
    this.ActivateAddEditDepComp = false;
    this.DepList();
  }
}
