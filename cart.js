let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//OPEN CART
cartIcon.onclick = () => {
  cart.classList.add("active");
};
//CLOSE CART
closeCart.onclick = () => {
  cart.classList.remove("active");
};


if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //REMOVE ITEM FROM CART
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //UPDATE QUANTITY
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //ADD ITEM TO CART
  var addCart = document.getElementsByClassName("btn-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addToCartClicked);
  }
}

//REMOVE ITEM FROM CART FUNCTION
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}
//CHANGE THE QUANTITY FUNCTION
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
//ADD ITEM TO CART FUNCTION
function addToCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var productContent = shopProducts.parentElement.parentElement;
  var productInfo = productContent.children[1];
  var img = productContent.children[0].children[0].children[0].src;
  var name = productInfo.children[0].innerText;
  var price = productInfo.children[1].innerText;

  addProductToCart(name, price, img);
  updateTotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  console.log("Cart item names:");
  console.log(cartItemsNames);

  var arr = Array.prototype.slice.call(cartItemsNames)

  var found = arr.findIndex(element => element.innerText === title);
  if (found ===-1) {
    var sneaker = generateSneakerInCart(title, price, productImg);
    cartShopBox.innerHTML = sneaker;
    cartItems.append(cartShopBox);
    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);
    cartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);
  }
  else{
      alert("Item is aready in the shopping cart")
  }
}

function generateSneakerInCart(title, price, img) {
  var cartBoxContent =
    `
    <img src = "` +
    img +
    `" alt = "" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">` +
    title +
    `</div>
        <div class="cart-product-price">` +
    price +
    `</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- REMOVE FROM CART -->
    <i class='bx bxs-trash-alt cart-remove'></i>
`;
  return cartBoxContent;
}


//UPDATE TOTAL
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-product-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;

    total = total + price * quantity;
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  }
}
