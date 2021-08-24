const id = new URLSearchParams(window.location.search).get('id')
const ItemName = new URLSearchParams(window.location.search).get('name')
const type = new URLSearchParams(window.location.search).get('type')

const container = document.querySelector('.details')

async function renderDetails(id,type) {
    try {
        const res = await fetch(`http://localhost:8000/${type}/${id}`)
        if(!res.ok){
            throw new Error(res.statusText);
        }
        else{
            let data = await res.json()
            console.log(data)
            let template = `
            <div class="cart_items">
                <div class="card">
                    <div class="card_img_container">
                        <img src="${data.src}" alt="${data.name}" class="card_img card_detail">
                    </div>
                    <div class="card_body">
                        <h4 class="card_body_title">${data.name}</h4>
                        <div>
                            <span class="card_price">$${eval(data.price)}</span>
                            <button class="btn add_to_cart"><i class="fas fa-shopping-cart"></i></button>
                        </div>
                    </div>
                    <p class="card_desc">${data.description.slice(0,200)}...</p>
                </div>
            </div>`;
            container.innerHTML = template
        }
    } catch (err) {
        console.log(err, err.message)
    }
}
window.addEventListener('DOMContentLoaded', ()=>{
    document.title = `Details || ${ItemName}`
    renderDetails(id,type)
});


