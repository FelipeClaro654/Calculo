$(function () {

    Autor_Table ={
        retorna_indice_autor: function (input) {

            $.ajax({
                url: "/processos/retorna_indice_front",
                dataType: "json",
                data: {
                    data_base: input.val(),
                    tabela: $("#processo_tabela_atualizacao_id option:selected").text(),
                    type: "JSON"
                }
            })
            .done(function(result, x, y) {
                if(!result.success){
                    input.val("");
                    $("#no_indice").show();
                    setTimeout(function () {
                        $("#no_indice").hide();
                    }, 3000);
                    $("#processo_tabela_atualizacao_id").effect("pulsate", {}, 500);
                    return false;
                }
            });
        },

        retorna_indice: function () {
            $.ajax({
                url: "/processos/retorna_indice_front",
                dataType: "json",
                data: {
                    data_base: $("#processo_data_base").val(),
                    tabela: $("#processo_tabela_atualizacao_id option:selected").text(),
                    type: "JSON"
                }
            })
            .done(function(result) {
                if(!result.success){
                    $("#processo_indice_tabela").val("");
                    $("#no_indice").show();
                    setTimeout(function () {
                        $("#no_indice").hide();
                    }, 3000);
                    return false;
                }
                $("#processo_indice_tabela").val(result.indice_tabela);
                var parent = $("#processo_indice_tabela").parents(".form-group");
                parent.removeClass('has-error');
                parent.find(".help-block").remove();
            });
        },
        update_totals: function () {
            var totals = [  $(".bruto-atualizacao"),
                            $(".previdencia"),
                            $(".liquido-atualizado"),
                            $(".juros"),
                            $(".honorario") ];

            $.each(totals, function (i, e) {
                var t = 0;
                $.each(this, function (i, e) {
                    t += parseFloat($(e).data("valor"));
                })
                totals[i] = t;
            });
            $(".total-bruto-atualizacao").html(totals[0].toFixed(2).replace(".",","));
            $(".total-previdencia").html(totals[1].toFixed(2).replace(".",","));
            $(".total-liquido-atualizado").html(totals[2].toFixed(2).replace(".",","));
            $(".total-juros").html(totals[3].toFixed(2).replace(".",","));
            $(".total-honorario").html(totals[4].toFixed(2).replace(".",","));
        }
    }

    var down = false;

    $(document).on("keydown",".periodo-value", function(e) {
         var keycode = (e.keyCode ? e.keyCode : e.which);
         if(keycode == '109'){
              if (down == false) { // first press
                  $(this).parents("tr").next("tr").find(".periodo-value").val($(this).val()).focus();
                  down = true; // record that the key's down
              }
              setTimeout(function () {
                  down = false;
              }, 200);
         }
     });

    $(".periodo-value").mask('000.000.000,00', {reverse: true});

    $(document).on("change","#processo_tabela_atualizacao_id", function() {
        if($("#processo_data_base").val() != ""){
            Autor_Table.retorna_indice();
        }
    });

    $(document).on("change","#processo_data_base", function() {
        Autor_Table.retorna_indice();
    });
    $(document).on("change",".periodo-value", function() {
        var parent = $(this).parents("tr"),
            a = parseFloat($(this).val().split(".").join("").replace(",", ".")),
            b = parseFloat(parent.find(".indice-tabela").data("valor")),
            c = parseFloat(parent.find(".indice-atualizacao").data("valor")),
            d = +(parseFloat(((a / b)*c)).toFixed(2)),
            e = +(parseFloat((d*( (parseFloat($(".previdencia-processo").data("previdencia"))/100) +
                                (parseFloat($(".assistencia-processo").data("assistencia"))/100) ))
                          ).toFixed(2)),
            f = +(parseFloat((d - e)).toFixed(2)),
            g = parseFloat(parent.find(".meses").data("valor")),
            h = +(parseFloat(f*g*(parseFloat($(".juros-processo").data("juros"))/100)).toFixed(2)),
            i = +(((d+h)*(10/100)).toFixed(2));

        d = d.toFixed(2);
        e = e.toFixed(2);
        f = f.toFixed(2);
        h = h.toFixed(2);
        i = i.toFixed(2);

        parent.find(".bruto-atualizacao").html(d.replace(".",",")).data("valor", d);
        parent.find(".previdencia").html(e.replace(".",",")).data("valor", e);
        parent.find(".liquido-atualizado").html(f.replace(".",",")).data("valor", f);
        parent.find(".juros").html(h.replace(".",",")).data("valor", h);
        parent.find(".honorario").html(i.replace(".",",")).data("valor", i);

        $.ajax({
            url: '/autors/salva_pagamentos/',
            type: 'post',
            data: {
                pagamento_id: parent.data("pagamento-id"),
                periodo_value: a,
                indice_tabela: b,
                indice_atualizacao: c,
                bruto_atualizacao: d,
                previdencia: e,
                liquido_atualizado: f,
                meses: g,
                juros: h,
                honorario: i
            }
        }).done(function () {
            Forms.show_message("Informações Atualizadas", "alert-success");
        });
        Autor_Table.update_totals();
    });

    Autor_Table.update_totals();
});
