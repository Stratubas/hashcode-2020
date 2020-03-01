import { Pizza } from './pizza';

export class Menu {
    pizzaTypes: Pizza[];
    constructor(stringInput: string) {
        const lines = stringInput.split('\n');
        const sizes = lines[1].split(' ');
        this.pizzaTypes = sizes.map((size, id) => ({ size: +size, id }));
    }
}
