import styles from './card.module.css'
import { use, useEffect, useRef } from 'react'
const ImageCard = (props) => { 
    const { url, height } = props
    const imgRef = useRef(null)
    useEffect(() => { 
        const observer= new IntersectionObserver(([entry],obs)=>{
            if(entry.isIntersecting){
                const img = entry.target
                const oImg = document.createElement('img')
                oImg.src = img.dataset.src
                oImg.onload = () => { 
                    img.src = oImg.src
                }
                observer.unobserve(img)
            }
        })
        if(imgRef.current)observer.observe(imgRef.current)
    }, [])
    return (
        <div className={styles.card} style={{ height }}>
            <img ref={imgRef} data-src={url} className={styles.img} />
        </div>
    )
}

export default ImageCard;