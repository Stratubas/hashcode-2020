"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Menu = /** @class */ (function () {
    function Menu(stringInput) {
        var lines = stringInput.split('\n');
        var sizes = lines[1].split(' ');
        this.pizzaTypes = sizes.map(function (size, id) { return ({ size: +size, id: id }); });
    }
    return Menu;
}());
exports.Menu = Menu;
