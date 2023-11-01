export interface ConfigDTO {
    url: string
    titleXPath: string
}

export class Config implements ConfigDTO {
    url: string
    titleXPath: string

    constructor({ url, titleXPath, }: ConfigDTO){
        this.url = url
        this.titleXPath = titleXPath
    }
}