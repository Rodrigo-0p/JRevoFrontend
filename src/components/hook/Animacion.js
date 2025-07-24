// Animacion.js - Funciones para la animación de fondo de red

let canvas;
let ctx;
let nodes = [];
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;
let animationId;

// Configuración de la animación
const CONFIG = {
  maxNodes: 100,
  maxDistance: 100,
  repulsionRadius: 150,
  repulsionForce: 0.5,
  nodeColor: '#00ffcc',
  nodeRadius: 2,
  lineWidth: 0.7,
  friction: 0.95,
  nodeSpeed: 1.5
};

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.vx = (Math.random() - 0.5) * CONFIG.nodeSpeed;
    this.vy = (Math.random() - 0.5) * CONFIG.nodeSpeed;
    this.repulsionVx = 0;
    this.repulsionVy = 0;
  }

  update() {
    // Aplicar efecto de repulsión del mouse
    if (isMouseMoving) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < CONFIG.repulsionRadius && distance > 0) {
        // Calcular fuerza de repulsión
        const force = (CONFIG.repulsionRadius - distance) / CONFIG.repulsionRadius;
        const angle = Math.atan2(dy, dx);
        
        this.repulsionVx += Math.cos(angle) * force * CONFIG.repulsionForce;
        this.repulsionVy += Math.sin(angle) * force * CONFIG.repulsionForce;
      }
    }

    // Aplicar velocidad normal más la repulsión
    this.x += this.vx + this.repulsionVx;
    this.y += this.vy + this.repulsionVy;

    // Reducir gradualmente la velocidad de repulsión (efecto de fricción)
    this.repulsionVx *= CONFIG.friction;
    this.repulsionVy *= CONFIG.friction;

    // Rebote en bordes
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Mantener dentro de los límites
    this.x = Math.max(0, Math.min(canvas.width, this.x));
    this.y = Math.max(0, Math.min(canvas.height, this.y));
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, CONFIG.nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = CONFIG.nodeColor;
    ctx.fill();
  }
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function setupEventListeners() {
  if (!canvas) return;

  // Seguimiento del mouse
  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
  });

  canvas.addEventListener('mouseleave', () => {
    isMouseMoving = false;
  });

  // Redimensionar canvas
  window.addEventListener('resize', resizeCanvas);
}

function createNodes() {
  nodes = [];
  for (let i = 0; i < CONFIG.maxNodes; i++) {
    nodes.push(new Node(
      Math.random() * canvas.width, 
      Math.random() * canvas.height
    ));
  }
}

function drawConnections() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < CONFIG.maxDistance) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(0, 255, 204, ${1 - distance / CONFIG.maxDistance})`;
        ctx.lineWidth = CONFIG.lineWidth;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const node of nodes) {
    node.update();
    node.draw();
  }

  drawConnections();

  animationId = requestAnimationFrame(animate);
}

// Funciones públicas
export function initializeAnimation(id = false) {
  canvas = document.getElementById(id ? `network-canvas_${id}` : `network-canvas`);
  
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  ctx = canvas.getContext('2d');
  
  resizeCanvas();
  setupEventListeners();
  createNodes();
  animate();
}

export function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  
  // Limpiar event listeners
  window.removeEventListener('resize', resizeCanvas);
  
  if (canvas) {
    canvas.removeEventListener('mousemove', () => {});
    canvas.removeEventListener('mouseleave', () => {});
  }
}

export function updateConfig(newConfig) {
  Object.assign(CONFIG, newConfig);
}

export function getFormValues() {
  // Esta función podría ser útil para obtener valores del formulario
  // si necesitas acceder a ellos desde este archivo
  return {
    email: '',
    password: ''
  };
}

// Función para reiniciar la animación
export function restartAnimation() {
  stopAnimation();
  initializeAnimation();
}