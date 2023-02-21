
let lista_clientes = [];

//alta de usuario
function set_data() {
    //capturar datos de donde los meto

    let nombre_cliente = document.getElementById("nombre");
    let apellido_cliente = document.getElementById("apellido");
    let mail_cliente = document.getElementById("mail");
    let pass_cliente = document.getElementById("pass");

    //arreglo de los clientes
    let cliente = { 
        nombre: nombre_cliente.value, 
        apellido: apellido.value, 
        mail: mail.value, 
        password: pass_cliente.value };


    //pushh al arreglo lista clientes
    lista_clientes.push(cliente);
    //JSON
    let arreglo_JSON = JSON.stringify(lista_clientes);
    //LOCALSTORAGE
    localStorage.setItem("nuevo_cliente", arreglo_JSON);
}

function login_cliente() {
    //tomo los datos del boton
    let nombre_cliente = document.getElementById("nombre");
    let pass_cliente = document.getElementById("pass");
    //recupero para chequear localStorage
    let recuperando_clientes = localStorage.getItem("nuevo_cliente");
    //tengo que hacer un PARSE, para poder ver lo que hay
    recuperando_clientes = JSON.parse(recuperando_clientes);

    for (let cliente of recuperando_clientes) {
        if (nombre_cliente.value == cliente.nombre && pass_cliente.value == cliente.password) {
                                      window.location.href = "entrega3b.html"

        }
        else {
       Swal.fire({
                icon: 'warning',
                title: 'Oops, parece que no estas registrado',
                text: 'por favor hazlo!',
                footer: '<a href="index.html">Volver</a>'
              })
        }
    }
}


//capturo botones y agrego el evento click

let btn_registro = document.getElementById("btn_registro");
btn_registro.addEventListener("click", set_data);

let btn_login = document.getElementById("btn_login");
btn_login.addEventListener("click", login_cliente);


