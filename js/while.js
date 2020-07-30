
( (exp) => {

    var i = 1;

    while (i <= exp) {
        console.log(2**i);
        i++;
    }

})(16);

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

( () => {
    var conesToSell = randomNum(50, 100);
    var howManyToSell;

    do {
        howManyToSell = randomNum(1, 5);
        if (howManyToSell <= conesToSell) {
            console.log('' + howManyToSell + " cone" + (howManyToSell === 1 ? '' : 's') +
                " sold...");
            conesToSell -= howManyToSell;
        } else {
            console.log("I can't sell you " + howManyToSell + " cones, " +
                "I only have " + conesToSell + "...");
        }
    } while (conesToSell > 0)
    console.log("Yay! I sold them all!");
})();