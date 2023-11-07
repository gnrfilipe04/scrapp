import { MyBrowserDTO } from "../../../util/browser";
import { MyReadPageRepositoryDTO } from "../repository/readPageRespository";

export interface MyReadPageServiceDTO {
    readPage: MyBrowserDTO['readPage']
    searchByXPath: MyBrowserDTO['searchByXPath']
    repositoryInstance: MyReadPageRepositoryDTO
}

export class MyReadPageService implements MyReadPageServiceDTO {
    
    repositoryInstance: MyReadPageRepositoryDTO

    constructor({ repositoryInstance }: Pick<MyReadPageServiceDTO, "repositoryInstance">){
        this.repositoryInstance = repositoryInstance
    }

    async readPage(){ 
        const result = await this.repositoryInstance.readPage()
        return result
    };

    async searchByXPath(xpath: string){
        const result = await this.repositoryInstance.searchByXPath(xpath)
        return result
    }

    async elementBySelector(selector: string){
        const element = await this.repositoryInstance.elementBySelector(selector)
        return element
    }

    async onClick(element: MyBrowserDTO['element']){
        return await this.repositoryInstance.onClick(element)
    }

    async getTotalHoursWorked({monthSelector, hoursSelector}: { monthSelector: string, hoursSelector: string }){
        const month = await this.elementBySelector(monthSelector)
        await this.onClick(month)

        const hours = await this.searchByXPath(hoursSelector)
        console.log({ hours })
    }
}