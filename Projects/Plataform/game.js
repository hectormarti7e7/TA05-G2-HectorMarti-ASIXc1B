const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// --- Game State ---
let isGameOver = false;
let isVictory = false;
const worldWidth = 5000;
const gravity = 0.6;
const friction = 0.85;
let cameraX = 0;
let score = 0;

const player = {
    x: 100, y: 0, width: 40, height: 40,
    color: '#FF5733', speed: 7, velX: 0, velY: 0,
    jumping: false, grounded: false, jumpCount: 0, maxJumps: 2
};

const platforms = [
    { x: 0, y: canvas.height - 50, width: worldWidth, height: 50 },
    { x: 400, y: canvas.height - 180, width: 150, height: 30 },
    { x: 750, y: canvas.height - 320, width: 150, height: 30 },
    { x: 1100, y: canvas.height - 200, width: 200, height: 200 },
    { x: 1450, y: canvas.height - 350, width: 200, height: 30 },
    { x: 1850, y: canvas.height - 250, width: 150, height: 250 },
    { x: 2100, y: canvas.height - 450, width: 200, height: 30 },
    { x: 2500, y: canvas.height - 300, width: 200, height: 30 },
    { x: 2900, y: canvas.height - 180, width: 200, height: 200 },
    { x: 3300, y: canvas.height - 400, width: 150, height: 30 },
    { x: 3700, y: canvas.height - 250, width: 300, height: 30 }
];

let coins = [
    { x: 460, y: canvas.height - 230, width: 25, height: 25, collected: false },
    { x: 810, y: canvas.height - 370, width: 25, height: 25, collected: false },
    { x: 1520, y: canvas.height - 400, width: 25, height: 25, collected: false },
    { x: 2170, y: canvas.height - 500, width: 25, height: 25, collected: false },
    { x: 2580, y: canvas.height - 350, width: 25, height: 25, collected: false },
    { x: 3360, y: canvas.height - 450, width: 25, height: 25, collected: false }
];

let enemies = [];
function initEnemies() {
    enemies = [
        { x: 900, y: canvas.height - 100, width: 40, height: 40, color: '#8B4513', velX: -3, velY: 0 },
        { x: 1600, y: canvas.height - 100, width: 40, height: 40, color: '#8B4513', velX: -3, velY: 0 },
        { x: 3000, y: canvas.height - 100, width: 40, height: 40, color: '#8B4513', velX: -4, velY: 0 }
    ];
}

const keys = {};
window.addEventListener("keydown", (e) => {
    if (isGameOver || isVictory) return;
    if ((e.code === "Space" || e.code === "ArrowUp") && player.jumpCount < player.maxJumps) {
        player.velY = -15;
        player.jumping = true;
        player.grounded = false;
        player.jumpCount++;
    }
    keys[e.code] = true;
});
window.addEventListener("keyup", (e) => { keys[e.code] = false; });

// --- Functions Exposed to Window ---
window.resetLevel = function() {
    isGameOver = false;
    isVictory = false;
    player.x = 100;
    player.y = canvas.height - 150;
    player.velX = 0;
    player.velY = 0;
    player.jumpCount = 0;
    score = 0;
    coins.forEach(c => c.collected = false);
    initEnemies();
    hideMenu();
};

