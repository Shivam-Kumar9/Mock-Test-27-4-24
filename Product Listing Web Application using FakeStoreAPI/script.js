let box = document.querySelector("#root");
let selCategory = document.querySelector("#category");
let selPrice = document.querySelector("#priceSelect");
let searInput = document.querySelector("#inputSearch");
let narr = [];
let forSearch = [];  
 
   // search bar 
function searchbtn(){
    let value = searInput.value
    console.log(value);
    
   let result = forSearch.filter((ele,i)=>{

    return ele.title.toLowerCase()=== value.toLowerCase()
   })
   if(result.length>0){
    showData(result)
   }
   else{
    box.innerHTML="<h2>product not found</h2>"
   }
}
 

        // category choosing code 
selCategory.addEventListener("change", function(){
    let choice = selCategory.value;
    console.log(choice);
    getData(`https://fakestoreapi.com/products/category/${choice}`);
});
         

         // price increase and decrease 
selPrice.addEventListener("change", handlePrice);

function handlePrice(){
    let choice = selPrice.value;
    console.log(choice);

     
    arrange(choice, narr);
}
  
function arrange(choice, arr){
    if(choice === "asc"){
        arr.sort((a, b) => {
            return a.price - b.price;
        });
    } else {
        arr.sort((a, b) => {
            return b.price - a.price;
        });
    }
    showData(arr);
}
  
           // data fetch to product page  
let getData = async (url) => {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    narr = data;
    forSearch =data;  
    showData(data);
};
             
            // displaying fetched data to dom 
function showData(arr){
    box.innerHTML = "";
    arr.forEach(ele => {
        let card = document.createElement("div");
        card.innerHTML = `<div id="div-img"><img src="${ele.image}"></div>
                          <h2>${ele.title}</h2>
                          <p>Price : $${ele.price}</p>`;
        box.append(card);
    });
}
              // calling fetch function giving url 
getData('https://fakestoreapi.com/products');
