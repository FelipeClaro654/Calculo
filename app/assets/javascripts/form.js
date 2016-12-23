var ano_atual = moment().year().toString();

$(function () {

    Forms ={
        calcula_corrigida : function (valor, obrigacao, atualizacao) {
            if((valor === "" || obrigacao === "" || atualizacao === "") ||
                (valor === 0 || obrigacao === 0 || atualizacao === 0)){
                if(valor === 0){
                    Forms.show_message("Insira valor maior que 0", "alert-danger");
                    return false;
                }
            }

            return (valor / (obrigacao * atualizacao));
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
            $("#processo_sucumbencia").val($("#processo_sucumbencia").val().replace(",", "."));

            $.each($(".custas-valor"), function (i, e) {
                $(e).val($(e).val().replace(",", "."));
            });

            $.each($(".custas-indice"), function (i, e) {
                $(e).val($(e).val().replace(",", "."));
            });

            $.each($(".custas-corrigida"), function (i, e) {
                $(e).val($(e).val().replace(",", "."));
            });

            $.each($(".sucumbencia-valor"), function (i, e) {
                $(e).val($(e).val().replace(",", "."));
            });

            $.each($(".sucumbencia-indice"), function (i, e) {
                $(e).val($(e).val().replace(",", "."));
            });

            $.each($(".sucumbencia-corrigida"), function (i, e) {
                $(e).val($(e).val().replace(",", "."));
            });
        },
        esconde_ja_salvos: function (type) {
            var inputs = $("#"+type+" input[name*='[id]']");

            $.each(inputs, function () {
                $(this).prev().hide();
            });

            $(".hidden-form-"+type).removeClass('hidden');
        },
        toggle_sucumbencia: function () {
            if($("#processo_tipo_sucumbencia_id option:selected").text() == "valor"){
                $("#processo_sucumbencia").val("0").prop("disabled", true);
                $(".panel-sucumbencia").removeClass('hidden');
            }else{
                $("#processo_sucumbencia").prop("disabled", false);
                $(".panel-sucumbencia").addClass('hidden');
            }
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
                });
            }

            $("#processo_indice_tabela, .custas-indice, .custas-corrigida, .sucumbencia-indice, .sucumbencia-corrigida").
                removeAttr("disabled");

            if($("#processo_tipo_sucumbencia_id option:selected").text() == "%"){
                $(".hidden-form-sucumbencia_valors").html("");
                $(".sucumbencia-ul").remove();
            }

            $(".process-form").submit();
        },
        set_corrigida: function (element, type) {
            if($("#processo_indice_tabela").val() === ""){
                Forms.show_message("Selecione a Data Base no processo para calcular "+type+".", "alert-warning");
                $("#processo_data_base").effect("highlight").focus();
                return false;
            }
            var parent = element.parents(".nested-fields");
                corrigida = Forms.calcula_corrigida(parseFloat(parent.find("."+type+"-valor").val()),
                                                            parseFloat(parent.find("."+type+"-indice").val().replace(",", ".")),
                                                            parseFloat($("#processo_indice_tabela").val())
                                                        );
            if(!corrigida){
                return false;
            }
            parent.find("."+type+"-corrigida").val(corrigida.toFixed(2).replace(".",","));
            parent.find(".help-block").remove();
            parent.find(".has-error").removeClass("has-error");
        }
    }

    $(".custas-valor").mask("000,00", {reverse: true});
    $(".sucumbencia-valor").mask("000,00", {reverse: true});
    $(".calendario").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        yearRange: "1950:" + ano_atual
    });

    Forms.esconde_ja_salvos("autors");
    Forms.esconde_ja_salvos("custas");
    Forms.esconde_ja_salvos("sucumbencia_valors");
    Forms.toggle_sucumbencia("custas");
});


$(document).on("change", "#processo_tipo_sucumbencia_id", function () {
    Forms.toggle_sucumbencia();
});

$(document).on("click", ".custas-heading", function () {
    if($(".btn-add-autor").hasClass('default-position')){
        $(".btn-add-autor").css("top", "256px");
    }else{
        $(".btn-add-autor").css("top", "51px");
    }
    $(".btn-add-autor").toggleClass('default-position');
});

