import { MyBrowserDTO } from "../../../util/browser";

export interface MyReadPageRepositoryDTO {
    readPage: MyBrowserDTO['readPage']
    searchByXPath: MyBrowserDTO['searchByXPath']
    elementBySelector: MyBrowserDTO['elementBySelector']
    onClick: MyBrowserDTO['onClick']
    browserInstance: MyBrowserDTO
}

export class MyReadPageRepository implements MyReadPageRepositoryDTO {
    browserInstance: MyBrowserDTO

    constructor({ browserInstance }: Pick<MyReadPageRepositoryDTO, "browserInstance">){
        this.browserInstance = browserInstance
    }

    async readPage(){ 
        const result = await this.browserInstance.readPage()
        return result
    };

    async searchByXPath(xpath: string){
        const result = await this.browserInstance.searchByXPath(xpath)
        return result
    }

    async elementBySelector(selector: string){
        const element = await this.browserInstance.elementBySelector(selector)
        return element
    }

    async onClick(element: MyBrowserDTO['element']){
        await this.browserInstance.onClick(element)
    }

}