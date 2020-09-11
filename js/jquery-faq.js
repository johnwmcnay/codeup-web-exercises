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