import { MyBrowser } from "../../../util/browser";
import { MyReadRepository } from "../repository/readRespository";
import { MyReadService } from "../services/readService";

export class MyReadFactory {
    static async createInstance(){
        const myBrowser = new MyBrowser()
        const myReadRepository = new MyReadRepository({ browserInstace: myBrowser, })
        const myReadService = new MyReadService({ repositoryInstance: myReadRepository })

        return myReadService
    };
}