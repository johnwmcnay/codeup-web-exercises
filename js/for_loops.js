
const showMultiplicationTable = num => {

    for (var i = 1; i <= 10; i++) {
        console.log("" + num + " x " + i + " = " + (num * i));
    }

}

showMultiplicationTable(7);

const isEvenOrOdd = num => {
    return (num % 2 === 0 ? " is even" : " is odd");
}

const randomNumbersEvenOrOdd = num => {
    var random = undefined;

    for (var i = 0; i < num; i++) {
        random = Math.floor((Math.random() * 180) + 20);
        console.log("" + random + isEvenOrOdd(random));
    }
}

randomNumbersEvenOrOdd(10);