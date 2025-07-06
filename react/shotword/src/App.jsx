import { useState } from 'react'
import './App.css'
import PictureCard from './components/PictureCard1';
import { generateAudio } from './lib/audio.js';

function App() {
  const userPrompt = `
  我会给你一张有很多蔬菜的图片，分析图片内容，找出图片中每个蔬菜的英文单词，尽量选择更简单的A1~A2的词汇。
  返回JSON数据：
  { 
  "image_discription": "图片描述", 
  "representative_words": "图片各个物品代表的英文单词，以数组形式返回，每个单词用逗号分隔", 
  "example_sentence": "结合英文单词和图片描述，给出一个江西家常菜的做法，菜只能用英文单词提及的部分或全部物品（根据家常菜的做法来，比如西红柿炒鸡蛋，只要有鸡蛋和西红柿即可，干锅包菜只要包菜即可），以一句话输出，100个字以内，不要用中文", 
  "explaination": "结合图片解释英文单词，段落以Look at...开头，将段落分句，每一句单独一行，解释的最后给一个日常生活有关的问句", 
  "explaination_replys": ["根据explaination给出的回复1", "根据explaination给出的回复2"]
  }`;
  // 上传图片的状态 
  const [words, setWords] = useState(['请上传图片']);
  // 例句
  const [sentence, setSentence] = useState('')
  // 解释
  const [explainations, setExplainations] = useState([]);
  const [expReply, setExpReply] = useState([])
  // 英文声音
  const [audio, setAudio] = useState('');
  // 详细内容展开
  const [detailExpand, setDetailExpand] = useState(false);
  const [imgPreview, setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png')
  const uploadImg = async (imageData) => {
    setImgPreview(imageData);
    const endpoint = 'https://api.moonshot.cn/v1/chat/completions';
    const headers = { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${import.meta.env.VITE_KIMI_API_KEY}` 
    };
    setWords(['分析中...']);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        model: 'moonshot-v1-8k-vision-preview',
        messages: [ 
          { 
            role: 'user', 
            content: [
              { 
                type: "image_url", 
                image_url: { "url": imageData, }, 
              }, 
              { type: "text", text: userPrompt, 

              }] 
            }],
            stream: false
        })
    })
    const data = await response.json();
    const replyData = JSON.parse(data.choices[0].message.content);
    // console.log(replyData);
    setWords(replyData.representative_words);
    setSentence(replyData.example_sentence);
    setExplainations(replyData.explaination.split('\n'))
    setExpReply(replyData.explaination_replys);
    // url -> audio 一直都在
    // base64 资源 比较小 -> atob -> uint8Array -> blob -> URL.createObjectURL
    // -> 临时地址 -> audio 展示
    const audioUrl = await generateAudio(replyData.example_sentence);
    // console.log(audioUrl);
    setAudio(audioUrl);
  }

  return (
    <div className="container">
      <PictureCard
        audio={audio}
        words={words}
        uploadImg={uploadImg}
      />
      <div className="output">
        <div>{sentence}</div>
        <div className="details">
          <button onClick={() => setDetailExpand(!detailExpand)}>Talk about it</button>
          {
            detailExpand ? (
              <div className="expand">
                <img src={imgPreview} alt="preview"/>
                {
                  explainations.map((explaination,index)=>(
                    <div key={index} className='explanation'>
                      {explaination}
                    </div>
                  ))
                }
                {
                  expReply.map((reply,index)=>(
                    <div key={index} className='reply'>
                      {reply}
                    </div>
                  ))
                }
              </div>
            ): (
              <div className="fold" />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App