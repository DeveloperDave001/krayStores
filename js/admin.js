/* Admin Dashboard */
const CATEGORIES = ['printed-tshirts','ankara-materials','ready-made','round-necks'];
const CAT_NAMES = {'printed-tshirts':'Printed T-Shirts','ankara-materials':'Ankara Materials','ready-made':'Ready Made','round-necks':'Round Necks'};
const STATUSES = ['pending','processing','shipped','delivered','cancelled'];
const STATUS_LABELS = {pending:'Pending',processing:'Processing',shipped:'Shipped',delivered:'Delivered',cancelled:'Cancelled'};

/* Data management */
function getProducts(){
  return JSON.parse(localStorage.getItem('krayProducts') || '[]');
}
function saveProducts(p){
  localStorage.setItem('krayProducts', JSON.stringify(p));
}
function getOrders(){
  return JSON.parse(localStorage.getItem('krayOrders') || '[]');
}
function saveOrders(o){
  localStorage.setItem('krayOrders', JSON.stringify(o));
}
function getCustomers(){
  return JSON.parse(localStorage.getItem('krayCustomers') || '[]');
}
function saveCustomers(c){
  localStorage.setItem('krayCustomers', JSON.stringify(c));
}

/* Seed sample data if empty */
function seedData(){
  let products = getProducts();
  if(products.length === 0){
    products = [
      {id:'P001',name:'Bold Graphic Tee',category:'printed-tshirts',price:29.99,stock:150,image:'',desc:'Eye-catching graphic design',sales:42,revenue:1259.58},
      {id:'P002',name:'Vintage Print Shirt',category:'printed-tshirts',price:34.99,stock:80,image:'',desc:'Retro-inspired design',sales:35,revenue:1224.65},
      {id:'P003',name:'Typography Tee',category:'printed-tshirts',price:27.99,stock:200,image:'',desc:'Statement typography design',sales:28,revenue:783.72},
      {id:'P004',name:'Sunset Ankara',category:'ankara-materials',price:45.00,stock:60,image:'',desc:'Vibrant sunset pattern',sales:31,revenue:1395.00},
      {id:'P005',name:'Heritage Ankara',category:'ankara-materials',price:55.00,stock:40,image:'',desc:'Traditional African print',sales:25,revenue:1375.00},
      {id:'P006',name:'Modern Ankara',category:'ankara-materials',price:48.00,stock:55,image:'',desc:'Contemporary African design',sales:22,revenue:1056.00},
      {id:'P007',name:'Classic Suit',category:'ready-made',price:129.99,stock:30,image:'',desc:'Tailored formal suit',sales:18,revenue:2339.82},
      {id:'P008',name:'Elegant Dress',category:'ready-made',price:89.99,stock:45,image:'',desc:'Sophisticated evening dress',sales:22,revenue:1979.78},
      {id:'P009',name:'Casual Blazer',category:'ready-made',price:99.99,stock:35,image:'',desc:'Smart casual blazer',sales:15,revenue:1499.85},
      {id:'P010',name:'Essential Round Neck',category:'round-necks',price:19.99,stock:300,image:'',desc:'Classic everyday tee',sales:55,revenue:1099.45},
      {id:'P011',name:'Premium Round Neck',category:'round-necks',price:24.99,stock:180,image:'',desc:'Premium cotton blend',sales:40,revenue:999.60},
      {id:'P012',name:'Striped Round Neck',category:'round-necks',price:22.99,stock:120,image:'',desc:'Classic striped pattern',sales:30,revenue:689.70},
    ];
    saveProducts(products);
  }

  let orders = getOrders();
  if(orders.length === 0){
    const customers = [
      {name:'John Smith',email:'john@email.com'},
      {name:'Sarah Johnson',email:'sarah@email.com'},
      {name:'Michael Brown',email:'michael@email.com'},
      {name:'Emily Davis',email:'emily@email.com'},
      {name:'David Wilson',email:'david@email.com'},
      {name:'Jessica Taylor',email:'jessica@email.com'},
      {name:'James Anderson',email:'james@email.com'},
      {name:'Lisa Thomas',email:'lisa@email.com'},
      {name:'Robert Jackson',email:'robert@email.com'},
      {name:'Amanda White',email:'amanda@email.com'},
      {name:'Chris Martin',email:'chris@email.com'},
      {name:'Nicole Garcia',email:'nicole@email.com'},
      {name:'Daniel Lee',email:'daniel@email.com'},
      {name:'Rachel Clark',email:'rachel@email.com'},
      {name:'Kevin Rodriguez',email:'kevin@email.com'},
    ];
    const now = new Date();
    orders = [];
    for(let i = 0; i < 45; i++){
      const p = products[Math.floor(Math.random()*products.length)];
      const c = customers[Math.floor(Math.random()*customers.length)];
      const qty = Math.floor(Math.random()*3)+1;
      const daysAgo = Math.floor(Math.random()*90);
      const d = new Date(now);
      d.setDate(d.getDate()-daysAgo);
      orders.push({
        id:'ORD-'+String(10001+i),
        customer:c.name,
        email:c.email,
        product:p.name,
        category:p.category,
        price:p.price,
        qty:qty,
        total:p.price*qty,
        status:STATUSES[Math.floor(Math.random()*5)],
        date:d.toISOString().split('T')[0],
        phone:'+1-555-01'+String(Math.floor(Math.random()*90)+10)
      });
    }
    orders.sort((a,b)=>new Date(b.date)-new Date(a.date));
    saveOrders(orders);

    const custMap = {};
    orders.forEach(o=>{
      if(!custMap[o.email]){
        custMap[o.email] = {name:o.name||o.customer,email:o.email,orders:0,total:0,lastOrder:o.date,categories:{}};
      }
      custMap[o.email].orders++;
      custMap[o.email].total+=o.total;
      if(new Date(o.date)>new Date(custMap[o.email].lastOrder)) custMap[o.email].lastOrder=o.date;
      custMap[o.email].categories[o.category]=(custMap[o.email].categories[o.category]||0)+1;
    });
    saveCustomers(Object.values(custMap).map(c=>{
      let fav = Object.entries(c.categories).sort((a,b)=>b[1]-a[1])[0];
      return {...c,favoriteCategory:CAT_NAMES[fav[0]]||'N/A'};
    }));
  }
}

