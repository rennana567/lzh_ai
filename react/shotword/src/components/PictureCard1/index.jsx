import { useState } from 'react'
import './style.css'

const PictureCard = (props) => {
    const {
        audio,
        words,
        uploadImg
    } = props
    const [imgPreview,setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png')
    
    const playAudio = () => {
        const audioElement = new Audio(audio);
        audioElement.play();
    }

    const uploadImgData = (e) => {
        const file = (e.target).files?.[0];
        if (!file) { return; }
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const data = reader.result;
                setImgPreview(data);
                uploadImg(data);
                resolve(data);
            }
            reader.onerror = (error) => { reject(error); };
        })
    }
    return (
        <div className='card'>
            <input id="selectImage" type="file" accept='.jpg,.jpeg,.png,.gif' onChange={uploadImgData}/>
            <label htmlFor="selectImage" className='upload'>
                <img src={imgPreview} alt="preview" />
            </label>
            <div className='words'>{words}</div>
            {audio && (
            <div className="playAudio" onClick={playAudio}>
                <img width="20px" src="https://res.bearbobo.com/resource/upload/Omq2HFs8/playA-3iob5qyckpa.png" alt="logo" />
            </div>
        )}
        </div>
    )
    
}

export default PictureCard