import { Database, DatabaseProps } from "../../../util/database";

export interface FileRepositoryProps extends Omit<DatabaseProps, "filename"> {
    databaseInstance: DatabaseProps
}

export class FileRepository {
    databaseInstance: DatabaseProps

constructor({ databaseInstance }: Pick<FileRepositoryProps, "databaseInstance">){
        this.databaseInstance = databaseInstance
    }

    read() {
        return this.databaseInstance.read()
    }
    write(data: string) {
        this.databaseInstance.write(data)
    }
}