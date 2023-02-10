import { Image, Text, Title, UnstyledButton } from '@mantine/core'
import React from 'react'
import hero from '../assets/hero.gif'

import './Home.css'

function Home() {
  return (
    <div style={{
        background: '-moz-linear-gradient(90deg, rgba(2,11,25,0.7933240190607493) 0%, rgba(12,22,56,1) 59%)',
        filter : 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#020b19",endColorstr="#0c1638",GradientType=1)',
        minHeight:'100vh',
        margin : 20,
    }}
    >
            <UnstyledButton sx={{
                marginLeft : 20,
            }} className='hm-btn'>LOGO</UnstyledButton>


            <UnstyledButton sx={{
                marginRight : 32,
                float : 'right',
            }} className='hm-btn'>Login</UnstyledButton>

        <div className='cont'>
            <div className='cont1'>
                <Title className='title' ml='sm'>Code Collab Website Title</Title>
                <Text className='slogan'>VS Code, Visual Studio Code, Live Share identifies a user by MS or Github account. You also can join as an anonymous with limited features. However, it’s better to have one of these accounts, to make full use of VS Code Live Share features;</Text>
                <UnstyledButton className='pbtn'>Explore Now</UnstyledButton>
            </div>
            <div className='cont2'>
                <Image className='heroGif' src={hero}  />
            </div>
        </div>

    </div>
  )
}

export default Home