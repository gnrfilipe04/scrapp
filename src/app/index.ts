import { ConfigDTO } from "../config"
import { FileFactory } from "../modules/file/factory/fileFactory"
import { MyReadPageFactory } from "../modules/read/factory/readPageFactory"

export interface AppDTO {
	config: ConfigDTO
	run: () => Promise<void>
}

export class App implements AppDTO {
	config: ConfigDTO

	constructor({ config }: Pick<AppDTO, "config">){
		this.config = config
	}

	async run(){

		const { url, titleXPath, filename } = this.config

		const myReadPageFactory = await MyReadPageFactory.createInstance({ url, })
		
		const element = await myReadPageFactory.searchByXPath(titleXPath)

		if(!element) throw new Error('Element not found')

		const fileFactory = await FileFactory.createInstance({ filename, })

		fileFactory.write(element)

		console.log(element)
	}
}