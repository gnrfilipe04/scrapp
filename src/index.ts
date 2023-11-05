import { App } from "./app"
import path from 'path'

const app = new App({ 
    config: { 
      url: 'https://apontamentos.lab2dev.com/', 
      titleXPath: '/html/head/title',
      filename: path.resolve(__dirname, 'data', 'file.json'),    
    }, 
  })

app.run()