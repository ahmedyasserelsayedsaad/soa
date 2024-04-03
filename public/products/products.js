
document.addEventListener('DOMContentLoaded', () => {
    let titlee=document.querySelector('.titlee');
    let title=document.querySelector('.title');
    setTimeout(()=>{
        titlee.style.display="none";
        title.style.display="block"
        getProducts();
    },1000)
   
});
    

async function getProducts() {
    const productContainer = document.getElementById('productContainer');
    try {
        const api = "http://localhost:3000/soa/products";
        const res = await fetch(api);
        const data = await res.json();
        console.log(data);
        const productCards = data.map((product) => createProductCard(product));
        productContainer.append(...productCards);
       // alert(data.message)
    } catch (err) {
        console.log(err);
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('card');

    const productName = document.createElement('h2');
    productName.textContent = product.name;

    const productPrice = document.createElement('h5');
    productPrice.textContent = `Price: $${product.price}`;

    const productDesc = document.createElement('p');
    productDesc.textContent = product.desc;

    const orderButton = document.createElement('button');
    orderButton.textContent = 'Order Now';
    orderButton.classList.add('order-btn');
    orderButton.addEventListener('click', () => {
        addOrder(product); 
    });

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart-btn');
    addToCartButton.addEventListener('click', () => {
        // Hide add to cart button and show quantity input and add button
        addToCartButton.style.display = 'none';
        quantityInput.style.display = 'inline-block';
        addButton.style.display = 'inline-block';
    });

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.style.display = 'none'; // Initially hide quantity input

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.style.display = 'none'; // Initially hide add button
    addButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
            addToCart(product, quantity);
            alert(`Adding ${quantity} ${product.name}(s) to the cart`);
        } else {
            alert('Please enter a valid quantity');
        }
    });

    card.appendChild(productName);
    card.appendChild(productPrice);
    card.appendChild(productDesc);
    card.appendChild(orderButton);
    card.appendChild(addToCartButton);
    card.appendChild(quantityInput);
    card.appendChild(addButton);

    return card;
}



/// add order 
async function addOrder(product) {
    try {
        const orderApi = "http://localhost:3000/soa/orders"; 
        const response = await fetch(orderApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerId: 1, products: [product] }) 
        });
        const data = await response.json();
        console.log(data.message); 
        alert(data.message)
    } catch (err) {
        console.error(err);
    }
}

async function addToCart(product, quantity) {
    try {
        const response = await fetch('http://localhost:3000/soa/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: product.id,
                quantity: quantity
            })
        });
        const data = await response.json();
        alert(data.message);
    } catch (err) {
        console.error(err);
        alert('Failed to add product to cart');
    }
}

