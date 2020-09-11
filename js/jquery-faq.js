$("#toggle").click(function(){
    $("dd").removeClass("invisible");
    $("dt").removeClass("highlighted");
});

$("#collapse").click(function() {
    $("dd").addClass("invisible");
    $("dt").removeClass("highlighted");
});

$('dt').click(function() {
    $(this).next().toggleClass("invisible");
    let isHidden = $(this).next().hasClass("invisible");
    if (isHidden) {
        $(this).removeClass("highlighted");
    } else {
        $(this).addClass("highlighted");
    }
});

$("#highlight-last").click(function() {
    $("ul").each(function() {
        $(this).children().last().toggleClass("li-highlight");
    });
});

$("h3").click(function() {
   $(this).next().toggleClass("bold-header");
});

$("li").click(function() {
    $(this).parent().children().first().toggleClass("li-text")
});

$("#left-swap").click(function() {
    let originalLeft = $(this).prev().children("img").attr("src");
    let originalCenter = $("#center-swap").prev().children("img").attr("src");

    $(this).prev().children("img").attr("src", originalCenter);
    $("#center-swap").prev().children("img").attr("src", originalLeft);

});

// The left frame swaps to the right and takes the image from the frame in the center.
//     The center frame swaps randomly to either the left or right.
//     The right frame swaps to the left and takes the image from the frame in the center.

$("#center-swap").click(function() {
    let originalCenter = $(this).prev().children("img").attr("src");
    let originalLeft = $("#left-swap").prev().children("img").attr("src");
    let originalRight = $("#right-swap").prev().children("img").attr("src");
    let rand = Math.floor(Math.random() * 2);

    if (rand) {
        $("#left-swap").prev().children("img").attr("src", originalCenter);
        $(this).prev().children("img").attr("src", originalLeft);
    } else {
        $("#right-swap").prev().children("img").attr("src", originalCenter);
        $(this).prev().children("img").attr("src", originalRight);
    }


});

$("#right-swap").click(function() {
    let originalRight = $(this).prev().children("img").attr("src");
    let originalCenter = $("#center-swap").prev().children("img").attr("src");

    $(this).prev().children("img").attr("src", originalCenter);
    $("#center-swap").prev().children("img").attr("src", originalRight);
});