// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
    sisterName: "Papali",
    nickname: "Em",
    age: "18",
    brotherName: "David",
    birthdayMessage: "Happy Birthday to my amazing little sister ❤️",
    wishes: [
        { title: "Your Happiness", text: "I hope your life is always filled with reasons to smile." },
        { title: "Your Dreams", text: "I hope you achieve everything your heart truly wishes for." },
        { title: "Your Future", text: "I hope your future is brighter than all the stars above." },
        { title: "Your Success", text: "I will always be proud of every step you take." },
        { title: "Your Life", text: "Never forget that you deserve happiness, love, and beautiful things." }
    ],
    specialCards: [
        { title: "❤️ Your Smile", text: "Your smile can make even boring days better ❤️" },
        { title: "😂 Your Funny Side", text: "You somehow manage to create chaos wherever you go 😂" },
        { title: "🤗 Your Cuteness", text: "Even when you're annoying, you're still cute." },
        { title: "💪 Your Strength", text: "You are stronger than you think 💪" },
        { title: "🌟 Your Dreams", text: "You have a beautiful mind full of amazing ideas." },
        { title: "👑 Your Uniqueness", text: "There is no one else in the world quite like you." }
    ],
    letter: `My dear little sister,

Watching you grow up has been one of the most beautiful things in my life.

No matter how much we fight, tease each other, or annoy each other, you will always have a very special place in my heart.

I may not always say it, but I am always proud of you.

I hope your life is filled with happiness, success, beautiful memories, and dreams that come true.

Never forget how special you are.

Keep smiling.
Keep dreaming.
Keep being yourself.

And always remember...
No matter where life takes us,
You will always be my little sister ❤️

Happy Birthday 🎂✨

With lots of love,
Your Brother ❤️`
};

const imageFiles = [
    "WhatsApp Image 2026-08-29 at 11.17.23 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.17.32 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.17.34 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.17.50 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.17.58 PM (1).jpeg",
    "WhatsApp Image 2026-08-29 at 11.17.58 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.17.59 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.18.01 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.18.02 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.18.03 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.18.10 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.18.11 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.18.12 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.18.14 PM.jpeg",
    "WhatsApp Image 2026-08-29 at 11.19.46 PM.jpeg"
];

const categories = ['floating', 'polaroid', 'timeline', 'constellation'];
const memories = imageFiles.map((filename, i) => {
    return {
        image: `assets/images/${filename}`,
        caption: `Memory ${i + 1} ❤️`,
        category: categories[i % categories.length],
        date: `202${Math.floor(Math.random() * 4)}`
    };
});

// ==========================================
// INITIALIZATION & DOM POPULATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    populateText();
    distributePhotos();
    buildSpecialCards();
    buildWishes();
    buildGifts();
    buildCandles();

    // Remove Loading screen
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 1000);
        }
        initAnimations();
    }, 1500);

    initCanvasParticles();
    initInteractivity();
    initLightbox();
});

function populateText() {
    document.querySelectorAll('.sys-sister-name').forEach(el => el.textContent = CONFIG.sisterName);
    document.querySelectorAll('.sys-sister-name-caps').forEach(el => el.textContent = CONFIG.sisterName.toUpperCase());
    document.querySelectorAll('.sys-age').forEach(el => el.textContent = CONFIG.age);
    document.querySelectorAll('.sys-brother-name').forEach(el => el.textContent = CONFIG.brotherName);
}

