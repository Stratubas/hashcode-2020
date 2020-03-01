"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var get_path_1 = require("./helpers/get-path");
var menu_1 = require("./classes/menu");
var arrayFileNames = ["a_example", "b_small", 'c_medium', 'd_quite_big', 'e_also_big'];
var fileName = arrayFileNames[4];
var inputPath = 'input-data/' + fileName + '.in';
var data = fs_1.readFileSync(get_path_1.getPath(inputPath), { encoding: 'utf8' });
var menu = new menu_1.Menu(data);
console.log(menu);
var maxScore = +data.split(' ')[0];
console.log('Max score:', maxScore);
var currentScore = 0;
var resultPizzaIds = [];
menu.pizzaTypes.sort(function (a, b) { return b.size - a.size; });
for (var _i = 0, _a = menu.pizzaTypes; _i < _a.length; _i++) {
    var pizza = _a[_i];
    var nextScore = currentScore + pizza.size;
    if (nextScore > maxScore)
        continue;
    currentScore = nextScore;
    resultPizzaIds.push(pizza.id);
}
var result = resultPizzaIds.length + "\n" + resultPizzaIds.join(' ');
console.log('We scored', currentScore);
console.log(result);
fs_1.writeFileSync(get_path_1.getPath('output-results/' + fileName + '.txt'), result);
// highscore 504959667
