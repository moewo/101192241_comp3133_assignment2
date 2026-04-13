import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './update-employee.html',
  styleUrl: './update-employee.scss',
})
export class UpdateEmployee implements OnInit {
  employee: any = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: null,
    date_of_joining: '',
    department: '',
    employee_photo: '',
  };
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe({
        next: (result) => {
          const emp = result.data.getEmployeeById;
          this.employee = {
            id: emp.id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            gender: emp.gender,
            designation: emp.designation,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining,
            department: emp.department,
            employee_photo: emp.employee_photo || '',
          };
        },
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.employee.employee_photo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdate() {
    if (
      !this.employee.first_name ||
      !this.employee.last_name ||
      !this.employee.email
    ) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.employeeService.updateEmployee({
      ...this.employee,
      salary: parseFloat(this.employee.salary)
    }).subscribe({
      next: () => {
        this.snackBar.open('Employee updated!', 'Close', { duration: 3000 });
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Update failed.';
      },
    });
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }
}
