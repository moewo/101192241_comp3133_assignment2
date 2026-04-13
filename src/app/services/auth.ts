import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const SIGNUP = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo, private router: Router) {}

  login(username: string, password: string) {
    return this.apollo.query<any>({
      query: LOGIN,
      variables: { username, password },
      fetchPolicy: 'network-only',
    });
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate<any>({
      mutation: SIGNUP,
      variables: { username, email, password },
    });
  }

  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
