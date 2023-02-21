//arreglo
let datos_del_prestamo = [];

function calcular_prestamo() {

    let num_importe = document.getElementById("importe");
    let importe = num_importe.value;


    if (importe != "FIN") {
        importe = parseFloat(importe);
        let num_cuotas = document.getElementById("cuotas");
        let cuotas = num_cuotas.value;


        //funcion para calcular el interes de las cuotas
        function calcular_interes(importe, cuotas) {
            let interes;
            if (cuotas == 3) {
                return interes = importe * 0.35;
            }
            else if (cuotas == 6) {
                return interes = importe * 0.55;
            }
            else if (cuotas == 9) {
                return interes = importe * 0.75;
            }
            else if (cuotas == 12) {
                return interes = importe * 1.20;
            }
            else {
                return false
            }
        }
        let total_a_devolver = (importe + calcular_interes(importe, cuotas));
        let cuota_mensual = ((importe + calcular_interes(importe, cuotas)) / cuotas);

        // objeto
        class Prestamo {
            constructor(importe, cuotas, total_a_devolver, cuota_mensual) {
                this.importe = importe;
                this.cuotas = cuotas;
                this.total_a_devolver = total_a_devolver;
                this.cuota_mensual = cuota_mensual;
            }
        }

        let nuevo_prestamo = new Prestamo(importe, cuotas, total_a_devolver, cuota_mensual);

        datos_del_prestamo.push(nuevo_prestamo);


        //datos a JSON
        let datos_del_prestamoJSON = JSON.stringify(datos_del_prestamo);


        // envio al localStorage
        localStorage.setItem("arr_datos_prestamo", datos_del_prestamoJSON);


        //recupero arreglo prestamo
        let recuperando_prestamo = localStorage.getItem("arr_datos_prestamo");
        recuperando_prestamo = JSON.parse(recuperando_prestamo);

        
      //ACA NO LOGRO IMPRIMIR UNA SOLA VEZ CADA ARREGLO, IMPRIME 0- DESPUES 0-1 DESPUES 0-1-2 Y ASI SUCESIVO AYUDAAA!!!!!
            for (let i = 0; i < recuperando_prestamo.length ; i++ ){

                //aca tengo que enviar datos al HTML
                let principal = document.getElementById("principal");

                let fieldset = document.createElement("fieldset");

                      fieldset.innerHTML = ` 
                                           <legend>Los datos de su prestamo son: </legend>
                                           <li> importe prestado ${recuperando_prestamo[i].importe}</li>
                                           <li> en cuotas ${recuperando_prestamo[i].cuotas}</li> 
                                           <li> total a devolver ${recuperando_prestamo[i].total_a_devolver}</li>
                                           <li> en cuotas mensuales de ${recuperando_prestamo[i].cuota_mensual}</li>`
        
        
                //aca engancho el hijo al padre
                principal.append(fieldset);
            }
    }
    else {
        Swal.fire({
            title: 'GRACIAS POR HABERNOS TENIDO EN CUENTA',
            footer: ` <a href="entrega3.html">Volver</a>`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }

          })
        /*
        document.body.innerHTML = `<h1> GRACIAS POR HABERNOS TENIDO EN CUENTA </h1>
                                       <br>
                                       <a href="entrega3.html">Volver</a>`;*/
    }


}


let boton_calcular = document.getElementById("btn_calcular");
boton_calcular.addEventListener("click", calcular_prestamo);



fetch("https://api.bluelytics.com.ar/v2/latest")
    .then(response => response.json()) 
    .then(data => mostrarData(data))
        
     
let mostrarData = (data)=> { 
                        console.log(data)
                        let body = " ";
                        
                        body = `
                                <legend>DOLAR HOY</legend>
                                <li> DOLAR OFICIAL  </li>
                                <li> Precio de compra $ ${data.oficial.value_buy} </li>
                                <li> Precio promedio $ ${data.oficial.value_avg} </li>
                                <li> Precio de venta $ ${data.oficial.value_sell} </li>
                                <br>
                                <li> DOLAR BLUE</li>
                                <li> Precio de compra $ ${data.blue.value_buy} </li>
                                <li> Precio promedio $ ${data.blue.value_avg} </li>
                                <li> Precio de venta $ ${data.blue.value_sell} </li>`


 document.getElementById('dolarhoy').innerHTML = body;                       
                                }
  


