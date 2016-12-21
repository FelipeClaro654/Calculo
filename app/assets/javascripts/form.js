var ano_atual = moment().year().toString();

$(document).on('turbolinks:load', function() {

    Forms ={
        calcula_custas_corrigida : function (valor, obrigacao, atualizacao) {
            if((valor === "" || obrigacao === "" || atualizacao === "") ||
                (valor === 0 || obrigacao === 0 || atualizacao === 0)){
                return false;
            }

            return (valor / obrigacao * atualizacao);
        },
        retorna_indice: function (data, tabela, element) {
            $.ajax({
                url: "/processos/retorna_indice_front",
                dataType: "json",
                data: {
                    data_base: data.val(),
                    tabela: tabela,
                    type: "JSON"
                },
                success: function (result) {
                    if(!result.success){
                        $("#no_indice").show();
                        setTimeout(function () {
                            $("#no_indice").hide();
                        }, 3000);
                        return false;
                    }
                    data.parents(".nested-fields").find(element).val(result.indice_tabela.replace(".", ","));
                }
            });
        },

        corrige_decimais: function () {
            $("#processo_juros").val($("#processo_juros").val().replace(",", "."));
            $("#processo_cbpm_ipesp_valor").val($("#processo_cbpm_ipesp_valor").val().replace(",", "."));
            $("#processo_cruz_iamspe_valor").val($("#processo_cruz_iamspe_valor").val().replace(",", "."));
            $("#processo_indice_tabela").val($("#processo_indice_tabela").val().replace(",", "."));

            $.each($(".custas-valor"), function (i, e) {
                $(e).val($(e).val().replace(",", "."));
            });

            $.each($(".custas-indice"), function (i, e) {
                $(e).val($(e).val().replace(",", "."));
            });

            $.each($(".custas-corrigida"), function (i, e) {
                $(e).val($(e).val().replace(",", "."));
            });
        },

        esconde_autores_ja_salvos: function () {
            var inputs = $("#autors input[name*='[id]']");

            $.each(inputs, function () {
                $(this).prev().hide();
            });

            $(".hidden-form-autors").removeClass('hidden');
        },
        esconde_custas_ja_salvas: function () {
            var inputs = $("#custas input[name*='[id]']");

            $.each(inputs, function () {
                $(this).prev().hide();
            });

            $(".hidden-form-custas").removeClass('hidden');
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
        },
        set_custas_corrigida: function (element) {
            if($("#processo_indice_tabela").val() === ""){
                Forms.show_message("Selecione a Data Base no processo para calcular custas.", "alert-warning");
                $("#processo_data_base").effect("highlight").focus();
                return false;
            }
            var parent = element.parents(".nested-fields");
                corrigida = Forms.calcula_custas_corrigida(parseFloat(parent.find(".custas-valor").val()),
                                                            parseFloat(parent.find(".custas-indice").val().replace(",", ".")),
                                                            parseFloat($("#processo_indice_tabela").val())
                                                        );
            if(!corrigida){
                return false;
            }
            parent.find(".custas-corrigida").val(corrigida.toFixed(2).replace(".",","));
            parent.find(".help-block").remove();
            parent.find(".has-error").removeClass("has-error");
        }
    }

    $(document).on("change","#processo_data_base", function() {
        Autor_Table.retorna_indice();
        $.each($(".custas-valor"), function (i, e) {
            Forms.set_custas_corrigida($(e));
        });
    });

    $(document).on("change",".panel-autor .calendario", function() {
        if($(this).val() != ""){
            Autor_Table.retorna_indice_autor($(this));
        }
    });

    $(document).on("change",".custas-valor", function() {
        Forms.set_custas_corrigida($(this));
    });

    $(document).on("change",".custas-data", function() {
        var $this = $(this);
        Forms.retorna_indice(
            $(this),
            $("#processo_tabela_atualizacao_id option:selected").text(),
            ".custas-indice"
        );
        setTimeout(function () {
            Forms.set_custas_corrigida($this.parents(".nested-fields").find(".custas-valor"));
        }, 300);
    });

    $(document).on("click",".edit-custa", function() {
        var input = $(".hidden-form-custas input[type='hidden'][value='"+$(this).data("custa-id")+"']").prev();
        input.css("display","block");
        $(this).parents("ul").replaceWith(input);
        input.find(".btn-remove-autor").removeClass("margin-top-14").addClass("neg-margin-top-3");
        input.find("label").remove();
        input.find(".col-xs-2,.col-xs-1").removeClass('margin-top-12');
        input.find(".col-xs-2,.col-xs-1").css("height", "42px");
        input.find("hr").remove();
        input.find(".custas-data").change(function () {
            var $this = $(this);
            Forms.retorna_indice(
                $(this),
                $("#processo_tabela_atualizacao_id option:selected").text(),
                ".custas-indice"
            );
            setTimeout(function () {
                Forms.set_custas_corrigida($this.parents(".nested-fields").find(".custas-valor"));
            }, 300);
        });

        input.find(".custas-valor").change(function () {
            Forms.set_custas_corrigida($(this));
        });
    });

    $(".calendario").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        yearRange: "1950:" + ano_atual
    });

    setTimeout(function () {
        if($(".custas-indice").length > 0){
            $(".custas-indice").val($(".custas-indice").val().replace(".", ","));
        }

        $.each($(".custas-valor"), function (i, e) {
            var decimal = $(e).val().split(".")[1];
            if(decimal.length < 2){
                decimal = decimal + "0";
                $(e).val( $(e).val().split(".")[0]+ decimal);
            }
        });

        $(".custas-valor").mask('000,00', {reverse: true});
        $(".custas-corrigida").mask('000,00', {reverse: true});

        $.each($(".custas-data"), function (i, e) {
            var string = $(e).val().split("-");
            if(string.length > 1){
                $(e).val(string[2]+"/"+string[1]+"/"+string[0]);
            }
        });

        var error_custas = $(".custas-error");

        if(error_custas.length > 0){
            $.each(error_custas , function(i, e){
                $(e).parents("ul").addClass('error-ul-custas');
            });
            $(".error-ul-custas").find(".edit-custa").trigger("click");
        }
    }, 200);

    setTimeout(function () {
        $.each($(".processo_custas_custas_data.has-error") , function(i, e){
            $(e).find("input").val("");
            $(e).parents(".col-xs-2").css("height", "48px");
        });
    },500)

    $('#autors, #custas').on('cocoon:before-insert', function(e, insertedItem) {
        insertedItem.find(".calendario").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy",
            yearRange: "1950:" + ano_atual
        });

        insertedItem.find(".custas-data").change(function () {
            var $this = $(this);
            Forms.retorna_indice(
                $(this),
                $("#processo_tabela_atualizacao_id option:selected").text(),
                ".custas-indice"
            );
            setTimeout(function () {
                Forms.set_custas_corrigida($this.parents(".nested-fields").find(".custas-valor"));
            }, 300);
        });

        insertedItem.find(".custas-valor").change(function () {
            Forms.set_custas_corrigida($(this));
        });

        insertedItem.find(".custas-valor").mask('000,00', {reverse: true});

    });

    $(".has-error input").focus(function () {
        var parent = $(this).parents(".form-group");
        parent.removeClass("has-error");
        parent.find(".help-block").remove();
    });

    $(".gerar-pagamentos").click(function () {
        Forms.corrige_decimais();
        $("#processo_indice_tabela, .custas-indice, .custas-corrigida").removeAttr("disabled");
        Forms.atualiza_juros();
    })

    $(".delete-autor").click(function() {
        var ask = confirm("Deseja deletar este autor?");
        if(!ask){
            return false;
        }
        var autor = $(this);
        $.ajax({
            url: "/autors/delete_autor",
            type: "post",
            data: {
                autor_id: $(this).data("autor-id")
            }
        });

    });

    $(".delete-custa").click(function() {
        var ask = confirm("Deseja deletar esta custa?");
        if(!ask){
            return false;
        }
        var autor = $(this);
        $.ajax({
            url: "/custas/destroy",
            type: "post",
            data: {
                custa_id: $(this).data("custa-id")
            }
        });

    });

    $("#processo_juros, #processo_cbpm_ipesp_valor, #processo_cruz_iamspe_valor").
        mask('000,00', {reverse: true});

    Forms.esconde_autores_ja_salvos();
    Forms.esconde_custas_ja_salvas();
});
