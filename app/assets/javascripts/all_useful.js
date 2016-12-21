Useful = {
    formata_numero: function (num) {
         return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

$(document).on("click",".toggle-panel", function() {
    var icon = $(this).find(".icon-toggle-panel");

    if(icon.hasClass("glyphicon-menu-right")){
        icon.switchClass("glyphicon-menu-right", "glyphicon-menu-down", "fast");
    }else{
        icon.switchClass("glyphicon-menu-down", "glyphicon-menu-right", "fast");
    }

    icon.parents(".panel").find(".panel-body").toggleClass('hidden');

});
