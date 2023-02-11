import { useMutation } from '@apollo/client';
import { Button, Center, Group, SimpleGrid, Stack, Text, UnstyledButton } from '@mantine/core';
import React from 'react'
import Avatar from 'react-avatar';
import {RiRadioButtonLine} from 'react-icons/ri'
import { ADD_TO_PROJ } from '../../assets/queries';
function LeftPane({clients , data , pid}) {

  const [AddToProject , {loading , error }] = useMutation(ADD_TO_PROJ)

  const handleAdd = (e)=>{
      e.preventDefault()
      AddToProject({
        variables : {
          userId : 'qwert',
          projectId : pid
        }
      })
  }

  return (
    <div style={{
      margin : 0,
      position:'fixed',
      top:0
    }}>
      <Center sx={{border : '1px solid green' , borderRadius : '4px' }} color='green' m='md' variant='outline' ><RiRadioButtonLine color='green'/><Text ml='sm' color='green'>Online</Text></Center>

      <SimpleGrid cols={2} pl={'16px'} sx={{marginTop : '20px'}}>
      {clients.map((ele)=><Stack key={ele.username} spacing={0}>
        <Avatar name={ele.username} p={0} ml={'8px'} mb={0} round size={32}  />
        <Text size='sm' m={0} p={0} color='white'>{ele.username.split(' ')[0] > 10 ? ele.username.slice(0,11) : ele.username.split(' ')[0]}</Text>
      </Stack>)}
      </SimpleGrid>

      { (data?.createdBy === localStorage.getItem('uid')) &&  <UnstyledButton onClick={(e)=>{handleAdd(e)}}>Add Members</UnstyledButton>} 


      
    </div>
  )
}

export default LeftPane