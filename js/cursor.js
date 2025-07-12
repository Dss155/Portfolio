document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (!cursor || !cursorFollower) return;

  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;

  function updateCursor() {
    posX += (mouseX - posX) / 9; // Slower follow
    posY += (mouseY - posY) / 9;

    cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    cursorFollower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;

    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Simpler hover effects
  const hoverElements = ['a', 'button', '.btn', '.nav-link', '.portfolio-link'];

  hoverElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(1.8)`;
      });

      element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(1)`;
      });
    });
  });
});