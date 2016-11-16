$(document).on('turbolinks:load', function() {
    $(".calendario").datepicker({
        changeMonth: true,
        changeYear: true,
        format: "DD/MM/YYYY",
        onClose: function(dateText, inst) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        }
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
