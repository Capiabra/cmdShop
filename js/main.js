document.addEventListener("DOMContentLoaded", () => {
    highlightCurrentNav();
    initFakePayment();
    initGallery();
    initFavToggles();
});

/** Подсветка текущего пункта меню */
function highlightCurrentNav() {
    const body = document.body;
    const current = body.dataset.page;
    if (!current) return;

    document.querySelectorAll(".main-nav-link").forEach(link => {
        if (link.dataset.page === current) {
            link.classList.add("is-active");
        }
    });
}

/** Фальшивая оплата на странице checkout-payment */
function initFakePayment() {
    const form = document.getElementById("payment-form");
    if (!form) return;

    const payBtn = form.querySelector("button[type='submit']");
    const modal = document.getElementById("success-modal");
    const closeBtn = document.getElementById("success-close");

    form.addEventListener("submit", e => {
        e.preventDefault();
        if (!payBtn) return;

        const originalText = payBtn.innerText;
        payBtn.disabled = true;
        payBtn.innerText = "Обработка...";
        payBtn.style.opacity = "0.7";

        setTimeout(() => {
            payBtn.disabled = false;
            payBtn.innerText = originalText;
            payBtn.style.opacity = "1";
            modal.classList.add("visible");
        }, 1400);
    });

    closeBtn?.addEventListener("click", () => {
        modal.classList.remove("visible");
        window.location.href = "index.html";
    });

    modal?.addEventListener("click", e => {
        if (e.target === modal) {
            modal.classList.remove("visible");
        }
    });
}

/** Переключение большой картинки по клику на превью на product.html */
function initGallery() {
    const mainImg = document.querySelector(".product-main-image img");
    const thumbs = document.querySelectorAll(".product-thumb");
    if (!mainImg || !thumbs.length) return;

    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
            const src = thumb.dataset.large;
            if (src) {
                mainImg.src = src;
            }
            thumbs.forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
        });
    });
}

/** Тоггл сердечек-избранного (просто визуальный) */
function initFavToggles() {
    document.querySelectorAll(".product-fav").forEach(icon => {
        icon.addEventListener("click", () => {
            icon.style.opacity = icon.style.opacity === "1" ? "0.5" : "1";
        });
    });
}