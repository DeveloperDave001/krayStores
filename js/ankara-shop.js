const productImages = [
  'img/Elegant Ankara Halter Dress – Chic African Print with Pleated Skirt.jpg',
  'img/Ankara and stripe butterfly gown.jpg',
  'img/Blue Empress.jpg',
  'img/Soft girl outfit.jpg',
  'img/Sweetra Plus Size Women Floral Print Waist Cinched Long Sleeve Elegant Casual Vacation Shirt Dress.jpg',
  'img/Adunni dress in another gorgeous print_.jpg',
  'img/Plus Size Women\'s Floral Print Waist Cinched Long Sleeve Casual Dress, Autumn.jpg',
  'img/Sweetra Plus Size Women Floral Print Waist Cinched Long Sleeve Elegant Casual Vacation Shirt Dress (1).jpg',
  'img/Plus Size Women\'s Floral Print Waist Cinched Long Sleeve Casual Dress, Autumn (1).jpg',
  'img/recreate.jpg'
];
const getProductImage = (id) => productImages[(id - 1) % productImages.length];
const PRODUCTS = [
  {id:1,name:"Elegant Ankara Halter Dress",short:"Chic African print halter dress with pleated skirt. Perfect for special occasions.",price:85.00,oldPrice:120.00,weight:null,category:"dress",goals:["formal","party"],tags:["Ankara","Halter","Women"],badge:"best",rating:4.9,reviews:42,featured:true,newest:false},
  {id:2,name:"Ankara Butterfly Gown",short:"Elegant Ankara and stripe butterfly gown. Flowing silhouette for events.",price:95.00,oldPrice:null,weight:null,category:"gown",goals:["formal","wedding"],tags:["Ankara","Butterfly","Women"],badge:null,rating:4.8,reviews:38,featured:true,newest:false},
  {id:3,name:"Blue Empress Ankara",short:"Regal blue empress Ankara print. Luxurious feel for formal events.",price:75.00,oldPrice:95.00,weight:null,category:"dress",goals:["formal","party"],tags:["Ankara","Blue","Women"],badge:"best",rating:5.0,reviews:56,featured:true,newest:false},
  {id:4,name:"Soft Girl Outfit",short:"Casual soft girl outfit in floral Ankara print. Comfortable everyday wear.",price:55.00,oldPrice:null,weight:null,category:"outfit",goals:["casual","daily"],tags:["Ankara","Floral","Women"],badge:"new",rating:4.9,reviews:23,featured:true,newest:true},
  {id:5,name:"Floral Print Shirt Dress",short:"Waist cinched floral print long sleeve dress. Perfect for vacations.",price:65.00,oldPrice:85.00,weight:null,category:"dress",goals:["casual","vacation"],tags:["Floral","Plus Size","Women"],badge:null,rating:4.7,reviews:41,featured:true,newest:false},
  {id:6,name:"Adunni Gorgeous Print",short:"Stunning Adunni dress in gorgeous print. Bold African elegance.",price:78.00,oldPrice:null,weight:null,category:"dress",goals:["formal","party"],tags:["Ankara","Bold","Women"],badge:"best",rating:4.8,reviews:67,featured:true,newest:true},
  {id:7,name:"Turkish Silk Fabrics",short:"Premium Turkish silk in two shades. Luxurious texture and vibrant colors.",price:120.00,oldPrice:150.00,weight:null,category:"fabric",goals:["custom","formal"],tags:["Silk","Turkish","Premium"],badge:"best",rating:4.9,reviews:34,featured:false,newest:true},
  {id:8,name:"Plus Size Floral Dress",short:"Plus size women's floral print waist cinched dress. Elegant casual style.",price:58.00,oldPrice:null,weight:null,category:"dress",goals:["casual","plus"],tags:["Plus Size","Floral","Women"],badge:null,rating:4.8,reviews:52,featured:false,newest:false},
  {id:9,name:"Recreate Classic Print",short:"Classic recreate Ankara print. Timeless African pattern.",price:45.00,oldPrice:null,weight:null,category:"fabric",goals:["daily","custom"],tags:["Ankara","Classic","Unisex"],badge:null,rating:4.6,reviews:28,featured:false,newest:false},
  {id:10,name:"Vintage Ankara Set",short:"Vintage Ankara print set. Complete outfit for traditional events.",price:88.00,oldPrice:110.00,weight:null,category:"set",goals:["traditional","party"],tags:["Ankara","Vintage","Women"],badge:null,rating:4.7,reviews:45,featured:false,newest:false},
  {id:11,name:"Casual Ankara Top",short:"Casual Ankara top for everyday wear. Comfortable and stylish.",price:35.00,oldPrice:null,weight:null,category:"top",goals:["casual","daily"],tags:["Ankara","Casual","Women"],badge:null,rating:4.8,reviews:63,featured:false,newest:false},
  {id:12,name:"Ankara Palazzo Pants",short:"Flowing Ankara palazzo pants. Wide-leg comfort meets style.",price:52.00,oldPrice:65.00,weight:null,category:"pants",goals:["casual","formal"],tags:["Ankara","Palazzo","Women"],badge:"new",rating:4.9,reviews:39,featured:false,newest:true},
  {id:13,name:"African Print Blazer",short:"Tailored African print blazer. Professional elegance with cultural flair.",price:95.00,oldPrice:null,weight:null,category:"blazer",goals:["formal","work"],tags:["Ankara","Blazer","Unisex"],badge:null,rating:4.8,reviews:47,featured:false,newest:false},
  {id:14,name:"Ankara Skirt Set",short:"Coordinated Ankara skirt set. Perfect for office or events.",price:48.00,oldPrice:null,weight:null,category:"set",goals:["work","formal"],tags:["Ankara","Skirt","Women"],badge:null,rating:4.7,reviews:55,featured:false,newest:false},
  {id:15,name:"Bold Pattern Tunic",short:"Bold pattern Ankara tunic. Flowing fit for all occasions.",price:42.00,oldPrice:55.00,weight:null,category:"tunic",goals:["casual","party"],tags:["Ankara","Bold","Women"],badge:null,rating:4.9,reviews:71,featured:false,newest:false},
  {id:16,name:"Ankara Jumpsuit",short:"One-piece Ankara jumpsuit. Modern African elegance.",price:68.00,oldPrice:85.00,weight:null,category:"jumpsuit",goals:["formal","party"],tags:["Ankara","Jumpsuit","Women"],badge:"new",rating:4.8,reviews:29,featured:false,newest:true},
  {id:17,name:"Traditional Wrapper",short:"Authentic traditional wrapper fabric. Genuine African print.",price:38.00,oldPrice:null,weight:null,category:"fabric",goals:["traditional","daily"],tags:["Traditional","Authentic","Women"],badge:null,rating:4.6,reviews:84,featured:false,newest:false},
  {id:18,name:"Ankara Head tie Set",short:"Coordinated head tie and wrapper set. Complete Gele style.",price:28.00,oldPrice:null,weight:null,category:"accessory",goals:["traditional","wedding"],tags:["Gele","Head Tie","Women"],badge:null,rating:4.9,reviews:92,featured:false,newest:false},
  {id:19,name:"Kaftan Style Dress",short:"Classic Kaftan style in Ankara print. Flowing comfort.",price:72.00,oldPrice:90.00,weight:null,category:"dress",goals:["formal","traditional"],tags:["Kaftan","Ankara","Unisex"],badge:null,rating:4.8,reviews:46,featured:false,newest:false},
  {id:20,name:"Ankara Bomber Jacket",short:"Trendy Ankara bomber jacket. Streetwear meets culture.",price:85.00,oldPrice:null,weight:null,category:"jacket",goals:["casual","streetwear"],tags:["Ankara","Bomber","Unisex"],badge:"new",rating:4.7,reviews:33,featured:false,newest:true},
  {id:21,name:"Wrap Dress Ankara",short:"Elegant wrap dress in Ankara print. Flattering fit for all sizes.",price:58.00,oldPrice:null,weight:null,category:"dress",goals:["work","party"],tags:["Ankara","Wrap","Women"],badge:null,rating:4.9,reviews:58,featured:false,newest:false},
  {id:22,name:"Ankara Midi Skirt",short:"Classy Ankara midi skirt. Professional and cultural.",price:45.00,oldPrice:55.00,weight:null,category:"skirt",goals:["work","formal"],tags:["Ankara","Midi","Women"],badge:null,rating:4.8,reviews:67,featured:false,newest:false},
  {id:23,name:"Ankara Blouse",short:"Stylish Ankara blouse. Pair with jeans or skirts.",price:38.00,oldPrice:null,weight:null,category:"top",goals:["casual","work"],tags:["Ankara","Blouse","Women"],badge:null,rating:4.7,reviews:49,featured:false,newest:false},
  {id:24,name:"Ankara Two-Piece Set",short:"Coordinated two-piece Ankara set. Complete outfit made easy.",price:78.00,oldPrice:95.00,weight:null,category:"set",goals:["party","formal"],tags:["Ankara","Two-Piece","Women"],badge:"best",rating:4.9,reviews:81,featured:true,newest:false}
];

