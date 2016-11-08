$(function () {
    $(".container .calendario").datetimepicker({
        format: "DD/MM/YYYY"
    });

    $(".has-error input").focus(function () {
        var parent = $(this).parents(".form-group");
        parent.removeClass('has-error');
        parent.find(".help-block").remove();
    });
});
