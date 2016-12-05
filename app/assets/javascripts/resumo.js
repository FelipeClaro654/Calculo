$(document).on('turbolinks:load', function() {
    $(".total-assistencia").html($(".total-assistencia-autor").html());

    $(document).on("click","#print_resumo", function() {
        $(".container").css("visibility", "hidden");
        $(".resumo-page").addClass("print-resumo");
        setTimeout(function () {
            $(".container").css("visibility", "visible");
            window.print();
            setTimeout(function () {
                $(".resumo-page").removeClass("print-resumo");
            },500);
        }, 500);
    });
});
