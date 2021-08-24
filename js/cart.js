function deleteItem() {
    let parent = this.parentNode;
    parent.remove()
    updateTotal();
}

function setChange(e) {
    let input = e.target;
    if(isNaN(input.value) || input.value <= 0) input.value = 0
    updateTotal()
}

function addToCart(imgSrc,name,price) {
    let cart_items = document.querySelector('.cart_items') 

        //si el item ya está en el carro
        let cartNames = cart_items.querySelectorAll('.cart_item_name')
        for (let i = 0; i < cartNames.length; i++) {
            if(cartNames[i].innerText === name){
                alert("It's already in the cart this item")
                return //we dont need anymore the code below
            }
        }
    let cart_item = document.createElement('div')   
    cart_item.classList.add('cart_item')
    let row = `
        <div class="cart_item_img_container">
            <img src="${imgSrc}" alt="${name}" class="cart_item_img">
        </div>
        <h3 class="cart_item_name">${name}</h3>
        <div class="cart_item_actions">
            <i class="fas fa-minus-square"></i>
            <input type="text" class="quantity" value="1">
            <i class="fas fa-plus-square"></i>
        </div>
        <h3 class="cart_item_price">${price}</h3>
        <button class="btn btn-delete"><i class="fas fa-trash"></i></button>`;
    cart_item.innerHTML = row
    cart_items.append(cart_item)

    /*3ro ahora  acciones de borrar el item y quantity */
    cart_item.querySelector('.btn.btn-delete').addEventListener('click', deleteItem)
    cart_item.querySelector('.quantity').addEventListener('change', setChange)        
    cart_item.querySelector('.fa-plus-square').addEventListener('click', ()=>{
        let currVal = +cart_item.querySelector('.quantity').value;
        cart_item.querySelector('.quantity').value = currVal + 1;
        updateTotal()
    })
    cart_item.querySelector('.fa-minus-square').addEventListener('click', ()=>{
        let currVal = +cart_item.querySelector('.quantity').value;
        if(currVal <= 1) cart_item.querySelector('.quantity').value = 1;
        else{
            cart_item.querySelector('.quantity').value = currVal - 1;
            updateTotal()
        }
    })
}
function updateTotal() {
    let cart_items = document.querySelector('.cart_items');
    let cart_item = cart_items.querySelectorAll('.cart_item');
    let total = 0;
    for (let i = 0; i < cart_item.length; i++) {
        let elementPrice = parseFloat(cart_item[i].querySelector('.cart_item_price').innerText.replace('$',''));
        let elementQuantity = cart_item[i].querySelector('.quantity').value;

        total = total + (elementPrice * elementQuantity)
    }
    total = total.toFixed(2)
    document.querySelector('.total_amount').innerHTML = `$${total}`
}

function getInfo() {
    let parent = this.parentNode.parentNode.parentNode
    let imgSrc = parent.querySelector('.card_img').src
    let name = parent.querySelector('.card_body_title').innerText
    let price = parent.querySelector('.card_price').innerText

    addToCart(imgSrc,name,price)
    updateTotal()
}

function ready() {
    let addBtns = document.querySelectorAll('.btn.add_to_cart')
    console.log(addBtns) //cuando agrego la paginacion solo chapa 4 botones x eso el resto no se agrega
    addBtns.forEach(addBtn => {
        addBtn.addEventListener('click', getInfo)
    })
}

setTimeout(ready,1000);