function distributePhotos() {
    const floatingContainer = document.getElementById('floating-photos-container');
    const wallContainer = document.getElementById('memory-wall-container');
    const timelineContainer = document.getElementById('timeline-container');
    const constellationContainer = document.getElementById('constellation-container');
    const heartContainer = document.getElementById('heart-collage-container');

    const floatingPositions = [
        { left: 10, top: 5 },
        { left: 70, top: 15 },
        { left: 40, top: 40 },
        { left: 15, top: 70 },
        { left: 65, top: 65 }
    ];
    let floatCount = 0;

    memories.forEach((mem, index) => {
        // Add to respective sections
        if (mem.category === 'floating' && floatCount < 5) {
            const el = document.createElement('div');
            el.className = 'polaroid floating-photo lightbox-trigger';
            el.innerHTML = `<img src="${mem.image}" alt="Memory"><div class="caption">${mem.caption}</div>`;
            el.dataset.index = index;
            // Predefined scattered position
            el.style.left = `${floatingPositions[floatCount].left}%`;
            el.style.top = `${floatingPositions[floatCount].top}%`;
            floatingContainer.appendChild(el);
            floatCount++;
        }
        else if (mem.category === 'polaroid' && wallContainer.children.length < 8) {
            const el = document.createElement('div');
            el.className = 'polaroid lightbox-trigger';
            el.innerHTML = `<img src="${mem.image}" alt="Memory"><div class="caption">${mem.caption}</div>`;
            el.dataset.index = index;
            // Random slight rotation
            el.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
            wallContainer.appendChild(el);
        }
        else if (mem.category === 'timeline' && timelineContainer.children.length < 5) {
            const el = document.createElement('div');
            el.className = 'timeline-event';
            el.innerHTML = `
                <h3>${mem.date}</h3>
                <img src="${mem.image}" class="lightbox-trigger" data-index="${index}" alt="Memory">
                <p>${mem.caption}</p>
            `;
            timelineContainer.appendChild(el);
        }
        else if (mem.category === 'constellation' && constellationContainer.children.length < 5) {
            const el = document.createElement('img');
            el.src = mem.image;
            el.className = 'star-photo lightbox-trigger';
            el.dataset.index = index;
            el.style.left = `${20 + Math.random() * 60}%`;
            el.style.top = `${20 + Math.random() * 60}%`;
            constellationContainer.appendChild(el);
        }

        // Add all to heart collage container for Finale
        const hEl = document.createElement('img');
        hEl.src = mem.image;
        hEl.className = 'heart-photo';
        // start randomly scattered
        hEl.style.left = `${Math.random() * 100}vw`;
        hEl.style.top = `${Math.random() * 100}vh`;
        hEl.style.opacity = '0';
        heartContainer.appendChild(hEl);
    });
}

function buildSpecialCards() {
    const container = document.getElementById('special-cards-container');
    CONFIG.specialCards.forEach(card => {
        const el = document.createElement('div');
        el.className = 'magic-card';
        el.innerHTML = `<h3>${card.title}</h3><p>${card.text}</p>`;
        el.addEventListener('click', () => {
            el.classList.toggle('active');
            if (window.confetti) confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
        });
        container.appendChild(el);
    });
}

function buildWishes() {
    const container = document.getElementById('future-wishes-container');
    CONFIG.wishes.forEach(wish => {
        const el = document.createElement('div');
        el.className = 'future-card';
        el.innerHTML = `<h3>${wish.title}</h3><p>${wish.text}</p>`;
        container.appendChild(el);
    });
}

function buildGifts() {
    const container = document.getElementById('gift-container');
    const emojis = ['🎉', '🎂', '🎈', '❤️', '🌟', '🎁'];
    const msgs = [
        "You are officially one year more awesome 😎",
        "Warning: You are still my little sister forever 😂",
        "Never stop being the amazing person you are ❤️",
        "A huge hug sent your way! 🤗",
        "May your day be as bright as your smile ✨",
        "Here's to more crazy adventures! 🚀"
    ];
    for (let i = 0; i < 6; i++) {
        const el = document.createElement('div');
        el.className = 'gift-box';
        el.textContent = '🎁';
        el.addEventListener('click', function () {
            if (this.textContent === '🎁') {
                this.textContent = emojis[i];
                if (window.confetti) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                setTimeout(() => alert(msgs[i]), 500);
            }
        });
        container.appendChild(el);
    }
}

function buildCandles() {
    const container = document.getElementById('candles-container');
    let age = parseInt(CONFIG.age);
    if (isNaN(age) || age > 30) age = 5; // fallback
    for (let i = 0; i < age; i++) {
        const el = document.createElement('div');
        el.className = 'candle';
        el.innerHTML = `<div class="flame"></div>`;
        container.appendChild(el);
    }
}

