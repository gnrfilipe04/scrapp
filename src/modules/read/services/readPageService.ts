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
}