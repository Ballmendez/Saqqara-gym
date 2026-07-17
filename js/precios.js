const D = document;

const header = D.querySelector("header");

if (header) {
    const nav = D.createElement("nav");
    nav.className = "navbar navbar-expand-lg navbar-dark bg-dark fixed-top";

    const container = D.createElement("div");
    container.className = "container-fluid";

    const marca = D.createElement("a");
    marca.className = "navbar-brand d-flex align-items-center";
    marca.href = "#";

    const logo = D.createElement("img");
    logo.src = "../assets/saqqaralogo.jpg";
    logo.alt = "Saqqara Gym";
    logo.width = 50;
    logo.classList.add("me-2");

    const texto = D.createElement("span");
    texto.textContent = "Saqqara Gym";

    marca.appendChild(logo);
    marca.appendChild(texto);

    const botonMenu = D.createElement("button");
    botonMenu.className = "navbar-toggler";
    botonMenu.type = "button";
    botonMenu.setAttribute("data-bs-toggle", "collapse");
    botonMenu.setAttribute("data-bs-target", "#navbarNav");
    botonMenu.setAttribute("aria-controls", "navbarNav");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Toggle navigation");

    const icono = D.createElement("span");
    icono.className = "navbar-toggler-icon";
    botonMenu.appendChild(icono);

    const collapse = D.createElement("div");
    collapse.className = "collapse navbar-collapse";
    collapse.id = "navbarNav";

    const menu = D.createElement("div");
    menu.className = "navbar-nav";

    const links = [
        { texto: "Inicio", href: "../index.html" },
        { texto: "Clases", href: "./clases.html" },
        { texto: "Precios", href: "./precios.html" },
        { texto: "Contacto", href: "./contacto.html" }
    ];

    links.forEach((link) => {
        const a = D.createElement("a");
        a.className = "nav-link";
        a.href = link.href;
        a.textContent = link.texto;
        menu.appendChild(a);
    });

    collapse.appendChild(menu);
    container.appendChild(marca);
    container.appendChild(botonMenu);
    container.appendChild(collapse);
    nav.appendChild(container);

    header.prepend(nav);
}

let carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];

const btnCarrito = D.getElementById("btnCarrito");
const carrito = D.getElementById("carrito");
const listaCarrito = D.getElementById("lista-carrito");
const total = D.getElementById("total");
const cantidad = D.getElementById("cantidad");
const vaciar = D.getElementById("vaciar");
const confirmar = D.getElementById("confirmar");

const contenedor = D.querySelector("#cards");

function mostrarActividades(actividades) {
    if (!contenedor) return;
    contenedor.innerHTML = "";

    actividades.forEach((actividad) => {
        const columna = D.createElement("div");
        columna.className = "col-md-6 col-lg-3";

        const card = D.createElement("div");
        card.className = "card h-100 bg-dark text-white border-warning";

        const img = D.createElement("img");
        img.src = actividad.imagen;
        img.alt = actividad.titulo;
        img.className = "card-img-top";

        const body = D.createElement("div");
        body.className = "card-body";

        const titulo = D.createElement("h5");
        titulo.className = "card-title";
        titulo.textContent = actividad.titulo;

        const descripcion = D.createElement("p");
        descripcion.className = "card-text";
        descripcion.textContent = actividad.descripcion;

        const lista = D.createElement("ul");
        actividad.beneficios.forEach((beneficio) => {
            const li = D.createElement("li");
            li.textContent = beneficio;
            lista.appendChild(li);
        });

        const boton = D.createElement("button");
        boton.className = "btn btn-warning w-100";
        boton.textContent = "Suscribirse";

        boton.addEventListener("click", () => {
            Swal.fire({
                title: `¿Querés suscribirte a ${actividad.titulo}?`,
                text: "Se añadirá a tu carrito de inscripción.",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Agregar al carrito",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    agregarAlCarrito(actividad);
                    Swal.fire({
                        title: "¡Agregado!",
                        text: `${actividad.titulo} se sumó al carrito.`,
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            });
        });

        body.appendChild(titulo);
        body.appendChild(descripcion);
        body.appendChild(lista);
        body.appendChild(boton);
        card.appendChild(img);
        card.appendChild(body);
        columna.appendChild(card);
        contenedor.appendChild(columna);
    });
}

function agregarAlCarrito(actividad) {
    carritoProductos.push(actividad);
    actualizarLocalStorage();
    renderCarrito();
}

function eliminarProducto(index) {
    carritoProductos.splice(index, 1);
    actualizarLocalStorage();
    renderCarrito();
}

function actualizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carritoProductos));
}

function renderCarrito() {
    if (!listaCarrito || !total || !cantidad) return;

    listaCarrito.innerHTML = "";
    let suma = 0;

    carritoProductos.forEach((actividad, index) => {
        const li = D.createElement("li");
        // Quitamos bg-secondary, text-white y border-light. Dejamos el control al CSS personalizado.
        li.className = "list-group-item d-flex justify-content-between align-items-center carrito-item";
        li.innerHTML = `
            <div>
                <strong class="item-titulo">${actividad.titulo}</strong><br>
                <small class="item-precio">$${actividad.precio}</small>
            </div>
            <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">X</button>
        `;
        listaCarrito.appendChild(li);
        suma += actividad.precio;
    });

    total.textContent = suma;
    cantidad.textContent = carritoProductos.length;
}

if (btnCarrito && carrito) {
    btnCarrito.addEventListener("click", () => {
        carrito.style.display = carrito.style.display === "none" ? "block" : "none";
        if (carrito.style.display === "block") {
            carrito.scrollIntoView({ behavior: "smooth" });
        }
    });

    listaCarrito.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-eliminar")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            eliminarProducto(index);
        }
    });

    vaciar.addEventListener("click", () => {
        if (carritoProductos.length === 0) return;

        Swal.fire({
            title: "¿Vaciar carrito?",
            text: "Se quitarán todas las actividades seleccionadas.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                carritoProductos = [];
                actualizarLocalStorage();
                renderCarrito();
            }
        });
    });

    confirmar.addEventListener("click", () => {
        if (carritoProductos.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Carrito vacío",
                text: "Selecciona al menos una actividad para continuar."
            });
            return;
        }
        window.location.href = "./formulario.html";
    });
}

fetch("../json/actividades.json")
    .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
    })
    .then((actividades) => {
        mostrarActividades(actividades);
    })
    .catch((error) => {
        console.error("Error al cargar actividades:", error);
    });

renderCarrito();