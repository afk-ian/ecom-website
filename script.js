// gsap.registerPlugin(Flip);a

document.addEventListener("DOMContentLoaded", () => {
    // Cart functionality
    const cart = [];
    const cartItemsContainer = document.getElementById("cart-items");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartCountDisplay = document.getElementById("cart-count");
    const totalPriceDisplay = document.getElementById("item-price-total");
    let currentCartCount = 0;

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            if (currentCartCount >= 10) {
                alert("the cart is full");
                return;
            }
            const product = event.target.closest(".product");
            const productName = product.querySelector("h3").innerText;
            const productPrice = parseFloat(
                product.querySelector(".price").innerText.replace("₱", "")
            );
            const productImage = product.querySelector("img").src;

            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
            });
            updateCartCounter();
            updateCartUI();
            updateTotalPrice();
        });
    });

    function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    console.log("Updating cart UI with items:", cart); // For Debugging

    // Create an object to count items
    const cartSummary = {};

    cart.forEach((item) => {
        if (cartSummary[item.name]) {
            cartSummary[item.name].quantity += 1;
        } else {
            cartSummary[item.name] = { ...item, quantity: 1 };
        }
    });

    // Loop through summarized cart and update UI
    Object.values(cartSummary).forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                        ${item.name} - ₱${item.price.toFixed(2)} (x${item.quantity})`;
        cartItemsContainer.appendChild(li);
    });
}


    // function updateCartUI() {
    //     cartItemsContainer.innerHTML = "";
    //     console.log("Updating cart UI with items:", cart); // For Debugging Purposes
    //     cart.forEach((item) => {
    //         const li = document.createElement("li");
    //         li.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"> ${item.name} - ${item.price}`;
    //         cartItemsContainer.appendChild(li);
    //     });
    // }

    function updateCartCounter() {
        if (currentCartCount < 10) {
            currentCartCount++;
            cartCountDisplay.textContent = currentCartCount; // Use textContent instead of innerHTML
            console.log(currentCartCount); // For debugging purposes
        }
    }
    function updateTotalPrice() {
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        totalPriceDisplay.textContent = totalPrice.toFixed(2);
    }

    // Smooth scrolling
    document.querySelectorAll(".nav-links a").forEach((anchor) => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute("href"));
            section.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Responsive Navbar Toggle
    const navLinks = document.querySelector(".nav-links");

    // Background Slideshow
    const backgroundContainer = document.createElement("div");
    backgroundContainer.style.position = "fixed";
    backgroundContainer.style.top = "0";
    backgroundContainer.style.left = "0";
    backgroundContainer.style.width = "100%";
    backgroundContainer.style.height = "100%";
    backgroundContainer.style.zIndex = "-1";
    backgroundContainer.style.backgroundSize = "cover";
    backgroundContainer.style.backgroundPosition = "center";
    backgroundContainer.style.filter = "blur(2px)";
    document.body.prepend(backgroundContainer);

    const backgroundImages = [
        "img/diplato.jpg",
        "img/lansonkalamay.jpg",
        "img/puto.jpg",
        "img/sinaging.jpg",
    ];
    let currentImageIndex = 0;

    function changeBackground() {
        backgroundContainer.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }

    setInterval(changeBackground, 2500);
    changeBackground();
});

