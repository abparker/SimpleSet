class Card {
    constructor(number, fill, color, shape) {
        this.number = number;
        this.fill = fill;
        this.color = color;
        this.shape = shape;
    }

    toString() {
        let str = `${this.number} ${this.fill} ${this.color} ${this.shape}`;
        if (this.number > 1) {
            str += "s";
        }
        return str;
    }
}


window.addEventListener('load', (event) => {
    let drawPile = [];
    const numbers = [1, 2, 3];
    const fills = ["Empty", "Dotted", "Filled"];
    const colors = ["Blue", "Orange", "Lime"];
    const shapes = ["Circle", "Trapezoid", "Hourglass"];

    for (const number of numbers) {
        for (const fill of fills) {
            for (const color of colors) {
                for (const shape of shapes) {
                    drawPile.push(new Card(number, fill, color, shape));
                }
            }
        }
    }

    // TODO: shuffle the deck to be in a random order, see:
    // https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb




    document.getElementById("show-twelve").addEventListener('click', (event) => {
        document.getElementById("card-list").innerHTML = "";
        for (let i=0; i<12; i++) {
            document.getElementById("card-list").innerHTML += drawPile[i].toString() + "<br>";
        }
    });
});
