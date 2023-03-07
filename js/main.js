
const mytotalitem=document.querySelector(".total-item");
const mycart=document.querySelector(".cart");
const cartiteme1=document.querySelector(".carT-items");
let myaddcart=document.querySelectorAll(".add-cart");
let mybadprice=document.querySelectorAll(".bed-price");
let mytotal=document.querySelector(".total");
let mytotalbag=document.querySelector(".total-bag");
let myclearBtn=document.querySelector(".btn");


//show cart
mytotalitem.addEventListener('click',function(){
    mycart.classList.add("show-cart");
});

//close cart
document.querySelector(".close-item").addEventListener('click',function(){
    mycart.classList.remove("show-cart");
});





//render project
const myproduct=document.querySelector(".products .row");
        function renderproduct(){
            products.forEach((product)=>
            myproduct.innerHTML +=`
            <div class="col-lg-3 col-md-6   ">
                <div class="img-item">
                    <img src="${product.image}" alt="" class="img-fluid ">
                    <div class="add-cart d-flex justify-content-center " onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        <p>ADD TO CART</p>
                    </div>
                </div>
                <div class="bed-information">
                    <h5>${product.title}</h5>
                    <p>$<span class="bed-price">${product.price}</span></p>
                </div>
            </div>`
            
            )
    
}
renderproduct();

let cart=JSON.parse(localStorage.getItem("cart")) || [];
console.log(typeof cart);
updata();

//add to cart function
function addToCart(id){
    //check if product already in cart
    if(cart.some((item)=>item.id===id)){
        changeNumberOfUnits('up',id);
    }else{
    const item=products.find((product)=> product.id === id);
    cart.push({
            ...item,
        numberUnits:1,
    });
    }
    console.log(typeof cart)
    updata();

}

//updata function
function updata(){
    putItemInCart()
    totalCost()

    //save items in local storage
    localStorage.setItem("cart",JSON.stringify(cart));
}


//collect total price
function totalCost(){
    let totalprice=0;
    let totalitems=0;

    cart.forEach((item)=>{
        totalprice +=item.price * item.numberUnits;
        totalitems +=item.numberUnits;
    });
    mytotal.textContent=totalprice;
    mytotalbag.textContent=totalitems;

};


//put items in cart
function putItemInCart(){
    cartiteme1.innerHTML=""; //clear
    cart.forEach((item)=>{
        cartiteme1.innerHTML +=`<div class=" d-flex justify-content-between my-3">
                                    <img src=${item.image} alt="product image" class="img-fluid" style="width: 50px;height:50px">
                                    <div>
                                        <h4 >${item.title}</h4>
                                        <h5>$${item.price}</h5>
                                        <span class="remove-item" data-id=${item.id} onclick="removeItem(${item.id})" style="cursor: pointer;">remove</span>
                                    </div>
                                    <div class="units">
                                        <div class="btn-up" onclick="changeNumberOfUnits('up',${item.id})" style="cursor: pointer;"><i class="fas fa-chevron-up"></i></div>
                                        <div class="number">${item.numberUnits}</div>
                                        <div class="btn-down" onclick="changeNumberOfUnits('down',${item.id})"><i class="fas fa-chevron-down" style="cursor: pointer;"></i></div>
                                    </div>
                                </div>
        
        
        `;
    })
}

//remove item from cart
function removeItem(id){
    cart=cart.filter((item)=> item.id !== id);
    updata();
};



//change Number Of Units function
function changeNumberOfUnits(btnName,id){
    cart= cart.map((item)=>{
        let oldnumberUnits=item.numberUnits;
        if(item.id===id){
            if(btnName==='up' && oldnumberUnits<5){
                oldnumberUnits++;
                
            }else if(btnName==='down' && oldnumberUnits>1){
                oldnumberUnits--;
                
            }
        }

        return {
            ...item,
            numberUnits:oldnumberUnits,
        };
    })
    updata()
}















