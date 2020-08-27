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

    // bindEvents: function () {
    //     $(".single-product-area").delegate(".add_to_cart_button", "click", function (event) {
    //         event.preventDefault();
    //         let productId = $(this).data("product_id");

    //         window.location.replace("single-product.html?product-id=" + productId);
    //     })
    // },

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
            <p><button class="add-to-cart">Add to Cart</button></p>           
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
// Shop.bindEvents();