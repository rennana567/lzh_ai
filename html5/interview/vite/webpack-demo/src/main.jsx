import {aMessage} from './a.js'
import Hello from './Hello.jsx'
import React from 'react'
import { createRoot } from 'react-dom/client';
// 引入css 文件
import './main.css'
document.getElementById('app').innerHTML = `
    <h1>Webpack</h1>
    <p>${aMessage()}</p>
`
const root = createRoot(document.getElementById('app'));
root.render(<Hello />);