import { Book } from "./book";
import { Library } from "./library";

export class Problem {
    books: Book[];
    libraries: Library[];
    days: number;
    constructor(inputData: string) {
        const lines = inputData.split('\n');
        const firstLineNumbers = lines[0].split(' ').map(string => +string);
        const librariesCount = firstLineNumbers[1];
        this.days = firstLineNumbers[2];
        this.books = lines[1].split(' ').map((score, id) => new Book(id, +score));
        const averageBookScore = this.books.reduce((sum, book) => sum + book.score, 0) / this.books.length;
        const libraryLines = lines.slice(2);
        this.libraries = [];
        for (let libraryIndex = 0; libraryIndex < librariesCount; libraryIndex++) {
            // const libraryIndex = lineIndex / 2 - 1;
            const libraryFirstLine = libraryLines[libraryIndex * 2];
            const librarySecondLine = libraryLines[libraryIndex * 2 + 1];
            const [_, signup, parallel] = libraryFirstLine.split(' ');
            let libraryBooks = librarySecondLine.split(' ').map(id => this.books[+id]);
            libraryBooks = libraryBooks.filter(book => book.score > 0.25 * averageBookScore);
            libraryBooks.sort((a, b) => b.score - a.score);
            const library: Library = new Library(
                libraryIndex,
                +signup,
                +parallel,
                libraryBooks,
            );
            this.libraries.push(library);
        }
    }
}
