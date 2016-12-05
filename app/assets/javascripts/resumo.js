$(function () {
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


$(document).on("click","#print_autor_table", function() {
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
        },500);
    }, 500);
});
