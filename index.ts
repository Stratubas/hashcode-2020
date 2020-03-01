import { readFileSync, writeFileSync } from 'fs';
import { getPath } from './helpers/get-path';
import { Problem } from './classes/problem';
import { Library } from './classes/library';
import { Book } from './classes/book';

const arrayFileNames = ['a_example', 'b_read_on', 'c_incunabula', 'd_tough_choices', 'e_so_many_books', 'f_libraries_of_the_world'];

arrayFileNames.forEach((name, index) => solve(index));
// solve(4);

function solve(problemIndex: number) {

    const fileName = arrayFileNames[problemIndex];
    const inputPath = 'input-data/' + fileName + '.txt';
    const data = readFileSync(getPath(inputPath), { encoding: 'utf8' });
    const problem = new Problem(data);
    const startTime = Date.now();
    console.log('Solving', fileName);
    console.log(problem.books.length, 'books and', problem.libraries.length, 'libraries for', problem.days, 'days');

    const resultLibraries: Library[] = [];
    const resultLibraryBooks: Book[][] = [];
    let daysConsumed = 0;
    const takenLibrariesMap: { [key: number]: boolean } = {};
    const knownBooks: { [key: number]: boolean } = {};

    for (let resultLibraryIndex = 0; resultLibraryIndex < problem.libraries.length; resultLibraryIndex++) {
        if (daysConsumed > problem.days) {
            break;
        }
        let bestLibrary: Library = null;
        let bestLibraryScore: number = -1;
        let libraryBooks: Book[] = [];
        problem.libraries.forEach(library => {
            if (takenLibrariesMap[library.id]) {
                return;
            }
            const { score, remainingBooks } = library.getScoreForTotalDays(problem.days - daysConsumed, knownBooks);
            const normalizedScore = (score ** 1) / library.signup;
            if (normalizedScore > bestLibraryScore) {
                bestLibraryScore = normalizedScore;
                bestLibrary = library;
                libraryBooks = remainingBooks;
            }
        });
        resultLibraries.push(bestLibrary);
        daysConsumed += bestLibrary.signup;
        takenLibrariesMap[bestLibrary.id] = true;
        const allLibraryBooks = bestLibrary.books;
        const includedBookIds = {};
        libraryBooks.forEach(book => {
            knownBooks[book.id] = true;
            includedBookIds[book.id] = true;
        });
        const finalBooks = [...libraryBooks, ...allLibraryBooks.filter(book => !includedBookIds[book.id])];
        resultLibraryBooks.push(finalBooks);
    }

    // resultLibraries.forEach(library => {
    //     console.log(library.books);
    //     let scores = '';
    //     for (let day = 0; day < problem.days; day++) {
    //         scores += library.getScoreForTotalDays(day) + ' ';
    //     }
    //     console.log(scores);
    // });

    // const resultLibraries = problem.libraries;
    // let result = `${resultLibraries.length}\n`;
    let result = '';
    let librariesCount = 0;
    resultLibraries.forEach((library, index) => {
        const books = resultLibraryBooks[index];
        if (books.length === 0) {
            return;
        }
        result += `${library.id} ${books.length}\n`;
        result += books.map(book => book.id).join(' ') + '\n';
        librariesCount++;
    });
    result = `${librariesCount}\n${result}`;
    writeFileSync(getPath('output-results/' + fileName + '.txt'), result);
    console.log('Done in', Date.now() - startTime, 'ms');

}
