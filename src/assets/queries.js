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

export const LOGIN_USER = gql`
mutation LoginUser($userId: String!, $password: String!) {
  login( input : {
        userId: $userId,
        password: $password
    }
    ) 
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

export const USER_DATA = gql`
query UserByID($userId : String!) {
    user(input : {userId: $userId}) {
        userId
        userName
        allowedProjects {
          content
          createdBy
          allowedUsers
          projectId
          projectName
          language
    
        }
        createdProjects {
          content
          createdBy
          allowedUsers
          projectId
          projectName
          language
        }
        }
      }
`

export const GET_PROJECTS = gql`
query Project($projectId: String!) {
    project(input: {projectId : $projectId}) {
      allowedUsers
      content
      createdBy
      language
      projectName
      
    }
  }
`















