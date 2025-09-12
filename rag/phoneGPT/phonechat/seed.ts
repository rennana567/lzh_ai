// langchain loader 是RAG的基础功能 txt、pdf、excel...
// 加载网页内容
import {
    PuppeteerWebBaseLoader
} from '@langchain/community/document_loaders/web/puppeteer'
import {
    RecursiveCharacterTextSplitter
} from 'langchain/text_splitter'
import { createOpenAI } from "@ai-sdk/openai"

// supabase 去做向量化的知识库数据
console.log('开始向量化知识库数据')
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512, // 切割的长度  512个字符  包含一个比较独立的语义
    chunkOverlap: 100 // 切割的重叠长度  100个字符  一句话被切断容错
})
const scrapePage = async (url: string): Promise<string> => {
    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: {
        headless: true,
      },
      gotoOptions: {
        waitUntil: 'networkidle0',
      },
      evaluate: async(page, browser) => {
        const result = await page.evaluate(() => document.body.innerHTML);
        await browser.close();
        return result;
      }
    });
  
    return await loader.scrape();
  }
const loadData = async (webpages: string[]) => {
    for (const url of webpages){
        const content = await scrapePage(url);
        const chunks = await splitter.splitText(content);
        console.log(chunks,'------')
    }
}
// 知识库的来源，可配置
loadData([
    "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25",
    // "https://en.wikipedia.org/wiki/Samsung_Galaxy_S24",
    // "https://en.wikipedia.org/wiki/IPhone_16",
    // "https://en.wikipedia.org/wiki/IPhone_16_Pro",
    // "https://en.wikipedia.org/wiki/IPhone_15",
    // "https://en.wikipedia.org/wiki/IPhone_15_Pro",
  ]);