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
		
		await this.titlePageToFile()
		
	}

	async titlePageToFile(){
		const element = await this.getTitlePage()

		const elementOrNotFound = element || 'Element not found!'

		this.setTitleInFile({ element: elementOrNotFound })
	}

	async getTitlePage(){
		const { url, titleXPath, } = this.config

		const myReadPageFactory = await MyReadPageFactory.createInstance({ url, })
		
		const element = await myReadPageFactory.searchByXPath(titleXPath)

		return element
	}

	async setTitleInFile({ element, }: { element: string}){
		const { filename, } = this.config

		const fileFactory = await FileFactory.createInstance({ filename, })

		fileFactory.write(element)
	}
}