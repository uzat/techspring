// public/js/particles-config.js
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 50 },
    "color": { "value": "#00ffff" },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.3,
      "random": true
    },
    "size": {
      "value": 3,
      "random": true
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none"
    }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" }
    },
    "modes": {
      "repulse": { "distance": 80 },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});
