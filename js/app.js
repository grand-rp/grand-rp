
$(document).ready(function () {

    $(function() {
        var e = $(".menu-popup");
        $(".menu-triger, .menu-close").click(function() {
            return e.slideToggle(300, function() {
                e.is(":hidden") ? $("body").removeClass("body_pointer") : $("body").addClass("body_pointer")
            }), !1
        })
    });

    $('.loader').fadeOut(1000);
});