// ==========================================
// LIGHTBOX LOGIC
// ==========================================
let currentLightboxIndex = 0;
function initLightbox() {
    const lightbox = document.getElementById('photo-lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');
    const lbCount = document.getElementById('lightbox-counter');
    const btnClose = document.querySelector('.lightbox-close');
    const btnNext = document.querySelector('.lightbox-next');
    const btnPrev = document.querySelector('.lightbox-prev');

    function openLightbox(index) {
        currentLightboxIndex = parseInt(index);
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const mem = memories[currentLightboxIndex];
        lbImg.src = mem.image;
        lbCap.textContent = mem.caption;
        lbCount.textContent = `${currentLightboxIndex + 1} / ${memories.length} ❤️`;
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.lightbox-trigger');
        if (trigger) {
            openLightbox(trigger.dataset.index);
        }
    });

    btnClose.addEventListener('click', closeLightbox);

    btnNext.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % memories.length;
        updateLightboxContent();
    });

    btnPrev.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + memories.length) % memories.length;
        updateLightboxContent();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') btnNext.click();
        if (e.key === 'ArrowLeft') btnPrev.click();
    });
}

// ==========================================
// INTERACTIVITY (Music, Envelope, Candles)
// ==========================================
function initInteractivity() {
    // Music
    const musicBtn = document.getElementById('music-controls');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.querySelector('.icon').textContent = '🔇';
            musicBtn.querySelector('.text').textContent = 'Play Music';
        } else {
            audio.play().catch(e => console.log("Audio play failed: ", e));
            musicBtn.querySelector('.icon').textContent = '🎵';
            musicBtn.querySelector('.text').textContent = 'Pause Music';
        }
        isPlaying = !isPlaying;
    });

    // Envelope
    const envelope = document.getElementById('envelope-trigger');
    const letterContent = document.getElementById('letter-content');
    let typed = false;
    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            if (!typed) {
                setTimeout(() => {
                    letterContent.innerHTML = '';
                    const text = CONFIG.letter.replace(/\n/g, '<br>');
                    let i = 0;
                    const speed = 30; // ms per char
                    function typeWriter() {
                        if (i < text.length) {
                            if (text.charAt(i) === '<') {
                                letterContent.innerHTML += '<br>';
                                i += 4;
                            } else {
                                letterContent.innerHTML += text.charAt(i);
                                i++;
                            }
                            setTimeout(typeWriter, speed);
                        }
                    }
                    typeWriter();
                    typed = true;
                }, 1000);
            }
        }
    });

    // Candles
    const blowBtn = document.getElementById('blow-candles-btn');
    const flames = document.querySelectorAll('.flame');
    const wishResult = document.querySelector('.wish-result');

    blowBtn.addEventListener('click', () => {
        flames.forEach(flame => {
            flame.classList.add('extinguished');
            const smoke = document.createElement('div');
            smoke.className = 'smoke';
            flame.parentElement.appendChild(smoke);
        });

        // Darken background briefly
        gsap.to('body', { backgroundColor: '#000', duration: 1, yoyo: true, repeat: 1 });

        if (window.confetti) {
            setTimeout(() => {
                confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
            }, 1000);
        }

        setTimeout(() => {
            wishResult.classList.remove('hidden');
            gsap.fromTo(wishResult, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
        }, 1500);
    });

    // Replay
    document.getElementById('replay-btn').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => location.reload(), 1000);
    });

    // Section 1 Start button
    document.getElementById('start-journey-btn').addEventListener('click', () => {
        document.getElementById('birthday-hero').scrollIntoView({ behavior: 'smooth' });
    });
}

