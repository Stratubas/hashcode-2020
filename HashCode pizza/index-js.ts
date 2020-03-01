import { readFileSync, writeFileSync } from 'fs';
import { getPath } from './helpers/get-path';
import { Menu } from './classes/menu';

const arrayFileNames = ["a_example", "b_small", 'c_medium', 'd_quite_big', 'e_also_big'];
const fileName = arrayFileNames[4];
const inputPath = 'input-data/' + fileName + '.in';
const data = readFileSync(getPath(inputPath), { encoding: 'utf8' });

const menu: any = new Menu(data);
const pizzaTypes = menu.pizzaTypes;
const pizzaSizes = pizzaTypes.map(pizza => pizza.size);
pizzaSizes.sort((a, b) => b.size - a.size);

const maxScore = +data.split(' ')[0];
console.log(menu);
console.log('Max score:', maxScore);
let currentScore = 0;
const resultPizzaIds = [];
for (let index = 0; index < pizzaSizes.length; index++) {
    const size = pizzaSizes[index];
    const nextScore = currentScore + size;
    if (nextScore > maxScore) continue;
    const originalIndex = pizzaSizes.length - index;
    currentScore = nextScore;
    resultPizzaIds.push(originalIndex);
}
const result = `${resultPizzaIds.length}\n${resultPizzaIds.join(' ')}`;
console.log('We scored', currentScore);
console.log(result);
writeFileSync(getPath('output-results/' + fileName + '.txt'), result);
// highscore 504959667