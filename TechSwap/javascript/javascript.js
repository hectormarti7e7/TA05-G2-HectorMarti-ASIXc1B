// Espera a que tota la pàgina carregar
window.onload = () => {
    const contenido = document.getElementById("contenido");
    contenido.classList.add("fade-in"); 
  };
  
  // Seleccionar tots els enllaços
  const links = document.querySelectorAll("a");
  
  links.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); 
  
        document.body.classList.add("fade-out");
  
        // Esperar que acabi la animació abans de redirigir
        setTimeout(() => {
            window.location.href = link.href;
        }, 1000);
    });
  });