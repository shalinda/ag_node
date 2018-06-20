// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   templateUrl: 'employee.component.html'
// })
// export class EmployeeComponent {

//   constructor(private router: Router) { }

//   isCollapsed: boolean = false;
//   iconCollapse: string = "icon-arrow-up";

//   collapsed(event: any): void {
//     // console.log(event);
//   }

//   expanded(event: any): void {
//     // console.log(event);
//   }

//   toggleCollapse(): void {
//     this.isCollapsed = !this.isCollapsed;
//     this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
//   }
  
//   save() {
//     this.router.navigateByUrl('/base/employees')  
//   }

//   cancel() {
//     this.router.navigateByUrl('/base/employees')  
//   }

// }

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { EmpType } from '../../model/empType';
import { EmpTypeService } from '../../service/empType.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  // templateUrl: './employee-detail.component.html',
  // styleUrls: ['./employee-detail.component.css']
  templateUrl: './employee.component.html'
})

export class EmployeeComponent implements OnInit {
  // registerForm: FormGroup;
  @Input() employee: Employee
  empTypes: EmpType[]
  
  // @Input() show: boolean
  // @Output() showParent = new EventEmitter()

  constructor(private router: Router, private employeeService: EmployeeService, private empTypeService: EmpTypeService) { }
  //private formBuilder: FormBuilder, 
  onSubmit() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.employee))
    this.save()
  }

  ngOnInit() {    
    // this.registerForm = this.formBuilder.group({
    //   name : ['', Validators.required],
    //   age: ['', Validators.required],
    //   sal: ['', [Validators.required]]      
    // });    
    // var id = this.route.snapshot.paramMap.get('id')    
    
    // if (id != null) 
    // this.getEmployee(id)
    // console.debug('init')
    // else
    //   this.employee = new Employee
    // var empTypesMap: {}
    this.empTypeService.getEmpTypes().subscribe((empTypes) => {
      this.empTypes = empTypes
      // this.empTypes.forEach(element => {
      //   empTypesMap[element.handle] = element.name                
      // })
      // this.employee = new Employee       
      // this.employee.empType = this.empTypes[0]              
    })
  }


  save(): void {        
    console.debug(this.employee)    
    if (this.employee._id == null) {
      this.employeeService.addEmployee(this.employee).subscribe()
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe()
    // this.showParent.emit(true)
    }
  }

  update(): void {        
    console.debug(this.employee)
    this.employeeService.updateEmployee(this.employee).subscribe()
    // this.showParent.emit(true)
  }


  delete(): void {    
    this.employeeService.deleteEmployee(this.employee).subscribe()
    // this.showParent.emit(true)
  }

  getEmployee(name: String): void {
    this.employeeService.getEmployee(name).subscribe(employee => this.employee = employee)    
    console.debug('1', this.employee)
  }

  clear(): void {
    this.employee = new Employee()
  }

  cancel(): void {
    //this.router.navigateByUrl('/base/employees')
    // this.showParent.emit(true)
  }
}
