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
    var movies = ["Little Mermaid", "Brother Bear", "Hercules"];
    var result = '';

    var rentMovie = (movieTitle, daysToRent) => {
        rentalData[movieTitle] = daysToRent;
    };

    for (var title in movies) {
        result = prompt("How long would you like to rent " +
            movies[title] + "?");
        rentMovie(movies[title], Number(result));
    }

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
    var companies = ["Google", "Amazon", "Facebook"];
    var hours = 0, wage = 0;
    var workAt = (company, hours, wagePerHour) => {
        hoursAndWages[company] = {"hours": hours,
            "wages": wagePerHour};
    };

    for (var company in companies) {
        hours = prompt("How many hours did you work at " +
            companies[company] + "?");
        wage = prompt("What was your per hour wage at " +
            companies[company] + "?");
        workAt(companies[company], Number(hours), Number(wage));
    }

    for (var key in hoursAndWages) {
        company = hoursAndWages[key];
        totalHoursWorked += company["hours"];
        totalEarned += (company["hours"] * company["wages"]);
    }
    return {"hours": totalHoursWorked,
        "wages": "$" + totalEarned.toFixed(2)};
})();

alert("You worked " + totalWagesEarned["hours"] +
    " hours and earned " + totalWagesEarned["wages"]);

var alertMessage = ( () => {
    const maxHours = 16, maxClassSize = 25;
    var currentHours = 0, currentClassSize = 20; //arbitrarily assigned
    var isSeatAvailable = currentClassSize < maxClassSize;
    var isScheduleOpen = false;

    do {
        currentHours = prompt("To see if you can enroll, " +
            "please enter how many hours you already have scheduled: " +
            "(max: 15)");
    } while (isNaN(currentHours) || currentHours === '');

    isScheduleOpen = currentHours < maxHours;

    if (isSeatAvailable && isScheduleOpen)
        return "Congrats! You are able to enroll.";
    else
        return "Sorry! Unfortunately, you cannot not enroll at this time.";
})();

alert(alertMessage);

alertMessage = ( () => {
    var isPremiumMember = confirm("Please click OK if you are a Premium Member:");
    var isOfferValid = true; //arbitrarily assigned
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