import { Button, Grid, Group, NativeSelect, Navbar, Text } from '@mantine/core'
import { useRef , useState , useEffect} from 'react'
import Editor from '../components/Editor/Editor'
import LeftPane from '../components/Editor/LeftPane'
import RightPane from '../components/Editor/RightPane'

import './MainPage.css'



import ACTIONS from '../Actions';
import { initSocket } from '../socket';
import { useNavigate, useParams } from 'react-router-dom'


function MainPage() {


  const codeRef = useRef(null);
  const socketRef = useRef(null);
  const [clients, setClients] = useState([]);

  const {projectId} = useParams();
  const navigate = useNavigate()


  useEffect(() => {
    const init = async () => {

      const uid = localStorage.getItem('uid');
      console.log('uid' , uid , projectId)

      if(!uid){
        handleErrors('Please Login to Continue')
        // localStorage.setItem('uid' , 'newUSER2');
      }

        socketRef.current = await initSocket();
        socketRef.current.on('connect_error', (err) => handleErrors(err));
        socketRef.current.on('connect_failed', (err) => handleErrors(err));

        function handleErrors(e) {
            console.log('socket error', e);
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
        );
    };
    init();
    return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
    };
}, [projectId]);


    const [lang , setLang] = useState('cmake');
    const [theme , setTheme] = useState('dracula');


  return (<div className='cont'>
      <div className='left'>
        <LeftPane clients={clients}/>
      </div>
    <div className='main'>
        <div style={{maxHeight : '64px' , margin : '8px 0px' , backgroundColor :  'hsl(231, 25%, 18%)' , padding : '0px 4px'}}>
    <Grid>

        <Grid.Col  span={6}>
            <Text color='cyan'>Language</Text>
            <Group spacing={'4px'}>
            <Button size='sm' compact variant={`${lang === 'cmake' ? 'filled' : 'outline'}`} onClick={()=>{setLang('cmake')}}>C++</Button>
            <Button size='sm' compact variant={`${lang === 'javascript' ? 'filled' : 'outline'}`} onClick={()=>setLang('javascript')}>JS</Button>
            <Button size='sm' compact variant={`${lang === 'python' ? 'filled' : 'outline'}`} onClick={()=>setLang('python')}>Python</Button>
            </Group>
        </Grid.Col>

        <Grid.Col span={6}>
            <Text color='cyan'>Theme</Text>
            <Group spacing={'4px'}>
            <Button size='sm' compact variant={`${theme === 'dracula' ? 'filled' : 'outline'}`} onClick={()=>setTheme('dracula')}>Dracula</Button>
            <Button size='sm' compact variant={`${theme === 'solarized light' ? 'filled' : 'outline'}`} onClick={()=>setTheme('solarized light')}>Solarized</Button>
            <Button size='sm' compact variant={`${theme === 'lucario' ? 'filled' : 'outline'}`} onClick={()=>setTheme('lucario')}>Lucario</Button>
            </Group>
        </Grid.Col>
    </Grid>
        </div>
        <Editor socketRef={socketRef} projectId={projectId} onCodeChange={(code) => {codeRef.current = code;}} lang={lang} theme={theme}/>
    </div>
    <div className='right'>
        <RightPane setLang={setLang} lang={lang} />
    </div>
    </div>
  )
}

export default MainPage