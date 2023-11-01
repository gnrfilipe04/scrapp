import { App } from "./app"

const app = new App({ 
    config: { 
      url: 'https://apontamentos.lab2dev.com/', 
      titleXPath: '/html/head/title'    
    }, 
  })

app.run()