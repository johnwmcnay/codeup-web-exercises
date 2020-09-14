
$(function() {
    $.get("data/blog.json").done(function(data) {
        for (let obj of data) {
            addPost(obj);
        }
    });

    function addPost(obj) {
        let element = document.createElement("div")
        let template = $("#template");

        $(element).html($(template).html());
        $(element).addClass("post container w-50 mb-3");
        $(element).find(".date").html(obj.date);
        $(element).find(".categories").html(
            "tags:&nbsp;<span class='tags'>" + obj.categories.join(" ") + "</span>")
        $(element).find(".content").html(obj.content);
        $(element).find(".main-title").html(obj.title);

        $("#posts").prepend(element);
    }

    setInterval(function(){
        //check for new posts
        $.get("data/blog.json").done(function(data) {
            for (let obj of data) {
                let page = $("#posts").html();
                if ((page.indexOf(obj.title) === -1) && (page.indexOf(obj.content) === -1)) {
                    addPost(obj);
                }
            }
        });

    }, 5000);
});
