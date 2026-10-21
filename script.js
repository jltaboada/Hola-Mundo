/* ============================================
   Hola Mundo · Hecho con OpenCode
   Interactividad con JavaScript
   ============================================ */

// ---------- 1. Efecto máquina de escribir en el título ----------
const TEXTO = "¡Hola, Mundo! 👋";
const typewriter = document.getElementById("typewriter");

let indice = 0;
function escribir() {
  if (indice < TEXTO.length) {
    typewriter.textContent += TEXTO[indice];
    indice++;
    setTimeout(escribir, 90); // velocidad entre caracteres
  }
}
escribir();

// ---------- 2. Mostrar el año actual en el pie ----------
document.getElementById("anio").textContent = new Date().getFullYear();

// ---------- 3. Demo: contador con toque de color ----------
const contadorEl = document.getElementById("contador");
const COLORES_PAR = ["#3fb950", "#d2a8ff", "#58a6ff", "#f0883e", "#f85149"];

let contador = 0;

function refrescarContador() {
  contadorEl.textContent = contador;

  if (contador !== 0 && contador % 2 === 0) {
    // Número par ≥ 2 -> color aleatorio de la lista
    const color = COLORES_PAR[Math.floor(Math.random() * COLORES_PAR.length)];
    contadorEl.style.color = color;
  } else {
    // Número impar o cero -> color neutro de la paleta
    contadorEl.style.color = "var(--texto)";
  }
}

document.getElementById("btn-sumar").addEventListener("click", () => {
  contador++;
  refrescarContador();
});

document.getElementById("btn-restar").addEventListener("click", () => {
  contador--;
  refrescarContador();
});

document.getElementById("btn-reset").addEventListener("click", () => {
  contador = 0;
  refrescarContador();
});

refrescarContador();
