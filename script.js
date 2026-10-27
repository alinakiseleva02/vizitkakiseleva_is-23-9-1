(function () {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });

  const bubblesContainer = document.getElementById('bubblesContainer');
  const codeSnippets = [
    'const life = () => code();',
    'while(alive) { learn(); }',
    'if (bug) fix();',
    'return true;',
    'git commit -m "init"',
    'console.log("hello");',
    'let love = "code";',
    'async function dream() {}',
    'npm install magic',
    'class Developer {}',
    'try { code() } catch(e) {}',
    'const future = await build();'
  ];

  function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 60 + 70; 
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 10;
    const codeText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = left + 'vw';
    bubble.style.animationDuration = duration + 's';
    bubble.style.animationDelay = '-' + delay + 's';

    const code = document.createElement('code');
    code.textContent = codeText;
    bubble.appendChild(code);

    bubblesContainer.appendChild(bubble);
  }

  for (let i = 0; i < 12; i++) {
    createBubble();
  }

  const dustContainer = document.getElementById('dust');
  for (let i = 0; i < 40; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust-particle';
    const size = Math.random() * 4 + 1;
    dust.style.width = size + 'px';
    dust.style.height = size + 'px';
    dust.style.left = Math.random() * 100 + 'vw';
    dust.style.animationDuration = Math.random() * 20 + 10 + 's';
    dust.style.animationDelay = '-' + Math.random() * 20 + 's';
    dustContainer.appendChild(dust);
  }

  const typewriterElement = document.getElementById('typewriter');
  const words = [
    'Frontend Developer',
    'Python Enthusiast',
    'Code Wizard',
    'Problem Solver'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start) + '+';
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const codeCounter = document.getElementById('codeCounter');
  const projectCounter = document.getElementById('projectCounter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Изменил цифры на 10000 и 25, чтобы соответствовало тексту в HTML
        animateValue(codeCounter, 0, 10000, 2000); 
        animateValue(projectCounter, 0, 25, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (codeCounter && projectCounter) {
    observer.observe(codeCounter.closest('.about-stats'));
  }

  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0px, 0px)';
    });
  });

})();