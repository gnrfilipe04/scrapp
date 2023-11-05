import { Database, DatabaseProps } from "../../../util/database"
import { FileRepository } from "../repository/fileRepository"
import { FileService } from "../service/fileService"

export class FileFactory {
    static async createInstance({ filename, }: { filename: string}){
        
        const db: DatabaseProps = new Database(filename)
        const fileRepository = new FileRepository({ databaseInstance: db, })
        const fileService = new FileService({ repositoryInstance: fileRepository, })

        return fileService

    };
}