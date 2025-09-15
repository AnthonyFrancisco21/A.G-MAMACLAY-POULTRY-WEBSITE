document.addEventListener('DOMContentLoaded', function() {

    loadData();
})


async function loadData(){
    const data = await getProduct()
    console.log(data);
    showProducts(data)
    search();
}

async function getProduct(category = '', name = ''){

    try{
        const fetchdata = await fetch(`getProducts.php?category=${category}&name=${name}`);
        console.log(`This is category ${category} and the search ${name} `)
        const jsondata = await fetchdata.json();
        return jsondata['data'];
    }
    catch (error){
        console.error(error);
        return [];
    }

}//getProduct() end

function search() {
    const input = document.getElementById('search-item');

    document.querySelector('.search_btn').addEventListener('click', async function() {
        const name = input.value.trim();

        // fetch only with search term
        const data = await getProduct('', name);

        // show results
        showProducts(data);
    });
}



async function showProducts(data) {
    const container = document.querySelector(".item-card-wrap");
    container.innerHTML = ""; 
    

    if (!data || data.length === 0) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.innerHTML = `
            <img src="assets/check.png" class="item-img" alt="No product available">
            <p class="item_name">No Item Found.</p>
            
        `;
        container.appendChild(itemDiv);
        return; 
    }

   
    data.forEach((product) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        itemDiv.innerHTML = `
            <img src=" ../AG_MAMACLAY_DASHBOARD/backend/${product.image_path}" class="item-img" alt="${product.product_name}">
            <p class="item_name">${product.product_name}</p>
            <p class="item_description">₱${product.price}</p>
        `;

        container.appendChild(itemDiv);

        

    });//for each end

}