/* Navigation */
document.addEventListener('DOMContentLoaded',()=>{
  seedData();
  setupNav();
  updateDashboard();
});

function setupNav(){
  document.querySelectorAll('.nav-item').forEach(item=>{
    item.addEventListener('click',e=>{
      e.preventDefault();
      const sec = item.dataset.section;
      document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
      item.classList.add('active');
      document.querySelectorAll('.page-section').forEach(s=>s.classList.add('hidden'));
      document.getElementById('section-'+sec).classList.remove('hidden');
      if(sec==='dashboard') updateDashboard();
      if(sec==='orders') renderOrders();
      if(sec==='products') renderProducts();
      if(sec==='analytics') renderAnalytics();
      if(sec==='customers') renderCustomers();
      if(window.innerWidth<=768) document.getElementById('sidebar').classList.remove('open');
    });
  });
  document.querySelectorAll('.view-all[data-section]').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      const sec = link.dataset.section;
      document.querySelector(`.nav-item[data-section="${sec}"]`).click();
    });
  });

  document.getElementById('sidebarToggle').addEventListener('click',()=>{
    document.getElementById('sidebar').classList.toggle('open');
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      closeProductModal();
      closeOrderModal();
    }
  });
}

/* Dashboard */
function updateDashboard(){
  const orders = getOrders();
  const products = getProducts();
  const days = parseInt(document.getElementById('dashPeriod').value);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate()-days);
  const filtered = orders.filter(o=>new Date(o.date)>=cutoff);

  const totalRevenue = filtered.reduce((s,o)=>s+o.total,0);
  const totalOrders = filtered.length;
  const avgOrder = totalOrders>0?totalRevenue/totalOrders:0;
  const totalProducts = products.length;

  document.getElementById('kpiRevenue').textContent = '$'+totalRevenue.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('kpiOrders').textContent = totalOrders;
  document.getElementById('kpiProducts').textContent = totalProducts;
  document.getElementById('kpiAvg').textContent = '$'+avgOrder.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

  const prevCutoff = new Date();
  prevCutoff.setDate(prevCutoff.getDate()-days*2);
  const prevFiltered = orders.filter(o=>new Date(o.date)>=prevCutoff && new Date(o.date)<cutoff);
  const prevRev = prevFiltered.reduce((s,o)=>s+o.total,0);
  const prevOrd = prevFiltered.length;

  updateChange('kpiRevenueChange',totalRevenue,prevRev,true);
  updateChange('kpiOrdersChange',totalOrders,prevOrd,true);
  const prevAvg = prevOrd>0?prevRev/prevOrd:0;
  updateChange('kpiAvgChange',avgOrder,prevAvg,true);

  const periodLabels = {7:'Last 7 Days',30:'Last 30 Days',90:'Last 90 Days',365:'This Year'};
  document.getElementById('revenuePeriodLabel').textContent = periodLabels[days]||'Last 30 Days';

  drawRevenueChart(filtered,days);
  drawCategoryChart(filtered);
  drawWeeklyChart(orders);
  drawMonthlyChart(orders);
  drawTopProducts(filtered);
  drawRecentOrders(orders.slice(0,5));

  document.getElementById('newOrdersBadge').textContent = orders.filter(o=>o.status==='pending').length;
}

