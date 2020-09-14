
(function() {
    $.get("data/blog.json").done(function(data) {

        let template = $("#template");

        // const properties = ["title", "content", "date", "categories"];
        for (let obj of data) {
            let element = document.createElement("div")
            $(element).html($(template).html());
            $(element).addClass("post container w-50 mb-3");
            $(element).find(".date").html(obj.date);
            $(element).find(".categories").html(
                "tags:&nbsp;<span class='tags'>" + obj.categories.join(" ") + "</span>")
            $(element).find(".content").html(obj.content);
            $(element).find(".main-title").html(obj.title);

            $("#posts").append(element);

        }
    });





})();
