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
debugger;
        parent.find(".bruto-atualizado").html(d.toFixed(2));
        parent.find(".previdencia").html(e.toFixed(2));
        parent.find(".liquido-atualizado").html(f.toFixed(2));
        parent.find(".juros").html(h.toFixed(2));
        parent.find(".honorario").html(i.toFixed(2));
        //d=(a/b).c
    });
});
