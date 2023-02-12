import { useMutation } from '@apollo/client';
import { Button, Center, Group, Input, SimpleGrid, Stack, Text, UnstyledButton } from '@mantine/core';
import React, { useContext, useRef } from 'react'
import Avatar from 'react-avatar';
import {RiRadioButtonLine} from 'react-icons/ri'
import { ADD_TO_PROJ } from '../../assets/queries';
import StoreContext from '../../assets/StoreContext';
function LeftPane({clients , data , pid}) {

  const [AddToProject , {loading , error }] = useMutation(ADD_TO_PROJ)

  const { options , setOptions} = useContext(StoreContext)
  const inpRef = useRef()

  const handleAdd = (e)=>{
      e.preventDefault()
      const uid = inpRef.current.value
      console.log(uid  , 'LPane')
      AddToProject({
        variables : {
          userId : uid,
          projectId : pid
        }
      }).then((res)=>{
        setOptions({
          text : `${uid} was given access to this project`,
          color : 'green',
          title : 'Success'
        })
        setTimeout(() => {
          setOptions(null)
        }, 3000);

        useRef.current.value = ''

        console.log(res)
      }).catch((e)=>{
        setOptions({
          text : `User with id ${uid} not found`,
          color : 'red',
          title : 'Sorry'
        })
        setTimeout(() => {
          setOptions(null)
        }, 5000);
      })

      
  }

  return (
    <div style={{
      margin : 0,
      position:'fixed',
      top:0
    }}>
      <Center sx={{border : '1px solid green' , borderRadius : '4px' }} color='green' p='xs' m='sm' variant='outline'><Text mr={'md'} color='green'>Online</Text><RiRadioButtonLine ml='md' color='green'/></Center>

      <SimpleGrid cols={2} pl={'16px'} sx={{marginTop : '20px'}}>
      {clients.map((ele)=><Stack key={ele.username} spacing={0}>
        <Avatar name={ele.username} p={0} ml={'8px'} mb={0} round size={32}  />
        <Text size='sm' m={0} p={0} color='white'>{ele.username.split(' ')[0] > 10 ? ele.username.slice(0,11) : ele.username.split(' ')[0]}</Text>
      </Stack>)}
      </SimpleGrid>

      { (data?.createdBy === localStorage.getItem('uid')) && <>
        <Input ml='md' mt='xl' ref={inpRef} sx={{fontWeight : 600 , fontSize : '24px'}}/>
       <UnstyledButton sx={{
        border : '2px solid hsl(209, 5%, 45%)',
        color : 'white',
        padding : '8px',
        borderRadius : '8px',
        margin : '18px',
        backgroundColor: 'hsl(239, 25%, 35%)'
       }} onClick={(e)=>{handleAdd(e)}}>Add Member</UnstyledButton>
       </>} 


      
    </div>
  )
}

export default LeftPane