        // ======================== MENU DATA ========================
        const menuData = [
            { id: 1, name: "Royal Special Biryani", category: "biryani", price: 900, oldPrice: 1000, img:"/img/biryani 3.jpeg" , desc: "Aromatic basmati rice with tender meat" },
            { id: 2, name: "Chicken Chowmein", category: "noodles", price: 552, oldPrice: 690, img: "/img/Vegetable-Vegan-Chow-Mein-2.jpg", desc: "Wok-tossed noodles with veggies" },
            { id: 3, name: "Royal Special Bar BQ", category: "bbq", price: 800, oldPrice: 900, img: "/img/BEEF-BBQ-1.jpg", desc: "Grilled perfection with royal spices" },
            { id: 4, name: "Mutton Seekh Kebab", category: "bbq", price: 720, oldPrice: 850, img: "/img/bar b q.jpeg", desc: "Juicy minced mutton kebabs" },
            { id: 5, name: "Chicken Biryani", category: "biryani", price: 750, oldPrice: 890, img: "/img/chicken-biryani.jpg", desc: "Classic dum cooked biryani" },
            { id: 6, name: "Kung Pao Noodles", category: "noodles", price: 490, oldPrice: 600, img: "/img/veg-noodles.jpg", desc: "Spicy and flavorful" },
            { id: 7, name: "Shahi Tukda", category: "dessert", price: 250, oldPrice: 350, img: "/img/shahi-tukda.jpeg", desc: "Royal bread pudding with rabri" },
            { id: 8, name: "Gulab Jamun", category: "dessert", price: 180, oldPrice: 240, img: "/img/Gulab-Jamun.jpg", desc: "Soft golden dumplings in sugar syrup" }
        ];

        let cart = [];
        function saveCart() { localStorage.setItem("royalCart", JSON.stringify(cart)); updateCartUI(); }
        function loadCart() { const saved = localStorage.getItem("royalCart"); if (saved) { cart = JSON.parse(saved); } updateCartUI(); }
        function updateCartUI() { const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0); document.getElementById("cartCountBadge").innerText = totalItems; }
        function addToCart(productId) {
            const item = menuData.find(m => m.id === productId);
            if (!item) return;
            const existing = cart.find(i => i.id === productId);
            if (existing) existing.quantity++;
            else cart.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
            saveCart();
            Swal.fire({ icon: 'success', title: 'Added to Cart', text: `${item.name} added!`, timer: 1000, showConfirmButton: false, background: '#fffdf5', color: '#310303' });
        }

        // PROFESSIONAL BOOK A TABLE FORM 
      function professionalBookTable() {
    Swal.fire({
        background: '#310303',
        color: '#fffdf5',
        width: '600px',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirm Majesty Selection',
        confirmButtonColor: '#680a0b',
        cancelButtonColor: 'transparent',
        title: `
            <div style="font-family: 'Playfair Display', serif; color: #f8df93; border-bottom: 1px solid rgba(248, 223, 147, 0.3); padding-bottom: 10px;">
                <span style="font-size: 1.2em;">Table Reservation</span>
            </div>
        `,
        html: `
            
            <div class="royal-grid">
                <div class="field-group full-width">
                    <label>Full Name</label>
                    <input id="bookName" class="royal-field" placeholder="e.g., Alexander Knight">
                </div>
                
                <div class="field-group">
                    <label>Email</label>
                    <input id="bookEmail" type="email" class="royal-field" placeholder="royal@palace.com">
                </div>
                
                <div class="field-group">
                    <label>Phone *</label>
                    <input id="bookPhone" class="royal-field" placeholder="+92 300 0000000">
                </div>
                
                <div class="field-group" style="grid-column: span 2 / span 2; display: flex; gap: 10px;">
                    <div style="flex: 2;">
                        <label>Date</label>
                        <input id="bookDate" type="date" class="royal-field">
                    </div>
                    <div style="flex: 1;">
                        <label>Time</label>
                        <select id="bookTime" class="royal-field">
                            <option>19:00</option><option>20:00</option><option>21:00</option>
                        </select>
                    </div>
                    <div style="flex: 1;">
                        <label>Guests</label>
                        <select id="bookGuests" class="royal-field">
                            <option>1</option><option>2</option><option>4</option><option>6+</option>
                        </select>
                    </div>
                </div>
                
                <div class="field-group full-width">
                    <label>Special Requests</label>
                    <textarea id="bookRequests" class="royal-field royal-textarea" placeholder="Celebrations, allergies..."></textarea>
                </div>
            </div>
        `,
        preConfirm: () => {
            const name = document.getElementById('bookName').value.trim();
            const phone = document.getElementById('bookPhone').value.trim();
            if (!name || !phone) {
                Swal.showValidationMessage(' The Royal requires your Name and Phone');
                return false;
            }
            return {
                name,
                email: document.getElementById('bookEmail').value,
                phone,
                date: document.getElementById('bookDate').value,
                time: document.getElementById('bookTime').value,
                guests: document.getElementById('bookGuests').value,
                requests: document.getElementById('bookRequests').value
            };
        }
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                background: '#310303',
                color: '#fffdf5',
                icon: 'success',
                iconColor: '#f8df93',
                title: '<span style="font-family: serif; color: #f8df93;">Confirmed</span>',
                confirmButtonColor: '#680a0b',
                html: `A table for ${result.value.guests} has been prepared for ${result.value.name}.`
            });
        }
    });
}

        // ======================== RENDER MENU CARDS ========================
        function renderMenu() {
            const menuContainer = document.getElementById("menuItemsContainer");
            if (!menuContainer) return; 

            menuContainer.innerHTML = menuData.map(item => `
        <div class="col-md-3 mb-4">
            <div class="card h-100 border-0 shadow-sm" style="border-radius: 20px; overflow: hidden;">
                <img src="${item.img}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body text-center">
                    <h5 class="fw-bold">${item.name}</h5>
                    <p class="text-muted small">${item.desc}</p>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <span class="fw-bold text-danger">Rs. ${item.price}</span>
                        <del class="text-muted small">Rs. ${item.oldPrice}</del>
                    </div>
                    <button onclick="addToCart(${item.id})" class="btn mt-3 w-100" 
                            style="background:#680a0b; color:white; border-radius:10px;">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
        }

        document.addEventListener('DOMContentLoaded', () => {
            renderMenu();
            loadCart();
        });

        // Cart modal
       function showCartModal() {
    if (cart.length === 0) { 
        Swal.fire({ 
            icon: 'info', 
            iconColor: '#f8df93',
            title: '<span style="font-family:serif; color:#f8df93;">Empty Vault</span>', 
            text: 'Your royal selection is empty.',
            background: '#310303',
            confirmButtonColor: '#680a0b',
            color: '#fffdf5'
        }); 
        return; 
    }

    let itemsHtml = `
        <style>
            .cart-container { max-height: 50vh; overflow-y: auto; padding-right: 5px; }
            .cart-container::-webkit-scrollbar { width: 4px; }
            .cart-container::-webkit-scrollbar-thumb { background: #f8df93; border-radius: 10px; }
            .cart-item { 
                display: flex; justify-content: space-between; align-items: center;
                padding: 12px 0; border-bottom: 1px solid rgba(248, 223, 147, 0.2);
                color: #fffdf5; font-family: 'Inter', sans-serif;
            }
            .item-details b { color: #f8df93; display: block; font-size: 1rem; }
            .item-price { font-weight: 600; color: #f8df93; }
            .remove-btn { 
                background: transparent; border: 1px solid #680a0b; color: #ff4d4d; 
                border-radius: 50%; width: 30px; height: 30px; cursor: pointer; transition: 0.3s;
            }
            .remove-btn:hover { background: #680a0b; color: white; }
            .total-section { 
                margin-top: 20px; text-align: right; border-top: 2px solid #f8df93; 
                padding-top: 10px; color: #f8df93; font-family: serif;
            }
        </style>
        <div class="cart-container">
    `;

    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
        itemsHtml += `
            <div class="cart-item">
                <div class="item-details">
                    <b>${item.name}</b>
                    <small style="opacity:0.7">Quantity: ${item.quantity}</small>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <span class="item-price">₹${item.price * item.quantity}</span>
                    <button class="remove-btn remove-cart-item" data-id="${item.id}"><i class="fas fa-times"></i></button>
                </div>
            </div>`;
    });

    itemsHtml += `</div><div class="total-section"><h3>Grand Total: ₹${total}</h3></div>`;

    Swal.fire({
        title: '<span style="font-family:serif; color:#f8df93; text-transform:uppercase; letter-spacing:2px;">Your Selection</span>',
        html: itemsHtml,
        background: '#3a0808fb',
        showCancelButton: true,
        confirmButtonText: 'Proceed to Checkout',
        confirmButtonColor: '#680a0b',
        cancelButtonText: 'Add More',
        cancelButtonColor: 'rgba(255,255,255,0.1)',
        width: '500px',
        didOpen: () => {
            document.querySelectorAll('.remove-cart-item').forEach(btn => {
                btn.onclick = () => {
                    const id = parseInt(btn.dataset.id);
                    const idx = cart.findIndex(i => i.id === id);
                    if (idx !== -1) cart.splice(idx, 1);
                    saveCart();
                    Swal.close();
                    showCartModal();
                };
            });
        }
    }).then(res => { if (res.isConfirmed && cart.length) openOrderFormWithCart(); });
}
    function openOrderFormWithCart() {
    let total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    
    Swal.fire({
        title: '<span style="font-family:serif; color:#f8df93;">Complete Your Order</span>',
        background: '#350b0b',
        width: '500px',
        html: `
            <style>
                .order-summary { 
                    background: rgba(104, 10, 11, 0.3); padding: 15px; 
                    border-radius: 8px; margin-bottom: 20px; color: #fffdf5;
                    font-size: 0.9rem; text-align: left; border: 1px inset rgba(248, 223, 147, 0.2);
                }
                .royal-input {
                    background: #fffdf5 !important; 
                    border-radius: 8px !important;
                    border: 1px solid #f8df93 !important; 
                    color: #310303 !important;
                    height: 45px !important; 
                    
                    /* Fixes for the overflow issue */
                    margin: 0 0 15px 0 !important; /* Removes default side margins */
                    width: 100% !important;
                    box-sizing: border-box !important; /* Keeps padding inside the width */
                }
            </style>
            <div class="order-summary">
                <div style="max-height: 100px; overflow-y: auto; margin-bottom: 5px;">
                    ${cart.map(i => `<div style="display:flex; justify-content:space-between"><span>${i.name} x${i.quantity}</span> <span>₹${i.price * i.quantity}</span></div>`).join("")}
                </div>
                <hr style="border-color: rgba(248, 223, 147, 0.3)">
                <div style="display:flex; justify-content:space-between; font-weight:bold; color:#f8df93;">
                    <span>Total Amount</span> <span>₹${total}</span>
                </div>
            </div>
            <input id="custNameO" class="swal2-input royal-input" placeholder="Your Full Name*">
            <input id="custPhoneO" class="swal2-input royal-input" placeholder="Phone Number*">
        `,
        confirmButtonText: 'Place Royal Order',
        confirmButtonColor: '#680a0b',
        showCancelButton: true,
        cancelButtonText: 'Back',
        preConfirm: () => {
            const n = document.getElementById('custNameO').value;
            const p = document.getElementById('custPhoneO').value;
            if (!n || !p) return Swal.showValidationMessage('The Crown requires your details');
            return { n, p };
        }
    }).then(res => {
        if (res.isConfirmed) {
            Swal.fire({
                icon: 'success', title: 'Grand Order Placed!', background: '#310303', color: '#fffdf5', confirmButtonColor: '#680a0b'
            });
            cart = [];
            saveCart();
        }
    });
}
       function quickOrderNow() {
    Swal.fire({
        title: '<span style="font-family:serif; color:#f8df93;">Quick Inquiry</span>',
        background: '#680a0b',
        html: `
            <input id="qn" class="swal2-input royal-input" style="background:#fffdf5 !important; border-radius:8px !important; color:#310303 !important;" placeholder="Your Name">
            <input id="qp" class="swal2-input royal-input" style="background:#fffdf5 !important; border-radius:8px !important; color:#310303 !important;" placeholder="Phone Number">
        `,
        confirmButtonText: 'Send Request',
        confirmButtonColor: '#ae8f31',
        preConfirm: () => {
            if (!document.getElementById('qn').value || !document.getElementById('qp').value) {
                return Swal.showValidationMessage('Information required');
            }
            return true;
        }
    }).then((res) => {
        if (res.isConfirmed) Swal.fire({ title: 'Request Sent', icon: 'success', background: '#310303', color: '#fffdf5' });
    });
}

        let currentCategory = "all";
        function renderMenu() {
            const container = document.getElementById("menuCardsContainer");
            const filtered = currentCategory === "all" ? menuData : menuData.filter(m => m.category === currentCategory);
            if (filtered.length === 0) { container.innerHTML = `<div class="col-12 text-center py-5"><h4>No dishes</h4></div>`; return; }
            let html = "";
            filtered.forEach(item => {
                html += `<div class="col-lg-4 col-md-6">
                        <div class="menu-card h-100">
                            <img src="${item.img}" class="card-img-top" alt="${item.name}" onerror="this.src='https://placehold.co/400x250/680a0b/f8df93?text=Image+Not+Found'">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="small text-muted">${item.desc}</p>
                                <div class="mt-auto"><div class="price"><span class="old-price">₹${item.oldPrice}</span> ₹${item.price}</div>
                                <button class="card-btn mt-2 w-100 add-to-cart" data-id="${item.id}"><i class="fas fa-cart-plus"></i> Add to Cart</button></div>
                            </div>
                        </div>
                    </div>`;
            });
            container.innerHTML = html;
            document.querySelectorAll('.add-to-cart').forEach(btn => btn.addEventListener('click', (e) => addToCart(parseInt(btn.dataset.id))));
        }
        document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentCategory = btn.dataset.cat; renderMenu();
        }));
        function animateCounters() { const counters = document.querySelectorAll('.counter-number'); const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { const c = e.target; const t = +c.dataset.target; let val = 0; const upd = () => { if (val < t) { val += Math.ceil(t / 40); if (val > t) val = t; c.innerText = val; requestAnimationFrame(upd); } else c.innerText = t; }; upd(); observer.unobserve(c); } }); }, { threshold: 0.5 }); counters.forEach(c => observer.observe(c)); }
        document.addEventListener("DOMContentLoaded", () => { loadCart(); renderMenu(); animateCounters(); document.getElementById("viewCartBtn")?.addEventListener("click", showCartModal); document.getElementById("orderNowBtn")?.addEventListener("click", quickOrderNow); document.getElementById("btn-1").addEventListener("click", professionalBookTable); document.getElementById("btn-2").addEventListener("click", () => document.getElementById("menu")?.scrollIntoView({ behavior: 'smooth' })); document.getElementById("exploreMenuBtn")?.addEventListener("click", () => document.getElementById("menu")?.scrollIntoView({ behavior: 'smooth' })); });
    



// ==================================================
// OPENING GSAP ANIMATION
// ==================================================
(function() {
    const root = document.documentElement.style;
    root.setProperty('--primary-bg-color', '#310303');
    root.setProperty('--text-color', '#f8df93');

    document.addEventListener('DOMContentLoaded', () => {
        const logo = document.querySelector('.navbar-brand img') || document.querySelector('.navbar-brand');
        const overlay = document.getElementById('loader-overlay');
        const mainContent = document.getElementById('main-content');

        if (!logo || typeof gsap === 'undefined') {
            if(overlay) overlay.style.display = 'none';
            if(mainContent) {
                mainContent.style.visibility = 'visible';
                mainContent.style.opacity = '1';
            }
            return;
        }

        const logoRect = logo.getBoundingClientRect();
        const clone = logo.cloneNode(true);

        Object.assign(clone.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '9999',
            width: '120px',
            pointerEvents: 'none',
            visibility: 'visible',
            opacity: '1'
        });
        document.body.appendChild(clone);

        gsap.set(clone, { xPercent: -50, yPercent: -50, scale: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(overlay, { opacity: 0, duration: 0.5, onComplete: () => overlay.remove() });
                gsap.to(mainContent, { 
                    visibility: 'visible', 
                    opacity: 1, 
                    duration: 0.8,
                    onComplete: () => {
                        clone.remove();
                        logo.style.opacity = '1';
                    }
                });
            }
        });

        tl.to(clone, {
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        })
        .to(clone, {
            filter: "drop-shadow(0 0 30px rgba(248, 223, 147, 0.5))",
            duration: 0.4,
            yoyo: true,
            repeat: 1
        })
        .to(clone, {
            top: logoRect.top + 'px',   
            left: logoRect.left + 'px', 
            xPercent: 0,                
            yPercent: 0,               
            width: logoRect.width + 'px',
            duration: 1.2,
            ease: "expo.inOut"
        });
    });
})();