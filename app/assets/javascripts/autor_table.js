$(function () {
    $(".periodo-value").change(function() {
        var parent = $(this).parents("tr"),
            a = parseFloat($(this).val().replace(",", ".")),
            b = parseFloat(parent.find(".indice-tabela").html()),
            c = parseFloat(parent.find(".indice-atualizacao").html()),
            d = parseFloat(((a / b)*c)),
            e = parseFloat((d*0.01)),
            f = parseFloat((d - e)),
            g = parseFloat(parent.find(".meses").html()),
            h = parseFloat(d*g*(0.5/100)),
            i = (d+h)*(10/100);

        parent.find(".bruto-atualizacao").html(d.toFixed(2));
        parent.find(".previdencia").html(e.toFixed(2));
        parent.find(".liquido-atualizado").html(f.toFixed(2));
        parent.find(".juros").html(h.toFixed(2));
        parent.find(".honorario").html(i.toFixed(2));
        
        if(parent.data("pagamento-id") === ""){
            $.ajax({
                url: '/autors/salva_pagamentos/',
                type: 'post',
                data: {
                    autor_id: $("#autor_id").val(),
                    table_index: parent.data("table-index"),
                    periodo_inicial: parent.find(".periodo-inicial").html().replace(/^\s+|\s+$/gm,'').replace(/\r?\n|\r/g, " "),
                    periodo_final: parent.find(".periodo-final").html().replace(/^\s+|\s+$/gm,'').replace(/\r?\n|\r/g, " "),
                    periodo_value: parent.find(".periodo-value").val(),
                    indice_tabela: parent.find(".indice-tabela").html().replace(/^\s+|\s+$/gm,'').replace(/\r?\n|\r/g, " "),
                    bruto_atualizacao: parent.find(".bruto-atualizacao").html().replace(/^\s+|\s+$/gm,'').replace(/\r?\n|\r/g, " "),
                    previdencia: parent.find(".previdencia").html(),
                    liquido_atualizado: parent.find(".liquido-atualizado").html(),
                    meses: parent.find(".meses").html().replace(/^\s+|\s+$/gm,'').replace(/\r?\n|\r/g, " "),
                    juros: parent.find(".juros").html(),
                    honorario: parent.find(".honorario").html()
                }
            })
            .done(function() {
                console.log("success");
            });
        }else{
            $.ajax({
                url: '/autors/editar_pagamentos/',
                type: 'post',
                data: {
                    id: parent.data("pagamento-id"),
                    periodo_inicial: parent.find(".periodo-inicial").html().replace(/^\s+|\s+$/gm,''),
                    periodo_final: parent.find(".periodo-final").html().replace(/^\s+|\s+$/gm,''),
                    periodo_value: parent.find(".periodo-value").val(),
                    indice_tabela: parent.find(".indice-tabela").html(),
                    bruto_atualizacao: parent.find(".bruto-atualizacao").html(),
                    previdencia: parent.find(".previdencia").html(),
                    liquido_atualizado: parent.find(".liquido-atualizado").html(),
                    meses: parent.find(".meses").html(),
                    juros: parent.find(".juros").html(),
                    honorario: parent.find(".honorario").html()
                }
            }).done(function () {

            });
        }


    });
});
