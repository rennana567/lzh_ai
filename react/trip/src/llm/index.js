/**
 * chat 聊天
 * 
 */
const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const KIM_CHAT_API_URL = 'https://api.moonshot.cn/v1/chat/completions';
const OPENAI_CHAT_API_URL = 'https://api.302.ai/v1/chat/completions';
// console.log(process.env.VITE_DEEPSEEK_API_KEY, '------');
export const chat = async (
    messages,
    api_url=DEEPSEEK_CHAT_API_URL,
    api_key=import.meta.env.VITE_DEEPSEEK_API_KEY,
    model='deepseek-chat',
) => {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model,
                messages,
                stream: false,
            })
        })
        const data = await response.json();
        return {
            code: 0,
            data: {
                role: 'assistant',
                content: data.choices[0].message.content
            }
            
        }
    } catch(err) {
        return {
            code: 0,
            msg: '出错了...'
        }
   } 
}

export const kimChat = async (messages) => {
    const res = await chat(
        messages, 
        KIM_CHAT_API_URL, 
        import.meta.env.VITE_KIM_API_KEY, 
        'moonshot-v1-auto'
    )
    return res
}

export const openaiChat = async (messages) => { 
    const res = await chat(
        messages, 
        OPENAI_CHAT_API_URL, 
        import.meta.env.VITE_302_API_KEY, 
        'gpt-3.5-turbo'
    )
    return res
}

export const generateAvatar = async (text) => { 
    // 设计prompt
    const prompt = `
    Please create a 2D cartoon character avatar in the style of SpongeBob SquarePants based on the following user information:
  
User Nickname and Signature: ${text}


Design Requirements:
- Create an original cartoon character inspired by the user's nickname and signature
- Style: Bright, colorful 2D animation similar to SpongeBob SquarePants
- Character features:
  * Large expressive anime-style eyes
  * Simple yet cute facial design
  * Round and soft body shapes
  * Vivid color palette that reflects the user's personality
  * Friendly and approachable expression
  * Unique traits based on the nickname/signature (e.g., if nickname relates to fire, add flame elements)
- Technical specifications:
  * Front-facing view
  * Clean white or transparent background
  * Bold black outlines
  * Optimized for avatar use (clear facial features even at small sizes)
  * No text, watermarks, or additional elements
  * High quality, detailed illustration
- Overall feeling: Playful, energetic, and cartoonish like classic Nickelodeon style

Important: Create an original character design, do not copy existing characters. Focus on translating the user's identity into a cute cartoon avatar.
    `
}