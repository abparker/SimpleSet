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

    // shuffle the deck to be in a random order
    for(let i = drawPile.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = drawPile[i];
        drawPile[i] = drawPile[j];
        drawPile[j] = temp;
    }

    // Do all this whenever the user clicks on a card
    function processClick(event) {
        // store the DOM element the user clicked on
        let cardDiv = event.srcElement;

        // Toggle whether the clicked card should show as selected
        let isSelected = cardDiv.classList.contains("selected");
        if (isSelected) {
            cardDiv.classList.remove("selected");
        }
        else {
            cardDiv.classList.add("selected");
            // If three cards are selected, time to do special stuff
            let selectedCardDivs = document.querySelectorAll(".card.selected");
            if (selectedCardDivs.length == 3) {
                if (true){  // TODO: check if the three selected cards are a set
                    // Remove the set and deal new cards until there are 12 on the table
                    for (let div of selectedCardDivs) {
                        div.remove();
                    }
                    while (document.querySelectorAll(".card").length < 12 && drawPile.length > 0) {
                        dealCard();
                    }
                }
            }
            else if (selectedCardDivs.length > 3) {
                // Someone managed to select more than three by accident, just undo all that
                for (let div of selectedCardDivs) {
                    div.classList.remove("selected");
                }
            }
        }
    }

    function dealCard() {
        if (drawPile.length == 0){
            throw "End of Deck";
        }
        let cardTable = document.getElementById("card-table")
        const card = drawPile.pop();

        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = card.toString();
        cardDiv.addEventListener('click', processClick);
        
        cardTable.appendChild(cardDiv);

        // DEBUG: show how many cards remain in the deck
        console.log(drawPile.length);
    }

    // Do this whenever the user clicks the Deal button
    document.getElementById("deal-button").addEventListener('click', (event) => {
        let numToDeal = 3;
        if (document.querySelectorAll(".card").length == 0) {
            numToDeal = 12;
        }
        for (let i=0; i<numToDeal; i++) {
            if (drawPile.length ==0) {
                console.log("No more cards!");
                break;
            }
            dealCard();
        }
    });
});
