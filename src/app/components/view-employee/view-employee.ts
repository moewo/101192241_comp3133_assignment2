import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './view-employee.html',
  styleUrl: './view-employee.scss',
})
export class ViewEmployee implements OnInit {
  employee: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe({
        next: (result) => {
          this.employee = result.data.getEmployeeById;
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/employees']);
  }

  onEdit() {
    this.router.navigate(['/update-employee', this.employee.id]);
  }
}
