


(() => {

    var userInput, remainder = 0;

    while (true) {
        userInput = parseInt(prompt("Please enter an odd number between 1 and 50:"));
        remainder = userInput % 2;

        if (!isNaN(userInput)) {

            if (userInput < 1 || userInput > 49)
                continue;

            if (remainder === 1)
                break;
        }
    }


    for (var i = 1; i < 50; i += 2) {
        if (i === userInput) {
            console.log("Yikes! Skipping number: " + i);
            continue;
        }
        console.log("Here is an odd number: " + i)
    }



})();