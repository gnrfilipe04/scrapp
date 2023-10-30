import { MyReadFactory } from "./modules/read/factory/readFactory"

;(async () => {

    const URL_LAB_APONTAMENTOS = 'https://apontamentos.lab2dev.com/'

    const myReadFactory = await MyReadFactory.createInstance()
    const result = await myReadFactory.readPage({ url: URL_LAB_APONTAMENTOS })
    console.log(result)

})()