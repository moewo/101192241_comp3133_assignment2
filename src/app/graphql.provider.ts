import { ApplicationConfig } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { inject } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';

const uri = 'http://backend:5001/graphql';

export const graphqlProvider: ApplicationConfig['providers'] = [
  provideApollo(() => {
    const httpLink = inject(HttpLink);
    return {
      link: httpLink.create({ uri }),
      cache: new InMemoryCache(),
    };
  }),
];