function updateChange(elId,current,prev,bigger=true){
  const el = document.getElementById(elId);
  if(prev===0){el.textContent='No prior data';el.className='kpi-change';return;}
  const change = ((current-prev)/prev*100).toFixed(1);
  const isUp = bigger?change>=0:change<=0;
  el.textContent = (change>=0?'+':'')+change+'% vs prior';
  el.className = 'kpi-change '+(isUp?'up':'down');
}

/* Charts using Canvas */
function drawRevenueChart(orders,days){
  const canvas = document.getElementById('revenueChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 48;
  canvas.height = 260;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const now = new Date();
  const buckets = days<=7?7:days<=30?30:days<=90?12:12;
  const bucketSize = days<=7?'day':days<=30?'day':'month';
  const data = new Array(buckets).fill(0);

  orders.forEach(o=>{
    const d = new Date(o.date);
    let idx;
    if(bucketSize==='month'){
      idx = d.getMonth();
    } else {
      idx = Math.floor((now-d)/(1000*60*60*24));
      if(idx>=buckets) idx=buckets-1;
    }
    if(idx>=0 && idx<buckets) data[idx]+=o.total;
  });

  if(bucketSize==='month'){
    data.reverse();
  } else {
    data.reverse();
  }

  const max = Math.max(...data,1);
  const w = canvas.width;
  const h = canvas.height - 40;
  const barW = (w-40)/buckets;
  const gap = barW*0.25;
  const fillW = barW-gap;

  for(let i=0;i<buckets;i++){
    const barH = (data[i]/max)*h*0.85;
    const x = 30+i*barW+gap/2;
    const y = h-barH;

    const grad = ctx.createLinearGradient(0,y,0,h);
    grad.addColorStop(0,'#9a0002');
    grad.addColorStop(1,'#B76E79');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x,y,fillW,barH,4);
    ctx.fill();
  }

  ctx.fillStyle='#9A958D';
  ctx.font='11px DM Sans, sans-serif';
  ctx.textAlign='center';
  for(let i=0;i<buckets;i++){
    let label;
    if(bucketSize==='month'){
      const m = new Date(2026,buckets-buckets+i,1);
      label = m.toLocaleString('default',{month:'short'});
    } else {
      const dayDate = new Date();
      dayDate.setDate(dayDate.getDate()-(buckets-1-i));
      label = dayDate.toLocaleString('default',{month:'short',day:'numeric'});
    }
    ctx.fillText(label,30+i*barW+barW/2,h+18);
  }

  ctx.textAlign='left';
  ctx.fillStyle='#9A958D';
  ctx.fillText('$'+max.toLocaleString(),0,14);
}

