/* ==========================================
   INVENTORY MANAGEMENT SYSTEM - MAIN SCRIPT
   ========================================== */

const InventoryData = {
    products: [
        { id:1, name:"Basmati Rice", category:"Grocery", price:85, stock:150, supplier:"Mega Mart", description:"Premium long grain basmati rice, 10kg pack" },
        { id:2, name:"Whole Wheat Flour", category:"Grocery", price:45, stock:200, supplier:"FarmFresh", description:"Stone ground whole wheat flour, 5kg" },
        { id:3, name:"Refined Sunflower Oil", category:"Grocery", price:135, stock:75, supplier:"Golden Oils", description:"Refined sunflower oil, 5 liter can" },
        { id:4, name:"Organic Sugar", category:"Grocery", price:55, stock:180, supplier:"Green Valley", description:"Organic cane sugar, 1kg pack" },
        { id:5, name:"Iodised Salt", category:"Grocery", price:20, stock:300, supplier:"Mega Mart", description:"Iodised crystal salt, 1kg pack" },
        { id:6, name:"Amoxicillin Capsules", category:"Medicine", price:125, stock:45, supplier:"MediCare Plus", description:"Antibiotic capsules, 250mg x 10" },
        { id:7, name:"Paracetamol Tablets", category:"Medicine", price:35, stock:500, supplier:"PharmaLife", description:"Pain relief tablets, 500mg x 15" },
        { id:8, name:"Vitamin D3 Supplements", category:"Medicine", price:299, stock:30, supplier:"MediCare Plus", description:"Vitamin D3 60K IU, monthly dose" },
        { id:9, name:"Cough Syrup", category:"Medicine", price:175, stock:80, supplier:"PharmaLife", description:"Dry cough syrup, 100ml bottle" },
        { id:10, name:"Multivitamin Syrup", category:"Medicine", price:245, stock:12, supplier:"WellBeing Co", description:"Children multivitamin syrup, 200ml" },
        { id:11, name:"Toor Dal", category:"Dal & Pulses", price:120, stock:90, supplier:"FarmFresh", description:"Premium toor dal, 1kg pack" },
        { id:12, name:"Moong Dal", category:"Dal & Pulses", price:135, stock:65, supplier:"Green Valley", description:"Split moong dal, 1kg pack" },
        { id:13, name:"Chana Dal", category:"Dal & Pulses", price:95, stock:110, supplier:"FarmFresh", description:"Bengal gram dal, 1kg pack" },
        { id:14, name:"Masoor Dal", category:"Dal & Pulses", price:105, stock:85, supplier:"Golden Harvest", description:"Red lentil dal, 1kg pack" },
        { id:15, name:"Urad Dal", category:"Dal & Pulses", price:140, stock:55, supplier:"Green Valley", description:"Black gram dal whole, 1kg" },
        { id:16, name:"Potato Chips", category:"Snacks", price:30, stock:400, supplier:"SnackWorld", description:"Classic salted potato chips, 150g" },
        { id:17, name:"Chocolate Biscuits", category:"Snacks", price:45, stock:250, supplier:"SnackWorld", description:"Chocolate cream sandwich biscuits, 200g" },
        { id:18, name:"Namkeen Mixture", category:"Snacks", price:80, stock:60, supplier:"Tasty Crunch", description:"Traditional namkeen mixture, 500g" },
        { id:19, name:"Peanut Butter", category:"Snacks", price:195, stock:18, supplier:"SnackWorld", description:"Crunchy peanut butter, 500g jar" },
        { id:20, name:"Dry Fruit Trail Mix", category:"Snacks", price:350, stock:40, supplier:"Tasty Crunch", description:"Premium trail mix with nuts and dried fruits, 250g" },
        { id:21, name:"Dishwash Liquid", category:"Others", price:75, stock:130, supplier:"CleanHome", description:"Lemon dishwash liquid, 750ml" },
        { id:22, name:"Laundry Detergent", category:"Others", price:180, stock:95, supplier:"CleanHome", description:"Automatic washing powder, 2kg" },
        { id:23, name:"Floor Cleaner", category:"Others", price:110, stock:45, supplier:"SparkleCo", description:"Pine-scented floor cleaner, 1L" },
        { id:24, name:"Toilet Cleaner", category:"Others", price:130, stock:15, supplier:"CleanHome", description:"Bathroom toilet cleaner, 750ml" },
        { id:25, name:"Mosquito Repellent", category:"Others", price:65, stock:200, supplier:"SparkleCo", description:"Liquid mosquito repellent refill, 45ml" }
    ],
    suppliers: [
        { id:1, company:"Mega Mart", contact:"Rajesh Kumar", email:"rajesh@megamart.com", phone:"+91 98765 43210", address:"123 Market Street, Chennai, TN 600001", products:"Basmati Rice, Iodised Salt" },
        { id:2, company:"FarmFresh", contact:"Priya Sharma", email:"priya@farmfresh.in", phone:"+91 87654 32109", address:"45 Farm Road, Punjab, IN 143001", products:"Whole Wheat Flour, Toor Dal, Chana Dal" },
        { id:3, company:"Golden Oils", contact:"Amit Patel", email:"amit@goldenoils.com", phone:"+91 76543 21098", address:"88 Industrial Area, Ahmedabad, GJ 380001", products:"Refined Sunflower Oil" },
        { id:4, company:"Green Valley", contact:"Suresh Babu", email:"suresh@greenvalley.co", phone:"+91 65432 10987", address:"22 Green Lane, Coimbatore, TN 641001", products:"Organic Sugar, Moong Dal, Urad Dal" },
        { id:5, company:"MediCare Plus", contact:"Dr. Anita Rao", email:"anita@medicareplus.com", phone:"+91 91234 56789", address:"10 Medical Plaza, Bengaluru, KA 560001", products:"Amoxicillin Capsules, Vitamin D3 Supplements" },
        { id:6, company:"PharmaLife", contact:"Vikram Singh", email:"vikram@pharmalife.in", phone:"+91 82345 67890", address:"55 Pharma Hub, Hyderabad, TS 500001", products:"Paracetamol Tablets, Cough Syrup" },
        { id:7, company:"WellBeing Co", contact:"Neha Joshi", email:"neha@wellbeing.co", phone:"+91 73456 12345", address:"18 Wellness Road, Mumbai, MH 400001", products:"Multivitamin Syrup" },
        { id:8, company:"SnackWorld", contact:"Manoj Gupta", email:"manoj@snackworld.in", phone:"+91 94567 23456", address:"77 Snack Zone, Delhi, DL 110001", products:"Potato Chips, Chocolate Biscuits, Peanut Butter" },
        { id:9, company:"Tasty Crunch", contact:"Deepa Nair", email:"deepa@tastycrunch.com", phone:"+91 85678 34567", address:"34 Food Park, Kochi, KL 682001", products:"Namkeen Mixture, Dry Fruit Trail Mix" },
        { id:10, company:"CleanHome", contact:"Arun Verma", email:"arun@cleanhome.in", phone:"+91 76789 45678", address:"90 Clean Avenue, Jaipur, RJ 302001", products:"Dishwash Liquid, Laundry Detergent, Toilet Cleaner" },
        { id:11, company:"SparkleCo", contact:"Kavita Reddy", email:"kavita@sparkleco.com", phone:"+91 96890 56789", address:"61 Shine Street, Kolkata, WB 700001", products:"Floor Cleaner, Mosquito Repellent" },
        { id:12, company:"Golden Harvest", contact:"Bala Krishnan", email:"bala@goldenharvest.in", phone:"+91 67890 67890", address:"14 Grain Market, Madurai, TN 625001", products:"Masoor Dal" }
    ]
};

