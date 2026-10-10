/* ==========================================================================
   IFA SWEET CAKERY - JAVASCRIPT (script.js)
   File logika untuk produk, keranjang belanja, dan pemesanan WhatsApp
   ========================================================================== */

// ==========================================================================
// 1. PENGATURAN TOKO & NOMOR WHATSAPP
// ==========================================================================
const STORE_CONFIG = {
  storeName: "Ifa Sweet Cakery",
  // Ganti dengan nomor WhatsApp penjual (Gunakan format 628xxx tanpa tanda + atau spasi)
  whatsappNumber: "6288271293107",
};

// ==========================================================================
// 2. DATA VARIAN PRODUK KUE (LENGKAP & ESTETIK)
// ==========================================================================
const products = [
  {
    id: 1,
    name: "Fudgy Brownies Cokelat",
    price: 35000,
    category: "Signature",
    description: "Brownies panggang dengan cokelat Belgia murni, tekstur chewy dan lumer di mulut.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Classic New York Cheesecake",
    price: 45000,
    category: "Best Seller",
    description: "Kue keju panggang super lembut dengan crust biskuit gurih dan aroma lemon lembut.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Pastel Vanilla Cupcake",
    price: 15000,
    category: "Cupcake",
    description: "Cupcake vanila lembut dengan swirl buttercream pink pastel dan edible pearl cantik.",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Fresh Strawberry Shortcake",
    price: 50000,
    category: "Favorit",
    description: "Sponge cake ringan berlapis chantilly cream lembut dan potongan buah strawberry segar.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Red Velvet Cream Cheese",
    price: 48000,
    category: "Best Seller",
    description: "Bolu merah beludru beraroma kakao khas dilapisi frosting cream cheese lezat.",
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Matcha Mille Crepe",
    price: 42000,
    category: "Spesial",
    description: "Belasan lapisan crepe tipis dengan cream matcha Uji Jepang premium dan taburan matcha murni.",
    image: "https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Italian Tiramisu Cup",
    price: 38000,
    category: "Dessert",
    description: "Ladyfinger berbalut espresso harum dengan mascarpone cream dan taburan bubuk kakao.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Lotus Biscoff Caramel Cake",
    price: 52000,
    category: "Signature",
    description: "Kue karamel lembut dipadu lelehan selai Lotus Biscoff dan taburan biskuit renyah.",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80"
  }
];

// ==========================================================================
// 3. STATE KERANJANG BELANJA
// ==========================================================================
let cart = [];

// ==========================================================================
// 4. ELEMEN DOM
// ==========================================================================
const productsContainer = document.getElementById("products-container");
const cartItemsContainer = document.getElementById("cart-items-container");
const summaryTotalItems = document.getElementById("summary-total-items");
const summaryTotalPrice = document.getElementById("summary-total-price");
const cartBadgeCount = document.getElementById("cart-badge-count");
const btnClearCart = document.getElementById("btn-clear-cart");
const btnCheckoutWa = document.getElementById("btn-checkout-wa");
const customerNameInput = document.getElementById("customer-name");
const customerNoteInput = document.getElementById("customer-note");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navMenu = document.getElementById("nav-menu");

// ==========================================================================
// 5. FUNGSI UTILITAS FORMAT RUPIAH
// ==========================================================================
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// ==========================================================================
// 6. MENAMPILKAN DAFTAR PRODUK KE HALAMAN
// ==========================================================================
function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image-container">
        <span class="product-badge">${product.category}</span>
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatRupiah(product.price)}</span>
          <button class="btn-add-cart" onclick="addToCart(${product.id})">
            <i class="fa-solid fa-cart-plus"></i> Tambah
          </button>
        </div>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

// ==========================================================================
// 7. FUNGSI KERANJANG BELANJA
// ==========================================================================

// Menambahkan produk ke keranjang
function addToCart(productId) {
  const selectedProduct = products.find((item) => item.id === productId);

  if (!selectedProduct) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`"${selectedProduct.name}" berhasil ditambahkan! 🍰`);
}

// Mengubah kuantitas (+ atau -)
function updateQuantity(productId, delta) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;

    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
      showToast("Produk dihapus dari keranjang.");
    }
  }

  updateCartUI();
}

