document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  if(slides.length > 0){
    setInterval(() => {
      slides.forEach(s => s.classList.remove('active'));
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000);
  }
});

const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, {passive:true});

function toggleMenu() {
  const mn = document.getElementById('mobileNav');
  mn.classList.toggle('open');
  mn.style.display = mn.style.display === 'none' ? 'flex' : (mn.style.display === 'flex' && !mn.classList.contains('open') ? 'none' : 'flex');
}
document.getElementById('mobileNav').style.display = 'flex';

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
reveals.forEach(el => io.observe(el));

function filterProducts(btn, cat) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    if(cat === 'all' || card.dataset.category.includes(cat)){
      card.style.display = 'block';
      card.style.animation = 'fadeUp .4s ease both';
    } else {
      card.style.display = 'none';
    }
  });
}

let localCartCount = 0;
function addToCart(name) {
  localCartCount++;
  document.getElementById('cartBadge').textContent = localCartCount;
  document.getElementById('cartBadge').style.display = 'flex';
  showToast('✓ ' + name + ' added to cart');
}

function openCart(){
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart(){
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function submitNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast('🎉 You\'re in! Welcome to the Kray Store family.');
  input.value = '';
}

const track = document.getElementById('tickerTrack');

/* About Slideshow */
const aboutSlideshow = document.querySelector('.about-slideshow');
if(aboutSlideshow){
  const slides = aboutSlideshow.querySelectorAll('.slide');
  const dots = aboutSlideshow.querySelectorAll('.nav-dot');
  const prevBtn = aboutSlideshow.querySelector('.nav-arrow.prev');
  const nextBtn = aboutSlideshow.querySelector('.nav-arrow.next');
  let currentSlide = 0;
  let autoSlide;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 2000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  if(prevBtn) prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
    startAutoSlide();
  });

  if(nextBtn) nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(parseInt(dot.dataset.slide));
      startAutoSlide();
    });
  });

  startAutoSlide();
}