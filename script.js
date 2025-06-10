document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('name').textContent = 'Aman';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.message, .final').forEach(el => {
    observer.observe(el);
  });

  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);

    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => ripple.remove(), 1000);

    document.querySelectorAll('.hidden').forEach(el => {
      el.classList.add('visible');
    });

    launchConfetti();
    startBtn.disabled = true;
    startBtn.textContent = '🎂 Enjoy Your Day! 🎂';
    playBirthdaySong();
  });

  function launchConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#ffa502', '#2ed573', '#1e90ff', '#ff4757', '#ff6348'];
    const types = ['circle', 'rectangle', 'heart', 'star'];

    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      const size = Math.random() * 10 + 5;
      const type = types[Math.floor(Math.random() * types.length)];

      confetti.className = 'confetti ' + type;
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.opacity = Math.random();

      container.appendChild(confetti);

      const animationDuration = 3 + Math.random() * 4;

      confetti.animate([
        { transform: 'translateY(-10vh) rotate(0deg)', opacity: confetti.style.opacity },
        { transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: animationDuration * 1000,
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
      });

      setTimeout(() => confetti.remove(), animationDuration * 1000);
    }

    const confettiInterval = setInterval(launchConfetti, 2000);
    setTimeout(() => clearInterval(confettiInterval), 10000);
  }

  function playBirthdaySong() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-birthday-song-1980.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Auto-play prevented:', e));
  }
});
