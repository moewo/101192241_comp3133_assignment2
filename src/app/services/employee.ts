import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_ALL_EMPLOYEES = gql`
  query {
    getAllEmployees {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String!
    $designation: String!
    $salary: Float!
    $date_of_joining: String!
    $department: String!
    $employee_photo: String
  ) {
    addEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
      employee_photo: $employee_photo
    ) {
      id
      first_name
      last_name
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
    $gender: String
    $designation: String
    $salary: Float
    $date_of_joining: String
    $department: String
    $employee_photo: String
  ) {
    updateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
      employee_photo: $employee_photo
    ) {
      id
      first_name
      last_name
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($department: String, $position: String) {
    searchEmployeeByDeptOrPosition(department: $department, position: $position) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployees() {
    return this.apollo.query<any>({
      query: GET_ALL_EMPLOYEES,
      fetchPolicy: 'network-only',
    });
  }

  getEmployeeById(id: string) {
    return this.apollo.query<any>({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id },
      fetchPolicy: 'network-only',
    });
  }

  addEmployee(employee: any) {
    return this.apollo.mutate<any>({
      mutation: ADD_EMPLOYEE,
      variables: employee,
    });
  }

  updateEmployee(employee: any) {
    return this.apollo.mutate<any>({
      mutation: UPDATE_EMPLOYEE,
      variables: employee,
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate<any>({
      mutation: DELETE_EMPLOYEE,
      variables: { id },
    });
  }

  searchEmployees(department: string, position: string) {
    return this.apollo.query<any>({
      query: SEARCH_EMPLOYEES,
      variables: { department, position },
      fetchPolicy: 'network-only',
    });
  }
}
