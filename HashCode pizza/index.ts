import { readFileSync, writeFileSync } from 'fs';
import { getPath } from './helpers/get-path';
import { Menu } from './classes/menu';

const arrayFileNames = ["a_example", "b_small", 'c_medium', 'd_quite_big', 'e_also_big'];
const fileName = arrayFileNames[4];
const inputPath = 'input-data/' + fileName + '.in';
const data = readFileSync(getPath(inputPath), { encoding: 'utf8' });
const menu: Menu = new Menu(data);
console.log(menu);
const maxScore = +data.split(' ')[0];
console.log('Max score:', maxScore);
let currentScore = 0;
const resultPizzaIds = [];
menu.pizzaTypes.sort((a, b) => b.size - a.size);
for (const pizza of menu.pizzaTypes) {
    const nextScore = currentScore + pizza.size;
    if (nextScore > maxScore) continue;
    currentScore = nextScore;
    resultPizzaIds.push(pizza.id);
}
const result = `${resultPizzaIds.length}\n${resultPizzaIds.join(' ')}`;
console.log('We scored', currentScore);
console.log(result);
writeFileSync(getPath('output-results/' + fileName + '.txt'), result);
// highscore 504959667