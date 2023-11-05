import { Database, DatabaseProps } from "../../../util/database";
import { FileRepositoryProps } from "../repository/fileRepository";

interface FileServiceProps extends Omit<FileRepositoryProps, "databaseInstance"> {
    repositoryInstance: FileRepositoryProps
}

export class FileService implements FileServiceProps  {
    repositoryInstance: FileRepositoryProps

    constructor({ repositoryInstance }: Pick<FileServiceProps, "repositoryInstance">){
        this.repositoryInstance = repositoryInstance
    }

    read() {
        return this.repositoryInstance.read()
    }
    
    write(data: string) {
        this.repositoryInstance.write(data)
    }
}