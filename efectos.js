//Transicion de abajo hacia arriba
document.addEventListener("DOMContentLoaded", function () {
    let ids = ["texto","texto1", "texto2", "texto3", "texto4", "texto5", "texto6", "texto7"]; // Lista de IDs
    let elementos = [];

    // Configuración inicial de los estilos
    ids.forEach((id) => {
        let elemento = document.getElementById(id);
        if (!elemento) return; 

        elemento.style.opacity = "0"; 
        elemento.style.transform = "translateY(20px)";
        elemento.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

        elementos.push(elemento);
    });

    function detectarScroll() {
        elementos.forEach((elemento) => {
            let posicion = elemento.getBoundingClientRect().top;
            let alturaPantalla = window.innerHeight;

            if (posicion < alturaPantalla - 100) {
                elemento.style.opacity = "1"; // Hace el texto visible
                elemento.style.transform = "translateY(0)"; // Lo mueve a su posición original
            }
        });
    }

    document.addEventListener("scroll", detectarScroll);
    detectarScroll(); // Para ejecutar en elementos visibles al cargar la página
});


//Efecto de letras por letras
document.addEventListener("DOMContentLoaded", function () {
    let ids = ["info", "info1", "info2", "info3", "info4", "info5", "info6", "info7"];

    async function escribirLetraPorLetra(elemento, texto) {
        for (let i = 0; i < texto.length; i++) {
            elemento.textContent += texto[i];
            await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 20)); // Variación en el tiempo
        }
    }

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.dataset.animado === "false") {
                entry.target.dataset.animado = "true";
                escribirLetraPorLetra(entry.target, entry.target.dataset.textoCompleto);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    ids.forEach((id) => {
        let elemento = document.getElementById(id);
        if (!elemento) return;

        let textoCompleto = elemento.innerText.trim();
        elemento.textContent = "";
        elemento.dataset.textoCompleto = textoCompleto;
        elemento.dataset.animado = "false";

        observer.observe(elemento);
    });
});



//
document.addEventListener("DOMContentLoaded", function () {
    let elementos = document.querySelectorAll(".texto-scroll"); // Selecciona todos los textos con la clase

    elementos.forEach((elemento) => {
        let textoCompleto = elemento.innerHTML; // Obtiene el texto original
        elemento.innerHTML = ""; // Vacía el contenido para animarlo
        elemento.setAttribute("data-texto", textoCompleto); // Guarda el texto original

        document.addEventListener("scroll", function () {
            let posicion = elemento.getBoundingClientRect().top;
            let alturaPantalla = window.innerHeight;

            if (posicion < alturaPantalla - 100 && elemento.innerHTML === "") {
                escribirLetraPorLetra(elemento, textoCompleto);
            }
        });
    });

    function escribirLetraPorLetra(elemento, texto) {
        let i = 0;
        let intervalo = setInterval(() => {
            if (i < texto.length) {
                elemento.innerHTML += texto[i]; // Agrega cada letra sin modificar estilos
                i++;
            } else {
                clearInterval(intervalo);
            }
        }, 50); // Ajusta la velocidad de aparición de las letras
    }
});



document.addEventListener("DOMContentLoaded", function () {
    let secciones = document.querySelectorAll(".efecto-scroll"); // Selecciona todas las secciones con la clase

    secciones.forEach((seccion) => {
        // Inicialmente oculta las secciones y las desplaza hacia abajo
        seccion.style.opacity = "0";
        seccion.style.transform = "translateY(50px)";
        seccion.style.transition = "opacity 2s ease-out, transform 3s ease-out";
    });

    document.addEventListener("scroll", function () {
        secciones.forEach((seccion) => {
            let posicion = seccion.getBoundingClientRect().top;
            let alturaPantalla = window.innerHeight;

            if (posicion < alturaPantalla - 100) {
                seccion.style.opacity = "1"; // Hace visible la sección
                seccion.style.transform = "translateY(0)"; // Mueve la sección a su posición normal
            }
        });
    });
});


//Efecto de Zoom
document.addEventListener("DOMContentLoaded", function () {
    let ids = ["caja1", "caja2", "caja3", "caja4"]; // IDs de las cajas

    ids.forEach((id, index) => {
        let caja = document.getElementById(id);
        if (!caja) return;

        // Estilos iniciales desde JavaScript
        caja.style.opacity = "0";
        caja.style.transform = "scale(0.5)"; // Inicia con tamaño reducido
        caja.style.transition = "opacity 0s, transform 0s"; // Sin transición al inicio

        setTimeout(() => {
            let inicio = Date.now();
            let duracion = 1000; // 1 segundo

            function animar() {
                let tiempoPasado = Date.now() - inicio;
                let progreso = tiempoPasado / duracion; // Normaliza de 0 a 1

                if (progreso > 1) progreso = 1;

                // Aplica zoom y opacidad
                caja.style.opacity = progreso.toString();
                caja.style.transform = `scale(${0.5 + 0.5 * progreso})`;

                if (progreso < 1) {
                    requestAnimationFrame(animar);
                }
            }

            animar();
        }, index * 300); // Retraso para cada caja
    });
});



