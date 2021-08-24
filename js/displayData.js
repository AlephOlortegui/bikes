// javascript for index.html
// https://www.npmjs.com/package/json-server
// en el terminal
//json server
// terminal: npm i json-server
// json-server --watch data/db.json --port 8000
//si no se coloca el port por defecto va a ser 3000

let gridBike = document.querySelector('.grid.bike')
let gridMotorbike = document.querySelector('.grid.motorbike')

function displayCards(chunkedData,type) {
    let output = '';
    for (let i = 0; i < chunkedData.length; i++) {
        const card = chunkedData[i];
        output += `
            <div class="card">
                <div class="card_img_container">
                    <img src="${card.src}" alt="${card.name}" class="card_img">
                </div>
                <div class="card_body">
                    <h4 class="card_body_title">${card.name}</h4>
                    <div>
                        <span class="card_price">$${eval(card.price)}</span>
                        <button class="btn add_to_cart"><i class="fas fa-shopping-cart"></i></button>
                    </div>
                </div>
                <div class="card_details_link">
                    <a class="btn details_btn" href="details.html?id=${card.id}&name=${card.name}&type=${type}" role="button">Read more</a>
                </div>
            </div>`;
    }
    return output
}

function pagination(data, page, cards) {
    let trimStart = (page - 1) * cards;
    let trimEnd = trimStart + cards;

    let trimmedData = data.slice(trimStart, trimEnd);
    let pages = Math.round(data.length / cards); // 6/2 = 3 o 4/2 = 2

    return{
        chunkedData: trimmedData,
        pages
    }
}

function mainFunc(b_state,mb_state) {   
    showEach()
    function showEach(){

        let b_pag = pagination(b_state.data,b_state.page,b_state.cards)
        let mb_pag = pagination(mb_state.data,mb_state.page,mb_state.cards)

        gridBike.innerHTML = displayCards(b_pag.chunkedData, b_state.type);
        gridMotorbike.innerHTML = displayCards(mb_pag.chunkedData, mb_state.type);

        let wrappers = document.querySelectorAll('.pagination-wrapper');

        wrappers.forEach((wrapper,idx) => {
            wrapper.innerHTML = '';

            if(idx === 0){
                wrappers[0].innerHTML = `<button class="btn page" data-type="bike"><i class="fas fa-backward"></i></button>
                <button class="btn page" data-type="bike"><i class="fas fa-forward"></i></button>`;
            }
            else{
                wrappers[1].innerHTML = `<button class="btn page" data-type="motorbike"><i class="fas fa-backward"></i></button>
                <button class="btn page" data-type="motorbike"><i class="fas fa-forward"></i></button>`;
            }

            let btns = wrapper.querySelectorAll('.page')

            btns.forEach((btn,i) => {
                btn.addEventListener('click', ()=>{
                    if(btn.dataset.type === 'bike'){
                        let y = b_state.page
                        if(i === 0){
                            y = y - 1
                            if(y < 1){
                                b_state.page = 1
                                btn.disabled = true
                            }
                            else{
                                b_state.page = y
                                showEach()
                            }
                        }
                        else{
                            y = y + 1
                            if(y > b_pag.pages){
                                b_state.page = b_pag.pages
                                btn.disabled = true
                            }
                            else{
                                b_state.page = y
                                showEach()
                            }
                        }
                    }
                    else if(btn.dataset.type === 'motorbike'){
                        let y = mb_state.page
                        if(i === 0){
                            y = y - 1
                            if(y < 1){
                                mb_state.page = 1
                                btn.disabled = true
                            }
                            else{
                                mb_state.page = y
                                showEach()
                            }
                        }
                        else{
                            y = y + 1
                            if(y > mb_pag.pages){
                                mb_state.page = mb_pag.pages
                                btn.disabled = true
                            }
                            else{
                                mb_state.page = y
                                showEach()
                            }
                        } 
                    }
                })
            })
        })
    }
}

async function getProducts() {
   try {
       let b_res = await fetch('http://localhost:8000/bikes')
       let mb_res = await fetch('http://localhost:8000/motorbikes')
       if(!b_res.ok || !mb_res){
            throw new Error('Error has occurred');
        }
        else{
            let b_data = await b_res.json()
            let mb_data = await mb_res.json()
            let b_state = {
                data: b_data,
                page: 1,
                cards:2,
                type: 'bikes'
            }
            let mb_state = {
                data: mb_data,
                page: 1,
                cards:2,
                type: 'motorbikes'
            }
            mainFunc(b_state,mb_state)
        }
   } catch (err) {
    console.log(err,err.message)
   } 
}

getProducts()
