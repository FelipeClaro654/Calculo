$(function () {
    setTimeout(function () {
        $(".total-assistencia").html($(".total-assistencia-autor").html());
    },700);

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
