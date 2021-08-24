// javascript for index.html
// https://www.npmjs.com/package/json-server
// en el terminal
//json server
// terminal: npm i json-server
// json-server --watch data/db.json --port 8000
//si no se coloca el port por defecto va a ser 3000

let gridBike = document.querySelector('.grid.bike')
let gridMotorbike = document.querySelector('.grid.motorbike')
let bikes_keyword  = 'bikes'
let motorbikes_keyword  = 'motorbikes'

function displayProducts(resource,type) {
    let output = '';
    for (let i = 0; i < resource.length; i++) {
        const card= resource[i];
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
    if(type === 'bikes'){
        gridBike.innerHTML = output;
    }
    else{
        gridMotorbike.innerHTML = output;
    }
}

async function getProducts(type) {
   try {
       let res = await fetch(`http://localhost:8000/${type}`)
       if(!res.ok){
            // https://stackoverflow.com/questions/33355033/try-catch-not-catching-async-await-errors
            throw new Error(res.statusText);
        }
        else{
            let data = await res.json()
            displayProducts(data, type)
        }
   } catch (error) {
    console.log(err,err.message)
   } 
}

getProducts(bikes_keyword)
getProducts(motorbikes_keyword)
