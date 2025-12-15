console.log("JS cargado correctamente");

const btn = document.getElementById("menuBtn");
const menu = document.getElementById("sideMenu");

// Funció per obrir/tancar el menú quan es clica el botó
btn.addEventListener("click", (e) => {
  // e.stopPropagation() evita que el clic del botó es propagui a la funció de document
  e.stopPropagation();
  console.log("Botón clicado");
  menu.classList.toggle("open");
});

// FUNCIÓ CLAU: Tancar en fer clic a fora
document.addEventListener("click", (e) => {
    // 1. Comprovem si el menú està obert
    if (menu.classList.contains("open")) {

        // 2. Comprovem si el clic NO ha estat dins del menú
        const clicDinsMenu = menu.contains(e.target);

        // 3. Comprovem si el clic NO ha estat al botó (ja gestionat a la funció superior)
        const clicEnBoto = btn.contains(e.target);

        // Si el menú està obert i el clic no ha estat ni dins del menú ni al botó, el tanquem.
        if (!clicDinsMenu && !clicEnBoto) {
            menu.classList.remove("open");
            console.log("Clic fora, menú tancat.");
        }
    }
});