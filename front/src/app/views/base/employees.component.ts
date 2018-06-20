import { Component, OnInit, Input} from '@angular/core';
import { Employee } from '../../model/employee';
// import { EmpType } from '../../model/empType';
import { Router } from '@angular/router';
import { EmployeeService }  from '../../service/employee.service';
// import { EmpTypeService }  from '../../service/empType.service';

@Component({
    templateUrl: 'employees.component.html'
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css']
})

export class EmployeesComponent implements OnInit {
  @Input() employee: Employee
  employees: Employee[]
  // empTypes: EmpType[]
  selectedEmployee: Employee
//   @Input() show: boolean

  // private empTypeService: EmpTypeService
  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.showParent()
    this.selectedEmployee = new Employee    
  }

  onClick(employee: Employee) {
    this.selectedEmployee = employee    
    // console.debug(employee)  
    // this.router.navigateByUrl('/base/employee/' + employee.name)
  }

  new1(): void {
    this.employee = new Employee
    // this.employee.empType = this.empTypes[0].handle
    this.selectedEmployee = this.employee
    // this.show = false
  }  

  save(): void {    
    console.debug(this.employee)
    this.employeeService.addEmployee(this.employee).subscribe()
  }

  getEmployee(name: String): void {    
    this.employeeService.getEmployee(name).subscribe(employee=> this.employee = employee)
  }

  getEmployees(): void {    
    this.employeeService.getEmployees().subscribe(employees=> this.employees = employees)
  }

  clear(): void {    
    this.employee = new Employee
  }

  showParent() {
    this.employee = new Employee   
    // this.show = true 
    // this.empTypeService.getEmpTypes().subscribe(empTypes => this.empTypes = empTypes)
    this.getEmployees()
  }
}
