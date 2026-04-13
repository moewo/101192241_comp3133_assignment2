import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeService } from '../../services/employee';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList implements OnInit {
  employees: any[] = [];
  displayedColumns: string[] = [
    'photo',
    'first_name',
    'last_name',
    'email',
    'department',
    'designation',
    'actions',
  ];
  searchDepartment = '';
  searchPosition = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (result) => {
        this.employees = result.data.getAllEmployees;
      },
      error: () => {
        this.snackBar.open('Failed to load employees.', 'Close', { duration: 3000 });
      },
    });
  }

  onSearch() {
    if (!this.searchDepartment && !this.searchPosition) {
      this.loadEmployees();
      return;
    }
    this.employeeService
      .searchEmployees(this.searchDepartment, this.searchPosition)
      .subscribe({
        next: (result) => {
          this.employees = result.data.searchEmployeeByDeptOrPosition;
        },
        error: () => {
          this.snackBar.open('Search failed.', 'Close', { duration: 3000 });
        },
      });
  }

  clearSearch() {
    this.searchDepartment = '';
    this.searchPosition = '';
    this.loadEmployees();
  }

  onView(id: string) {
    this.router.navigate(['/view-employee', id]);
  }

  onUpdate(id: string) {
    this.router.navigate(['/update-employee', id]);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.snackBar.open('Employee deleted.', 'Close', { duration: 3000 });
          this.loadEmployees();
        },
        error: () => {
          this.snackBar.open('Delete failed.', 'Close', { duration: 3000 });
        },
      });
    }
  }

  onAdd() {
    this.router.navigate(['/add-employee']);
  }

  onLogout() {
    this.authService.logout();
  }
}