//Movimiento de izquierda hacia posicion Original
document.addEventListener("DOMContentLoaded", function () {
    let ids = ["mov", "mov2", "mov3", "mov4","mov5", "mov6","mov7"]; // Lista de IDs

    function iniciarAnimacion(id) {
        let imagen = document.getElementById(id);
        if (!imagen) return;

        let posicionInicial = -window.innerWidth * 0.5; // Comienza fuera de la pantalla (izquierda)
        imagen.style.transform = `translateX(${posicionInicial}px)`;
        imagen.style.opacity = "0"; // Inicialmente invisible

        function moverImagen() {
            imagen.style.transition = "transform 1s ease-out, opacity 1s ease-out";
            imagen.style.transform = "translateX(0)"; // Se mueve a su posición original
            imagen.style.opacity = "1"; // Aparece suavemente
        }

        // Detecta cuando el elemento entra en pantalla
        let observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        moverImagen();
                        observer.unobserve(imagen); // Detiene la observación después de la animación
                    }
                });
            },
            { threshold: 0.5 } // Se activa cuando el 50% de la imagen es visible
        );

        observer.observe(imagen);
    }

    // Aplica la animación a todas las imágenes con sus respectivas IDs
    ids.forEach((id) => {
        iniciarAnimacion(id);
    });
});

//De derecha a Izquierda
document.addEventListener("DOMContentLoaded", function () {
    let ids = ["di", "di1", "di2", "di3", "di4", "di5", "di6", "di7", "di8","di9"]; 

    function verificarScroll() {
        ids.forEach((id) => {
            let imagen = document.getElementById(id);
            if (!imagen || imagen.dataset.animado === "true") return;

            let posicion = imagen.getBoundingClientRect().top;
            let alturaPantalla = window.innerHeight;

            if (posicion < alturaPantalla * 0.9) {
                let inicio = Date.now();
                let duracion = 1000; 
                let inicioPos = 200; 
                let finPos = 0; 

                function animar() {
                    let tiempoPasado = Date.now() - inicio;
                    let progreso = tiempoPasado / duracion;

                    if (progreso > 1) progreso = 1;

                    let desplazamiento = inicioPos * (1 - progreso);
                    imagen.style.opacity = progreso.toString();
                    imagen.style.transform = `translateX(${desplazamiento}px)`;

                    if (progreso < 1) {
                        requestAnimationFrame(animar);
                    }
                }

                // Inicializar estilos y ejecutar animación solo si aún no ha sido animado
                imagen.style.opacity = "0";
                imagen.style.transform = `translateX(${inicioPos}px)`;
                imagen.dataset.animado = "true"; // Marcar como animado
                animar();
            }
        });
    }

    document.addEventListener("scroll", verificarScroll);
    verificarScroll();
});




//Fade in Scroll
document.addEventListener("DOMContentLoaded", function () {
    let ids = ["txt1", "txt2", "txt3", "txt4","txt5","txt6", "txt7","txt8", "txt9", "txt10", "txt11"]; // IDs de los textos

    function verificarScroll() {
        ids.forEach((id) => {
            let elemento = document.getElementById(id);
            if (!elemento) return;

            let posicion = elemento.getBoundingClientRect().top;
            let alturaPantalla = window.innerHeight;

            if (posicion < alturaPantalla * 0.9) {
                let inicio = Date.now();
                let duracion = 3000; // 1 segundo

                function animar() {
                    let tiempoPasado = Date.now() - inicio;
                    let progreso = tiempoPasado / duracion;

                    if (progreso > 1) progreso = 1;

                    elemento.style.opacity = progreso.toString();

                    if (progreso < 1) {
                        requestAnimationFrame(animar);
                    }
                }

                if (!elemento.dataset.animado) {
                    elemento.style.opacity = "0";
                    elemento.dataset.animado = "true";
                    animar();
                }
            }
        });
    }

    document.addEventListener("scroll", verificarScroll);
    verificarScroll(); // Para detectar elementos visibles al cargar
});

