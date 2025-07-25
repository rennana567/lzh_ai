import useTitle from '../../hooks/useTitle'
import {
  chat,
  kimChat,
  openaiChat
} from '../../llm'
import { 
  useEffect,
  useState 
} from 'react'
import styles from './trip.module.css'
import {
  Button,
  Input,
  Loading
} from 'react-vant'

const Trip = () => {  
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleChat = () => {
    if(text.trim()==='') return
    setIsSending(true)
  }

  useTitle('旅游智能客服')
  useEffect(()=>{
    const fetchChat = async() => {
      const res = await 
      openaiChat([
        {
          role: 'user', 
          content: '请给我推荐一个好地方'
        },
        
      ])
    
      console.log(res)
    }
    fetchChat()
  },[])

  return (
    <div className='flex flex-col h-all'>
      <div className={`${styles.chatArea} flex-1`}>
        
      </div>
      <div className={`flex ${styles.inputArea}`}>
        <Input
          value={text}
          onChange={(value)=>setText(value)}
          placeholder='请输入消息'
          className={`${styles.input} flex-1`}
        />
        <Button disabled={isSending}  type='primary' onClick={handleChat}>发送</Button>
      </div>
      {isSending && (<div className='fixed-loading'>
        <Loading type='ball'/>
      </div>)}
    </div>
  )
}

export default Trip