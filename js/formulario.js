const D = document;

D.addEventListener("DOMContentLoaded", () => {
    
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedorActividades = D.getElementById("actividades-seleccionadas");

    if (contenedorActividades) {
        if (carrito.length > 0) {
            contenedorActividades.innerHTML = ""; 
            
            const ul = D.createElement("ul");
            ul.className = "list-group list-group-flush bg-transparent";

            let totalInscripcion = 0;

            carrito.forEach((actividad) => {
                const li = D.createElement("li");
                li.className = "list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center p-2";
                li.innerHTML = `
                    <span>💪 <strong>${actividad.titulo}</strong></span>
                    <span class="badge bg-warning text-dark">$${actividad.precio}</span>
                `;
                ul.appendChild(li);
                totalInscripcion += actividad.precio;
            });

            const totalDiv = D.createElement("div");
            totalDiv.className = "text-end mt-3 pt-2 border-top border-warning fw-bold text-warning";
            totalDiv.innerHTML = `Total a pagar: $${totalInscripcion}`;

            contenedorActividades.appendChild(ul);
            contenedorActividades.appendChild(totalDiv);
        } else {
            contenedorActividades.innerHTML = `
                <p class="text-warning m-0">⚠️ No tienes actividades en tu carrito. Volvé a clases para elegir una.</p>
            `;
        }
    }

    const formulario = D.getElementById("formulario");
    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault(); 

            if (carrito.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Carrito vacío",
                    text: "Por favor, selecciona al menos una actividad.",
                    background: "#12141c",
                    color: "#ffffff",
                    confirmButtonColor: "#ffc107"
                });
                return;
            }

            const edadInput = D.getElementById("edad");
            const edadVal = parseInt(edadInput.value);

            if (isNaN(edadVal) || edadVal < 10 || edadVal > 99) {
                Swal.fire({
                    icon: "warning",
                    title: "Edad no permitida",
                    text: "Para inscribirte debés tener entre 10 y 99 años.",
                    background: "#12141c",
                    color: "#ffffff",
                    confirmButtonColor: "#ffc107",
                    customClass: { popup: "border border-warning rounded-3" }
                });
                edadInput.focus(); 
                return;
            }

            const datosUsuario = {
                nombre: D.getElementById("nombre").value,
                telefono: D.getElementById("telefono").value,
                mail: D.getElementById("mail").value,
                edad: edadVal,
                horario: D.getElementById("horario").value,
                mensaje: D.getElementById("mensaje").value,
                actividadesInscriptas: carrito 
            };

            console.log("Inscripción confirmada:", datosUsuario);

            Swal.fire({
                title: "¡Inscripción Exitosa!",
                text: `¡Gracias ${datosUsuario.nombre}! Tu inscripción a las ${carrito.length} actividades fue procesada.`,
                icon: "success",
                iconColor: "#ffc107",
                background: "#12141c",
                color: "#ffffff",
                confirmButtonColor: "#ffc107",
                confirmButtonText: "Ver mi pase",
                customClass: { popup: "border border-warning rounded-3" }
            }).then(() => {
                localStorage.removeItem("carrito");
                window.location.href = "../pages/formulario_enviado.html";
            });
        });
    }
});