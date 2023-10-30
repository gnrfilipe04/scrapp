import { MyBrowserDTO, NavigateToParams } from "../../../util/browser";
import { MyReadRepositoryDTO } from "../repository/readRespository";

export interface MyReadServiceDTO {
    readPage: MyBrowserDTO['readPage']
    repositoryInstance: MyReadRepositoryDTO
}

export class MyReadService implements MyReadServiceDTO {
    
    repositoryInstance: MyReadRepositoryDTO

    constructor({ repositoryInstance }: Pick<MyReadServiceDTO, "repositoryInstance">){
        this.repositoryInstance = repositoryInstance
    }

    async readPage({ url, options, viewportConfig }: NavigateToParams){ 
        const result = await this.repositoryInstance.readPage({ url, options, viewportConfig })
        return result
    };
}