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
		
		await this.getTotalHoursWorked()
		
	}

	async titlePageToFile(){
		const content = await this.getTitlePage()

		const contentOrNotFound = content || 'Content not found!'

		this.setTitleInFile({ content: contentOrNotFound })
		
	}

	async getTitlePage(){
		const { url, titleXPath, } = this.config

		const myReadPageFactory = await MyReadPageFactory.createInstance({ url, })
		
		const content = await myReadPageFactory.searchByXPath(titleXPath)
		
		return content
	}

	async setTitleInFile({ content, }: { content: string}){
		const { filename, } = this.config

		const fileFactory = await FileFactory.createInstance({ filename, })

		fileFactory.write(content)
	}

	async getTotalHoursWorked(){
		const { url, } = this.config
		const MONTH_SELECTOR = 'swiper-slide swiper-slide-next'
		const HOURS_SELECTOR = '/html/body/div[2]/div[2]/div/div[2]/div[2]/div[1]/strong[1]/span'
		const myReadPageFactory = await MyReadPageFactory.createInstance({ url, }) 

		myReadPageFactory.getTotalHoursWorked({ hoursSelector: HOURS_SELECTOR, monthSelector: MONTH_SELECTOR })
	}
}