import puppeteer, { Browser, ElementHandle, GoToOptions, Page, Viewport, } from "puppeteer"
import { AppError } from "./appError"

export type NavigateToParams = {
    url: string,
    options?: GoToOptions,
    viewportConfig?: Viewport
}

export interface MyBrowserDTO {
    readPage: () => Promise<string>
    launch: () => Promise<Browser>
    setPage: (page: Page) => Promise<void>
    searchByXPath: (xpath: string) => Promise<string | null>
    navigateTo: (params: NavigateToParams) => Promise<MyBrowserDTO>
    page: Page
}

export class MyBrowser implements MyBrowserDTO {
    page: Page

    constructor(){
        this.page = {} as Page
    }

    async launch(){
        return await puppeteer.launch({ headless: "new" })
    }

    async navigateTo({ url, options, viewportConfig }: NavigateToParams){
        try{
            const browser = await this.launch()
            this.page = await browser.newPage();
            await this.page.goto(url, options);
            await this.page.setViewport(viewportConfig || { width: 1080, height: 1024 });
            return this

        }catch(e){
            console.log(`Error on navigate to page: ${e}`,)
            return this
        }
    }

    async readPage(){
        try{
            const result = await this.page.content()
            return result
            
        }catch(e){
            console.log(`Error on read this page: ${e}`,)
            return ''
        }
    }

    async searchByXPath(xpath: string){
        try{
            const element = await this.page.$x(xpath)
            const textContent = await this.page.evaluate(el => el.textContent, element[0])
            return textContent
            
        }catch(e){
            console.log(`Error on search by xpath: ${e}`,)
            return ''
        }
    }

    async setPage(page: Page){
        this.page = page
    }

}