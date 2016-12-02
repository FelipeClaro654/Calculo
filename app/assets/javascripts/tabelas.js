$(document).on('turbolinks:load', function() {

    $(document).on("click",".add-ano", function() {
        $.ajax({
            url: '/tabela_'+$(this).data("tabela")+'/add_ano',
            type: 'post'
        })
        .done(function(result) {
            window.location.reload();
        });

    });
    $(document).on("keyup",".valor-tabela", function(e) {
        if(e.keyCode === 9 || e.keyCode === 13){
            $.ajax({
                url: '/tabela_' + $(".add-ano").data("tabela") + '/update_valor',
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

        if(e.keyCode === 32){
            var $this = $(this);

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

    $(document).on("focus",".valor-tabela", function() {
        if($(this).data("decimal") === 2){
            $(this).unmask().mask('###.###.##0,00', {reverse: true});
        }else{
            $(this).unmask().mask('###.###.##0,000000', {reverse: true});

        }
    });

    $(document).on("blur",".valor-tabela", function() {
        var val = $(this).val();
        $(this).unmask();
        $(this).val(val);
    });
});
