import { ConfigDTO } from "../config"
import { MyReadPageFactory } from "../modules/read/factory/readPageFactory"

export interface AppDTO {
	config: ConfigDTO
	run: ({ url, }: ConfigDTO) => Promise<void>
}

export class App implements AppDTO {
	config: ConfigDTO

	constructor({ config }: Pick<AppDTO, "config">){
		this.config = config
	}

	async run(){

		const { url, titleXPath } = this.config

		const myReadPageFactory = await MyReadPageFactory.createInstance({ url, })
		
		const element = await myReadPageFactory.searchByXPath(titleXPath)

		console.log(element)
	}
}