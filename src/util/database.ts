import fs from 'fs';

export interface DatabaseProps {
    filename: string
    read: () => unknown
    write: (data: string) => void
}

export class Database implements DatabaseProps{
    filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    read(): unknown {
        try {
            const data = fs.readFileSync(this.filename, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            console.error(`Error reading file from disk: ${err}`);
        }
    }

    write(data: string): void {
        try {
            const stringifiedData = JSON.stringify(data, null, 2);
            fs.writeFileSync(this.filename, stringifiedData, 'utf-8');
        } catch (err) {
            console.error(`Error writing file on disk: ${err}`);
        }
    }
}