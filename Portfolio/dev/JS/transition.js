document.addEventListener("DOMContentLoaded", () => {
    // 1. Efecto FADE-IN al entrar
    // Usamos un pequeño delay para asegurar que el navegador tenga tiempo de renderizar
    setTimeout(() => {
        document.body.classList.add("fade-in");
    }, 50);

    // 2. Efecto FADE-OUT al hacer clic en enlaces
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", e => {
            const target = link.href;

            // Filtros: solo enlaces internos, que no sean '#' y que no abran en pestaña nueva
            if (target.includes(window.location.origin) &&
                !target.includes("#") &&
                link.target !== "_blank") {

                e.preventDefault();

                // Aplicamos la clase de salida
                document.body.classList.add("fade-out");

                // Esperamos 500ms (lo mismo que el transition en CSS) antes de cambiar
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            }
        });
    });
});