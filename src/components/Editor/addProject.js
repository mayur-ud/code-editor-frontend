import { useMutation } from '@apollo/client';
import { Button, Input, Text } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { CREATE_PROJECT } from '../../assets/queries';
import './addProject.css';

import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import StoreContext from '../../assets/StoreContext';


function InputForm({setOpened}) {
  const textRef = useRef();


  const [CreateProject , {loading , error , data}] = useMutation(CREATE_PROJECT);
  const { setOptions} = useContext(StoreContext)


  const handleSubmit = (e) => {
    e.preventDefault()
    CreateProject({
      variables : {
        userId : localStorage.getItem('uid'),
        projectName : textRef.current.value,
        projectId : uuidv4(),

      }
    }).then((res)=>{
      setOptions({
        text : 'We have Created a new project for you',
        color : 'green',
        title : 'Hurray'
      })
      setTimeout(() => {
        setOptions(null)
      }, 3000);
      setOpened(false)
    })

  }

  return (
    <form >
      <Input ref={textRef} placeholder='Enter Project Name' m='xs' />
      <Button m='sm' onClick={(e)=>{
        handleSubmit(e)
      }}>Create</Button>
        
      
    </form>
  );
}

export default InputForm;




