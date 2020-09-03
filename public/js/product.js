window.Shop = {
    API_BASE_URL: "http://localhost:3000",

    getProducts: function () {
        $.ajax({
            url: Shop.API_BASE_URL + "/products/items"
            //default ajax method: "GET"
        }).done(function (response) {
          Shop.displayProducts(response);
      });
    },

    getCart: function () {
      $.ajax({
          url: Shop.API_BASE_URL + "/carts/getCart"
          //default ajax method: "GET"
      }).done(function (response) {
        Shop.displayCart(response.products)
    });
  },

  deleteCart: function () {
    $.ajax({
        url: Shop.API_BASE_URL + "/carts/deleteCart",
        method: "DELETE"
    }).done(function (response) {
      location.reload();
      alert('Deleted cart');
  });
},

  displayCart: function(cartItems) {
    var cartItemsHtml = "";
    cartItems.forEach(oneItem => cartItemsHtml += Shop.getCartHtml(oneItem));
    $(cartItemsHtml).insertBefore(".divider");

  },

  getCartHtml: function (cartItem) {
    return `<li>
    <span class="item">
      <span class="item-left">
          <img src="" alt="" />
          <span class="item-info">
              <span>${cartItem.name} - ${cartItem.price}$</span>
              <span>Quantity: ${cartItem.quantity}</span>
          </span>
      </span>
      <span class="item-right">
          <button class="btn btn-xs btn-danger pull-right">x</button>
      </span>
  </span>
</li>`
},


    bindEvents: function () {
      $(".py-5").delegate(".add-to-cart", "click", function (event) {
          event.preventDefault();
          let productId = $(this).data("product_id");
          let productName = $(this).data("product_name");
          let productPrice = $(this).data("product_price");
          let productQuantity = 1;
          Shop.addToCart(productId, productName, productPrice, productQuantity);
          // window.location.replace("single-product.html?product-id=" + productId);
      })
  },

  bindEmptyCart: function() {
    $("#navbar-parent-ul").delegate("#empty-cart-button", "click", function (event) {
      event.preventDefault();
      Shop.deleteCart();
  })
  },

  addToCart: function(productId, productName, productPrice, productQuantity) {
    $.ajax({
      //ajax method: "POST"
      type: "POST",
      url: Shop.API_BASE_URL + "/carts/addUpdateCart",
      data: {
        _id: productId,
        quantity: productQuantity,
        name: productName,
        price: productPrice
      }
  }).done(function (response) {
    console.log(response);
    location.reload();
    alert('Added to cart');
});
  },

    getProductsHtml: function (product) {
        return `<div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="${product.imageURL}" alt=""></a>
          <div class="card-body">
            <h4 class="font-weight-light">
              <a href="#">${product.name}</a>
            </h4>
            <h5>$${product.price}</h5>
            <p class="font-weight-light">${product.description}</p>
            <a href="#">${product.category}</a>
          </div>
          <div class="card-footer">
            <p><button class="add-to-cart" data-product_id=${product._id} data-product_name=${product.name} data-product_price=${product.price}>Add to Cart</button></p>           
          </div>
        </div>
      </div>`
    },

    displayProducts: function (products) {
        var productsHtml = "";
        products.forEach(oneProduct => productsHtml += Shop.getProductsHtml(oneProduct));
        $(".flexbox-container").html(productsHtml);
    },

};

Shop.getProducts();
Shop.bindEvents();
Shop.getCart();
Shop.bindEmptyCart();