// Menghapus produk secara manual
function removeFromCart(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    cart = cart.filter((item) => item.id !== productId);
    showToast(`"${item.name}" dihapus dari keranjang.`);
    updateCartUI();
  }
}

// Mengosongkan keranjang
function clearCart() {
  if (cart.length === 0) return;

  if (confirm("Apakah Anda yakin ingin mengosongkan keranjang belanja?")) {
    cart = [];
    updateCartUI();
    showToast("Keranjang berhasil dikosongkan.");
  }
}

// Memperbarui tampilan Keranjang Belanja & Total Harga
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Perbarui Badge & Ringkasan
  cartBadgeCount.textContent = totalItems;
  summaryTotalItems.textContent = `${totalItems} kue`;
  summaryTotalPrice.textContent = formatRupiah(totalPrice);

  // Jika keranjang kosong
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Keranjang belanja Anda masih kosong.</p>
        <a href="#produk" class="btn btn-secondary btn-sm" style="display:inline-flex; font-size:0.85rem; padding:8px 18px;">
          Pilih Kue Sekarang
        </a>
      </div>
    `;
    btnCheckoutWa.disabled = true;
    btnClearCart.style.display = "none";
    return;
  }

  // Jika keranjang ada isinya
  btnCheckoutWa.disabled = false;
  btnClearCart.style.display = "inline-flex";
  cartItemsContainer.innerHTML = "";

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";

    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">${formatRupiah(item.price)}</div>
      </div>
      <div class="quantity-control">
        <button class="btn-qty" onclick="updateQuantity(${item.id}, -1)" title="Kurangi">−</button>
        <span class="qty-number">${item.quantity}</span>
        <button class="btn-qty" onclick="updateQuantity(${item.id}, 1)" title="Tambah">+</button>
      </div>
      <button class="btn-remove-item" onclick="removeFromCart(${item.id})" title="Hapus produk">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    cartItemsContainer.appendChild(itemElement);
  });
}

// ==========================================================================
// 8. FITUR CHECKOUT / PESAN VIA WHATSAPP
// ==========================================================================
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Keranjang belanja Anda masih kosong. Silakan pilih kue terlebih dahulu!");
    return;
  }

  const customerName = customerNameInput.value.trim() || "Pelanggan";
  const customerNote = customerNoteInput.value.trim();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Menyusun teks daftar kue yang dipesan
  let orderListText = "";
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    orderListText += `${index + 1}. *${item.name}*\n   Jumlah: ${item.quantity} pcs (${formatRupiah(item.price)}/pcs) -> ${formatRupiah(subtotal)}\n`;
  });

  // Template Pesan WhatsApp yang Rapi & Estetik
  let message = `Halo *${STORE_CONFIG.storeName}*, saya ingin memesan kue:\n\n`;
  message += `👤 *Nama Pemesan:* ${customerName}\n`;
  message += `📅 *Tanggal:* ${new Date().toLocaleDateString("id-ID", { dateStyle: "full" })}\n\n`;
  message += `🛒 *DAFTAR PESANAN:*\n`;
  message += orderListText;
  message += `\n💰 *TOTAL PEMBAYARAN:* *${formatRupiah(totalPrice)}*\n`;

  if (customerNote) {
    message += `\n📝 *Catatan Khusus:* ${customerNote}\n`;
  }

  message += `\nMohon informasi konfirmasi ketersediaan dan rekening pembayaran. Terima kasih banyak Kak Ifa! 🙏✨🍰`;

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMessage}`;

  window.open(waUrl, "_blank");
}

// ==========================================================================
// 9. TOAST NOTIFIKASI
// ==========================================================================
let toastTimeout;
function showToast(msg) {
  clearTimeout(toastTimeout);
  toastMessage.textContent = msg;
  toast.classList.add("show");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ==========================================================================
// 10. EVENT LISTENERS & INISIALISASI
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();

  btnClearCart.addEventListener("click", clearCart);
  btnCheckoutWa.addEventListener("click", checkoutWhatsApp);

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
      }
    });
  });
});
