import { Image, Text, Title, UnstyledButton } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import hero from '../assets/hero.gif'

import './Home.css'

function Home() {
    const navigate = useNavigate()
  return (
    <>
    <div style={{
        background: '-moz-linear-gradient(90deg, rgba(2,11,25,0.7933240190607493) 0%, rgba(12,22,56,1) 59%)',
        filter : 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#020b19",endColorstr="#0c1638",GradientType=1)',
        padding:'18px',
        paddingBottom : '96px'
    }}
    >
            <UnstyledButton sx={{
                marginLeft : 20,
            }} className='hm-btn'>LOGO</UnstyledButton>


            <UnstyledButton sx={{
                marginRight : 32,
                float : 'right',
                
            }} onClick={()=>navigate('/auth/login')} className='hm-btn'>Login</UnstyledButton>

        <div className='cont'>
            <div className='cont1'>
                <Title className='title' ml='sm'>Code Collab Website Title</Title>
                <Text className='slogan'>VS Code, Visual Studio Code, Live Share identifies a user by MS or Github account. You also can join as an anonymous with limited features. However, it’s better to have one of these accounts, to make full use of VS Code Live Share features;</Text>
                <UnstyledButton className='pbtn' onClick={()=>navigate('/auth/signup')}>Explore Now</UnstyledButton>
            </div>
            <div className='cont2'>
                <Image className='heroGif' src={hero}  />
            </div>
        </div>
        

    </div>
    <div style={{
            background: 'linear-gradient(90deg, rgba(2,11,25,1) 4%, rgba(7,22,68,0.9809990890887605) 76%, rgba(17,0,82,1) 90%)',
            minHeight : '50vh',
        }}> 
    CONTENT HERE
        </div>
    </>
  )
}

export default Home