// // //JavaScript para boton que desliza algo desde la izquierda
// // <script>
// //     function deslizar() {
// //         document.getElementById('contenido').style.left = '10%'; /* El cuadro se mueve a la derecha */
// //     }
// // </script>
// // //JavaScript para objeto que rebota cuando haces click
// // <script>
// //     document.getElementById('rebotar').addEventListener('click', function() {
// //         this.style.transform = 'translateY(-30px)'; // Mueve el cuadro hacia arriba
// //         setTimeout(() => {
// //             this.style.transform = 'translateY(0)'; // Vuelve a la posición original
// //         }, 200); // Espera 200ms antes de volver a la posición original
// //     });
// // </script>
// // //JavaScript para objeto que aparece cuando haces scroll
// // {/* <script>
// // window.addEventListener('scroll', function() {
// //     let element = document.getElementById('scrollElement');
// //     let position = element.getBoundingClientRect().top;

// //     // Si el elemento está dentro de la ventana de visualización (viewport)
// //     if (position < window.innerHeight && position >= 0) {
// //         element.style.opacity = 1; // Hace visible el elemento
// //     }
// // });
// // </script> */}
// // //JavaScript para texto que se escribe solo
// <script>
//     let text = "¡Hola! Soy un texto que se escribe solo...";
//     let index = 0;
    
//     function escribirTexto() {
//         if (index < text.length) {
//             document.getElementById('escribir').innerHTML += text.charAt(index);
//             index++;
//             setTimeout(escribirTexto, 100); // Llamamos la función nuevamente con un pequeño retraso
//         }
//     }

//     escribirTexto(); // Inicia el proceso
// </script>
// // //JavaScript que cuando pasas el raton por encima hace zoom
// .zoom:hover {
//     transform: scale(1.2); /* Aumenta el tamaño */
// }

