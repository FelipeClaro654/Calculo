$(document).on("turbolinks:load", function () {

    setTimeout(function () {
        totals ={
            custas: 0,
            liquido: 0,
            previdencia: 0,
            assistencia: 0,
            bruto: 0,
            juros: 0,
            subtotal: 0,
            honorario: 0,
            total_sem_custas: 0,
            total_apurado: 0,
            total_individual: 0
        }

        $.each($(".custas-atualizada"), function (i, e) {
            totals.custas += parseFloat($(e).html().replace(",","."));
        });

        $.each($(".autor-liquido"), function (i, e) {
            totals.liquido += parseFloat($(e).html().split('.').join("").replace(",","."));
        });

        $.each($(".autor-previdencia"), function (i, e) {
            totals.previdencia += parseFloat($(e).html().split('.').join("").replace(",","."));
        });

        $.each($(".autor-assistencia"), function (i, e) {
            totals.assistencia += parseFloat($(e).html().split('.').join("").replace(",","."));
        });

        $.each($(".autor-bruto"), function (i, e) {
            totals.bruto += parseFloat($(e).html().split('.').join("").replace(",","."));
        });

        $.each($(".autor-juros"), function (i, e) {
            totals.juros += parseFloat($(e).html().split('.').join("").replace(",","."));
        });


        $.each($(".autor-honorario"), function (i, e) {
            totals.honorario += parseFloat($(e).html().split('.').join("").replace(",","."));
        });

        $.each($(".autor-total-individual"), function (i, e) {
            totals.total_individual += parseFloat($(e).html().split('.').join("").replace(",","."));
        });

        var subtotal = totals.bruto + totals.juros,
            total_sem_custas = totals.honorario + subtotal,
            total_apurado = total_sem_custas + totals.custas;

        total_sem_custas = total_sem_custas.toFixed(2);
        total_sem_custas = total_sem_custas.split(".");
        total_sem_custas[0] = Useful.formata_numero(total_sem_custas[0]);
        total_sem_custas = total_sem_custas.join(",");

        $(".total-sem-custas").html(total_sem_custas);

        subtotal = subtotal.toFixed(2);
        subtotal = subtotal.split(".");
        subtotal[0] = Useful.formata_numero(subtotal[0]);
        subtotal = subtotal.join(",");
        $(".total-subtotal").html(subtotal);

        totals.custas = totals.custas.toFixed(2);
        totals.custas = totals.custas.split(".");
        totals.custas[0] = Useful.formata_numero(totals.custas[0]);
        totals.custas = totals.custas.join(",");
        $(".total-custas").html(totals.custas);

        total_apurado = total_apurado.toFixed(2);
        total_apurado = total_apurado.split(".");
        total_apurado[0] = Useful.formata_numero(total_apurado[0]);
        total_apurado = total_apurado.join(",");
        $(".total-apurado").html(total_apurado);

        totals.liquido = totals.liquido.toFixed(2);
        totals.liquido = totals.liquido.split(".");
        totals.liquido[0] = Useful.formata_numero(totals.liquido[0]);
        totals.liquido = totals.liquido.join(",");
        $(".total-liquido").html(totals.liquido);

        totals.previdencia = totals.previdencia.toFixed(2);
        totals.previdencia = totals.previdencia.split(".");
        totals.previdencia[0] = Useful.formata_numero(totals.previdencia[0]);
        totals.previdencia = totals.previdencia.join(",");
        $(".total-previdencia").html(totals.previdencia);

        totals.assistencia = totals.assistencia.toFixed(2);
        totals.assistencia = totals.assistencia.split(".");
        totals.assistencia[0] = Useful.formata_numero(totals.assistencia[0]);
        totals.assistencia = totals.assistencia.join(",");
        $(".total-assistencia").html(totals.assistencia);

        totals.bruto = totals.bruto.toFixed(2);
        totals.bruto = totals.bruto.split(".");
        totals.bruto[0] = Useful.formata_numero(totals.bruto[0]);
        totals.bruto = totals.bruto.join(",");
        $(".total-bruto").html(totals.bruto);

        totals.juros = totals.juros.toFixed(2);
        totals.juros = totals.juros.split(".");
        totals.juros[0] = Useful.formata_numero(totals.juros[0]);
        totals.juros = totals.juros.join(",");
        $(".total-juros").html(totals.juros);

        totals.honorario = totals.honorario.toFixed(2);
        totals.honorario = totals.honorario.split(".");
        totals.honorario[0] = Useful.formata_numero(totals.honorario[0]);
        totals.honorario = totals.honorario.join(",");
        $(".total-honorario").html(totals.honorario);

        totals.total_individual = totals.total_individual.toFixed(2);
        totals.total_individual = totals.total_individual.split(".");
        totals.total_individual[0] = Useful.formata_numero(totals.total_individual[0]);
        totals.total_individual = totals.total_individual.join(",");
        $(".total-individual").html(totals.total_individual);

    },500);
});

$(function () {
    $(document).on("click","#print_resumo", function() {
        var $this = $(this);
        $this.hide();
        $(".container").css("visibility", "hidden");
        $("body").toggleClass("print-resumo");
        $(".resumo-page").switchClass("width-percent-70", "width-percent-100");
        setTimeout(function () {
            $(".container").css("visibility", "visible");
            window.print();
            setTimeout(function () {
                $(".resumo-page").switchClass("width-percent-100", "width-percent-70");
                $("body").toggleClass("print-resumo");
                $this.show();
            },500);
        }, 500);
    });

});
