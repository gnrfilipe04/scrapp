import { MyBrowserDTO, NavigateToParams } from "../../../util/browser";

export interface MyReadRepositoryDTO {
    readPage: MyBrowserDTO['readPage']
    browserInstace: MyBrowserDTO
}

export class MyReadRepository implements MyReadRepositoryDTO {
    browserInstace: MyBrowserDTO

    constructor({ browserInstace }: Pick<MyReadRepositoryDTO, "browserInstace">){
        this.browserInstace = browserInstace
    }

    async readPage({ url, options, viewportConfig }: NavigateToParams){ 
        const result = await this.browserInstace.readPage({ url, options, viewportConfig })
        return result
    };
}