InventoryData.products = InventoryData.products.map((p, index) => ({
    ...p,
    sku: `SKU10${(index + 1).toString().padStart(2, '0')}`,
    units: p.category === 'Others' ? 'pcs' : 'kg',
    mfgDate: '2025-01-01',
    expDate: '2026-01-01',
    barcode: `890123456${(index + 1).toString().padStart(3, '0')}`,
    invoiceNo: `INV-2025-${(index + 1).toString().padStart(3, '0')}`
}));
InventoryData.categories = [...new Set(InventoryData.products.map(p => p.category))];

let nextProductId = InventoryData.products.length + 1;
let nextSupplierId = InventoryData.suppliers.length + 1;
let deleteCallback = null;
let pieChartInstance = null;
let barChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme before render
    const savedTheme = localStorage.getItem('invTheme') || 'light';
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');

    setupNavigation();
    setupMenuToggle();
    setupCategoryTabs();
    renderDashboard();
    populateSupplierSelect();
    populateCategorySelect();
    setupProductForm();
    setupSupplierForm();
    setupConfirmModal();
    setupExcelDownloads();
    setupAdminProfile();
    setupLowStockHighlight();
    setupNotifications();
    setupSettings();
    // Close any modal when clicking the backdrop
    document.querySelectorAll('.modal-overlay').forEach(ov => {
        ov.addEventListener('click', (e) => { if (e.target === ov) ov.classList.remove('show'); });
    });
});

function setupCategoryTabs() {
    const container = document.getElementById('categoryTabsContainer');
    if (!container) return;
    
    let tabsHTML = `<button class="cat-tab ${currentCategory === 'all' ? 'active' : ''}" data-category="all">All</button>`;
    InventoryData.categories.forEach(cat => {
        tabsHTML += `<button class="cat-tab ${currentCategory === cat ? 'active' : ''}" data-category="${cat}">${cat}</button>`;
    });
    container.innerHTML = tabsHTML;
    
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            renderProducts();
        });
    });
}

function populateCategorySelect() {
    const sel = document.getElementById('productCategory');
    if (!sel) return;
    sel.innerHTML = '<option value="">Select Category</option>' + 
        InventoryData.categories.map(c => `<option value="${c}">${c}</option>`).join('') +
        '<option value="NEW_CATEGORY">+ Add New Category</option>';
        
    sel.addEventListener('change', (e) => {
        if (e.target.value === 'NEW_CATEGORY') {
            document.getElementById('newCategoryInput').style.display = 'block';
            document.getElementById('newCategoryInput').required = true;
        } else {
            document.getElementById('newCategoryInput').style.display = 'none';
            document.getElementById('newCategoryInput').required = false;
        }
    });
}

