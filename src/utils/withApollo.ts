import { withApollo } from 'next-apollo'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: 'https://fifa-fut-21-data.herokuapp.com/graphql',
  cache: new InMemoryCache({})
})

export default withApollo(apolloClient)
