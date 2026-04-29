window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>40);
},{passive:true});

function toggleMobileNav(){
  document.getElementById('mobileNav').classList.toggle('open');
}

const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

function animateCounter(el, target, duration=1800){
  const start = performance.now();
  function update(now){
    const progress = Math.min((now-start)/duration,1);
    const eased = 1-Math.pow(1-progress,3);
    const current = Math.round(eased*target);
    el.textContent = current.toLocaleString();
    if(progress<1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

const counterIO = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target;
      const target = parseInt(el.dataset.target)||0;
      animateCounter(el, target);
      counterIO.unobserve(el);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.counter').forEach(el=>counterIO.observe(el));

const spIO = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.sp-fill').forEach(bar=>{
        const w = bar.style.width;
        bar.style.width='0%';
        setTimeout(()=>{
          bar.style.transition='width 1.2s ease';
          bar.style.width=w;
        },200);
      });
      spIO.unobserve(e.target);
    }
  });
},{threshold:0.3});
document.querySelectorAll('.sustain-big-card').forEach(el=>spIO.observe(el));

document.addEventListener('keydown',e=>{
  if(e.key==='Escape') document.getElementById('mobileNav').classList.remove('open');
});

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

/* Cart */
let cart = JSON.parse(localStorage.getItem('krayCart') || '[]');

function saveCart(){
  localStorage.setItem('krayCart', JSON.stringify(cart));
}

function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}

function addToCart(name, price, img, variant){
  const id = name + (variant || '');
  const existing = cart.find(x=>x.id===id);
  if(existing){
    existing.qty++;
  } else {
    cart.push({id, name, price, img: img || '', variant: variant || '', qty: 1});
  }
  saveCart();
  updateCartBadge();
  renderCartItems();
  updateShipBar();
  showToast('✓ ' + name + ' added to cart');
}

function removeItem(id){
  cart = cart.filter(x=>x.id!==id);
  saveCart();
  updateCartBadge();
  renderCartItems();
  updateShipBar();
}

function openCart(){
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
  updateShipBar();
}
function closeCart(){
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

function updateCartBadge(){
  const b = document.getElementById('cartBadge');
  const c = cart.reduce((s,i)=>s+i.qty,0);
  b.textContent = c;
  b.style.display = c > 0 ? 'flex' : 'none';
  b.classList.add('pop');
  setTimeout(()=>b.classList.remove('pop'),300);
}

function updateShipBar(){
  const sub = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const left = Math.max(0, 50 - sub);
  const pct = Math.min(100, (sub / 50) * 100);
  document.getElementById('shipFill').style.width = pct + '%';
  if(left > 0){
    document.getElementById('shipMsg').innerHTML = 'Add <strong id="shipLeft">$' + left.toFixed(2) + '</strong> more for free shipping!';
  } else {
    document.getElementById('shipMsg').innerHTML = '🎉 You\'ve unlocked <strong>free shipping!</strong>';
  }
}

function renderCartItems(){
  const el = document.getElementById('cartItems');
  if(cart.length === 0){
    el.innerHTML = '<div class="cart-empty"><div class="icon">🛍️</div><h3>Your cart is empty</h3><p>Add some pieces to start building your dream wardrobe.</p></div>';
    document.getElementById('cartTotals').innerHTML = '';
    return;
  }
  let html = '';
  cart.forEach(item=>{
    html += `<div class="cart-item" data-id="${item.id}">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover"/></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">${item.variant || ''}</div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty('${item.id}',-1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}',1)">+</button>
          </div>
          <span class="cart-item-price">$${(item.price*item.qty).toFixed(2)}</span>
        </div>
      </div>
    </div>`;
  });
  el.innerHTML = html;
  renderCartTotals();
}

function renderCartTotals(){
  const sub = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const ship = sub >= 50 ? 0 : 5.99;
  const total = sub + ship;
  document.getElementById('cartTotals').innerHTML = `
    <div class="total-row"><span>Subtotal</span><span>$${sub.toFixed(2)}</span></div>
    <div class="total-row"><span>Shipping</span><span>${ship === 0 ? 'Free' : '$'+ship.toFixed(2)}</span></div>
    <div class="total-row grand"><span>Total</span><span>$${total.toFixed(2)}</span></div>
  `;
}

function changeQty(id,delta){
  const item = cart.find(x=>x.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(x=>x.id!==id);
  saveCart();
  updateCartBadge();
  renderCartItems();
  updateShipBar();
}

function applyPromo(){
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  if(code === 'KRAY10'){
    showToast('✓ Promo code applied: 10% off!');
  } else if(code){
    showToast('✗ Invalid promo code');
  }
}

function checkout(){
  if(cart.length === 0){
    alert('Your cart is empty!');
    return;
  }
  alert('Checkout coming soon!');
}

// Initialize on load
updateCartBadge();
