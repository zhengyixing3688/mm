$(".dropdown").hover(
    function() {
        // over
        $(this).addClass("open");
    },
    function() {
        // out
        $(this).removeClass("open");
    }
);