// ==========================================
// GSAP ANIMATIONS
// ==========================================
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Section 1: Cinematic
    const tl1 = gsap.timeline();
    tl1.to('.text-1', { opacity: 1, duration: 2, ease: "power2.inOut" })
        .to('.text-1', { opacity: 0, duration: 1, delay: 1 })
        .to('.text-2', { opacity: 1, duration: 2 })
        .to('.text-2', { opacity: 0, duration: 1, delay: 1 })
        .to('.text-3', { opacity: 1, duration: 1.5 })
        .to('.text-3', { opacity: 0, duration: 1, delay: 0.5 })
        .to('.text-4', { opacity: 1, duration: 2 })
        .to('.text-4', { opacity: 0, duration: 1, delay: 1 })
        .to('.main-title', { opacity: 1, scale: 1.2, duration: 2, ease: "back.out(1.7)" })
        .to('#start-journey-btn', { autoAlpha: 1, duration: 1 });

    // Section 2: Hero
    gsap.to('#birthday-hero', {
        scrollTrigger: {
            trigger: '#birthday-hero',
            start: "top center",
            onEnter: () => gsap.to('#birthday-hero', { autoAlpha: 1, duration: 1 })
        }
    });

    // Floating photos parallax
    gsap.utils.toArray('.floating-photo').forEach(photo => {
        gsap.to(photo, {
            y: "random(-40, 40)",
            x: "random(-20, 20)",
            rotation: "random(-10, 10)",
            duration: "random(5, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    // Story Text scroll reveal
    gsap.utils.toArray('.story-text').forEach(text => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                end: "top 40%",
                scrub: 1
            },
            opacity: 1,
            y: -50
        });
    });

    // Timeline events
    gsap.utils.toArray('.timeline-event').forEach(event => {
        gsap.fromTo(event,
            { opacity: 0, x: event.classList.contains('even') ? 50 : -50 },
            {
                opacity: 1, x: 0, duration: 1,
                scrollTrigger: {
                    trigger: event,
                    start: "top 80%"
                }
            }
        );
    });

    // Finale trigger
    ScrollTrigger.create({
        trigger: '#ultimate-finale',
        start: "top top",
        onEnter: () => animateHeartCollage()
    });

    // Final Messages
    const endTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#final-message',
            start: "top center"
        }
    });
    endTl.to('.e-1', { opacity: 1, duration: 1.5 })
        .to('.e-2', { opacity: 1, duration: 1.5, delay: 1 })
        .to('.e-3', { opacity: 1, duration: 1.5, delay: 1 })
        .to('.e-4', { opacity: 1, scale: 1.1, duration: 2, delay: 1 })
        .to('.e-5', { opacity: 1, duration: 1, delay: 1 })
        .to('.e-6', { opacity: 1, duration: 1 });
}

// ==========================================
// FINALE HEART COLLAGE MATH & ANIMATION
// ==========================================
let heartAnimated = false;
function animateHeartCollage() {
    if (heartAnimated) return;
    heartAnimated = true;

    const photos = document.querySelectorAll('.heart-photo');
    const total = photos.length;
    if (total === 0) return;

    // Make photos visible
    gsap.to(photos, { opacity: 1, duration: 1 });

    const container = document.getElementById('heart-collage-container');
    const cx = container.clientWidth / 2;
    const cy = container.clientHeight / 2 + 50; // shift down slightly
    // Adjust scale based on screen width
    const scale = window.innerWidth < 768 ? 8 : 15;

    // Parametric equation for a heart
    // x = 16 * sin^3(t)
    // y = -(13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t))

    photos.forEach((photo, i) => {
        const t = (i / total) * Math.PI * 2;

        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        const targetX = cx + hx * scale;
        const targetY = cy + hy * scale;

        gsap.to(photo, {
            x: targetX,
            y: targetY,
            left: 0,
            top: 0,
            rotation: Math.random() * 30 - 15,
            duration: 3 + Math.random() * 2,
            ease: "power3.out",
            delay: Math.random() * 1.5
        });
    });

    // Animate Text after heart forms
    const ftl = gsap.timeline({ delay: 4.5 });
    ftl.to('.ft-1', { opacity: 1, y: -20, duration: 1.5 })
        .to('.ft-2', { opacity: 1, y: -20, duration: 1.5, delay: 1 })
        .to('.ft-3', { opacity: 1, scale: 1.2, duration: 2, delay: 1 });

    // Confetti
    setTimeout(() => {
        if (window.confetti) {
            const duration = 5000;
            const end = Date.now() + duration;
            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#f7a8b8', '#ffffff', '#f9d976']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#f7a8b8', '#ffffff', '#f9d976']
                });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        }
    }, 8000);
}

// ==========================================
// BACKGROUND CANVAS PARTICLES (Stars)
// ==========================================
function initCanvasParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random();
            this.fadeSpeed = Math.random() * 0.02 + 0.005;
            this.color = Math.random() > 0.5 ? '#f7a8b8' : '#ffffff';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Fade pulse
            this.opacity += this.fadeSpeed;
            if (this.opacity > 1 || this.opacity < 0) {
                this.fadeSpeed = -this.fadeSpeed;
            }

            // Wrap edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