$(document).on("change","#processo_data_base", function() {
    Autor_Table.retorna_indice();
    $.each($(".custas-valor"), function (i, e) {
        Forms.set_corrigida($(e), "custas");
    });
    $.each($(".sucumbencia-valor"), function (i, e) {
        Forms.set_corrigida($(e), "sucumbencia");
    });
});

$(document).on("change",".panel-autor .calendario", function() {
    if($(this).val() != ""){
        Autor_Table.retorna_indice_autor($(this));
    }
});

$(document).on("change",".custas-valor", function() {
    Forms.set_corrigida($(this), "custas");
});

$(document).on("change",".sucumbencia-valor", function() {
    Forms.set_corrigida($(this), "sucumbencia");
});

//TODO: EXTRAIR FUNÇÕES DE DATA E VALOR DAS CUSTAS PARA FUNÇÕES, APROVEITA-LAS PARA SUCUMBENCIA
$(document).on("change",".sucumbencia-data", function() {
    var $this = $(this);
    Forms.retorna_indice(
        $(this),
        $("#processo_tabela_atualizacao_id option:selected").text(),
        ".sucumbencia-indice"
    );
    setTimeout(function () {
        Forms.set_corrigida($this.parents(".nested-fields").find(".sucumbencia-valor"), "sucumbencia");
    }, 300);
});

$(document).on("change",".custas-data", function() {
    var $this = $(this);
    Forms.retorna_indice(
        $(this),
        $("#processo_tabela_atualizacao_id option:selected").text(),
        ".custas-indice"
    );
    setTimeout(function () {
        Forms.set_corrigida($this.parents(".nested-fields").find(".custas-valor"), "custas");
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
            Forms.set_corrigida($this.parents(".nested-fields").find(".custas-valor"), "custas");
        }, 300);
    });

    input.find(".custas-valor").change(function () {
        Forms.set_corrigida($(this), "custas");
    });

    input.find(".custas-data").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        yearRange: "1950:" + ano_atual
    });

    $.each($(".custas-data"), function (i, e) {
        var string = $(e).val().split("-");
        if(string.length > 1){
            $(e).val(string[2]+"/"+string[1]+"/"+string[0]);
        }
    });

    input.find(".custas-valor, .custas-indice, .custas-corrigida").mask("000,00", {reverse: true});
});

$(document).on("click",".edit-sucumbencia", function() {
    var input = $(".hidden-form-sucumbencia_valors input[type='hidden'][value='"+$(this).data("sucumbencia-id")+"']").prev();
    input.css("display","block");
    $(this).parents("ul").replaceWith(input);
    input.find(".btn-remove-autor").removeClass("margin-top-14").addClass("neg-margin-top-3");
    input.find("label").remove();
    input.find(".col-xs-2,.col-xs-1").removeClass('margin-top-12');
    input.find(".col-xs-2,.col-xs-1").css("height", "42px");
    input.find("hr").remove();
    input.find(".sucumbencia-data").change(function () {
        var $this = $(this);
        Forms.retorna_indice(
            $(this),
            $("#processo_tabela_atualizacao_id option:selected").text(),
            ".sucumbencia-indice"
        );
        setTimeout(function () {
            Forms.set_corrigida($this.parents(".nested-fields").find(".sucumbencia-valor"), "sucumbencia");
        }, 300);
    });

    input.find(".sucumbencia-valor").change(function () {
        Forms.set_corrigida($(this), "sucumbencia");
    });

    input.find(".sucumbencia-data").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        yearRange: "1950:" + ano_atual
    });

    input.find(".sucumbencia-valor, .sucumbencia-indice, .sucumbencia-corrigida").mask("000,00", {reverse: true});
});

$(document).on("cocoon:before-insert", ".cocoon-container", function(e, insertedItem) {
    insertedItem.find(".custas-valor").mask("000,00", {reverse: true});
    insertedItem.find(".sucumbencia-valor").mask("000,00", {reverse: true});
    insertedItem.find(".calendario").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        yearRange: "1950:" + ano_atual
    });
});

