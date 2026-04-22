<template>
  <div class="preview-cart">
    <div class="header">SHOPPING BAG ({{ cart.items.length }})</div>

    <div class="cart-items-list">
      <div v-for="item in cart.items" :key="item.id" class="item-row">
        <img :src="item.image" class="item-img" />
        <div class="item-info">
          <h4>{{ item.name }}</h4>
          <router-link :to="'/product/' + item.id" class="see-details">See Details</router-link>
          <p>Color: {{ item.color }}</p>
          <p>Size: {{ item.size }}</p>
          <div class="price-qty">
            <span>Rp {{ item.price.toLocaleString() }}</span>
            <span class="qty">Qty: {{ item.qty }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="subtotal">
        <span>Subtotal</span>
        <span>Rp {{ cart.totalPrice.toLocaleString() }}</span>
      </div>
      <router-link to="/cart" class="btn-view-bag">View Bag</router-link>
      <button class="btn-checkout">Checkout</button>
    </div>
  </div>
</template>

<style scoped>
.preview-cart {
  position: absolute;
  top: 100%;
  right: 0;
  width: 350px;
  background: white;
  border: 1px solid #eee;
  z-index: 1000;
  padding: 20px;
}
.header {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.item-row {
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #fafafa;
}
.item-img {
  width: 70px;
  aspect-ratio: 3/4;
  object-fit: cover;
}
.item-info h4 {
  font-family: serif;
  font-size: 14px;
  margin-bottom: 5px;
}
.see-details {
  font-size: 11px;
  color: #8c6a43;
  text-decoration: underline;
}
.item-info p {
  font-size: 11px;
  color: #999;
  margin: 2px 0;
}
.price-qty {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
}

.footer {
  margin-top: 15px;
}
.subtotal {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 15px;
}
.btn-view-bag,
.btn-checkout {
  display: block;
  width: 100%;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 12px;
  margin-bottom: 10px;
}
.btn-view-bag {
  border: 1px solid #8c6a43;
  color: #8c6a43;
}
.btn-checkout {
  background: #8c6a43;
  color: white;
  border: none;
}
</style>
