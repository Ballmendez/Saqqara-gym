const D = document;

const header = D.querySelector("header");

const nav = D.createElement("nav");
nav.className = "navbar navbar-expand-lg navbar-dark bg-dark fixed-top";

const container = D.createElement("div");
container.className = "container-fluid";

const marca = D.createElement("a");
marca.className = "navbar-brand data-bs-theme=dark d-flex align-items-center";
marca.href = "#";

const logo = D.createElement("img");
logo.src = "assets/saqqaralogo.jpg";
logo.alt = "Saqqara Gym";
logo.width = 50;
logo.classList.add("me-2");

const texto = D.createElement("span");
texto.textContent = "Saqqara Gym";

marca.appendChild(logo);
marca.appendChild(texto);

const boton = D.createElement("button");
boton.className = "navbar-toggler";
boton.type = "button";
boton.setAttribute("data-bs-toggle", "collapse");
boton.setAttribute("data-bs-target", "#navbarNav");
boton.setAttribute("aria-controls", "navbarNav");
boton.setAttribute("aria-expanded", "false");
boton.setAttribute("aria-label", "Toggle navigation");

const icono = D.createElement("span");
icono.className = "navbar-toggler-icon";
boton.appendChild(icono);

const collapse = D.createElement("div");
collapse.className = "collapse navbar-collapse";
collapse.id = "navbarNav";

const lista = D.createElement("div");
lista.className = "navbar-nav";

const links = [
    { texto: "Inicio", href: "index.html" },
    { texto: "Clases", href: "./pages/clases.html" },
    { texto: "Precios", href: "./pages/precios.html" },
    { texto: "Contacto", href: "./pages/contacto.html" }
];

links.forEach((link, index) => {
    const a = D.createElement("a");

    a.className = "nav-link";
    if (index === 0) a.classList.add("active");

    a.href = link.href;
    a.textContent = link.texto;

    lista.appendChild(a);
});

collapse.appendChild(lista);

container.appendChild(marca);
container.appendChild(boton);
container.appendChild(collapse);

nav.appendChild(container);

header.prepend(nav);