$(document).on("focus", ".has-error input", function () {
    var parent = $(this).parents(".form-group");
    parent.removeClass("has-error");
    parent.find(".help-block").remove();
});

$(document).on("click", ".gerar-pagamentos", function () {
    Forms.corrige_decimais();
    Forms.atualiza_juros();
})

$(document).on("click", ".delete-autor, .delete-custa, .delete-sucumbencia", function() {

    var ask, post, data;

    if($(this).hasClass('delete-autor')){
        ask = confirm("Deseja deletar este autor?");
        url = "/autors/delete_autor";
        data = { autor_id: $(this).data("autor-id") };
    }else if($(this).hasClass('delete-custa')){
        ask = confirm("Deseja deletar esta custa?");
        url = "/custas/destroy";
        data = { custa_id: $(this).data("custa-id") };
    }else{
        ask = confirm("Deseja deletar esta sucumbencia?");
        url = "/sucumbencia_valors/destroy";
        data = { sucumbencia_id: $(this).data("sucumbencia-id") };
    }

    if(!ask){
        return false;
    }

    $.post(url, data);
});

$(document).on("turbolinks:load", function () {
    Forms.toggle_sucumbencia("custas");

    $("#processo_data_base, #processo_data_distribuicao, #processo_data_citacao").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy",
        yearRange: "1950:" + ano_atual
    });

    $(".cocoon-add a").
        data("association-insertion-method", 'append').
        data("association-insertion-node", function(link){
            return link.parents(".panel").find('.cocoon-container');
    });

    $("#processo_juros, #processo_cbpm_ipesp_valor, #processo_cruz_iamspe_valor, #processo_sucumbencia").
        mask('000,00', {reverse: true});

        setTimeout(function () {
            if($(".custas-indice").length > 0){
                $(".custas-indice").val($(".custas-indice").val().replace(".", ","));
            }

            $.each($(".custas-valor"), function (i, e) {
                if($(e).val().includes(".") || $(e).val().includes(",")){
                    var delimiter = $(e).val().includes(".") ? "." : ",",
                        decimal = $(e).val().split(delimiter)[1];
                    if(decimal.length < 2 && decimal != undefined){
                        decimal = decimal + "0";
                        $(e).val( $(e).val().split(delimiter)[0] + delimiter + decimal);
                    }
                    $(e).mask('000,00', {reverse: true});
                }
            });

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


            if($(".sucumbencia-indice").length > 0){
                $(".sucumbencia-indice").val($(".sucumbencia-indice").val().replace(".", ","));
            }

            $.each($(".sucumbencia-valor"), function (i, e) {
                if($(e).val().includes(".") || $(e).val().includes(",")){
                    var delimiter = $(e).val().includes(".") ? "." : ",",
                        decimal = $(e).val().split(delimiter)[1];
                    if(decimal.length < 2 && decimal != undefined){
                        decimal = decimal + "0";
                        $(e).val( $(e).val().split(delimiter)[0] + delimiter + decimal);
                    }
                    $(e).mask('000,00', {reverse: true});
                }
            });

            $(".sucumbencia-corrigida").mask('000,00', {reverse: true});

            $.each($(".sucumbencia-data"), function (i, e) {
                var string = $(e).val().split("-");
                if(string.length > 1){
                    $(e).val(string[2]+"/"+string[1]+"/"+string[0]);
                }
            });

            var error_sucumbencia = $(".sucumbencia-error");

            if(error_sucumbencia.length > 0){
                $.each(error_sucumbencia , function(i, e){
                    $(e).parents("ul").addClass('error-ul-sucumbencia');
                });
                $(".error-ul-sucumbencia").find(".edit-sucumbencia").trigger("click");
            }
        }, 200);

        setTimeout(function () {
            $.each($(".processo_custas_custas_data.has-error") , function(i, e){
                $(e).find("input").val("");
                $(e).parents(".col-xs-2").css("height", "48px");
            });
        },500);

        $.each($(".panel"), function (i, e) {
            if($(e).find(".has-error").length > 0){
                $(e).find(".toggle-panel").trigger("click");
            }
        });
});
