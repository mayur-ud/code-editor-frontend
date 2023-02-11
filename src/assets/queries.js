import { gql} from '@apollo/client'

export const REGISTER_USER = gql`
mutation RegisterUser($userId: String!, $userName: String!, $password: String!) {
  register( input : {
    userId: $userId,
    userName: $userName,
    password: $password
    }
  ) {
    userId
    userName
  }
}
`

export const ALL_USERS = gql`
query {
  users {
    userId
    userName
  }
}
`