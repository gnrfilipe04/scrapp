export interface ConfigDTO {
    url: string
    titleXPath: string
    filename: string
}

export class Config implements ConfigDTO {
    url: string
    titleXPath: string
    filename: string

    constructor({ url, titleXPath, filename, }: ConfigDTO){
        this.url = url
        this.titleXPath = titleXPath
        this.filename = filename
    }
}