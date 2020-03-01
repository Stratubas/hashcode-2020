import { Book } from "./book";

export class Library {
    constructor(
        public id: number,
        public signup: number,
        public booksPerDay: number,
        public books: Book[],
    ) { }
    getScoreForTotalDays(totalDays: number, knownBooks: { [key: number]: boolean }) {
        const remainingBooks = this.books.filter(book => knownBooks[book.id] !== true);
        const finalBooks = [];
        let score = 0;
        let bookIndex = 0;
        // let logic = '';
        for (let day = 0; day < totalDays; day++) {
            if (day < this.signup) {
                // logic += 'R ';
                continue;
            }
            // logic += 'G';
            if (bookIndex >= remainingBooks.length) {
                // logic += 'T ';
                break;
            }
            for (let thisDayBookIndex = 0; thisDayBookIndex < this.booksPerDay; thisDayBookIndex++) {
                const nextBookScore = remainingBooks[bookIndex].score;
                // logic += nextBookScore + '+';
                score += nextBookScore;
                finalBooks.push(remainingBooks[bookIndex]);
                bookIndex++;
                if (bookIndex >= remainingBooks.length) {
                    // logic += 'T '
                    // console.log(logic, 'score', score);
                    return { score, remainingBooks: finalBooks };
                }
            }
        }
        // console.log(logic, 'score', score);
        return { score, remainingBooks: finalBooks };
    }
}
