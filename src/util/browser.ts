import puppeteer, { Browser, ElementHandle, GoToOptions, Page, Viewport, } from "puppeteer"

export type NavigateToParams = {
    url: string,
    options?: GoToOptions,
    viewportConfig?: Viewport
}

export interface MyBrowserDTO {
    readPage: () => Promise<string>
    launch: () => Promise<Browser>
    elementBySelector: (selector: string) => Promise<MyBrowserDTO['element']>
    onClick: (element: MyBrowserDTO['element']) => Promise<void>
    searchByXPath: (xpath: string) => Promise<string | null>
    navigateTo: (params: NavigateToParams) => Promise<MyBrowserDTO>
    page: Page
    element: ElementHandle<Element> | null
}

export class MyBrowser implements MyBrowserDTO {
    page: Page
    element: ElementHandle<Element> | null = null

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
            throw new Error(`Error on navigate to page: ${e}`,)
        }
    }

    async readPage(){
        try{
            const result = await this.page.content()
            return result
            
        }catch(e){
            throw new Error(`Error on read this page:: ${e}`,)
        }
    }

    async searchByXPath(xpath: string){
        try{
            const element = await this.page.$x(xpath)
            const textContent = await this.page.evaluate(el => el.textContent, element[0])
            return textContent
            
        }catch(e){
            throw new Error(`Error on search by xpath: ${e}`,)
        }
    }

    async elementBySelector(selector: string){
        try{
            const element = await this.page.waitForSelector(selector) // Selector of production --> 'div > .swiper-slide swiper-slide-next'
            return element
            
        }catch(e){
            throw new Error(`Error on search by selector: ${e}`,)
        }
    }


    async onClick(element: MyBrowserDTO['element']){
        try{
            await element?.click()
            
        }catch(e){
            throw new Error(`Error on click: ${e}`,)
        }
    }

}