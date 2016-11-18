$(function () {
    $(".valor-tabela").change(function() {
        $.ajax({
            url: '/tabela_opv/update_valor',
            type: 'post',
            data: {
                ano: $(this).data("ano"),
                mes: $(this).data("mes"),
                valor: $(this).val()
            }
        }).done(function () {
            console.log("success");
        })
    });
});