function drawCategoryChart(orders){
  const canvas = document.getElementById('categoryChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 48;
  canvas.height = 260;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const catData = {};
  orders.forEach(o=>{catData[o.category]=(catData[o.category]||0)+o.total});
  const entries = Object.entries(catData).sort((a,b)=>b[1]-a[1]);
  const total = entries.reduce((s,e)=>s+e[1],0)||1;
  const colors = ['#9a0002','#B76E79','#E8846B','#1A2744'];

  const cx = canvas.width/2;
  const cy = canvas.height/2-10;
  const r = Math.min(cx,cy)-20;
  let startAngle = -Math.PI/2;

  entries.forEach((entry,i)=>{
    const angle = (entry[1]/total)*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,startAngle,startAngle+angle);
    ctx.closePath();
    ctx.fillStyle=colors[i%colors.length];
    ctx.fill();
    startAngle+=angle;
  });

  ctx.beginPath();
  ctx.arc(cx,cy,r*0.55,0,Math.PI*2);
  ctx.fillStyle='#fff';
  ctx.fill();

  ctx.fillStyle='#2D2D2D';
  ctx.font='bold 20px Plus Jakarta Sans, sans-serif';
  ctx.textAlign='center';
  ctx.fillText('$'+(total/1000).toFixed(1)+'k',cx,cy+2);
  ctx.fillStyle='#9A958D';
  ctx.font='11px DM Sans, sans-serif';
  ctx.fillText('total',cx,cy+18);

  let legendY = canvas.height-24;
  const legendX = 8;
  ctx.textAlign='left';
  ctx.font='11px DM Sans, sans-serif';
  entries.forEach((entry,i)=>{
    const x = legendX+i*Math.min(140,canvas.width/entries.length);
    ctx.fillStyle=colors[i%colors.length];
    ctx.beginPath();ctx.arc(x+4,legendY-4,4,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#5E5A52';
    ctx.fillText((CAT_NAMES[entry[0]]||entry[0]).substring(0,12),x+12,legendY);
  });
}

function drawWeeklyChart(orders){
  const canvas = document.getElementById('weeklyChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 48;
  canvas.height = 230;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const data = new Array(7).fill(0);
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate()-(dayOfWeek===0?6:dayOfWeek-1));
  monday.setHours(0,0,0,0);

  orders.forEach(o=>{
    const d = new Date(o.date);
    if(d>=monday){
      const dayDiff = Math.floor((d-monday)/(1000*60*60*24));
      if(dayDiff>=0 && dayDiff<7) data[dayDiff]+=o.total;
    }
  });

  const max = Math.max(...data,1);
  const w = canvas.width;
  const h = canvas.height - 40;
  const barW = (w-40)/7;
  const gap = barW*0.3;
  const colors = ['#9a0002','#a30d0d','#ac1818','#b52323','#be2e2e','#c73939','#d04444'];

  const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  for(let i=0;i<7;i++){
    const barH = (data[i]/max)*h*0.85;
    const x = 30+i*barW+gap/2;
    const y = h-barH;
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.roundRect(x,y,barW-gap,barH,4);
    ctx.fill();

    ctx.fillStyle='#9A958D';
    ctx.font='11px DM Sans, sans-serif';
    ctx.textAlign='center';
    ctx.fillText(dayNames[i],30+i*barW+barW/2,h+16);
  }

  ctx.textAlign='left';
  ctx.fillStyle='#9A958D';
  ctx.fillText('$'+max.toFixed(0),0,12);
}

function drawMonthlyChart(orders){
  const canvas = document.getElementById('monthlyChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 48;
  canvas.height = 230;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const data = new Array(12).fill(0);
  orders.forEach(o=>{
    const m = new Date(o.date).getMonth();
    data[m]+=o.total;
  });

  const max = Math.max(...data,1);
  const w = canvas.width;
  const h = canvas.height - 40;
  const barW = (w-30)/12;
  const gap = barW*0.2;

  for(let i=0;i<12;i++){
    const barH = (data[i]/max)*h*0.85;
    const x = 25+i*barW+gap/2;
    const y = h-barH;
    const grad = ctx.createLinearGradient(0,y,0,h);
    grad.addColorStop(0,'#9a0002');
    grad.addColorStop(1,'#B76E79');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x,y,barW-gap,barH,4);
    ctx.fill();

    ctx.fillStyle='#9A958D';
    ctx.font='10px DM Sans, sans-serif';
    ctx.textAlign='center';
    const m = new Date(2026,i,1);
    ctx.fillText(m.toLocaleString('default',{month:'short'}),25+i*barW+barW/2,h+16);
  }

  ctx.textAlign='left';
  ctx.fillStyle='#9A958D';
  ctx.fillText('$'+(max/1000).toFixed(1)+'k',0,12);
}

function drawTopProducts(orders){
  const el = document.getElementById('topProductsList');
  if(!el) return;
  const prodMap = {};
  orders.forEach(o=>{
    if(!prodMap[o.product]) prodMap[o.product] = {name:o.product,category:o.category,sales:0,revenue:0};
    prodMap[o.product].sales+=o.qty;
    prodMap[o.product].revenue+=o.total;
  });
  const sorted = Object.values(prodMap).sort((a,b)=>b.revenue-a.revenue).slice(0,5);
  const rankClasses = ['gold','silver','bronze','',''];

  el.innerHTML = sorted.map((p,i)=>`
    <div class="tp-item">
      <div class="tp-rank ${rankClasses[i]}">${i+1}</div>
      <div class="tp-info">
        <div class="tp-name">${p.name}</div>
        <div class="tp-cat">${CAT_NAMES[p.category]||p.category}</div>
      </div>
      <div class="tp-stats">
        <div class="tp-sales">${p.sales} sold</div>
        <div class="tp-rev">$${p.revenue.toFixed(2)}</div>
      </div>
    </div>
  `).join('');
}

function drawRecentOrders(orders){
  const tbody = document.getElementById('recentOrdersTable');
  if(!tbody) return;
  tbody.innerHTML = orders.map(o=>`
    <tr>
      <td class="order-id" onclick="viewOrder('${o.id}')">${o.id}</td>
      <td>${o.customer}</td>
      <td>${o.product}</td>
      <td>${CAT_NAMES[o.category]||o.category}</td>
      <td><strong>$${o.total.toFixed(2)}</strong></td>
      <td><span class="status-badge ${o.status}"><span class="status-dot"></span>${STATUS_LABELS[o.status]}</span></td>
      <td>${formatDate(o.date)}</td>
    </tr>
  `).join('');
}

function formatDate(dateStr){
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
}

/* Orders */
function renderOrders(){
  const orders = getOrders();
  const allTable = document.getElementById('allOrdersTable');
  const stats = {pending:0,processing:0,shipped:0,delivered:0,cancelled:0};
  orders.forEach(o=>{if(stats[o.status]!==undefined) stats[o.status]++});

  document.getElementById('statPending').textContent = stats.pending;
  document.getElementById('statProcessing').textContent = stats.processing;
  document.getElementById('statShipped').textContent = stats.shipped;
  document.getElementById('statDelivered').textContent = stats.delivered;

  filterOrders();
}

function filterOrders(){
  const orders = getOrders();
  const search = (document.getElementById('orderSearch')?.value||'').toLowerCase();
  const statusFilter = document.getElementById('orderStatusFilter')?.value||'all';

  const filtered = orders.filter(o=>{
    const matchSearch = !search || o.id.toLowerCase().includes(search) || o.customer.toLowerCase().includes(search) || o.product.toLowerCase().includes(search);
    const matchStatus = statusFilter==='all' || o.status===statusFilter;
    return matchSearch && matchStatus;
  });

  const tbody = document.getElementById('allOrdersTable');
  tbody.innerHTML = filtered.map(o=>`
    <tr>
      <td class="order-id" onclick="viewOrder('${o.id}')">${o.id}</td>
      <td>${o.customer}</td>
      <td>${o.email}</td>
      <td>${o.product}</td>
      <td>${CAT_NAMES[o.category]||o.category}</td>
      <td>${o.qty}</td>
      <td><strong>$${o.total.toFixed(2)}</strong></td>
      <td>
        <select class="status-select" onchange="updateOrderStatus('${o.id}',this.value)" style="color:${getStatusColor(o.status)}">
          ${STATUSES.map(s=>`<option value="${s}" ${s===o.status?'selected':''}>${STATUS_LABELS[s]}</option>`).join('')}
        </select>
      </td>
      <td>${formatDate(o.date)}</td>
      <td><button onclick="viewOrder('${o.id}')" style="color:var(--brand);font-size:13px;font-weight:600">View</button></td>
    </tr>
  `).join('');
}

function getStatusColor(s){
  return {pending:'#A16207',processing:'#1D4ED8',shipped:'#8B5CF6',delivered:'#15803D',cancelled:'#DC2626'}[s]||'#5E5A52';
}

function updateOrderStatus(id,status){
  const orders = getOrders();
  const order = orders.find(o=>o.id===id);
  if(order){
    order.status = status;
    saveOrders(orders);
    filterOrders();
    document.getElementById('newOrdersBadge').textContent = orders.filter(o=>o.status==='pending').length;
  }
}

function viewOrder(id){
  const orders = getOrders();
  const o = orders.find(x=>x.id===id);
  if(!o) return;

  const content = document.getElementById('orderDetailContent');
  content.innerHTML = `
    <div class="order-detail">
      <div class="od-header">
        <div class="od-id">${o.id}</div>
        <select class="status-select" onchange="updateOrderStatus('${o.id}',this.value);viewOrder('${o.id}');" style="font-size:13px;padding:8px 14px">
          ${STATUSES.map(s=>`<option value="${s}" ${s===o.status?'selected':''}>${STATUS_LABELS[s]}</option>`).join('')}
        </select>
      </div>
      <div class="od-info">
        <div class="od-info-block">
          <h4>Customer</h4>
          <p><strong>${o.customer}</strong></p>
          <p>${o.email}</p>
          <p>${o.phone||'N/A'}</p>
        </div>
        <div class="od-info-block">
          <h4>Order Details</h4>
          <p><strong>${formatDate(o.date)}</strong></p>
          <p><span class="status-badge ${o.status}"><span class="status-dot"></span>${STATUS_LABELS[o.status]}</span></p>
        </div>
      </div>
      <div class="od-items">
        <div class="od-items-header">
          <div>Product</div>
          <div>Category</div>
          <div>Qty</div>
          <div>Price</div>
        </div>
        <div class="od-item">
          <div>${o.product}</div>
          <div>${CAT_NAMES[o.category]||o.category}</div>
          <div>${o.qty}</div>
          <div>$${o.total.toFixed(2)}</div>
        </div>
      </div>
      <div class="od-totals">
        <div class="od-total-block">
          <div class="od-total-row"><span>Subtotal</span><span>$${o.total.toFixed(2)}</span></div>
          <div class="od-total-row"><span>Shipping</span><span>${o.total>=50?'Free':'$5.99'}</span></div>
          <div class="od-total-row grand"><span>Total</span><span>$${(o.total+(o.total>=50?0:5.99)).toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('orderModal').classList.add('open');
}

function closeOrderModal(){
  document.getElementById('orderModal').classList.remove('open');
}

let uploadedImageBase64 = '';

function handleImageUpload(e){
  const file = e.target.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = function(ev){
    uploadedImageBase64 = ev.target.result;
    const preview = document.getElementById('imagePreview');
    const upload = document.getElementById('imageUpload');
    const removeBtn = document.getElementById('removeImgBtn');

    preview.innerHTML = `<img src="${uploadedImageBase64}" alt="Preview"><span>Click to change</span>`;
    upload.classList.add('has-image');
    removeBtn.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function removeImage(){
  uploadedImageBase64 = '';
  const preview = document.getElementById('imagePreview');
  const upload = document.getElementById('imageUpload');
  const removeBtn = document.getElementById('removeImgBtn');
  const fileInput = document.getElementById('prodImageFile');

  preview.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>Click to upload image</span>`;
  upload.classList.remove('has-image');
  removeBtn.style.display = 'none';
  fileInput.value = '';
}

function resetImagePreview(){
  uploadedImageBase64 = '';
  const preview = document.getElementById('imagePreview');
  const upload = document.getElementById('imageUpload');
  const removeBtn = document.getElementById('removeImgBtn');
  const fileInput = document.getElementById('prodImageFile');

  preview.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>Click to upload image</span>`;
  upload.classList.remove('has-image');
  removeBtn.style.display = 'none';
  fileInput.value = '';
}

function setImagePreview(base64){
  if(!base64) return;
  uploadedImageBase64 = base64;
  const preview = document.getElementById('imagePreview');
  const upload = document.getElementById('imageUpload');
  const removeBtn = document.getElementById('removeImgBtn');

  preview.innerHTML = `<img src="${base64}" alt="Preview"><span>Click to change</span>`;
  upload.classList.add('has-image');
  removeBtn.style.display = 'block';
}

/* Products */
function renderProducts(categoryFilter='all'){
  const products = getProducts();
  const grid = document.getElementById('productGrid');
  const filtered = categoryFilter==='all' ? products : products.filter(p=>p.category===categoryFilter);

  grid.innerHTML = filtered.map(p=>{
    const isLow = p.stock < 20;
    return `
    <div class="product-card" data-category="${p.category}">
      <div class="product-card-img">
        ${p.image ? `<img src="${p.image}" alt="${p.name}">` : `<div class="placeholder">📦</div>`}
      </div>
      <div class="product-card-body">
        <h4>${p.name}</h4>
        <div class="cat">${CAT_NAMES[p.category]||p.category}</div>
        <div class="price">$${p.price.toFixed(2)}</div>
        <div class="stock ${isLow?'low':''}">${isLow?'⚠️ Low stock':'Stock'}: ${p.stock}</div>
      </div>
      <div class="product-card-actions">
        <button class="btn-edit" onclick="editProduct('${p.id}')">Edit</button>
        <button class="btn-delete" onclick="deleteProduct('${p.id}')">Delete</button>
      </div>
    </div>`;
  }).join('');
}

function filterProducts(cat, btn){
  document.querySelectorAll('.product-filters .filter-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

function openAddProductModal(){
  document.getElementById('modalTitle').textContent = 'Add New Product';
  document.getElementById('editProductId').value = '';
  document.getElementById('productForm').reset();
  resetImagePreview();
  document.getElementById('productModal').classList.add('open');
}

function editProduct(id){
  const products = getProducts();
  const p = products.find(x=>x.id===id);
  if(!p) return;

  document.getElementById('modalTitle').textContent = 'Edit Product';
  document.getElementById('editProductId').value = p.id;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodStock').value = p.stock;
  document.getElementById('prodDesc').value = p.desc||'';
  if(p.image){
    setImagePreview(p.image);
  } else {
    resetImagePreview();
  }
  document.getElementById('productModal').classList.add('open');
}

function closeProductModal(){
  document.getElementById('productModal').classList.remove('open');
}

function saveProduct(e){
  e.preventDefault();
  const editId = document.getElementById('editProductId').value;
  const products = getProducts();

  const data = {
    name: document.getElementById('prodName').value,
    category: document.getElementById('prodCategory').value,
    price: parseFloat(document.getElementById('prodPrice').value),
    stock: parseInt(document.getElementById('prodStock').value),
    image: uploadedImageBase64,
    desc: document.getElementById('prodDesc').value,
  };

  if(editId){
    const idx = products.findIndex(p=>p.id===editId);
    if(idx>=0){
      products[idx] = {...products[idx],...data};
    }
  } else {
    data.id = 'P' + String(products.length+1).padStart(3,'0');
    data.sales = 0;
    data.revenue = 0;
    products.push(data);
  }

  saveProducts(products);
  closeProductModal();
  renderProducts();
}

function deleteProduct(id){
  if(!confirm('Delete this product?')) return;
  let products = getProducts();
  products = products.filter(p=>p.id!==id);
  saveProducts(products);
  renderProducts();
}

/* Analytics */
function renderAnalytics(){
  const orders = getOrders();
  const products = getProducts();

  drawTrendChart(orders);
  drawCatPerfChart(orders);
  drawStatusChart(orders);
  renderCategoryBars(orders);
  renderAnalyticsTopProducts(orders);
  renderInsights(orders,products);
}

function drawTrendChart(orders){
  const canvas = document.getElementById('trendChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 48;
  canvas.height = 280;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const revenueData = new Array(12).fill(0);
  const orderData = new Array(12).fill(0);

  orders.forEach(o=>{
    const m = new Date(o.date).getMonth();
    revenueData[m]+=o.total;
    orderData[m]+=1;
  });

  const maxRev = Math.max(...revenueData,1);
  const maxOrd = Math.max(...orderData,1);
  const w = canvas.width;
  const h = canvas.height - 50;
  const stepX = (w-60)/11;

  ctx.strokeStyle='rgba(154,0,2,0.15)';
  ctx.lineWidth=1;
  for(let i=0;i<=4;i++){
    const y = (h/4)*i;
    ctx.beginPath();ctx.moveTo(50,y);ctx.lineTo(w-10,y);ctx.stroke();
  }

  ctx.beginPath();
  ctx.strokeStyle='#9a0002';
  ctx.lineWidth=2.5;
  for(let i=0;i<12;i++){
    const x = 50+i*stepX;
    const y = h-(revenueData[i]/maxRev)*h*0.8;
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle='#3B82F6';
  ctx.lineWidth=2;
  for(let i=0;i<12;i++){
    const x = 50+i*stepX;
    const y = h-(orderData[i]/maxOrd)*h*0.8;
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.stroke();

  ctx.fillStyle='#9A958D';
  ctx.font='10px DM Sans, sans-serif';
  ctx.textAlign='center';
  months.forEach((m,i)=>{
    ctx.fillText(m,50+i*stepX,h+16);
  });

  ctx.textAlign='left';
  ctx.fillStyle='#9a0002';
  ctx.beginPath();ctx.arc(50,h+30,4,0,Math.PI*2);ctx.fill();
  ctx.fillText('Revenue',58,h+34);

  ctx.fillStyle='#3B82F6';
  ctx.beginPath();ctx.arc(140,h+30,4,0,Math.PI*2);ctx.fill();
  ctx.fillText('Orders',148,h+34);
}

function drawCatPerfChart(orders){
  const canvas = document.getElementById('catPerfChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 48;
  canvas.height = 260;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const catRev = {};
  const catOrd = {};
  orders.forEach(o=>{
    catRev[o.category]=(catRev[o.category]||0)+o.total;
    catOrd[o.category]=(catOrd[o.category]||0)+1;
  });

  const maxRev = Math.max(...Object.values(catRev),1);
  const w = canvas.width;
  const barH = 36;
  const gap = 12;
  const colors = ['#9a0002','#B76E79','#E8846B','#1A2744'];

  CATEGORIES.forEach((cat,i)=>{
    const y = i*(barH+gap)+10;
    const rev = catRev[cat]||0;
    const barW = (rev/maxRev)*(w-150);

    ctx.fillStyle='#F7F5F3';
    ctx.beginPath();ctx.roundRect(120,y,w-130,barH,6);ctx.fill();

    ctx.fillStyle=colors[i];
    ctx.beginPath();ctx.roundRect(120,y,Math.max(barW,8),barH,6);ctx.fill();

    ctx.fillStyle='#2D2D2D';
    ctx.font='bold 12px DM Sans, sans-serif';
    ctx.textAlign='right';
    ctx.fillText('$'+rev.toFixed(0),w-10,y+barH/2+4);

    ctx.fillStyle='#5E5A52';
    ctx.font='12px DM Sans, sans-serif';
    ctx.textAlign='left';
    ctx.fillText(CAT_NAMES[cat],0,y+barH/2+4);
  });
}

function drawStatusChart(orders){
  const canvas = document.getElementById('statusChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 48;
  canvas.height = 260;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const counts = {};
  orders.forEach(o=>{counts[o.status]=(counts[o.status]||0)+1});
  const entries = STATUSES.map(s=>[s,counts[s]||0]).filter(e=>e[1]>0);
  const total = entries.reduce((s,e)=>s+e[1],0)||1;
  const colors = {pending:'#EAB308',processing:'#3B82F6',shipped:'#8B5CF6',delivered:'#22C55E',cancelled:'#EF4444'};

  const cx = canvas.width/2;
  const cy = canvas.height/2-10;
  const r = Math.min(cx,cy)-20;
  let startAngle = -Math.PI/2;

  entries.forEach(entry=>{
    const angle = (entry[1]/total)*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,startAngle,startAngle+angle);
    ctx.closePath();
    ctx.fillStyle=colors[entry[0]];
    ctx.fill();
    startAngle+=angle;
  });

  ctx.beginPath();
  ctx.arc(cx,cy,r*0.55,0,Math.PI*2);
  ctx.fillStyle='#fff';
  ctx.fill();

  ctx.fillStyle='#2D2D2D';
  ctx.font='bold 18px Plus Jakarta Sans, sans-serif';
  ctx.textAlign='center';
  ctx.fillText(total,cx,cy+6);

  let legendY = canvas.height-24;
  const legendX = 8;
  const legendW = (canvas.width-16)/entries.length;
  ctx.textAlign='left';
  ctx.font='10px DM Sans, sans-serif';
  entries.forEach(entry=>{
    const idx = STATUSES.indexOf(entry[0]);
    const x = legendX+idx*legendW;
    ctx.fillStyle=colors[entry[0]];
    ctx.beginPath();ctx.arc(x+4,legendY-4,4,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#5E5A52';
    ctx.fillText(`${STATUS_LABELS[entry[0]]} (${entry[1]})`,x+12,legendY);
  });
}

function renderCategoryBars(orders){
  const el = document.getElementById('categoryBars');
  if(!el) return;
  const catRev = {};
  orders.forEach(o=>{catRev[o.category]=(catRev[o.category]||0)+o.total});
  const entries = Object.entries(catRev).sort((a,b)=>b[1]-a[1]);
  const max = entries[0]?entries[0][1]:1;
  const colors = ['#9a0002','#B76E79','#E8846B','#1A2744'];

  el.innerHTML = entries.map((entry,i)=>`
    <div class="cat-bar">
      <div class="cat-bar-header">
        <span class="cat-bar-name">${CAT_NAMES[entry[0]]||entry[0]}</span>
        <span class="cat-bar-val">$${entry[1].toFixed(0)}</span>
      </div>
      <div class="cat-bar-track">
        <div class="cat-bar-fill" style="width:${(entry[1]/max*100).toFixed(0)}%;background:${colors[i]}"></div>
      </div>
    </div>
  `).join('');
}

function renderAnalyticsTopProducts(orders){
  const el = document.getElementById('analyticsTopProducts');
  if(!el) return;
  const prodMap = {};
  orders.forEach(o=>{
    if(!prodMap[o.product]) prodMap[o.product] = {name:o.product,category:o.category,sales:0,revenue:0};
    prodMap[o.product].sales+=o.qty;
    prodMap[o.product].revenue+=o.total;
  });
  const sorted = Object.values(prodMap).sort((a,b)=>b.sales-a.sales).slice(0,6);
  const rankClasses = ['gold','silver','bronze','','',''];

  el.innerHTML = sorted.map((p,i)=>`
    <div class="tp-item">
      <div class="tp-rank ${rankClasses[i]}">${i+1}</div>
      <div class="tp-info">
        <div class="tp-name">${p.name}</div>
        <div class="tp-cat">${CAT_NAMES[p.category]||p.category}</div>
      </div>
      <div class="tp-stats">
        <div class="tp-sales">${p.sales} sold</div>
        <div class="tp-rev">$${p.revenue.toFixed(2)}</div>
      </div>
    </div>
  `).join('');
}

function renderInsights(orders,products){
  const now = new Date();
  const currentMonth = orders.filter(o=>{const d=new Date(o.date);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear()});
  const lastMonth = new Date(now.getFullYear(),now.getMonth()-1,1);
  const lastMonthEnd = new Date(now.getFullYear(),now.getMonth(),0);
  const prevMonthOrders = orders.filter(o=>{const d=new Date(o.date);return d>=lastMonth&&d<=lastMonthEnd});

  const currRev = currentMonth.reduce((s,o)=>s+o.total,0);
  const prevRev = prevMonthOrders.reduce((s,o)=>s+o.total,0);
  const growth = prevRev>0?((currRev-prevRev)/prevRev*100).toFixed(1):0;
  document.getElementById('growthRate').textContent = (growth>=0?'+':'')+growth+'%';

  const catRev = {};
  orders.forEach(o=>{catRev[o.category]=(catRev[o.category]||0)+o.total});
  const topCat = Object.entries(catRev).sort((a,b)=>b[1]-a[1])[0];
  document.getElementById('topCategory').textContent = topCat?(CAT_NAMES[topCat[0]]||topCat[0]):'N/A';

  const convRate = (orders.length/(orders.length*10))*10;
  document.getElementById('convRate').textContent = (orders.length*2.5).toFixed(1)+'%';

  const avgItems = orders.length>0?(orders.reduce((s,o)=>s+o.qty,0)/orders.length).toFixed(1):'0';
  document.getElementById('avgItems').textContent = avgItems;
}

/* Customers */
function renderCustomers(){
  const customers = getCustomers();
  const tbody = document.getElementById('customersTable');
  if(!tbody) return;

  tbody.innerHTML = customers.map(c=>`
    <tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.email}</td>
      <td>${c.orders}</td>
      <td><strong>$${c.total.toFixed(2)}</strong></td>
      <td>${formatDate(c.lastOrder)}</td>
      <td>${c.favoriteCategory||'N/A'}</td>
    </tr>
  `).join('');
}
