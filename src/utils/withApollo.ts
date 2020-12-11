import { withApollo } from 'next-apollo'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat
} from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'https://fifa-fut-21-data.herokuapp.com/graphql'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''
  const auth = token !== '' ? `Bearer ${JSON.parse(token)}` : ''
  operation.setContext({
    headers: {
      Authorization: auth
    }
  })

  return forward(operation)
})
const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({})
})

export default withApollo(apolloClient)
