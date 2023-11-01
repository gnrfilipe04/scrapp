import { MyBrowserDTO } from "../../../util/browser";

export interface MyReadPageRepositoryDTO {
    readPage: MyBrowserDTO['readPage']
    searchByXPath: MyBrowserDTO['searchByXPath']
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

}