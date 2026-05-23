/* ==========================================
   INVENTORY MANAGEMENT SYSTEM - SEED DATA
   ========================================== */

const CATEGORY_GST = {
  'Grocery': 5,
  'Medicine': 12,
  'Dal & Pulses': 0,
  'Snacks': 18,
  'Others': 18,
};

const rawProducts = [
  { id:1,  name:"Basmati Rice",          category:"Grocery",      price:85,  stock:150, supplier:"Mega Mart",     description:"Premium long grain basmati rice, 10kg pack" },
  { id:2,  name:"Whole Wheat Flour",     category:"Grocery",      price:45,  stock:200, supplier:"FarmFresh",     description:"Stone ground whole wheat flour, 5kg" },
  { id:3,  name:"Refined Sunflower Oil", category:"Grocery",      price:135, stock:75,  supplier:"Golden Oils",   description:"Refined sunflower oil, 5 liter can" },
  { id:4,  name:"Organic Sugar",         category:"Grocery",      price:55,  stock:180, supplier:"Green Valley",  description:"Organic cane sugar, 1kg pack" },
  { id:5,  name:"Iodised Salt",          category:"Grocery",      price:20,  stock:300, supplier:"Mega Mart",     description:"Iodised crystal salt, 1kg pack" },
  { id:6,  name:"Amoxicillin Capsules",  category:"Medicine",     price:125, stock:45,  supplier:"MediCare Plus", description:"Antibiotic capsules, 250mg x 10" },
  { id:7,  name:"Paracetamol Tablets",   category:"Medicine",     price:35,  stock:500, supplier:"PharmaLife",    description:"Pain relief tablets, 500mg x 15" },
  { id:8,  name:"Vitamin D3 Supplements",category:"Medicine",     price:299, stock:30,  supplier:"MediCare Plus", description:"Vitamin D3 60K IU, monthly dose" },
  { id:9,  name:"Cough Syrup",           category:"Medicine",     price:175, stock:80,  supplier:"PharmaLife",    description:"Dry cough syrup, 100ml bottle" },
  { id:10, name:"Multivitamin Syrup",    category:"Medicine",     price:245, stock:12,  supplier:"WellBeing Co",  description:"Children multivitamin syrup, 200ml" },
  { id:11, name:"Toor Dal",             category:"Dal & Pulses", price:120, stock:90,  supplier:"FarmFresh",     description:"Premium toor dal, 1kg pack" },
  { id:12, name:"Moong Dal",            category:"Dal & Pulses", price:135, stock:65,  supplier:"Green Valley",  description:"Split moong dal, 1kg pack" },
  { id:13, name:"Chana Dal",            category:"Dal & Pulses", price:95,  stock:110, supplier:"FarmFresh",     description:"Bengal gram dal, 1kg pack" },
  { id:14, name:"Masoor Dal",           category:"Dal & Pulses", price:105, stock:85,  supplier:"Golden Harvest",description:"Red lentil dal, 1kg pack" },
  { id:15, name:"Urad Dal",             category:"Dal & Pulses", price:140, stock:55,  supplier:"Green Valley",  description:"Black gram dal whole, 1kg" },
  { id:16, name:"Potato Chips",         category:"Snacks",       price:30,  stock:400, supplier:"SnackWorld",    description:"Classic salted potato chips, 150g" },
  { id:17, name:"Chocolate Biscuits",   category:"Snacks",       price:45,  stock:250, supplier:"SnackWorld",    description:"Chocolate cream sandwich biscuits, 200g" },
  { id:18, name:"Namkeen Mixture",      category:"Snacks",       price:80,  stock:60,  supplier:"Tasty Crunch",  description:"Traditional namkeen mixture, 500g" },
  { id:19, name:"Peanut Butter",        category:"Snacks",       price:195, stock:18,  supplier:"SnackWorld",    description:"Crunchy peanut butter, 500g jar" },
  { id:20, name:"Dry Fruit Trail Mix",  category:"Snacks",       price:350, stock:40,  supplier:"Tasty Crunch",  description:"Premium trail mix with nuts and dried fruits, 250g" },
  { id:21, name:"Dishwash Liquid",      category:"Others",       price:75,  stock:130, supplier:"CleanHome",     description:"Lemon dishwash liquid, 750ml" },
  { id:22, name:"Laundry Detergent",    category:"Others",       price:180, stock:95,  supplier:"CleanHome",     description:"Automatic washing powder, 2kg" },
  { id:23, name:"Floor Cleaner",        category:"Others",       price:110, stock:45,  supplier:"SparkleCo",     description:"Pine-scented floor cleaner, 1L" },
  { id:24, name:"Toilet Cleaner",       category:"Others",       price:130, stock:15,  supplier:"CleanHome",     description:"Bathroom toilet cleaner, 750ml" },
  { id:25, name:"Mosquito Repellent",   category:"Others",       price:65,  stock:200, supplier:"SparkleCo",     description:"Liquid mosquito repellent refill, 45ml" },
];

export const initialProducts = rawProducts.map((p, index) => ({
  ...p,
  sku: `SKU10${(index + 1).toString().padStart(2, '0')}`,
  units: p.category === 'Others' ? 'pcs' : 'kg',
  mfgDate: '2025-01-01',
  expDate: '2026-01-01',
  barcode: `890123456${(index + 1).toString().padStart(3, '0')}`,
  invoiceNo: `INV-2025-${(index + 1).toString().padStart(3, '0')}`,
  gstRate: CATEGORY_GST[p.category] || 18,
}));

