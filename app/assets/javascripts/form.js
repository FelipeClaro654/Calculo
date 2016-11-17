$(document).on('turbolinks:load', function() {
    $(".calendario").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        yearRange: "1950:2016"
    });

    $('#autors').on('cocoon:before-insert', function(e, insertedItem) {
        if(!$(".btn-add-autor").hasClass('btn-add-autor-position')){
            $(".btn-add-autor").addClass('btn-add-autor-position');
        }
        insertedItem.find(".calendario").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy",
            yearRange: "1950:2016"
        });
    });

    $(".has-error input").focus(function () {
        var parent = $(this).parents(".form-group");
        parent.removeClass('has-error');
        parent.find(".help-block").remove();
    });

    $(".gerar-pagamentos").click(function () {
        $("#processo_indice_tabela").removeAttr('disabled');
        $(".process-form").submit();
    })
});
