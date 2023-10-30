import puppeteer, { Browser, GoToOptions, Page, Viewport, } from "puppeteer"
import { AppError } from "./appError"

export type NavigateToParams = {
    url: string,
    options?: GoToOptions,
    viewportConfig?: Viewport
}

export interface MyBrowserDTO {
    readPage: (params: NavigateToParams) => Promise<string>
    launch: () => Promise<Browser>
    navigateTo: (params: NavigateToParams) => Promise<Page>
}

export class MyBrowser implements MyBrowserDTO {

    async launch(){
        return await puppeteer.launch({ headless: "new" })
    }

    async navigateTo({ url, options, viewportConfig }: NavigateToParams){
        try{
            const browser = await this.launch()
            const page = await browser.newPage();
            await page.goto(url, options);
            await page.setViewport(viewportConfig || { width: 1080, height: 1024 });
            return page

        }catch(e){
            throw new AppError(`Error on navigate to page: ${e}`,)
        }
    }

    async readPage({ url, options, viewportConfig }: NavigateToParams){
        try{
            const page = await this.navigateTo({ url, options, viewportConfig })
            const result = await page.content()
            return result
            
        }catch(e){
            throw new AppError(`Error on read this page: ${e}`,)
        }
    }
}