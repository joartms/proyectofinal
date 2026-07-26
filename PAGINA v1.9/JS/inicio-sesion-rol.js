var opcionComprador = document.getElementsByClassName("opcion-1")[0];
var opcionVendedor = document.getElementsByClassName("opcion-2")[0];

function activoComprador(){

    opcionVendedor.classList.remove("opcion-activa");
    opcionComprador.classList.add("opcion-activa");
}

function activoVendedor(){

    opcionComprador.classList.remove("opcion-activa");
    opcionVendedor.classList.add("opcion-activa");
}