function showMenu(title) {
    if (document.getElementById("gameMenu")) return;
    const menu = document.createElement('div');
    menu.id = "gameMenu";
    menu.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); display: flex; flex-direction: column;
        justify-content: center; align-items: center; color: white;
        font-family: 'Arial Black', sans-serif; z-index: 100;
    `;

    menu.innerHTML = `
        <h1 style="font-size: 70px; margin-bottom: 10px; color: ${title === 'GAME OVER' ? '#f44336' : '#4CAF50'}">${title}</h1>
        <p style="font-size: 30px; margin-bottom: 30px;">COINS COLLECTED: ${score}</p>
        <div style="display: flex; gap: 20px;">
            <button onclick="window.resetLevel()" style="padding: 20px 40px; font-size: 20px; font-weight: bold; cursor: pointer; background: #4CAF50; color: white; border: none; border-radius: 10px; transition: 0.3s;">RETRY</button>
            <button onclick="window.location.href='../../Portfolio/dev/HTML/Projectes/Plataform.html'" style="padding: 20px 40px; font-size: 20px; font-weight: bold; cursor: pointer; background: #555; color: white; border: none; border-radius: 10px;">GO BACK</button>        </div>
    `;
    document.body.appendChild(menu);
}

function hideMenu() {
    const menu = document.getElementById("gameMenu");
    if (menu) menu.remove();
}

function handlePlatformCollisions(obj, isPlayer) {
    platforms.forEach(plat => {
        if (obj.x < plat.x + plat.width && obj.x + obj.width > plat.x &&
            obj.y < plat.y + plat.height && obj.y + obj.height > plat.y) {
            let ox = Math.min(obj.x + obj.width - plat.x, plat.x + plat.width - obj.x);
            let oy = Math.min(obj.y + obj.height - plat.y, plat.y + plat.height - obj.y);
            if (ox < oy) {
                if (obj.x < plat.x) obj.x = plat.x - obj.width;
                else obj.x = plat.x + plat.width;
                if (isPlayer) obj.velX = 0; else obj.velX *= -1;
            } else {
                if (obj.y < plat.y) {
                    if (isPlayer) { player.grounded = true; player.jumpCount = 0; }
                    obj.velY = 0; obj.y = plat.y - obj.height;
                } else {
                    obj.y = plat.y + plat.height; obj.velY = 0;
                }
            }
        }
    });
}

function update() {
    if (!isGameOver && !isVictory) {
        if (keys["ArrowRight"]) player.velX += 0.8;
        if (keys["ArrowLeft"]) player.velX -= 0.8;

        player.velX *= friction;
        player.velY += gravity;
        player.grounded = false;
        player.x += player.velX;
        player.y += player.velY;
        handlePlatformCollisions(player, true);

        enemies.forEach((en, i) => {
            en.velY += gravity; en.x += en.velX; en.y += en.velY;
            handlePlatformCollisions(en, false);
            if (player.x < en.x + en.width && player.x + player.width > en.x &&
                player.y < en.y + en.height && player.y + player.height > en.y) {
                if (player.velY > 0 && (player.y + player.height - player.velY) <= en.y) {
                    enemies.splice(i, 1); player.velY = -12; player.jumpCount = 1;
                } else {
                    isGameOver = true;
                    showMenu("GAME OVER");
                }
            }
        });

        coins.forEach(c => {
            if (!c.collected && player.x < c.x + c.width && player.x + player.width > c.x &&
                player.y < c.y + c.height && player.y + player.height > c.y) {
                c.collected = true; score++;
            }
        });

        if (player.x < 0) player.x = 0;
        if (player.x > worldWidth - 120) {
            isVictory = true;
            showMenu("YOU WIN!");
        }

        cameraX = player.x - canvas.width / 3;
        if (cameraX < 0) cameraX = 0;
        if (cameraX > worldWidth - canvas.width) cameraX = worldWidth - canvas.width;
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, "#1a2a6c"); grd.addColorStop(1, "#b21f1f");
    ctx.fillStyle = grd; ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-cameraX, 0);

    ctx.fillStyle = "#388E3C";
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.width, p.height);
        ctx.fillStyle = "#4CAF50"; ctx.fillRect(p.x, p.y, p.width, 5);
        ctx.fillStyle = "#388E3C";
    });

    const metaX = worldWidth - 100;
    for (let y = 0; y < canvas.height; y += 25) {
        for (let x = metaX; x < metaX + 75; x += 25) {
            ctx.fillStyle = (Math.floor(x/25) + Math.floor(y/25)) % 2 === 0 ? "white" : "black";
            ctx.fillRect(x, y, 25, 25);
        }
    }

    ctx.fillStyle = "#FFEB3B";
    coins.forEach(c => {
        if (!c.collected) {
            ctx.beginPath(); ctx.arc(c.x + c.width/2, c.y + c.height/2, c.width/2, 0, Math.PI*2); ctx.fill();
        }
    });

    enemies.forEach(en => { ctx.fillStyle = "#5D4037"; ctx.fillRect(en.x, en.y, en.width, en.height); });
    ctx.fillStyle = player.color; ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.restore();

    ctx.fillStyle = "white"; ctx.font = "bold 28px sans-serif";
    ctx.fillText("COINS: " + score, 40, 60);
}

// Iniciar
initEnemies();
update();