export const initialSuppliers = [
  { id:1,  company:"Mega Mart",     contact:"Rajesh Kumar",    email:"rajesh@megamart.com",    phone:"+91 98765 43210", address:"123 Market Street, Chennai, TN 600001",       products:"Basmati Rice, Iodised Salt" },
  { id:2,  company:"FarmFresh",     contact:"Priya Sharma",    email:"priya@farmfresh.in",      phone:"+91 87654 32109", address:"45 Farm Road, Punjab, IN 143001",             products:"Whole Wheat Flour, Toor Dal, Chana Dal" },
  { id:3,  company:"Golden Oils",   contact:"Amit Patel",      email:"amit@goldenoils.com",     phone:"+91 76543 21098", address:"88 Industrial Area, Ahmedabad, GJ 380001",    products:"Refined Sunflower Oil" },
  { id:4,  company:"Green Valley",  contact:"Suresh Babu",     email:"suresh@greenvalley.co",   phone:"+91 65432 10987", address:"22 Green Lane, Coimbatore, TN 641001",        products:"Organic Sugar, Moong Dal, Urad Dal" },
  { id:5,  company:"MediCare Plus", contact:"Dr. Anita Rao",   email:"anita@medicareplus.com",  phone:"+91 91234 56789", address:"10 Medical Plaza, Bengaluru, KA 560001",      products:"Amoxicillin Capsules, Vitamin D3 Supplements" },
  { id:6,  company:"PharmaLife",    contact:"Vikram Singh",    email:"vikram@pharmalife.in",     phone:"+91 82345 67890", address:"55 Pharma Hub, Hyderabad, TS 500001",         products:"Paracetamol Tablets, Cough Syrup" },
  { id:7,  company:"WellBeing Co",  contact:"Neha Joshi",      email:"neha@wellbeing.co",        phone:"+91 73456 12345", address:"18 Wellness Road, Mumbai, MH 400001",         products:"Multivitamin Syrup" },
  { id:8,  company:"SnackWorld",    contact:"Manoj Gupta",     email:"manoj@snackworld.in",      phone:"+91 94567 23456", address:"77 Snack Zone, Delhi, DL 110001",             products:"Potato Chips, Chocolate Biscuits, Peanut Butter" },
  { id:9,  company:"Tasty Crunch",  contact:"Deepa Nair",      email:"deepa@tastycrunch.com",   phone:"+91 85678 34567", address:"34 Food Park, Kochi, KL 682001",              products:"Namkeen Mixture, Dry Fruit Trail Mix" },
  { id:10, company:"CleanHome",     contact:"Arun Verma",      email:"arun@cleanhome.in",        phone:"+91 76789 45678", address:"90 Clean Avenue, Jaipur, RJ 302001",          products:"Dishwash Liquid, Laundry Detergent, Toilet Cleaner" },
  { id:11, company:"SparkleCo",     contact:"Kavita Reddy",    email:"kavita@sparkleco.com",     phone:"+91 96890 56789", address:"61 Shine Street, Kolkata, WB 700001",         products:"Floor Cleaner, Mosquito Repellent" },
  { id:12, company:"Golden Harvest",contact:"Bala Krishnan",   email:"bala@goldenharvest.in",    phone:"+91 67890 67890", address:"14 Grain Market, Madurai, TN 625001",         products:"Masoor Dal" },
];

export const initialCustomers = [
  { id: 1, name: 'Arun Kumar', phone: '+91 98765 43210', address: '12 Gandhi St, Chennai', gst: '33AABCU1234D1Z5' },
  { id: 2, name: 'Priya Sharma', phone: '+91 87654 32109', address: '45 Lake View Rd, Bangalore', gst: '29AABCU5678E1Z6' },
  { id: 3, name: 'Rajesh Patel', phone: '+91 76543 21098', address: '78 MG Road, Mumbai', gst: '27AABCU9012F1Z7' },
];

export const initialInvoices = [
  {
    id: 1,
    invoiceNo: 'INV-1001',
    date: '2026-05-20',
    customer: { name: 'Arun Kumar', phone: '+91 98765 43210', address: '12 Gandhi St, Chennai', gst: '33AABCU1234D1Z5' },
    items: [
      { productSku: 'SKU1001', productName: 'Basmati Rice', price: 85, qty: 2, total: 170, gstRate: 5, gstAmount: 8.5 },
      { productSku: 'SKU1004', productName: 'Organic Sugar', price: 55, qty: 1, total: 55, gstRate: 5, gstAmount: 2.75 },
    ],
    subtotal: 225,
    totalGst: 11.25,
    discount: 10,
    grandTotal: 226.25,
    paymentMode: 'cash',
    status: 'paid',
  },
  {
    id: 2,
    invoiceNo: 'INV-1002',
    date: '2026-05-21',
    customer: { name: 'Priya Sharma', phone: '+91 87654 32109', address: '45 Lake View Rd, Bangalore', gst: '29AABCU5678E1Z6' },
    items: [
      { productSku: 'SKU1006', productName: 'Amoxicillin Capsules', price: 125, qty: 3, total: 375, gstRate: 12, gstAmount: 45 },
      { productSku: 'SKU1007', productName: 'Paracetamol Tablets', price: 35, qty: 5, total: 175, gstRate: 12, gstAmount: 21 },
    ],
    subtotal: 550,
    totalGst: 66,
    discount: 0,
    grandTotal: 616,
    paymentMode: 'card',
    status: 'paid',
  },
];

export const initialCategories = [...new Set(initialProducts.map(p => p.category))];
