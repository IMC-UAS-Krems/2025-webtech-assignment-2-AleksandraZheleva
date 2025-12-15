console.log("JS running");

let cart= [];
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");
const modalOverlay=document.getElementById("modal-overlay");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCart = document.getElementById("close-cart");
const cartIcon  =  document.querySelector(".icon-cart");
const checkoutBtn= document.getElementById("checkout-btn");
const checkoutForm=document.getElementById("checkout-form");
const thankyouMessage=document.getElementById("thank-you-message");
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click",e => {
        e.preventDefault();
        e.stopPropagation();

        const name=btn.dataset.name;
        const price = Number(btn.dataset.price);

        console.log("Clicked:",name);

        const item=cart.find(p => p.name === name);

        if (item){
            item.quantity++;
        } else{
         cart.push({name,price,quantity:1});
        }

        updateCart();
    });
});
function updateCart(){
    cartCount.textContent = cart.reduce((sum,i) => sum + i.quantity,0);

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total +=item.price * item.quantity;
        cartItems.innerHTML += `
        <li>
        ${item.name} x${item.quantity}
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </li>
        `;
    });
    cartTotal.textContent=total.toFixed(2);
}
cartIcon.addEventListener("click",() =>{
    cartPanel.style.display="block";
    modalOverlay.style.display="block";
});
closeCart.addEventListener("click",() => {
    cartPanel.style.display = "none";
    modalOverlay.style.display="none";
});

 
 checkoutBtn.addEventListener("click",() => {
    cartPanel.style.display="none";
    modalOverlay.style.display="none";
    checkoutForm.style.display="block";
    checkoutForm.scrollIntoView({behavior:"smooth"});
 });
 checkoutForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    checkoutForm.style.display ="none";
    thankyouMessage.style.display="block";
 });

