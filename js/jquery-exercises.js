// $(document).ready(function() {
//     alert( 'jQuery: The DOM has finished loading!');
// });

// $('#main').css('background-color', 'gray');

// $('.codeup').css('border', '1px solid red');

// $('li').css('font-size', '20px');
//
// $('h1, p, li').css('background-color', 'yellow');
//
//
// $(function() {
//     alert($('h1').html());
// })

$("h1").click(function(){
    $(this).css('background-color', "gray");
})

$("p").dblclick(function(){
    $(this).css("font-size", "18px");
})

$("li").hover(
    function(){
        $(this).css("color", "red")
    },
    function(){
        $(this).css("color", "black")
    }
);