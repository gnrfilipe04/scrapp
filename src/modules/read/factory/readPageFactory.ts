import { MyBrowser } from "../../../util/browser";
import { MyReadPageRepository } from "../repository/readPageRespository";
import { MyReadPageService } from "../services/readPageService";

export class MyReadPageFactory {
    static async createInstance({ url, }: { url: string}){
        
        const myBrowser = new MyBrowser()
        const myBrowserWithPage = await myBrowser.navigateTo({ url })
        const myReadPageRepository = new MyReadPageRepository({ browserInstance: myBrowserWithPage, })
        const myReadPageService = new MyReadPageService({ repositoryInstance: myReadPageRepository })

        return myReadPageService
    };
}