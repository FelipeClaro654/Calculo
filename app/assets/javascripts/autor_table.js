$(function () {

    Autor_Table ={
        print_autor: function () {
            $(".container").switchClass("container", "print-container");
            $(".container-autor-table").toggleClass("width-percent-70");
            $(".container-autor-table").toggleClass("margin-left-90");
            $(".table-liquidacao td:last-child div").removeClass("margin-right-10");
            $(".autor-details-panel table td div").toggleClass("autor-table-overflow");
        },

        retorna_indice_autor: function (input) {
            var data_base = "";
            if(input.parent().hasClass("processo_autors_periodo_final")){
                data_base = moment(input.val(), "DD/MM/YYYY").add(1,"M").format("DD/MM/YYYY");
            }else{
                data_base = input.val();
            }
            $.ajax({
                url: "/processos/retorna_indice_front",
                dataType: "json",
                data: {
                    data_base: data_base,
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
                            $(".previdencia-assistencia"),
                            $(".liquido-atualizado"),
                            $(".juros"),
                            $(".honorario"),
                            $(".assistencia"),
                            $(".previdencia")
                        ];

            var total = 0;

            $.each(totals, function (i, e) {
                var t = 0;
                $.each(this, function (i, e) {
                    t += parseFloat($(e).data("valor"));
                });

                if($(e).hasClass('liquido-atualizado')
                || $(e).hasClass('juros')
                || $(e).hasClass('honorario')
                ){
                    total += t;
                }
                t = t.toFixed(2);
                t = t.split(".");
                t[0] = Useful.formata_numero(t[0]);
                t = t.join(",");
                totals[i] = t;
            });

            total += parseFloat($(".custas-resultado").html());
            total = total.toFixed(2);
            total = total.split(".");
            total[0] = Useful.formata_numero(total[0]);
            total = total.join(",");

            $(".total-bruto-atualizacao").html(totals[0]);
            $(".total-previdencia-assistencia").html(totals[1]);
            $(".total-liquido-atualizado").html(totals[2]);
            $(".total-juros").html(totals[3]);
            $(".total-honorario").html(totals[4]);
            $(".total-assistencia").html(totals[5]);
            $(".total-previdencia").html(totals[6]);
            $(".total-conta-liquidacao").html(total);

            $.ajax({
                url: "/autors/salva_totais",
                type: "post",
                data: {
                    autor_id: $("#autor_id").val(),
                    bruto: totals[0] != 0 ? totals[0].replace(/\./g,'').replace(",", ".") : 0 ,
                    previdencia_assistencia: totals[1] != 0 ? totals[1].replace(/\./g,'').replace(",", ".") : 0 ,
                    liquido: totals[2] != 0 ? totals[2].replace(/\./g,'').replace(",", ".") : 0 ,
                    juros: totals[3] != 0 ? totals[3].replace(/\./g,'').replace(",", ".") : 0 ,
                    honorario: totals[4] != 0 ? totals[4].replace(/\./g,'').replace(",", ".") : 0 ,
                    assistencia: totals[5] != 0 ? totals[5].replace(/\./g,'').replace(",", ".") : 0 ,
                    previdencia: totals[6] != 0 ? totals[6].replace(/\./g,'').replace(",", ".") : 0 ,
                    total_individual: total != 0 ? total.replace(/\./g,'').replace(",", ".") : 0
                }
            });

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

    $(document).on("click","#print_autor_table", function() {
        var $this = $(this);
        $this.hide();
        $(".container").css("visibility", "hidden");
        Autor_Table.print_autor();
        setTimeout(function () {
            $(".print-container").css("visibility", "visible");
            window.print();
            $(".print-container").css("visibility", "hidden");
            $(".print-container").switchClass("print-container", "container");
            $(".container-autor-table").toggleClass("width-percent-70");
            $(".container-autor-table").toggleClass("margin-left-90");
            setTimeout(function () {
                $(".container").css("visibility", "visible");
                $this.show();
            },500);
        }, 500);
    });

    $(document).on("click","#excel_autor_table", function() {
        $(".container").css("visibility", "hidden");
        $(".container").append("<table id='excel_table'></table>");

        var liquidacao_trs = $(".table-liquidacao tr"),
            autor_trs = $(".autor-table tr"),
            totals_tr = $(".autor-totals-container tr");

        $.each(liquidacao_trs, function (i, e) {
            $.each($(e).find("td"), function (i, e_td) {
                 if (i % 2 === 0) {
                     $(e_td).attr("colspan", 2);
                 }else{
                     $(e_td).attr("colspan", 3);
                 }
            });
            $("#excel_table").append(e);
        });

        $("#excel_table").append("<tr></tr><tr></tr>");

        $.each(autor_trs, function (i, e) {
            $.each($(e).find(".periodo-value"), function (i, e_td) {
                $(e_td).parent().html($(e_td).val());
            });
            $("#excel_table").append(e);
        });

        $("#excel_table").append("<tr></tr><tr></tr>");

        $.each(totals_tr, function (i, e) {
            $("#excel_table").append(e);
        });

    	$("#excel_table").table2excel({
    		name: "Resumo Individual",
            filename: "Resumo",
            fileext: ".xls"
    	});

        $("#excel_table").remove();
        window.location.reload();
     });

    $(document).on("change",".periodo-value", function() {
        var parent = $(this).parents("tr"),
            prev = parent.data("decimo") ? 0 : (parseFloat($(".previdencia-processo").data("previdencia"))/100),
            assist = parent.data("decimo") ? 0 : (parseFloat($(".assistencia-processo").data("assistencia"))/100),
            a = parseFloat($(this).val().split(".").join("").replace(",", ".")),
            b = parseFloat(parent.find(".indice-tabela").data("valor")),
            c = parseFloat(parent.find(".indice-atualizacao").data("valor")),
            d = +(parseFloat(((a / b)*c)).toFixed(2)),
            assist = +(((assist/100)*d).toFixed(2)),
            prev = +(((prev/100)*d).toFixed(2)),
            e = +((prev + assist).toFixed(2)),
            f = +(parseFloat((d - e)).toFixed(2)),
            g = parseFloat(parent.find(".meses").data("valor")),
            h = +(parseFloat(f*g*(parseFloat($(".juros-processo").data("juros"))/100)).toFixed(2)),
            i = +(((d+h)*(10/100)).toFixed(2));



        $.ajax({
            url: '/autors/salva_pagamentos/',
            type: 'post',
            data: {
                pagamento_id: parent.data("pagamento-id"),
                periodo_value: a,
                indice_tabela: b,
                indice_atualizacao: c,
                bruto_atualizacao: d,
                previdencia_assistencia: e,
                liquido_atualizado: f,
                meses: g,
                juros: h,
                honorario: i,
                assistencia: assist.toFixed(2),
                previdencia: prev.toFixed(2)
            },
            success: function () {
                d = d.toFixed(2);
                e = e.toFixed(2);
                f = f.toFixed(2);
                h = h.toFixed(2);
                i = i.toFixed(2);


                parent.find(".bruto-atualizacao").data("valor", d);
                parent.find(".previdencia-assistencia").data("valor", e);
                parent.find(".liquido-atualizado").data("valor", f);
                parent.find(".juros").data("valor", h);
                parent.find(".honorario").data("valor", i);
                parent.find(".assistencia").data("valor", assist);
                parent.find(".previdencia").data("valor", prev);

                d = d.split(".");
                d[0] = Useful.formata_numero(d[0]);
                d = d.join(",");

                e = e.split(".");
                e[0] = Useful.formata_numero(e[0]);
                e = e.join(",");

                f = f.split(".");
                f[0] = Useful.formata_numero(f[0]);
                f = f.join(",");

                h = h.split(".");
                h[0] = Useful.formata_numero(h[0]);
                h = h.join(",");

                i = i.split(".");
                i[0] = Useful.formata_numero(i[0]);
                i = i.join(",");

                parent.find(".bruto-atualizacao").html(d);
                parent.find(".previdencia-assistencia").html(e);
                parent.find(".assistencia").html(assist);
                parent.find(".previdencia").html(prev);
                parent.find(".liquido-atualizado").html(f);
                parent.find(".juros").html(h);
                parent.find(".honorario").html(i);
                Forms.show_message("Informações Atualizadas", "alert-success");
                Autor_Table.update_totals();
            }
        });
    });
});

$(document).on("turbolinks:load", function () {
    if($(".total-conta-liquidacao").length > 0){
        setTimeout(function () {
            Autor_Table.update_totals();
        }, 700)
    }
});

window.onafterprint = function(){
      window.location.reload(true);
 }
