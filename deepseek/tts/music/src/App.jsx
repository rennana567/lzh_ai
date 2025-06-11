import { useState,useRef } from 'react'
import './App.css'


function App() {
  // 火山引擎tts 配置文件
  const TOKEN = 'NZIzlDMhQJEvAe-1ssnxFUHYEig_2wQb'
  const APP_ID = '4765996594'
  const CLUSTER_ID = 'volcano_tts'

  // 代码的可读性高于一切
  const [prompt,setPrompt] = useState('hello')
  // react use 开头 ref hook  可以获取dom元素
  const audioPlayer = useRef(null)
  // console.log(audioPlayer,'///')
  const playMusic = () =>{
    // console.log(audioPlayer.current,'+++')
    // console.log('播放音乐')
    audioPlayer.current.play()
  }
  const generateAudio = () =>{
    // 女性
    // const voiceName = "zh_female_shuangjuaisisi_moon_bigtts"
    const voiceName = "zh_male_sunwukong_mars_bigtts"
    const endpoint = "tts/api/v1/tts" // tts api llm 服务接口地址
    
    const headers = {
      'Content-Type':'application/json',
      Authorization:`Bearer;${TOKEN}`
    } 
  }
  return (
    <div className='container'>
      <div>
        <label>Prompt</label>
        <button onClick={generateAudio}>生成并播放</button>
        <textarea 
        className='input'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        >
        
        </textarea>
      </div>
      <audio ref={audioPlayer} src="/sounds/tlj.mp3"></audio>
      {/* <button onClick={playMusic}>播放</button> */}
    </div>
  )
}

export default App
