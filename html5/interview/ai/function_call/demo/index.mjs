import { OpenAI } from "openai"; // es6 module

const client = new OpenAI({
    apiKey:  "sk-bwZhhw5M8aXWCdarlgfXSrCWn1cDX8GyLFAWp53h89GxXedF",
    baseURL: 'https://api.302.ai/v1'
})

const getWeather = async(city) => {
    return {
        city,
        temp: "28",
        condition: "Sunny"
    }
}

async function main() {
    const resp = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: '今天抚州天气怎么样？'
            }
        ],
        // LLM 使用的工具
        tools: [
            // LLM 可以调用的tool配置
            {
                type: 'function',
                function: {
                    name: "getWeather",
                    description: "获取某个城市的天气",
                     parameters: {
                        type: "object",
                        properties: {
                            city: {
                                type: "string"
                            }
                        },
                        required: ['city']
                    }
                }
            }
        ]

    })
    
    const toolCall = resp.choices[0].messages.tool_calls?.[0];
    // console.log("大模型想调用", toolCall);
    
}

main()