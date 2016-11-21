$(document).on('turbolinks:load', function() {

    Forms ={
        show_message: function (msg, type) {
            var div = '<div class="alert quick-alert '+type+'" role="alert">'+msg+'</div>';
            $("#show_message").html(div);
            setTimeout(function () {
                $("#show_message").html("");
            }, 4000);
        }
    }

    $(".calendario").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        yearRange: "1950:2016"
    });

    $('#autors').on('cocoon:before-insert', function(e, insertedItem) {
        insertedItem.find(".calendario").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy",
            yearRange: "1950:2016"
        });
    });

    $(".has-error input").focus(function () {
        var parent = $(this).parents(".form-group");
        parent.removeClass("has-error");
        parent.find(".help-block").remove();
    });

    $(".gerar-pagamentos").click(function () {
        $("#processo_indice_tabela").removeAttr("disabled");
        $(".process-form").submit();
    })

    $(".delete-autor").click(function() {
        var ask = confirm("Deseja deletar este autor?");
        if(!ask){
            return false;
        }
        var autor = $(this);
        $.ajax({
            url: "/autors/destroy",
            type: "post",
            data: {
                autor_id: $(this).data("autor-id")
            }
        })
        .done(function(result) {
            $("[data-autor-id='"+result.autor_id+"'].delete-autor").parents(".list-autor").remove();
            Forms.show_message("Autor excluído com sucesso.", "alert-success");
        });

    });
});