function setupAdminProfile() {
    const adminBtn = document.getElementById('adminProfileBtn');
    if (adminBtn) {
        // Remove old listeners by cloning and replacing the element
        const freshBtn = adminBtn.cloneNode(true);
        adminBtn.parentNode.replaceChild(freshBtn, adminBtn);
        freshBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('adminModal').classList.add('show');
        });
    }

    const closeBtn1 = document.getElementById('closeAdminModal');
    if (closeBtn1) {
        const fresh1 = closeBtn1.cloneNode(true);
        closeBtn1.parentNode.replaceChild(fresh1, closeBtn1);
        fresh1.addEventListener('click', () => elc('adminModal'));
    }

    const closeBtn2 = document.getElementById('closeAdminBtn');
    if (closeBtn2) {
        const fresh2 = closeBtn2.cloneNode(true);
        closeBtn2.parentNode.replaceChild(fresh2, closeBtn2);
        fresh2.addEventListener('click', () => elc('adminModal'));
    }
}

function setupLowStockHighlight() {
    const card = document.getElementById('lowStockCard');
    const section = document.getElementById('lowStockSection');
    if (card && section) {
        card.addEventListener('click', () => {
            if (document.getElementById('page-dashboard').style.display !== 'none') {
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                const originalBg = section.style.backgroundColor || '';
                const originalTransition = section.style.transition || '';
                const originalBoxShadow = section.style.boxShadow || '';
                
                section.style.transition = 'all 0.5s ease';
                section.style.backgroundColor = '#fff7ed';
                section.style.boxShadow = '0 0 0 2px #f59e0b';
                section.style.borderRadius = '8px';
                
                const rows = document.querySelectorAll('#lowStockTableBody tr');
                const rowOriginalBgs = [];
                rows.forEach((row, index) => {
                    rowOriginalBgs[index] = row.style.backgroundColor;
                    row.style.transition = 'all 0.5s ease';
                    row.style.backgroundColor = '#fef3c7';
                });
                
                setTimeout(() => {
                    section.style.backgroundColor = originalBg;
                    section.style.boxShadow = originalBoxShadow;
                    setTimeout(() => {
                        section.style.transition = originalTransition;
                    }, 500);
                    
                    rows.forEach((row, index) => {
                        row.style.backgroundColor = rowOriginalBgs[index];
                        setTimeout(() => {
                            row.style.transition = '';
                        }, 500);
                    });
                }, 2000);
            } else {
                document.querySelector('.nav-link[data-page="dashboard"]').click();
                setTimeout(() => {
                    card.click();
                }, 100);
            }
        });
    }
}

function setupNotifications() {
    const notifBtn = document.getElementById('notificationBtn');
    if (notifBtn) {
        const freshBtn = notifBtn.cloneNode(true);
        notifBtn.parentNode.replaceChild(freshBtn, notifBtn);
        freshBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            renderNotificationModal();
            document.getElementById('notificationModal').classList.add('show');
        });
    }

    const closeBtn1 = document.getElementById('closeNotificationModal');
    if (closeBtn1) {
        const fresh1 = closeBtn1.cloneNode(true);
        closeBtn1.parentNode.replaceChild(fresh1, closeBtn1);
        fresh1.addEventListener('click', () => elc('notificationModal'));
    }

    const closeBtn2 = document.getElementById('closeNotificationBtn');
    if (closeBtn2) {
        const fresh2 = closeBtn2.cloneNode(true);
        closeBtn2.parentNode.replaceChild(fresh2, closeBtn2);
        fresh2.addEventListener('click', () => elc('notificationModal'));
    }
}

function renderNotificationModal() {
    const lowStockItems = InventoryData.products.filter(p => p.stock < 20);
    const tbody = document.getElementById('notificationTableBody');
    if (!tbody) return;
    
    if (lowStockItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--success);padding:20px;font-size:0.95rem;">✅ All products have healthy stock levels!</td></tr>';
    } else {
        tbody.innerHTML = lowStockItems.map(p => `
            <tr style="background:#fef2f2;">
                <td><strong>${p.name}</strong></td>
                <td><span class="cat-badge cat-${p.category.replace(/\s/g,'')}">${p.category}</span></td>
                <td><span class="stock-indicator stock-low"><span class="dot"></span>${p.stock}</span></td>
            </tr>`).join('');
    }
}