function renderPack(p) {
  const imgSrc = getProductImage(p.id);
  return `<img src="${imgSrc}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">`;
}

const badgeMap = {
  best:'<span class="product-badge badge-best">Bestseller</span>',
  new:'<span class="product-badge badge-new">New</span>',
  limited:'<span class="product-badge badge-limited">Limited</span>',
};
const tagColors = {
  'Ankara':'ptag-a','Halter':'ptag-g','Women':'ptag-b','Butterfly':'ptag-p','Blue':'ptag-b',
  'Floral':'ptag-g','Plus Size':'ptag-a','Bold':'ptag-p','Silk':'ptag-p','Turkish':'ptag-p',
  'Premium':'ptag-p','Classic':'ptag-g','Vintage':'ptag-a','Casual':'ptag-g','Palazzo':'ptag-b',
  'Blazer':'ptag-p','Skirt':'ptag-g','Tunic':'ptag-g','Jumpsuit':'ptag-p','Traditional':'ptag-a',
  'Gele':'ptag-p','Kaftan':'ptag-p','Bomber':'ptag-r','Wrap':'ptag-g','Midi':'ptag-b',
  'Blouse':'ptag-g','Two-Piece':'ptag-p','Fabric':'ptag-g','Accessory':'ptag-g','Jacket':'ptag-p',
  'Dress':'ptag-g','Gown':'ptag-p','Set':'ptag-b','Top':'ptag-g','Pants':'ptag-b'
};

