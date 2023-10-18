import { gql } from "@apollo/client";

export const GET_USER = gql`
    query oneUser($username: String!){
        user(username: $username){
            id
            username
            firstName
            lastName
            type
            created
            updated
        }
    }
`
export const GET_USERS = gql`
    query allUsers{
        users{
            id
            username
        }
    }
`
export const CREATE_USER = gql`
    mutation createUser($firstName: String!, $lastName: String!, $username: String!){
        createUser(firstName: $firstName, lastName: $lastName, username: $username){
           code
           success
           message
           user{
            id
            username
            firstName
            lastName
            type
            created
            updated
           }
        }
    }
`

export const UPDATE_USER = gql`
    mutation updateUser($firstName: String!, $lastName: String!, $username: String!){
        updateUser(firstName: $firstName, lastName: $lastName, username: $username){
            code
            success
            message
            user{
             id
             firstName
             lastName
             created
             updated
            }
        }
    }
`


export const DEL_USER = gql`
    mutation delUser($username: String!){
        deleteUser(username: $username){
            code
            success
            message
            user{
             id
            }
        }
    }
`


//categories

export const GET_CATEGORY = gql`
    query oneCategory($name: String!){
        category(name: $name){
            id
           name
            created
            updated
        }
    }
`
export const GET_CATEGORIES = gql`
    query allCategories{
        categories{
            id
            name
        }
    }
`
export const CREATE_CATEGORY = gql`
    mutation createCategory($name: String!){
        createCategory(name: $name){
           code
           success
           message
           category{
            id
           name
            created
            updated
           }
        }
    }
`

export const UPDATE_CATEGORY = gql`
    mutation updateCategory($name: String!, $newName: String!){
        updateCategory(name: $name, newName: $newName){
            code
            success
            message
            category{
                id
               name
                updated
               }
        }
    }
`


export const DEL_CATEGORY = gql`
    mutation delCategory($name: String!){
        deleteCategory(name: $name){
            code
            success
            message
            category{
                id
               }
        }
    }
`

//products


export const GET_PRODUCT = gql`
    query oneProduct($name: String!){
        product(name: $name){
            id
            name
            description
            image
            category
            costPrice
            created
            updated
        }
    }
`
export const GET_PRODUCTS = gql`
    query allProducts{
        products{
            id
            name
        }
    }
`
export const CREATE_PRODUCT = gql`
mutation createProduct($name: String!, $category: String!, $costPrice: PositiveFloat!, $image: String, $description: String) {
    createProduct(name: $name, category: $category, costPrice: $costPrice, image: $image, description: $description) {
      code
      success
      message
      product {
        id
        name
        description
        image
        category
        costPrice
        created
        updated
      }
    }
  }
`

export const UPDATE_PRODUCT = gql`
mutation updateProduct($name: String!, $category: String!, $costPrice: PositiveFloat!, $image: String, $description: String) {
    updateProduct(name: $name, category: $category, costPrice: $costPrice, image: $image, description: $description) {
      code
      success
      message
      product {
        id
        name
        description
        image
        category
        costPrice
        created
        updated
      }
    }
  }
`


export const DEL_PRODUCT = gql`
mutation deleteProduct($name: String!) {
    deleteProduct(name: $name) {
      code
      success
      message
      product {
        id
      }
    }
  }
`