import React, { useEffect } from 'react'
import { gql, useQuery ,useMutation} from '@apollo/client'
import { ALL_USERS , REGISTER_USER } from '../assets/queries'





function Dummy() {

    const res  = useQuery(ALL_USERS)
    const [ CreateUser , {loading , error , data}] = useMutation(REGISTER_USER)

    

    useEffect(()=>{
        CreateUser({  variables: {
                userId : 'Cli-2',
                userName : 'CLI-NAme2',
                password : 'CLI_pass2'
         } 
        })
    },[])

    if(res.loading){
        return (<h1>LOADING</h1>)
    }
    else{
        console.log(loading , error , data)
    }

    console.log(res.data)

  return (
    <div>Dummy</div>
  )
}

export default Dummy