function tagClass(t){return tagColors[t]||'ptag-g'}

let cart = [];

function cartTotal(){return cart.reduce((s,i)=>s+i.price*i.qty,0)}
function cartCount(){return cart.reduce((s,i)=>s+i.qty,0)}

function updateCartBadge(){
  const b=document.getElementById('cartBadge');
  if(b){b.textContent=cartCount();b.classList.add('pop');setTimeout(()=>b.classList.remove('pop'),300);}
}

function addToCart(id, btnEl){
  const p = PRODUCTS.find(x=>x.id===id);
  const existing = cart.find(x=>x.id===id);
  if(existing){existing.qty++}else{cart.push({...p,qty:1})}
  updateCartBadge();
  renderCartItems();
  if(btnEl){btnEl.classList.add('adding');setTimeout(()=>btnEl.classList.remove('adding'),300)}
}

function removeFromCart(id){
  const i=cart.findIndex(x=>x.id===id);
  if(i>-1){cart.splice(i,1)}
  updateCartBadge();
  renderCartItems();
}

function updateCartQty(id, delta){
  const i=cart.findIndex(x=>x.id===id);
  if(i>-1){cart[i].qty+=delta;if(cart[i].qty<1){cart.splice(i,1)}}
  updateCartBadge();
  renderCartItems();
}

function renderCartItems(){
  const c=document.getElementById('cartItems');
  if(!c) return;
  c.innerHTML=cart.map(i=>`
    <div class="cart-item">
      <div class="cart-item-img"><img src="${getProductImage(i.id)}" alt="${i.name}"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-price">$${i.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartQty(${i.id},-1)">−</button>
          <span>${i.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${i.id},1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i.id})">🗑️</button>
    </div>
  `).join('');
  const t=document.getElementById('cartTotals');
  if(t){t.innerHTML=`
    <div class="cart-subtotal"><span>Subtotal</span><span>$${cartTotal().toFixed(2)}</span></div>
    <div class="cart-total"><span>Total</span><span>$${cartTotal().toFixed(2)}</span></div>
  `;}
  const smsg=document.getElementById('shipMsg');
  if(smsg){
    const left=50-cartTotal();
    if(left>0){smsg.textContent=`Add $${left.toFixed(2)} more for free shipping!`;smsg.style.display='block';}
    else{smsg.textContent='🎉 Free shipping unlocked!';smsg.style.display='block';}
    document.getElementById('shipFill').style.width=Math.min(100,(cartTotal()/50)*100)+'%';
  }
}

