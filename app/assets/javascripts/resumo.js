$(function () {
    $(document).on("click","#print_resumo", function() {
        $(".container").css("visibility", "hidden");
        $(".resumo-page").toggleClass("print-resumo");
        $(".resumo-page").toggleClass("width-percent-70");
        setTimeout(function () {
            $(".container").css("visibility", "visible");
            window.print();
            setTimeout(function () {
                $(".resumo-page").toggleClass("width-percent-70");
                $(".resumo-page").toggleClass("print-resumo");
            },500);
        }, 500);
    });
});
