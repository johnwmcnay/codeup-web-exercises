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
})