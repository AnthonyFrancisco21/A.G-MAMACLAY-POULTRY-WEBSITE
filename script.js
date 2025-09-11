document.addEventListener('DOMContentLoaded', function (){ 
    loadData();
})

function toggleMenu() {
    const sideBar = document.querySelector(".side-bar");
    const menuIcon = document.querySelector(".menu-svg");
    const closeIcon = document.querySelector(".close-svg");
    const overlayEl = document.querySelector(".overlay");
    
    sideBar.classList.toggle("open");

    if (sideBar.classList.contains("open")) {
        menuIcon.style.display = "none"; 
        closeIcon.style.display = "block"; 
        overlayEl.style.display = "block";

    } else {
        menuIcon.style.display = "block"; 
        closeIcon.style.display = "none"; 
        overlayEl.style.display = "none";
    }
}

function yearScript(){
    const spanText = document.querySelectorAll('.yearCopyRights');
    const year = new Date().getFullYear();
    spanText.forEach((item) => {
        item.textContent = year;
    })

    
    
}

yearScript();

document.addEventListener("DOMContentLoaded", function () {
  let currentPage = window.location.pathname.split("/").pop();

  let pages = {
      "index.html": "home-link",
      "products.html": "products-link",
      "about.html": "about-link",
      "contact.html": "contact-link",
  };

  let sidepage = {
      "index.html": "sidebar-home-link",
      "products.html": "sidebar-products-link",
      "about.html": "sidebar-about-link",
      "contact.html": "sidebar-contact-link",
  };

  if (pages[currentPage] && document.getElementById(pages[currentPage])) {
      document.getElementById(pages[currentPage]).classList.add("current-page");
  }

  if (sidepage[currentPage] && document.getElementById(sidepage[currentPage])) {
      document.getElementById(sidepage[currentPage]).classList.add("current-page-mobile");
  }
}); 

function btnFeedsFunction(){
  const btn = document.getElementById("heroProductBtn");

  window.location.href = "products.html"

}

function locationScroll(){
    const locationSection = document.querySelector(".scroll-pointer");

    locationSection.scrollIntoView({
        behavior: 'smooth'
    });
}


//Home page view items button
function cardBtn(){
    const cardbutton = document.querySelectorAll(".card-button");

    cardbutton.forEach(button => {
        button.addEventListener('click', function(event) {
            
            const cardId = event.target.id;

            

            if(cardId === "feedsCard"){
                window.location.href = "products.html?feeds=true";
            }
            else if(cardId === "supplementCard"){
                window.location.href = "products.html?supplement=true";
            }
            else if(cardId === "farmCard"){
                window.location.href = "products.html?farm=true";
            }
            else if(cardId === "petCard"){
                window.location.href = "products.html?pets=true";
            }
            else{
                alert(`Problem occur, please refresh the page.`);
            }
            
            
        })
    })
};
cardBtn();


//url for the first page view item button
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const feedsUrl = params.get("feeds");
    const supplementUrl = params.get("supplement");
    const farmUrl = params.get("farm");
    const petsUrl = params.get("pets");

    if (feedsUrl === "true") {
        const btn = document.getElementById("feedsCategories");
        if (btn) {
            feedsFunction();
            btn.click();
        }
    }
    else if(supplementUrl === "true"){
        const btn = document.getElementById("supplementCategories");
        if (btn) {
            feedsFunction();
            btn.click();
        }
    }
    else if(farmUrl === "true"){
        const btn = document.getElementById("farmCategories");
        if (btn) {
            feedsFunction();
            btn.click();
        }
    }
    else if (petsUrl === "true"){
        const btn = document.getElementById("petsCategories");
        if (btn) {
            feedsFunction();
            btn.click();
        }
    }

    const newUrl = window.location.pathname; 
    window.history.replaceState({}, document.title, newUrl);

});


//function for PRODUCTS CATEGORIES BUTTON
function feedsFunction(){

    async function handleCategoryClick(){
        const titleItem = document.getElementById("categories-title");
        const buttonText = this.textContent;  
        const category = this.getAttribute('data-category');
        const data = await getProduct(category)  
        showProducts(data)
        //backend code here
    }

    const categoriesPageBtn = document.querySelectorAll(".categories-btn");

    categoriesPageBtn.forEach(button => {
        if(!button.dataset.listenerValue){
            button.addEventListener('click', handleCategoryClick);
            button.dataset.listenerValue = "true";
        }
    });

}

feedsFunction();


async function loadData(){
    const data = await getProduct()
    console.log(data);
    showProducts(data)
}

async function getProduct(category = ''){

    try{
        const fetchdata = await fetch(`getProducts.php?category=${category}`);
        const jsondata = await fetchdata.json();
        return jsondata['data'];
    }
    catch (error){
        console.error(error);
        return [];
    }

}//getProduct() end


async function showProducts(data) {
    const container = document.querySelector(".item-card-wrap");
    container.innerHTML = ""; // Clear previous products
    

    if (!data || data.length === 0) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.innerHTML = `
            <img src="admin-assets/logo.png" class="item-img" alt="No product available">
            <p class="item_name">Wow! Such an empty.</p>
            <p class="item_description">₱0.00</p>
        `;
        container.appendChild(itemDiv);
        return; // so we don't run the forEach on empty array
    }

    //show products in a card
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

