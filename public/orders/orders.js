document.addEventListener('DOMContentLoaded', () => {
    let titlee=document.querySelector('.titlee');
    let title=document.querySelector('.title');
    setTimeout(() => {
        titlee.style.display="none";
        title.style.display="block";
        getAllOrders();
    }, 1000);

});

async function getAllOrders(){
    try{
        const ordersList = document.getElementById('ordersList');
        const api='http://localhost:3000/soa/orders';
        const res=await fetch(api);
        const data=await res.json(); // تحويل البيانات إلى JSON بانتظار الاستجابة
        data.forEach(order =>{
            const listItem = document.createElement('li');
            listItem.innerHTML = `Product ID:<span> ${order.id}</span>,
             Product Name:<span> ${order.name}</span>,
             Product Price:<span> ${order.price} $</span>
             <button onclick="showShippingForm('${order.id}', this)">shippingOrder</button>
             <div id="shippingForm_${order.id}" style="display: none;"></div>`;
            ordersList.appendChild(listItem);  
        });
    }
    catch(err){
        console.log(err);
    }
}


// show div 
function showShippingForm(orderId, button) {
    const shippingFormId = `shippingForm_${orderId}`;
    const shippingForm = document.getElementById(shippingFormId);
    if (shippingForm.style.display === 'none') {
        const shippingFormContent = `
            <input type="text" id="shippingAddress_${orderId}" placeholder="Enter shipping address" class="address">
            <button onclick="shipOrder('${orderId}')">Ship</button>
        `;
        shippingForm.innerHTML = shippingFormContent;
        shippingForm.style.display = 'block';
        shippingForm.style.marginTop='20PX'
    } else {
        shippingForm.style.display = 'none';
    }
}

//add to shipping 

async function shipOrder(orderId) {
    const addressId = `shippingAddress_${orderId}`;
    const address = document.getElementById(addressId).value;
    if (address) {
        try {
            const api = 'http://localhost:3000/soa/shipping';
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderId: orderId,
                    address: address
                })
            });
            const data = await res.json();
            console.log(data); 

            const shippingMessage = document.createElement('h3');
            shippingMessage.textContent = `Order is shipping to ${address}`;
           alert(data.message);
        } catch (err) {
            console.error(err);
        }
    }
}