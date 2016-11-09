$(function () {
    $(".container .calendario").datetimepicker({
        format: "DD/MM/YYYY"
    });

    $('#autors').on('cocoon:before-insert', function(e, insertedItem) {
        if(!$(".btn-add-autor").hasClass('btn-add-autor-position')){
            $(".btn-add-autor").addClass('btn-add-autor-position');
        }
        insertedItem.find(".calendario").datetimepicker({
            format: "DD/MM/YYYY"
        });
    });

    $(".has-error input").focus(function () {
        var parent = $(this).parents(".form-group");
        parent.removeClass('has-error');
        parent.find(".help-block").remove();
    });
});
