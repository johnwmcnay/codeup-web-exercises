"use strict";

( () => {
    console.log("Hello from external JavaScript");

    alert("Welcome to my website!");

    do {
        var response = prompt("What is your favorite color?");
    } while (!isNaN(response) || response === '');

    alert("Great, " + response.toLowerCase() + " is my favorite color too.");
})();

var totalRentalCost = (() => {
    const pricePerDay = 3;
    var rentalData = {};
    var totalCost = 0;

    var rentMovie = (movieTitle, daysToRent) => {
        rentalData[movieTitle] = daysToRent;
    };

    rentMovie("Little Mermaid", 3);
    rentMovie("Brother Bear", 5);
    rentMovie("Hercules", 1);

    for (var title in rentalData) {
        totalCost += (rentalData[title] * pricePerDay);
    }
    return "$" + totalCost.toFixed(2);
})();

alert("The total cost of your rentals is " + totalRentalCost);

var totalWagesEarned = ( () => {

    var totalEarned = 0;
    var totalHoursWorked = 0;
    var hoursAndWages = {};
    var company;

    var workAt = (company, hours, wagePerHour) => {
        hoursAndWages[company] = {"hours": hours,
            "wages": wagePerHour};
    };

    workAt("Google", 6, 400);
    workAt("Amazon", 4, 380);
    workAt("Facebook", 10, 350);

    for (var key in hoursAndWages) {
        company = hoursAndWages[key];
        totalHoursWorked += company["hours"];
        totalEarned += (company["hours"] * company["wages"]);
    }
    return {"hours": totalHoursWorked,
        "wages": "$" + totalEarned.toFixed(2)};
})();

alert("You worked " + totalWagesEarned["hours"] + " hours and earned " + totalWagesEarned["wages"]);

var alertMessage = ( () => {
    const maxHours = 16;
    const maxClassSize = 25;
    var currentHours = 0;
    var currentClassSize = 20; //arbitrarily assigned
    var isSeatAvailable = currentClassSize < maxClassSize;
    var isScheduleOpen = currentHours < maxHours;

    do {
        currentHours = prompt("To see if you can enroll, " +
            "please enter how many hours you already have scheduled: " +
            "(max: 15)");
    } while (isNaN(currentHours) || currentHours === '');

    if (isSeatAvailable && isScheduleOpen)
        return "Congrats! You are able to enroll.";
    else
        return "Sorry! Unfortunately, you cannot not enroll at this time.";
})();

alert(alertMessage);

alertMessage = ( () => {
    var isPremiumMember = confirm("Please click OK if you are a Premium Member:");
    var isOfferValid = true //arbitrarily assigned
    var itemsBought = '';

    do {
        itemsBought = prompt("How many items are you going to buy?");
    } while (isNaN(itemsBought) || itemsBought === '');

    if (((itemsBought > 2) || (isPremiumMember)) && isOfferValid)
        return "Thank you for your purchase!";
    else
        return "You are not able to complete your purchase at this time.";
})();

alert(alertMessage);