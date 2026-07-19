// ---------- 1. Split hero name into individual animated letters ----------
document.querySelectorAll('.kinetic .word').forEach(word => {
  const text = word.textContent;
  word.textContent = '';
  [...text].forEach((letter, i) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.style.animationDelay = (0.1 + i * 0.05) + 's';
    span.textContent = letter;
    word.appendChild(span);
  });
});

// ---------- 2. Drag-to-scroll on the projects track ----------
const track = document.querySelector('.proj-track');
let isDown = false;
let startX = 0;
let scrollStart = 0;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
  scrollStart = track.scrollLeft;
  track.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
  isDown = false;
  track.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  const delta = e.pageX - startX;
  track.scrollLeft = scrollStart - delta;
});

// ---------- 3. Magnetic button ----------
const magneticBtn = document.getElementById('magneticBtn');

magneticBtn.addEventListener('mousemove', (e) => {
  const rect = magneticBtn.getBoundingClientRect();
  const relX = e.clientX - rect.left - rect.width / 2;
  const relY = e.clientY - rect.top - rect.height / 2;
  magneticBtn.style.transform = `translate(${relX * 0.3}px, ${relY * 0.3}px)`;
});

magneticBtn.addEventListener('mouseleave', () => {
  magneticBtn.style.transform = 'translate(0, 0)';
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll("section:not(.hero)").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});