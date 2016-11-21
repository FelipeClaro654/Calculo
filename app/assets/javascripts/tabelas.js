$(function () {
    $(".add-ano").click(function() {
        $.ajax({
            url: '/tabela_'+$(this).data("tabela")+'/add_ano',
            type: 'post'
        })
        .done(function(result) {
            window.location.reload();
        });

    });

    $(".valor-tabela").keyup(function(e) {
        if(e.keyCode === 9 || e.keyCode === 13){
            $.ajax({
                url: '/tabela_'+$(this).data("tabela")+'/update_valor',
                type: 'post',
                data: {
                    ano: $(this).data("ano"),
                    mes: $(this).data("mes"),
                    valor: $(this).val().replace(/\./g,'').replace(",",".")
                }
            }).done(function () {
                Forms.show_message("Índice atualizado!", "alert-success");
            });
        }
    });

    $('.valor-tabela').focus(function () {
        if($(this).data("decimal") === 2){
            $(this).unmask().mask('000.000.000,00', {reverse: true});
        }else{
            $(this).unmask().mask('000.000.000,000000', {reverse: true});

        }
    });

    $('.valor-tabela').blur(function () {
        var val = $(this).val();
        $(this).unmask();
        $(this).val(val);
    });

    $('.valor-tabela').keyup(function (e) {
        var $this = $(this);
        if(e.keyCode === 32){
            if($this.data("decimal") === 2){
                $this.data("decimal", 5);

            }else{
                $this.data("decimal", 2);
            }
            $this.trigger("blur");
            setTimeout(function () {
                $this.trigger("focus");
            }, 500);
        }
    });

});
