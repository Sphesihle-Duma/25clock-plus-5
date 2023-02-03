import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState,useEffect } from 'react';
import './App.css';


function App() {

  const [session_break,setSession_break]=useState({session:25,break:5})
  const [time_left,setTime_left]=useState(1500)
  const [start_timer,setStartTimer]=useState(false)
  const [running,setRunning]=useState(false);
  const [breakOrSession,setBreakOrSession]=useState({label:"Session",breakStarted:false,})
  
  
    

  useEffect(()=>{
    //const forBreak=session_break.break;
    //const session =session_break.session;

    let timeout;
    

    if(time_left===0 && breakOrSession.label==="Session"){
      const audio =document.getElementById("beep")
      audio.play()
      const toBreak=()=>{

        setBreakOrSession(prev=>{
          return{...prev,label:"Break",breakStarted:true}
        })
        //setTime_left(forBreak*60)
      }
      timeout=setTimeout(toBreak,1000);
      
     
    }
    else if(time_left===0 && breakOrSession.label==="Break"){
      const toSession=()=>{

        setBreakOrSession(prev=>{
          return{...prev,label:"Session",breakStarted:false}
        })
        //setTime_left(session*60)
        
       
        
      }
      
      timeout=setTimeout(toSession,1000)
      
     
    }
    
    return ()=>{
      clearTimeout(timeout)
    }

  },[time_left,breakOrSession])


  useEffect(()=>{
    if(breakOrSession.breakStarted){
      setTime_left(session_break.break*60)
      
    }
    else{
      setTime_left(session_break.session*60)
    }

  },[breakOrSession.breakStarted,session_break])



  useEffect(()=>{
    const session_length=session_break.session;
    setTime_left(session_length*60)
    
   

  },[session_break])

  useEffect(()=>{
    const start=()=>{
      setTime_left(prev=>prev===0?prev:prev-1)
      
    }
    

   
  let interval
    if(start_timer && !breakOrSession.breakStarted){
      
     interval=setInterval(start,1000)
     if(running){
      
      setSession_break({session:25,break:5})
      setTime_left(1500)
      setStartTimer(false)
      setBreakOrSession(()=>({label:"Session",breakStarted:false}))
      clearInterval(interval)
      setRunning(false)
     }
     
     
    }
else if(!start_timer){
  console.log(start_timer)
  
  clearInterval(interval)
  
} 
else if(breakOrSession.breakStarted){
  interval=setInterval(start,1000)
     if(running){
      
      setSession_break({session:25,break:5})
      setTime_left(1500)
      setStartTimer(false)
      setBreakOrSession(()=>({label:"Session",breakStarted:false}))
      clearInterval(interval)
      setRunning(false)
      const audio=document.getElementById("beep")
      audio.pause();
      audio.currentTime=0.00
      console.log(audio.currentTime)
      console.log("the audio has been reset")
     }
}

return ()=>{
  setStartTimer(prev=>prev)
  clearInterval(interval)
  
}

    
  },[start_timer,running,time_left, breakOrSession.breakStarted])

  


 const formatTime=(time)=>{
  let minutes = Math.floor(time/60)
  let seconds =time%60;

  minutes=minutes<10?`0${minutes}`:minutes;
  seconds=seconds<10?`0${seconds}`:seconds;

  return `${minutes}:${seconds}`
 
 } 

const handleBreakDecrement=()=>{
  
  setSession_break(prev=>{
    return{...prev,break:prev.break===1?prev.break:prev.break-1}
  })
}

const handleBreakIncrement=()=>{
  setSession_break(prev=>{
    return{...prev,break:prev.break===60?prev.break:prev.break+1}
  })
}

const handleSessionDecrement=()=>{
  setSession_break(prev=>{
    return{...prev, session:prev.session===1? prev.session: prev.session-1}
  })
}
 const handleSessionIncrement=()=>{
    setSession_break(prev=>{
      return{...prev,session:prev.session===60?prev.session:prev.session+1}
    })
    
 }

 const handleStartStop=()=>{
  setStartTimer(prev=>!prev)
 }

 const handleReset=()=>{
  if(start_timer){
    setRunning(true)
    
}
else{
  setSession_break({session:25,break:5})
  setTime_left(1500)
  setStartTimer(false)
  setBreakOrSession(()=>({label:"Session",breakStarted:false}))
  const audio =document.getElementById("beep")
  audio.pause();
  audio.currentTime=0.00;
  console.log(audio.currentTime)
  console.log("audio is not running")
}
 }


  return (
    <div className="MyApp">
    <div id="center">
      <h1 id="heading" className="text-center text-uppercase fs-1 fw-bold">25+5 Clock</h1>
       <div className='grid'>
     <div className='flex'>
      <div className='for-break-length'>
      <h1  id="break-label" className="fs-2 fw-bold">Break length</h1>

      <button disabled={start_timer} onClick={handleBreakDecrement} id="break-decrement" className="btn btn-primary">Decrement</button>

      <strong id="break-length" className="fs-3 fw-bold">{session_break.break}</strong>
      
      <button disabled={start_timer} onClick={handleBreakIncrement} id="break-increment" className="btn btn-primary">Increment</button>
      </div>
      
      <div className='for-session-length'>
      <h1  id="session-label" className="fs-2 fw-bold">Session length</h1>
      <button disabled={start_timer} onClick={handleSessionDecrement} id="session-decrement" className="btn btn-primary">Decrement</button>
      <strong id="session-length" className="fs-3 fw-bold">{session_break.session}</strong>
      <button disabled={start_timer} onClick={handleSessionIncrement} id="session-increment" className="btn btn-primary" >Increment</button>
      </div>
      </div>
      <div className='display'>
      <h1 id="timer-label" className="fw-bold fs-3">{breakOrSession.label}</h1>
      <div id="time-left" className="fw-bold fs-3">{formatTime(time_left)}</div>
      <button onClick={handleStartStop} id="start_stop" className="btn btn-success">{start_timer?"Stop":"Start"}</button>
      <button onClick={handleReset} id="reset" className="btn btn-danger">reset</button>
      <audio preload='auto' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep"/>
    </div>

       </div>
    </div>
  </div>
  );
}

export default App;
