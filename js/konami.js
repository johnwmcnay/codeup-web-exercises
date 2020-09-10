"use strict";

const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
let sequencePosition = 0;
let intervalID;
let spotlightID;

$(document).keyup(function(event){

    if (event.keyCode === konamiCode[sequencePosition]) {
        let elements = $("#konami").children();
        $(elements[sequencePosition]).addClass("secret-input");
        sequencePosition++;
    } else {

        for (let element of $("#konami").children()) {
            $(element).removeClass("secret-input");
            sequencePosition = 0;
        }
    }

    if (sequencePosition === 11) {
        sequencePosition = 0;

        if (intervalID === undefined) {
            intervalID = setInterval(function(){
                for (let element of $("#konami").children()) {
                    let randomNumber = Math.floor(Math.random() * 7);
                    $(element).css("color", colors[randomNumber]);
                }

            }, 100);
            $("html").animate({backgroundColor: "#757575"});

            spotlightID = setInterval(function() {
                let randomX = Math.floor(Math.random() * 80 + 10);
                let randomY = Math.floor(Math.random() * 80 + 10);
                $("#spotlight").animate({
                    left: randomX.toString() + "%",
                    top: randomY.toString() + "%",
                    opacity: '0.5',
                }, 1200, "swing");
            }, 1200);

        } else {
            clearInterval(intervalID);
            $("#spotlight").animate({opacity: "0"});
            clearInterval(spotlightID);
            intervalID = undefined;
            $("html").animate({backgroundColor: "#D3D3D3"});
            for (let element of $("#konami").children()) {
                element.style = "";
                $(element).removeClass("secret-input");
            }
        }
    }
});