function openCart(){
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeCart(){
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style='';
}

function applyPromo(){
  const code=document.getElementById('promoInput').value.trim().toUpperCase();
  if(code==='KRAY20'){alert('20% off applied!');renderCartItems();}
  else if(code){alert('Invalid code');}
}

function handleQvOverlayClick(e){
  if(e.target.id==='qvOverlay') closeQuickView();
}

let wishlist=new Set();

function toggleWishlist(id, btnEl){
  if(wishlist.has(id)){wishlist.delete(id);if(btnEl){btnEl.classList.remove('active');btnEl.innerHTML='🤍';}}
  else{wishlist.add(id);if(btnEl){btnEl.classList.add('active');btnEl.innerHTML='💚';}}
}

let currentPage=1;
const PER_PAGE=24;

function getFilteredProducts(){
  let filtered=[...PRODUCTS];
  const cats=Array.from(document.querySelectorAll('#catFilters input:checked')).map(i=>i.value);
  if(cats.length){filtered=filtered.filter(p=>cats.includes(p.category))}
  const goals=Array.from(document.querySelectorAll('#goalFilters input:checked')).map(i=>i.value);
  if(goals.length){filtered=filtered.filter(p=>p.goals.some(g=>goals.includes(g)))}
  const minP=parseFloat(document.getElementById('minPrice').value)||0;
  const maxP=parseFloat(document.getElementById('maxPrice').value)||Infinity;
  filtered=filtered.filter(p=>p.price>=minP&&p.price<=maxP);
  const rating=parseFloat(document.querySelector('input[name="rating"]:checked').value)||0;
  if(rating){filtered=filtered.filter(p=>p.rating>=rating)}
  const search=document.getElementById('searchInput').value.toLowerCase();
  if(search){filtered=filtered.filter(p=>p.name.toLowerCase().includes(search)||p.short.toLowerCase().includes(search))}
  const sort=document.getElementById('sortSelect').value;
  if(sort==='price-asc')filtered.sort((a,b)=>a.price-b.price);
  else if(sort==='price-desc')filtered.sort((a,b)=>b.price-a.price);
  else if(sort==='rating')filtered.sort((a,b)=>b.rating-a.rating);
  else if(sort==='newest')filtered.sort((a,b)=>b.newest-a.newest);
  else if(sort==='popular')filtered.sort((a,b)=>b.reviews-a.reviews);
  else filtered.sort((a,b)=>b.featured-a.featured);
  return filtered;
}

function renderGrid(){
  const grid = document.getElementById('productsGrid');
  const noR = document.getElementById('noResults');
  const filtered = getFilteredProducts();
  document.getElementById('resultCount').textContent = filtered.length;

  if(filtered.length===0){
    grid.style.display='none';
    noR.style.display='block';
    document.getElementById('pagination').innerHTML='';
    return;
  }
  grid.style.display='grid';
  noR.style.display='none';

  const start = (currentPage-1)*PER_PAGE;
  const page = filtered.slice(start, start+PER_PAGE);

  grid.innerHTML = page.map((p,i)=>{
    const wl = wishlist.has(p.id);
    const tagHTML = p.tags.slice(0,3).map(t=>`<span class="ptag ${tagClass(t)}">${t}</span>`).join('');
    const oldPriceHTML = p.oldPrice ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span><span class="price-save">Save $${(p.oldPrice-p.price).toFixed(2)}</span>` : '';
    const starsHTML = '★'.repeat(Math.round(p.rating))+'☆'.repeat(5-Math.round(p.rating));
    const isList = viewMode === 'list';
    const tooltipTagsHTML = p.tags.slice(0,4).map(t=>`<span class="tt-pill">${t}</span>`).join('');
    return `
    <article class="product-card reveal" style="animation-delay:${i*0.04}s" data-id="${p.id}" aria-label="${p.name}">
      <div class="product-img" style="background:#E8E4E0">
        ${p.badge ? badgeMap[p.badge] : ''}
        <button class="wishlist-btn ${wl?'active':''}" onclick="event.stopPropagation();toggleWishlist(${p.id},this)" aria-label="${wl?'Remove from':'Add to'} wishlist">${wl?'💚':'🤍'}</button>
        <img src="${getProductImage(p.id)}" alt="${p.name}" class="product-real-img">
        ${!isList?`<div class="quick-add">
          <span onclick="event.stopPropagation();openQuickView(${p.id})">👁 Quick View</span>
          <span class="quick-add-divider"></span>
          <span onclick="event.stopPropagation();addToCart(${p.id},null)">+ Add to Cart</span>
        </div>`:''}
        <div class="card-tooltip" role="tooltip">
          <div class="tt-name">${p.name}</div>
          <div class="tt-desc">${p.short}</div>
          <div class="tt-pills">${tooltipTagsHTML}</div>
        </div>
      </div>
      <div class="product-body" onclick="openQuickView(${p.id})">
        <div class="product-tags">${tagHTML}</div>
        <h2 class="product-name">${p.name}</h2>
        <p class="product-desc">${p.short}</p>
        <div class="product-rating">
          <span class="stars" aria-label="${p.rating} stars">${starsHTML}</span>
          <span class="rating-num">${p.rating}</span>
          <span class="reviews">(${p.reviews})</span>
        </div>
        <div class="product-bottom">
          <div class="product-pricing">
            <span class="price-current">$${p.price.toFixed(2)}</span>
            ${oldPriceHTML}
          </div>
          <button class="atc-btn" onclick="event.stopPropagation();addToCart(${p.id},this)" aria-label="Add to cart">+</button>
        </div>
      </div>
    </article>`;
  }).join('');

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const p = document.getElementById('pagination');
  if(totalPages > 1){
    let html = '';
    for(let i=1; i<=totalPages; i++){
      html += `<button class="pg-btn ${i===currentPage?'active':''}" onclick="goToPage(${i})">${i}</button>`;
    }
    p.innerHTML = html;
  } else {
    p.innerHTML = '';
  }
}

function goToPage(p){currentPage=p;renderGrid();window.scrollTo({top:document.getElementById('shopLayout').offsetTop-100,behavior:'smooth'})}

function applyFilters(){currentPage=1;renderGrid();}
function clearAllFilters(){
  document.querySelectorAll('#catFilters input,#goalFilters input').forEach(i=>i.checked=false);
  document.getElementById('searchInput').value='';
  document.getElementById('minPrice').value=0;
  document.getElementById('maxPrice').value=500;
  document.querySelector('input[name="rating"][value="0"]').checked=true;
  applyFilters();
}

let viewMode='grid';
function setView(v){
  viewMode=v;
  document.getElementById('gridViewBtn').classList.toggle('active',v==='grid');
  document.getElementById('listViewBtn').classList.toggle('active',v==='list');
  document.getElementById('productsGrid').classList.toggle('list-view',v==='list');
}

function toggleGroup(el){
  el.nextElementSibling.classList.toggle('open');
  el.classList.toggle('open');
}

function renderActiveFilters(){
  const ac=document.getElementById('activeFilters');
  if(!ac) return;
  let chips=[];
  document.querySelectorAll('#catFilters input:checked').forEach(i=>chips.push({label:i.nextElementSibling.textContent.trim(),fn:()=>{i.checked=false;applyFilters()}}));
  document.querySelectorAll('#goalFilters input:checked').forEach(i=>chips.push({label:i.nextElementSibling.textContent.trim(),fn:()=>{i.checked=false;applyFilters()}}));
  const search=document.getElementById('searchInput').value;
  if(search)chips.push({label:'Search: '+search,fn:()=>{document.getElementById('searchInput').value='';applyFilters()}});
  if(chips.length===0){ac.innerHTML='';return}
  ac.innerHTML=chips.map((c,i)=>`<span class="filter-chip" data-index="${i}">✕ ${c.label}</span>`).join('');
}

function toggleSidebar(){
  const sb=document.getElementById('sidebar');
  const ft=document.getElementById('filterToggle');
  if(sb.classList.contains('open')){sb.classList.remove('open');ft.classList.remove('active');}
  else{sb.classList.add('open');ft.classList.add('active');}
}

let qvCurrentId=null;
let qvQty=1;

function closeQuickView(){
  document.getElementById('qvOverlay').classList.remove('open');
  document.body.style='';
}

function openQuickView(id){
  qvCurrentId=id;
  qvQty=1;
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  document.getElementById('qvLeft').style.background = '#E8E4E0';
  const badgeEl = document.getElementById('qvBadge');
  if(badgeEl){badgeEl.innerHTML = p.badge ? badgeMap[p.badge] : '';}
  document.getElementById('qvPackWrap').innerHTML = renderPack(p);
  document.getElementById('qvCategory').textContent = p.category;
  document.getElementById('qvModalName').textContent = p.name;
  document.getElementById('qvStars').textContent = '★'.repeat(Math.round(p.rating))+'☆'.repeat(5-Math.round(p.rating));
  document.getElementById('qvRatingNum').textContent = p.rating;
  document.getElementById('qvReviews').textContent = `(${p.reviews} reviews)`;
  document.getElementById('qvPrice').textContent = '$'+p.price.toFixed(2);
  const oldEl = document.getElementById('qvOldPrice');
  const saveEl = document.getElementById('qvSave');
  if(p.oldPrice){
    oldEl.textContent = '$'+p.oldPrice.toFixed(2);
    oldEl.style.display='inline';
    saveEl.textContent = 'Save $'+(p.oldPrice-p.price).toFixed(2);
    saveEl.style.display='inline';
  } else {
    oldEl.style.display='none';
    saveEl.style.display='none';
  }
  document.getElementById('qvWeight').textContent = '';
  document.getElementById('qvDesc').textContent = p.short;
  document.getElementById('qvBenefits').innerHTML = p.tags.map(t=>`<div class="qv-benefit"><div class="dot">✓</div><span>${t}</span></div>`).join('');
  document.getElementById('qvUsage').textContent = 'Premium quality fabric. Machine wash cold, tumble dry low.';
  document.getElementById('qvUsageSteps').innerHTML = '<li><span class="step-n">1</span><span>Check size guide</span></li><li><span class="step-n">2</span><span>Wash before first wear</span></li><li><span class="step-n">3</span><span>Iron on low heat</span></li>';
  document.getElementById('qvReviewSummary').innerHTML = `<div style="text-align:center"><div class="qv-big-rating">${p.rating}</div><div style="color:var(--rose-gold);font-size:18px;margin:4px 0">${'★'.repeat(Math.round(p.rating))}</div><div style="font-size:11px;color:var(--gray-400)">${p.reviews} reviews</div></div>`;
  document.getElementById('qvReviewCards').innerHTML = '<div class="qv-review-card"><div class="qv-review-head"><span class="qv-rev-stars">★★★★★</span></div><div class="qv-rev-text">Great quality!</div></div>';
  document.getElementById('qvQtyNum').textContent = qvQty;
  document.getElementById('qvOverlay').classList.add('open');
}

function qvUpdateQty(delta){
  qvQty+=delta;
  if(qvQty<1)qvQty=1;
  document.getElementById('qvQtyNum').textContent=qvQty;
}

function qvAddToCart(){
  if(qvCurrentId){addToCart(qvCurrentId);closeQuickView();openCart();}
}

function qvToggleWishlist(){
  if(qvCurrentId){
    if(wishlist.has(qvCurrentId)){wishlist.delete(qvCurrentId);document.getElementById('qvWishlistBtn').innerHTML='🤍';}
    else{wishlist.add(qvCurrentId);document.getElementById('qvWishlistBtn').innerHTML='❤️';}
  }
}

function toggleMobileNav(){
  const mn = document.getElementById('mobileNav');
  mn.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded',function(){
  const mdTrigger=document.querySelector('.mobile-dropdown-trigger');
  if(mdTrigger){
    mdTrigger.addEventListener('click',function(e){
      e.preventDefault();
      this.parentElement.classList.toggle('open');
    });
  }
});

document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    if(document.getElementById('qvOverlay').classList.contains('open')) closeQuickView();
    else if(document.getElementById('cartOverlay').classList.contains('open')) closeCart();
  }
});

renderCartItems();
renderGrid();
updateCartBadge();