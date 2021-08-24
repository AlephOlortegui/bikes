// javascript for index.html
// https://www.npmjs.com/package/json-server
// en el terminal
//json server
// terminal: npm i json-server
// json-server --watch data/db.json --port 8000
//si no se coloca el port por defecto va a ser 3000

let gridBike = document.querySelector('.grid.bike')
let gridMotorbike = document.querySelector('.grid.motorbike')


function displayCards(state) {
    let {data,type} = state
    let output = '';
    for (let i = 0; i < data.length; i++) {
    // for (let i = 0; i < chunkData.length; i++) {
        const card = data[i]; //chunkData[i]; //data[i];
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

function mainFunc(b_state,mb_state) {   
    gridBike.innerHTML = displayCards(b_state);
    gridMotorbike.innerHTML = displayCards(mb_state);
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