/* NAVIGATION */
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => { e.preventDefault(); navigateTo(link.dataset.page); });
    });
}
function navigateTo(page) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.nav-link[data-page="${page}"]`).classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-' + page).style.display = 'block';
    const titles = { dashboard:'Dashboard', products:'Products', suppliers:'Suppliers', settings:'Settings' };
    document.getElementById('pageTitle').textContent = titles[page] || page;
    if (page === 'dashboard') renderDashboard();
    if (page === 'products') renderProducts();
    if (page === 'suppliers') renderSuppliers();
    if (page === 'settings') refreshSettingsUI();
    document.getElementById('sidebar').classList.remove('collapsed');
}
function setupMenuToggle() {
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('collapsed');
    });
}

/* DASHBOARD */
function renderDashboard() {
    const products = InventoryData.products;
    const suppliers = InventoryData.suppliers;
    const totalStock = products.reduce((s, p) => s + p.stock, 0);
    const lowStockItems = products.filter(p => p.stock < 20);

    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalStock').textContent = totalStock.toLocaleString();
    document.getElementById('lowStock').textContent = lowStockItems.length;
    document.getElementById('totalSuppliers').textContent = suppliers.length;
    document.getElementById('lowStockBadge').textContent = lowStockItems.length;

    if (pieChartInstance) pieChartInstance.destroy();
    if (barChartInstance) barChartInstance.destroy();

    /* PIE CHART */
    const categories = InventoryData.categories;
    const categoryProductCount = categories.map(cat =>
        products.filter(p => p.category === cat).length
    );
    const categoryStock = categories.map(cat =>
        products.filter(p => p.category === cat).reduce((s, p) => s + p.stock, 0)
    );
    const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6', '#06b6d4', '#f43f5e', '#8b5cf6'];
    pieChartInstance = new Chart(document.getElementById('pieChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: categoryProductCount,
                backgroundColor: COLORS,
                borderColor: '#fff',
                borderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true, aspectRatio: 1,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true, font: { size: 12 } } },
                tooltip: { callbacks: { label: (ctx) => {
                    const total = ctx.dataset.data.reduce((a,b) => a+b, 0);
                    return `${ctx.label}: ${ctx.parsed.toLocaleString()} products (${((ctx.parsed/total)*100).toFixed(1)}%)`;
                }} }
            },
            cutout: '55%'
        }
    });

    /* BAR CHART */
    barChartInstance = new Chart(document.getElementById('barChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Stock Quantity',
                data: categoryStock,
                backgroundColor: COLORS.map(c => c + 'bf'),
                borderColor: COLORS,
                borderWidth: 1, borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `Stock: ${ctx.parsed.y} units` } } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, title: { display: true, text: 'Quantity' } },
                x: { grid: { display: false }, ticks: { font: { size: 11 } } }
            }
        }
    });

    /* LOW STOCK TABLE */
    const tbody = document.getElementById('lowStockTableBody');
    if (lowStockItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--success);padding:20px;font-size:0.95rem;">✅ All products have healthy stock levels!</td></tr>';
    } else {
        tbody.innerHTML = lowStockItems.map(p => `
            <tr style="background:#fef2f2;">
                <td><strong>${p.name}</strong></td>
                <td><span class="cat-badge cat-${p.category.replace(/\s/g,'')}">${p.category}</span></td>
                <td><span class="stock-indicator stock-low"><span class="dot"></span>${p.stock}</span></td>
                <td>${p.supplier}</td>
            </tr>`).join('');
    }
}

/* PRODUCTS */
let currentCategory = 'all', currentSearch = '', currentSort = 'name-asc';

function renderProducts() {
    let filtered = [...InventoryData.products];
    if (currentCategory !== 'all') filtered = filtered.filter(p => p.category === currentCategory);
    if (currentSearch) {
        const q = currentSearch.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) ||
            p.supplier.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))
        );
    }
    const [sf, sd] = currentSort.split('-');
    filtered.sort((a, b) => {
        let va, vb;
        if (sf === 'name') { va = a.name.toLowerCase(); vb = b.name.toLowerCase(); }
        else if (sf === 'price') { va = a.price; vb = b.price; }
        else { va = a.stock; vb = b.stock; }
        return sd === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

    document.getElementById('productCount').textContent = filtered.length;
    const tbody = document.getElementById('productTableBody');
    const empty = document.getElementById('productsEmptyState');

    if (filtered.length === 0) { tbody.innerHTML = ''; empty.style.display = 'block'; }
    else {
        empty.style.display = 'none';
        tbody.innerHTML = filtered.map(p => {
            const sc = p.stock < 20 ? 'stock-low' : p.stock < 50 ? 'stock-medium' : 'stock-high';
            return `<tr>
                <td><strong>${p.sku}</strong></td>
                <td><div class="product-thumb">📦</div></td>
                <td><strong>${p.name}</strong><br><small style="color:var(--text-light)">${p.description || ''}</small></td>
                <td><span class="cat-badge cat-${p.category.replace(/\s/g,'')}">${p.category}</span></td>
                <td>&#8377;${p.price.toFixed(2)}</td>
                <td><span class="stock-indicator ${sc}"><span class="dot"></span>${p.stock}</span></td>
                <td>${p.units}</td>
                <td>${p.supplier}</td>
                <td style="white-space:nowrap;">${p.mfgDate}</td>
                <td style="white-space:nowrap;">${p.expDate}</td>
                <td style="text-align: center;">${p.barcode ? `<svg class="barcode" jsbarcode-format="CODE128" jsbarcode-value="${p.barcode}" jsbarcode-width="1.2" jsbarcode-height="30" jsbarcode-displayValue="true" jsbarcode-fontSize="12" jsbarcode-margin="0"></svg>` : '-'}</td>
                <td>${p.invoiceNo || '-'}</td>
                <td><div class="action-btns" style="display:flex; flex-direction:column; gap:5px;">
                    <button class="btn btn-primary" onclick="openUpdateStock('${p.sku}')" title="Update Stock Quantity" style="font-size:0.8rem; padding:4px 8px; width:100%;"><i class="fas fa-layer-group"></i> Update Stock</button>
                    <button class="action-btn btn-delete" onclick="confirmDelete('product','${p.sku}')" title="Delete Product" style="width:100%;"><i class="fas fa-trash"></i> Delete</button>
                </div></td>
            </tr>`;
        }).join('');
        // Initialize barcodes
        if (typeof JsBarcode !== 'undefined') {
            JsBarcode(".barcode").init();
        }
    }
}


document.getElementById('productSearch').addEventListener('input', (e) => { currentSearch = e.target.value; renderProducts(); });
document.getElementById('sortSelect').addEventListener('change', (e) => { currentSort = e.target.value; renderProducts(); });

/* VENDORS */
function renderSuppliers() {
    const tbody = document.getElementById('supplierTableBody');
    const empty = document.getElementById('suppliersEmptyState');
    const suppliers = InventoryData.suppliers;
    if (suppliers.length === 0) { tbody.innerHTML = ''; empty.style.display = 'block'; }
    else {
        empty.style.display = 'none';
        tbody.innerHTML = suppliers.map(v => {
            const pc = v.products.split(',').filter(p => p.trim()).length;
            return `<tr>
                <td>#${v.id}</td><td><strong>${v.company}</strong></td><td>${v.contact}</td>
                <td>${v.email}</td><td>${v.phone}</td><td style="max-width:180px;"><small>${v.address}</small></td>
                <td><span class="cat-badge" style="background:#e0e7ff;color:#3730a3;">${pc} items</span></td>
                <td><div class="action-btns">
                    <button class="action-btn btn-delete" onclick="confirmDelete('supplier',${v.id})" title="Delete"><i class="fas fa-trash"></i></button>
                </div></td>
            </tr>`;
        }).join('');
    }
}
function populateSupplierSelect() {
    const sel = document.getElementById('productSupplier');
    sel.innerHTML = '<option value="">Select Supplier</option>' +
        InventoryData.suppliers.map(v => `<option value="${v.company}">${v.company}</option>`).join('');
}

/* PRODUCT FORM */
function setupProductForm() {
    document.getElementById('productForm').addEventListener('submit', (e) => { e.preventDefault(); if (validateProductForm()) saveProduct(); });
    document.getElementById('cancelProduct').addEventListener('click', closeProductModal);
    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
    document.getElementById('addProductBtn').addEventListener('click', () => openProductModal());
}
function validateProductForm() {
    let ok = true; clearProductErrors();
    const sku = document.getElementById('productSku').value.trim();
    const originalSku = document.getElementById('productOriginalSku').value;
    const name = document.getElementById('productName').value.trim();
    let category = document.getElementById('productCategory').value;
    if (category === 'NEW_CATEGORY') {
        category = document.getElementById('newCategoryInput').value.trim();
    }
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const units = document.getElementById('productUnits').value;
    const mfgDate = document.getElementById('productMfgDate').value;
    const expDate = document.getElementById('productExpDate').value;
    const supplier = document.getElementById('productSupplier').value;
    
    if (!sku) { setError('productSkuError','SKU is required'); el('productSku').classList.add('error'); ok=false; }
    else if (sku !== originalSku && InventoryData.products.some(p => p.sku === sku)) {
        setError('productSkuError','SKU must be unique'); el('productSku').classList.add('error'); ok=false;
    }
    
    if (!name) { setError('productNameError','Product name is required'); el('productName').classList.add('error'); ok=false; }
    else if (name.length < 2) { setError('productNameError','Name must be at least 2 characters'); el('productName').classList.add('error'); ok=false; }
    if (!category) { setError('productCategoryError','Please select or enter a category'); el('productCategory').classList.add('error'); ok=false; }
    if (!price || price <= 0) { setError('productPriceError','Price must be greater than 0'); el('productPrice').classList.add('error'); ok=false; }
    if (isNaN(stock) || stock < 0) { setError('productStockError','Stock must be 0 or greater'); el('productStock').classList.add('error'); ok=false; }
    if (!units) { setError('productUnitsError','Units required'); el('productUnits').classList.add('error'); ok=false; }
    if (!mfgDate) { 
        setError('productMfgDateError','Mfg date required'); el('productMfgDate').classList.add('error'); ok=false; 
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const mfg = new Date(mfgDate);
        if (mfg >= today) {
            setError('productMfgDateError','Must be a past date'); el('productMfgDate').classList.add('error'); ok=false;
        }
    }
    if (!expDate) { setError('productExpDateError','Exp date required'); el('productExpDate').classList.add('error'); ok=false; }
    else if (mfgDate && new Date(expDate) <= new Date(mfgDate)) {
        setError('productExpDateError','Expiry date must be after Mfg date'); el('productExpDate').classList.add('error'); ok=false;
    }
    if (!supplier) { setError('productSupplierError','Please select a supplier'); el('productSupplier').classList.add('error'); ok=false; }
    return ok;
}
function openProductModal(editSku = null) {
    clearProductErrors(); document.getElementById('productForm').reset();
    document.getElementById('productOriginalSku').value = '';
    document.getElementById('newCategoryInput').style.display = 'none';
    document.getElementById('productModalTitle').textContent = 'Add Product';
    if (editSku !== null) {
        const p = InventoryData.products.find(pr => pr.sku === editSku);
        if (p) {
            document.getElementById('productOriginalSku').value = p.sku;
            document.getElementById('productSku').value = p.sku;
            document.getElementById('productName').value = p.name;
            document.getElementById('productCategory').value = p.category;
            document.getElementById('productPrice').value = p.price;
            document.getElementById('productStock').value = p.stock;
            document.getElementById('productUnits').value = p.units || 'pcs';
            document.getElementById('productMfgDate').value = p.mfgDate || '';
            document.getElementById('productExpDate').value = p.expDate || '';
            document.getElementById('productBarcode').value = p.barcode || '';
            document.getElementById('productInvoiceNo').value = p.invoiceNo || '';
            document.getElementById('productSupplier').value = p.supplier;
            document.getElementById('productDescription').value = p.description || '';
            document.getElementById('productModalTitle').textContent = 'Edit Product';
        }
    }
    populateSupplierSelect(); document.getElementById('productModal').classList.add('show');
}
function closeProductModal() { document.getElementById('productModal').classList.remove('show'); }
function saveProduct() {
    const originalSku = document.getElementById('productOriginalSku').value;
    let category = document.getElementById('productCategory').value;
    if (category === 'NEW_CATEGORY') {
        category = document.getElementById('newCategoryInput').value.trim();
        if (!InventoryData.categories.includes(category)) {
            InventoryData.categories.push(category);
            setupCategoryTabs();
            populateCategorySelect();
        }
    }
    
    const data = {
        sku: document.getElementById('productSku').value.trim(),
        name: document.getElementById('productName').value.trim(),
        category: category,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        units: document.getElementById('productUnits').value,
        mfgDate: document.getElementById('productMfgDate').value,
        expDate: document.getElementById('productExpDate').value,
        barcode: document.getElementById('productBarcode').value.trim(),
        invoiceNo: document.getElementById('productInvoiceNo').value.trim(),
        supplier: document.getElementById('productSupplier').value,
        description: document.getElementById('productDescription').value.trim()
    };
    
    if (originalSku) {
        const idx = InventoryData.products.findIndex(p => p.sku === originalSku);
        if (idx !== -1) { 
            InventoryData.products[idx] = { ...InventoryData.products[idx], ...data }; 
            showToast('Product updated successfully!','success'); 
        }
    } else {
        InventoryData.products.push({ id: nextProductId++, ...data });
        showToast('Product added successfully!','success');
    }
    closeProductModal(); renderProducts(); renderDashboard();
}

function openUpdateStock(sku) {
    const p = InventoryData.products.find(pr => pr.sku === sku); if (!p) return;
    document.getElementById('updateStockSku').value = p.sku;
    document.getElementById('updateStockName').textContent = p.name;
    document.getElementById('newStockQuantity').value = p.stock;
    document.getElementById('updateStockModal').classList.add('show');
}

document.getElementById('closeUpdateStock').addEventListener('click', () => elc('updateStockModal'));
document.getElementById('cancelUpdateStockBtn').addEventListener('click', () => elc('updateStockModal'));
document.getElementById('saveUpdateStockBtn').addEventListener('click', () => {
    const sku = document.getElementById('updateStockSku').value;
    const newStock = parseInt(document.getElementById('newStockQuantity').value);
    
    if (isNaN(newStock) || newStock < 0) {
        showToast('Stock must be 0 or greater', 'error');
        return;
    }
    
    const idx = InventoryData.products.findIndex(p => p.sku === sku);
    if (idx !== -1) {
        InventoryData.products[idx].stock = newStock;
        showToast('Stock updated successfully!', 'success');
        elc('updateStockModal');
        renderProducts();
        renderDashboard();
        // Also update notification modal if it's open
        if (document.getElementById('notificationModal').classList.contains('show')) {
            renderNotificationModal();
        }
    }
});

function editProduct(sku) { openProductModal(sku); }

/* VENDOR FORM */
function setupSupplierForm() {
    document.getElementById('supplierForm').addEventListener('submit', (e) => { e.preventDefault(); if (validateSupplierForm()) saveSupplier(); });
    document.getElementById('cancelSupplier').addEventListener('click', closeSupplierModal);
    document.getElementById('closeSupplierModal').addEventListener('click', closeSupplierModal);
    document.getElementById('addSupplierBtn').addEventListener('click', () => openSupplierModal());
}
function validateSupplierForm() {
    let ok = true; clearSupplierErrors();
    const company = document.getElementById('supplierCompany').value.trim();
    const name = document.getElementById('supplierName').value.trim();
    const email = document.getElementById('supplierEmail').value.trim();
    const phone = document.getElementById('supplierPhone').value.trim();
    const address = document.getElementById('supplierAddress').value.trim();
    if (!company) { setError('supplierCompanyError','Supplier name is required'); el('supplierCompany').classList.add('error'); ok=false; }
    else if (company.length < 2) { setError('supplierCompanyError','Supplier name must be at least 2 characters'); el('supplierCompany').classList.add('error'); ok=false; }
    else if (InventoryData.suppliers.some(v => v.company.toLowerCase() === company.toLowerCase() && !el('supplierId').value)) {
        setError('supplierCompanyError','Supplier already exists'); el('supplierCompany').classList.add('error'); ok=false;
    }
    if (!name) { setError('supplierNameError','Contact name is required'); el('supplierName').classList.add('error'); ok=false; }
    else if (!/^[a-zA-Z\s]{2,}$/.test(name)) { setError('supplierNameError','Letters and spaces only'); el('supplierName').classList.add('error'); ok=false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('supplierEmailError','Valid email required'); el('supplierEmail').classList.add('error'); ok=false; }
    if (!phone) { setError('supplierPhoneError','Phone required'); el('supplierPhone').classList.add('error'); ok=false; }
    else if (!/^(\+91|91)?[6-9]\d{9}$/.test(phone.replace(/\s/g,''))) { setError('supplierPhoneError','Valid Indian phone (e.g. +91 98765 43210)'); el('supplierPhone').classList.add('error'); ok=false; }
    if (!address) { setError('supplierAddressError','Address required'); el('supplierAddress').classList.add('error'); ok=false; }
    else if (address.length < 5) { setError('supplierAddressError','At least 5 characters'); el('supplierAddress').classList.add('error'); ok=false; }
    return ok;
}
function openSupplierModal(editId = null) {
    clearSupplierErrors(); document.getElementById('supplierForm').reset();
    document.getElementById('supplierId').value = '';
    document.getElementById('supplierModalTitle').textContent = 'Add Supplier';
    if (editId !== null) {
        const v = InventoryData.suppliers.find(vn => vn.id === editId);
        if (v) {
            document.getElementById('supplierId').value = v.id;
            document.getElementById('supplierCompany').value = v.company;
            document.getElementById('supplierName').value = v.contact;
            document.getElementById('supplierEmail').value = v.email;
            document.getElementById('supplierPhone').value = v.phone;
            document.getElementById('supplierAddress').value = v.address;
            document.getElementById('supplierProducts').value = v.products;
            document.getElementById('supplierModalTitle').textContent = 'Edit Supplier';
        }
    }
    document.getElementById('supplierModal').classList.add('show');
}
function closeSupplierModal() { document.getElementById('supplierModal').classList.remove('show'); }
function saveSupplier() {
    const id = document.getElementById('supplierId').value;
    const data = {
        company: document.getElementById('supplierCompany').value.trim(),
        contact: document.getElementById('supplierName').value.trim(),
        email: document.getElementById('supplierEmail').value.trim(),
        phone: document.getElementById('supplierPhone').value.trim(),
        address: document.getElementById('supplierAddress').value.trim(),
        products: document.getElementById('supplierProducts').value.trim()
    };
    if (id) {
        const idx = InventoryData.suppliers.findIndex(v => v.id === parseInt(id));
        if (idx !== -1) { InventoryData.suppliers[idx] = { ...InventoryData.suppliers[idx], ...data }; showToast('Supplier updated!','success'); }
    } else {
        InventoryData.suppliers.push({ id: nextSupplierId++, ...data });
        showToast('Supplier added!','success');
    }
    closeSupplierModal(); renderSuppliers(); populateSupplierSelect();
}

/* DELETE CONFIRMATION */
function setupConfirmModal() {
    document.getElementById('closeConfirm').addEventListener('click', () => elc('confirmModal'));
    document.getElementById('cancelDelete').addEventListener('click', () => elc('confirmModal'));
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
        elc('confirmModal'); if (deleteCallback) { deleteCallback(); deleteCallback = null; }
    });
}
function confirmDelete(type, id) {
    deleteCallback = () => {
        if (type === 'product') {
            InventoryData.products = InventoryData.products.filter(p => p.sku !== id);
            showToast('Product deleted!','warning'); renderProducts();
        } else {
            InventoryData.suppliers = InventoryData.suppliers.filter(v => v.id !== id);
            showToast('Supplier deleted!','warning'); renderSuppliers(); populateSupplierSelect();
        }
        renderDashboard();
    };
    const item = type === 'product' ? InventoryData.products.find(p => p.sku === id) : InventoryData.suppliers.find(v => v.id === id);
    const nm = type === 'product' ? item?.name : item?.company;
    document.getElementById('confirmMessage').innerHTML = `Delete <strong>"${nm}"</strong>?<br><small style="color:var(--text-light)">Cannot be undone.</small>`;
    document.getElementById('confirmModal').classList.add('show');
}

// Backdrop click-to-close is handled in DOMContentLoaded above

/* TOAST */
function showToast(msg, type = 'success') {
    const t = document.getElementById('toast');
    t.textContent = msg; t.className = 'toast ' + type + ' show';
    setTimeout(() => t.classList.remove('show'), 3000);
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show')); });

/* HELPERS */
function el(id) { return document.getElementById(id); }
function elc(id) { document.getElementById(id).classList.remove('show'); }

function clearProductErrors() {
    document.querySelectorAll('#productForm .error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('#productForm .error').forEach(el => el.classList.remove('error'));
}

function clearSupplierErrors() {
    document.querySelectorAll('#supplierForm .error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('#supplierForm .error').forEach(el => el.classList.remove('error'));
}

function setError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) element.textContent = message;
}

/* EXCEL DOWNLOADS */
function setupExcelDownloads() {
    const lowStockBtn = document.getElementById('downloadLowStockExcel');
    if (lowStockBtn) {
        lowStockBtn.addEventListener('click', downloadLowStockExcel);
    }
    const productsBtn = document.getElementById('downloadProductsExcel');
    if (productsBtn) {
        productsBtn.addEventListener('click', downloadProductsExcel);
    }
}

function downloadLowStockExcel() {
    const lowStockItems = InventoryData.products.filter(p => p.stock < 20);

    const headers = ['Product Name', 'Category', 'Stock', 'Supplier', 'Price (₹)', 'Units', 'SKU', 'Mfg Date', 'Exp Date', 'Invoice No'];
    const rows = lowStockItems.map(p => [
        p.name,
        p.category,
        p.stock,
        p.supplier,
        p.price.toFixed(2),
        p.units,
        p.sku,
        p.mfgDate,
        p.expDate,
        p.invoiceNo || ''
    ]);

    const wsData = [headers, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Column widths
    ws['!cols'] = [24, 14, 8, 18, 10, 8, 12, 12, 12, 14].map(w => ({ wch: w }));

    // Bold header row style
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; C++) {
        const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })];
        if (cell) cell.s = { font: { bold: true }, fill: { fgColor: { rgb: 'EF4444' } } };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Low Stock Alerts');
    XLSX.writeFile(wb, 'low_stock_alerts.xlsx');
    showToast('Excel downloaded successfully!', 'success');
}

function downloadProductsExcel() {
    let filtered = [...InventoryData.products];
    if (currentCategory !== 'all') filtered = filtered.filter(p => p.category === currentCategory);
    if (currentSearch) {
        const q = currentSearch.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) ||
            p.supplier.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))
        );
    }
    const [sf, sd] = currentSort.split('-');
    filtered.sort((a, b) => {
        let va, vb;
        if (sf === 'name') { va = a.name.toLowerCase(); vb = b.name.toLowerCase(); }
        else if (sf === 'price') { va = a.price; vb = b.price; }
        else { va = a.stock; vb = b.stock; }
        return sd === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

    const headers = ['SKU', 'Product Name', 'Category', 'Price (₹)', 'Stock', 'Units', 'Supplier', 'Mfg Date', 'Exp Date', 'Barcode', 'Invoice No', 'Description'];
    const rows = filtered.map(p => [
        p.sku,
        p.name,
        p.category,
        p.price.toFixed(2),
        p.stock,
        p.units,
        p.supplier,
        p.mfgDate,
        p.expDate,
        p.barcode || '',
        p.invoiceNo || '',
        p.description || ''
    ]);

    const wsData = [headers, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Column widths
    ws['!cols'] = [12, 24, 14, 10, 8, 8, 18, 12, 12, 16, 14, 30].map(w => ({ wch: w }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products List');
    XLSX.writeFile(wb, 'product_list.xlsx');
    showToast('Excel downloaded successfully!', 'success');
}

/* ==========================================
   SETTINGS PAGE
   ========================================== */
function setupSettings() {
    const darkBtn  = document.getElementById('darkModeBtn');
    const lightBtn = document.getElementById('lightModeBtn');
    const resetBtn = document.getElementById('resetDataBtn');

    if (darkBtn) {
        darkBtn.addEventListener('click', () => {
            document.body.classList.add('dark-mode');
            localStorage.setItem('invTheme', 'dark');
            refreshSettingsUI();
            showToast('Dark Mode activated 🌙', 'success');
        });
    }

    if (lightBtn) {
        lightBtn.addEventListener('click', () => {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('invTheme', 'light');
            refreshSettingsUI();
            showToast('Light Mode activated ☀️', 'success');
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const confirmed = confirm(
                '⚠️ Reset All Data?\n\nThis will restore all products, suppliers, and settings to their original default values.\n\nThis action cannot be undone.'
            );
            if (confirmed) {
                localStorage.removeItem('invTheme');
                document.body.classList.remove('dark-mode');
                // Reload the page to restore all in-memory data to defaults
                showToast('Resetting to defaults…', 'warning');
                setTimeout(() => location.reload(), 800);
            }
        });
    }

    // Sync UI on first load
    refreshSettingsUI();
}

function refreshSettingsUI() {
    const isDark   = document.body.classList.contains('dark-mode');
    const darkBtn  = document.getElementById('darkModeBtn');
    const lightBtn = document.getElementById('lightModeBtn');
    const modeText = document.getElementById('currentModeText');

    if (darkBtn)  darkBtn.classList.toggle('active', isDark);
    if (lightBtn) lightBtn.classList.toggle('active', !isDark);
    if (modeText) modeText.textContent = isDark ? 'Dark Mode is active' : 'Light Mode is active';
}