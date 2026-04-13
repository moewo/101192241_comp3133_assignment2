import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { EmployeeList } from './components/employee-list/employee-list';
import { AddEmployee } from './components/add-employee/add-employee';
import { ViewEmployee } from './components/view-employee/view-employee';
import { UpdateEmployee } from './components/update-employee/update-employee';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'employees', component: EmployeeList },
  { path: 'add-employee', component: AddEmployee },
  { path: 'view-employee/:id', component: ViewEmployee },
  { path: 'update-employee/:id', component: UpdateEmployee },
];
