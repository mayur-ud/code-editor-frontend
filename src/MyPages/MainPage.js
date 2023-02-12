import { Button, Center, Grid, Group, NativeSelect, Navbar, Text } from '@mantine/core'
import { useRef , useState , useEffect, useContext} from 'react'
import Editor from '../components/Editor/Editor'
import LeftPane from '../components/Editor/LeftPane'
import RightPane from '../components/Editor/RightPane'

import './MainPage.css'

import ACTIONS from '../Actions';
import { initSocket } from '../socket';
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { USER_DATA , GET_PROJECTS, SAVE_CODE } from '../assets/queries'
import Def from '../components/Editor/default'
import StoreContext from '../assets/StoreContext'


function MainPage() {


  const codeRef = useRef(null);
  const [clients, setClients] = useState([]);
  const [fsize , setFsize] = useState(18)

  const {projectId} = useParams();
  const navigate = useNavigate()

  const [SaveCode , {load}] = useMutation(SAVE_CODE);

  let editorRef = useRef()

  const {setOptions , socketRef , setCast} = useContext(StoreContext)


  function handleCompile (){
    console.log(lang ,editorRef.current.getValue())
  }

  useEffect(()=>{

    if(socketRef.current){
        console.log('SOCKET EXISTSSSS')
        socketRef.current.on(ACTIONS.GET_BROADCAST , ({cast})=>{
            console.log('CAUGHT GET BROADCAST' , cast)
            setCast(cast)
            setTimeout(() => {
                setCast(null)
            }, 10000000);
        })
      }
  },[socketRef?.current])

  


  const handleSave = (e)=>{
    e.preventDefault()
    SaveCode({
        variables : {
            projectId : projectId,
            content : editorRef.current.getValue()
        }
    }).then((res)=>{
        setOptions({
            text : 'Successfully saved',
            color : 'green',
            title : 'Success'
          })
          setTimeout(() => {
            setOptions(null)
          }, 3000);
    })

  }

  const uid = localStorage.getItem('uid')

  const {loading , error , data} = useQuery(USER_DATA , {
    variables : {
        userId: uid
      }
    })

    const pdata = useQuery(GET_PROJECTS , {
        variables : {
            projectId
        }
    })


    if(!loading){
        console.log(data , 'dattttt')   
    }

    if(!pdata.loading){
        console.log(pdata.data , 'pdata')
    }

  useEffect( () => {

        async function init(){    
        const uid = localStorage.getItem('uid')
        console.log('uid' , uid )

      if(!uid){
        handleErrors('Please Login to Continue')
        // localStorage.setItem('uid' , 'newUSER2');
      }

        socketRef.current = await initSocket();
        socketRef.current.on('connect_error', (err) => handleErrors(err));
        socketRef.current.on('connect_failed', (err) => handleErrors(err));

        function handleErrors(e) {
            console.log(e , 'HEREEE')
            setOptions({
                text : 'Something went wrong',
                color : 'red',
                title : 'Sorry'

            })

            setTimeout(() => {
                setOptions(null)
            }, 3000);
            navigate('/' , {'replace' : true} )

        }

        socketRef.current.emit(ACTIONS.JOIN, {
            projectId,
            username: uid,
        });

        // // Listening for joined event
        socketRef.current.on(
            ACTIONS.JOINED,
            ({ clients, username, socketId , projectId }) => {
                if (username !== uid) {
                    console.log(`${username} joined`);
                }
                setClients(clients);
                console.log('clients ' , clients);
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId,
                });
            }
        );

        // Listening for disconnected
        socketRef.current.on(
            ACTIONS.DISCONNECTED,
            ({ socketId, username }) => {
                setClients((prev) => {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    );
                });
                console.log('disconnected ' , username)
                console.log(clients)
            }
        );}
        init()
    return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
    };
}, [projectId]);


    const [lang , setLang] = useState('cmake');
    const [theme , setTheme] = useState('dracula');
    
    const ele = document.getElementsByClassName('CodeMirror')[0]

    if(ele){
        ele.style.fontSize = `${fsize}px`
        console.log(ele)
    }

  return (<div className='cont'>
      <div className='left'>
      {projectId != '-1' && <LeftPane clients={clients} pid={projectId} data={pdata.data?.project}/>}
      </div>
    <div className='main'>
        <div style={{maxHeight : '64px' , margin : '8px 0px' , backgroundColor :  'hsl(231, 25%, 18%)' , padding : '0px 4px'}}>
    <Grid gutter='xs' justify="center">

        <Grid.Col  span={2}>
            <Text color='cyan'>Language</Text>
            <Group spacing={'4px'}>
            <Button size='sm' compact variant={`${lang === 'cmake' ? 'filled' : 'outline'}`} onClick={()=>{setLang('cmake')}}>C++</Button>
            <Button size='sm' compact variant={`${lang === 'javascript' ? 'filled' : 'outline'}`} onClick={()=>setLang('javascript')}>JS</Button>
            <Button size='sm' compact variant={`${lang === 'python' ? 'filled' : 'outline'}`} onClick={()=>setLang('python')}>Python</Button>
            </Group>
        </Grid.Col>

        <Grid.Col span={3}>
            <Text color='cyan'>Theme</Text>
            <Group spacing={'4px'}>
            <Button size='sm' compact variant={`${theme === 'dracula' ? 'filled' : 'outline'}`} onClick={()=>setTheme('dracula')}>Dracula</Button>
            <Button size='sm' compact variant={`${theme === 'solarized light' ? 'filled' : 'outline'}`} onClick={()=>setTheme('solarized light')}>Solarized</Button>
            <Button size='sm' compact variant={`${theme === 'lucario' ? 'filled' : 'outline'}`} onClick={()=>setTheme('lucario')}>Lucario</Button>
            </Group>
        </Grid.Col>

        <Grid.Col mr='md' span={1}>
            <Text color='cyan'>Font Size</Text>
            <Group spacing={'4px'}>
                <Button size='sm' compact variant='outline' onClick={()=>{setFsize(Number(fsize) + 2);console.log(fsize)}}>A+</Button>
                <Button size='sm' compact variant='outline' onClick={()=>{setFsize(Number( fsize) - 2);console.log(fsize)}}>A-</Button>
            </Group>
        </Grid.Col >
        <Grid.Col mr='md' span={1}>
        </Grid.Col >

        <Grid.Col span={1}>
            <Center>
                <Text my='sm' sx={{fontFamily : 'Bitter' ,fontWeight : 400}} color={'white'}>{pdata.data?.project.projectName}</Text>
            </Center>
        </Grid.Col>

        <Grid.Col mx={0} span={1}>
            <Button my='sm'  onClick={(e)=>{
                handleSave(e)
            }}>SAVE</Button>
        </Grid.Col>

        <Grid.Col mx={0} span={1}>
            <Button my='sm'  onClick={(e)=>{
                handleCompile()
            }}>Compile & Run</Button>
        </Grid.Col>

        
        <Grid.Col span={2}>
            {/* <Center>
                <Text my='sm' sx={{fontFamily : 'Bitter' ,fontWeight : 400}} color={'white'}>{pdata.data?.project.projectName}</Text>
            </Center> */}
        </Grid.Col>
    </Grid>
        </div>
        {projectId === '-1' ? <Def/> :  <Editor editorRef={editorRef} content={pdata.data?.project.content} socketRef={socketRef} projectId={projectId} onCodeChange={(code) => {codeRef.current = code;}} lang={lang} theme={theme}/>}
    </div>
    <div className='right'>
        <RightPane setLang={setLang} lang={lang} data={data}/>
    </div>
    </div>
  )
}

export default MainPage