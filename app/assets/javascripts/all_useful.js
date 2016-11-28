Useful = {
    formata_numero: function (num) {
         return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}
