var ano_atual = moment().year().toString();

$(document).on('turbolinks:load', function() {

    Forms ={
        corrige_decimais: function () {
            $("#processo_juros").val($("#processo_juros").val().replace(",", "."));
            $("#processo_cbpm_ipesp_valor").val($("#processo_cbpm_ipesp_valor").val().replace(",", "."));
            $("#processo_cruz_iamspe_valor").val($("#processo_cruz_iamspe_valor").val().replace(",", "."));
            $("#processo_custas_valor").val($("#processo_custas_valor").val().replace(",", "."));
            $("#processo_indice_tabela").val($("#processo_indice_tabela").val().replace(",", "."));
        },

        esconde_autores_ja_salvos: function () {
            var inputs = $("#autors input[name*='[id]']");

            $.each(inputs, function () {
                $(this).prev().hide();
            });

            $(".hidden-form-autors").removeClass('hidden');
        },
        show_message: function (msg, type) {
            var div = '<div class="alert quick-alert '+type+'" role="alert">'+msg+'</div>';
            $("#show_message").html(div);
            setTimeout(function () {
                $("#show_message").html("");
            }, 4000);
        },
        atualiza_juros: function () {
            if($("#processo_data_base").val() == "" || $("#processo_data_citacao").val() == ""){
                Forms.show_message("Preencha os campos Data Base e Data Citação!", "alert-warning");
                return false;
            }

            if($("#processo_tipo_juro_id option:selected").text() == "tabela"){
                var data = "";

                if($("#processo_data_calculo_id option:selected").text() == "Data"){
                    data = moment($("#processo_data_base").datepicker("getDate"));
                }else{
                    data = moment($("#processo_data_citacao").datepicker("getDate"));
                }

                $.ajax({
                    url: '/processos/atualiza_juros',
                    data: {
                        ano: data.format("YYYY"),
                        mes: data.format("MM")
                    }
                })
                .done(function(result) {
                    $("#processo_juros").val(result.juros_atualizado);
                    $(".process-form").submit();
                });

            }else{
                $(".process-form").submit();
            }
        }
    }

    $(document).on("change",".panel-autor .calendario", function() {
        if($(this).val() != ""){
            Autor_Table.retorna_indice_autor($(this));
        }
    });

    $(".calendario").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        yearRange: "1950:" + ano_atual
    });

    $('#autors').on('cocoon:before-insert', function(e, insertedItem) {
        insertedItem.find(".calendario").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy",
            yearRange: "1950:" + ano_atual
        });
    });

    $(".has-error input").focus(function () {
        var parent = $(this).parents(".form-group");
        parent.removeClass("has-error");
        parent.find(".help-block").remove();
    });

    $(".gerar-pagamentos").click(function () {
        Forms.corrige_decimais();
        $("#processo_indice_tabela").removeAttr("disabled");
        Forms.atualiza_juros();
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
        .done(function() {
            window.location.href = window.location.href;
        });

    });

    $("#processo_juros, #processo_cbpm_ipesp_valor, #processo_cruz_iamspe_valor, #processo_custas_valor, #processo_custas_resultado").
        mask('000,00', {reverse: true});

    Forms.esconde_autores_ja_salvos();
});
