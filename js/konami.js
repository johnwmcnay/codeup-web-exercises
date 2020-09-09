"use strict";

const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
let inputs = [];

$(document).keyup(function(event){

    if (inputs.length === 11) {
        inputs.shift();
    }

    inputs.push(event.keyCode);

    let match = function() {

        if (inputs.length < 11) {
            return false;
        }
        for (let index in inputs) {
           if (inputs[index] !== konamiCode[index]) {
               return false;
           }
        };
        return true;
    }();

    if (match) {

        $("#hidden-div").fadeIn()

        console.log("code entered!");
    }

});