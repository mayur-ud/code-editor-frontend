import React, { useEffect , useState , useRef, useContext } from 'react'
import ACTIONS from '../Actions';
import StoreContext from '../assets/StoreContext';
import { initSocket } from '../socket';




function Dummy(props) {


    const {socketRef} = useContext(StoreContext)

    const refVideo = useRef();
    const refCanvas = useRef();


    async function startStream() {
      
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => console.log(err));
      socketRef.current.on('connect_failed', (err) => console.log(err));

      if(!socketRef.current){
        console.log('NOP SOCKET')
      }
      else{
        console.log(socketRef.current)
      }
       await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            // set source of video to stream
            refVideo.current.srcObject = stream;

            // define canvas context
            const context = refCanvas.current.getContext('2d');

            // emit canvas as data url every 100 milliseconds
            const interval = setInterval(() => {
                // draw image
                context.drawImage(refVideo.current, 0, 0, context.width, context.height);

                // define stream by username
                const streamObj = {
                    image: refCanvas.current.toDataURL('image/jpeg'),
                    username: 'props.user.username',
                };

                // send stream to server
                socketRef?.current?.emit(ACTIONS.STREAM, streamObj);
            }, 100);
        });
    }

    useEffect(() => {
        // when stream is received from server

        startStream()
        // socketRef?.current?.on(ACTIONS.STREAM, function(data) {

        //     startStream()
        // });
    }, []);

    return (
    <div style={{backgroundColor : 'white'}}>
    DUMMy
        <video ref={refVideo} />
        <canvas ref={refCanvas} />
        </div>
    );
}

export default Dummy