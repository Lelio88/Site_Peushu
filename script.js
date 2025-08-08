const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- ÉTOILES ---
const stars = [];

function createPixelStar(x, y, size) {
    ctx.fillStyle = "white";
    for (let i = -size; i <= size; i++) {
        for (let j = -size; j <= size; j++) {
            if (Math.abs(i) + Math.abs(j) <= size) {
                ctx.fillRect(x + i, y + j, 1, 1);
            }
        }
    }
}

// Génération des étoiles
for (let i = 0; i < 30; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2.5,
        size: 3 + Math.floor(Math.random() * 2),
        twinkle: Math.random() * 5
    });
}

// --- NUAGE ---
const cloudContainer = document.querySelector('.clouds');
const cloudImages = [
    'Nuages 1.png',
    'Nuages 2.png',
    'Nuages 3.png',
    'Nuages 4.png',
    'Nuages 5.png',
    'Nuages 6.png',
];

const clouds = [];

function createCloud(src) {
    const img = document.createElement('img');
    img.src = src;
    img.style.position = 'absolute';
    img.style.top = `${Math.random() * 200 + 10}px`; // 10 à 60 px du top
    img.style.left = `${Math.random() * 80}%`;
    img.style.width = '150px';
    img.style.userSelect = 'none';
    img.style.pointerEvents = 'none';

    return {
        element: img,
        baseLeft: parseFloat(img.style.left),
        direction: Math.random() < 0.5 ? 1 : -1,
        amplitude: 20,
        speed: 0.002,
        currentLeft: parseFloat(img.style.left),
    };
}
// --- ÉTOILES FILANTES ---
const shootingStars = [];

function createShootingStar() {
    const startX = Math.random() * canvas.width;
    const startY = 0; // départ tout en haut
    const angle = Math.PI / 4; // 45 degrés

    const endY = 900;            // limite verticale
    const deltaY = endY - startY; // = 900
    const deltaX = deltaY;        // angle 45°, donc dx = dy

    return {
        x: startX,
        y: startY,
        z: -1, // profondeur pour l'effet 3D
        length: 100 + Math.random() * 50,
        speed: 10 + Math.random() * 10,
        angle: angle,
        opacity: 1,
        fadeSpeed: 0.02,
        endX: startX + deltaX,
        endY: endY,
    };
}

// Création des nuages et ajout dans DOM
cloudImages.forEach(src => {
    const cloud = createCloud(src);
    cloudContainer.appendChild(cloud.element);
    clouds.push(cloud);
});

// --- ANIMATION ---
function animate() {
    // Étoiles scintillantes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.twinkle += 0.05;
        ctx.globalAlpha = 0.5 + Math.sin(star.twinkle) * 0.5;
        createPixelStar(star.x, star.y, star.size);
    });
    ctx.globalAlpha = 1;

    // Mouvement des nuages
    clouds.forEach(cloud => {
        cloud.currentLeft += cloud.direction * cloud.speed;
        if (cloud.currentLeft > cloud.baseLeft + cloud.amplitude) cloud.direction = -1;
        if (cloud.currentLeft < cloud.baseLeft - cloud.amplitude) cloud.direction = 1;
        cloud.element.style.left = cloud.currentLeft + '%';
    });

    // Étoiles filantes
    // Ajout aléatoire d'une étoile filante (environ 1 toutes les 3-5 secondes)
    if (Math.random() < 0.001) {  // Ajuste la fréquence ici (0.01 = ~1% par frame)
        shootingStars.push(createShootingStar());
    }

    // Dessiner les étoiles filantes
    shootingStars.forEach((star, index) => {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Ligne partant de (x,y) à (x - longueur*cos(angle), y - longueur*sin(angle))
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
            star.x - star.length * Math.cos(star.angle),
            star.y - star.length * Math.sin(star.angle)
        );
        ctx.stroke();
        ctx.restore();

        // Mise à jour de la position
        star.x += star.speed * Math.cos(star.angle);
        star.y += star.speed * Math.sin(star.angle);

        // Supprimer si dépassé la limite verticale ou horizontale
        if (star.y > star.endY || star.x > star.endX) {
            shootingStars.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

animate();

// --- Gérer resize pour canvas ---
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
//const lakeImg = document.querySelector('.lake-container img.lake');
//const sparkleCanvas = document.getElementById('sparkle');
//const sparkleCtx = sparkleCanvas.getContext('2d');

//function resizeSparkleCanvas() {
//    sparkleCanvas.width = lakeImg.clientWidth;
//    sparkleCanvas.height = lakeImg.clientHeight;
//}

//resizeSparkleCanvas();
//window.addEventListener('resize', resizeSparkleCanvas);

//const sparkleSpots = [
//    { x: 1350, y: 300 },
//    { x: 1320, y: 290 },
//    { x: 1360, y: 260 },
//];

//function drawSparkle(x, y, alpha) {
//    const size = 8; // taille plus grosse (8x8 px)
//    sparkleCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
//    sparkleCtx.fillRect(x - size / 2, y - size / 2, size, size);
//}

//function animateSparkles() {
//    sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
//
//    sparkleSpots.forEach(spot => {
//        const alpha = 0.4 + 0.6 * Math.sin(Date.now() / 400 + spot.x);
//        drawSparkle(spot.x, spot.y, alpha);
//    });
//
//    requestAnimationFrame(animateSparkles);
//}

animateSparkles();