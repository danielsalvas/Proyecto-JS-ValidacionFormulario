//////VARIABLES

const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//////VARIABLEA PARA CAMPOS

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

///// EVENT LISTENERS

eventListeners();
function eventListeners() {
    // Cuando la app arranca
    document.addEventListener("DOMContentLoaded", iniciarApp);

    //Campos del formulario
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

     //Reinicia el formulario

     btnReset.addEventListener("click", resetearFormulario);

    //Enviar Email...

    btnEnviar.addEventListener("click", enviarEmail);


}

//////FUNCIONES

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// Valida el formulario

function validarFormulario(e) {  //Como validar formulario es una función para email, asunto y mensaje, hay que hacer una diferente validación para EMAIL por la @ y .com


    if (e.target.value.length > 0 ) {

        //Elimina los errores...
        const error = document.querySelector("p.error");
        if (error) {
            error.remove();
        }

        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");

        mostrarError("Todos los campos son obligatorios");
    }

    if(e.target.type === "email"){
        

        if (er.test(e.target.value)) {
            const error = document.querySelector("p.error")
            if (error) {
                error.remove();
            }
    
            e.target.classList.remove("border", "border-red-500");
            e.target.classList.add("border", "border-green-500");
        } else {
            e.target.classList.remove("border", "border-green-500");
            e.target.classList.add("border", "border-red-500");

            mostrarError("Email no válido");
        }
    }

    if (er.test(email.value) !== "" && asunto.value !== "" && mensaje.value !== "") {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    }
}
function mostrarError(mensaje) {
    const mensajeError = document.createElement("p")
    mensajeError.textContent = mensaje;
    mensajeError.style.border = "solid";
    mensajeError.style.borderColor = "red";
    mensajeError.style.padding = "10px";
    mensajeError.style.color = "red";
    mensajeError.style.margin = "10px";
    mensajeError.classList.add("error");

    const errores = document.querySelectorAll(".error")
    if (errores.length === 0) {
        formulario.appendChild(mensajeError)
    }
}

//Envia el email

function enviarEmail(e) {

    e.preventDefault();

    //Mostrar el spinner

    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    // Después de 3 segundos ocultar el spinner y mostrar mensaje

    setTimeout(() => {
        spinner.style.display = "none";


        //Mensaje que dice que se envío correctamente

        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje se envío correctamente"
        parrafo.classList.add("text-center", "my-10", "p-2", "bg-green-500", "text-white", "font-bold", "uppercase" )

        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();  //Elimina el mensaje de exito
            resetearFormulario();
        }, 3500);

    }, 3000);
}

// Función que resetea el formulario

function resetearFormulario() {
    formulario.reset()

    iniciarApp();
}

