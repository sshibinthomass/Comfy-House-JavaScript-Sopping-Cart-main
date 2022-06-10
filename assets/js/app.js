/**
 * !=====> : ABOUT AUTHOR : <=====!
 *
 * @author : Md. Samiur Rahman (Mukul)
 * @education : B.Sc. Hons In CSE (SIBACS)
 * @passion : PROGRAMMER & SOFTWARE DEVELOPER
 * @email : sr.mukul9090@gmail.com
 *
 *      </> Happy Coding ☺ </>
 */

// define variable & select elements
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productPrice = document.querySelector(".product-price");
const marquee = document.querySelector(".marquee");
const footIcons = document.querySelector(".foot-icons");
const marqueeProduct = document.querySelector(".marquee-product");
const navbarConst = document.querySelector(".navbar-const");
const productsDOM = document.querySelector(".products-center");
const productsDOM1 = document.querySelector(".products-center1");
const productsDOM2 = document.querySelector(".products-center2");
const productsDOM3 = document.querySelector(".products-center3");
const productsDOM4 = document.querySelector(".products-center4");
const productsDOM5 = document.querySelector(".products-center5");
const productsDOM6 = document.querySelector(".products-center6");
const productsDOM7 = document.querySelector(".products-center7");
const productsDOM8 = document.querySelector(".products-center8");
const productsDOM9 = document.querySelector(".products-center9");
const productsDOM10 = document.querySelector(".products-center10");

// let's cart
let cart = [];
// buttons
let buttonsDOM = [];

// TODO: getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("assets/json/products.json");
      //let result = await fetch(
      //  "https://script.google.com/macros/s/AKfycbwhEHwcHRkWt8AqMDQCC0SQMHzMswaS9IIKYx8hd8P6UXp82FURUVr7DZ1AUlH-jj1r/exec"
      //);

      let data = await result.json();

      let products = data.items;

      products = products.map((item) => {
        const {
          title,
          orgPrice,
          price,
          ava,
          size,
          transit,
          water,
          sun,
          common,
          category,
          mother,
          hanging,
          combo,
          indoor,
          restock,
        } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;

        return {
          title,
          orgPrice,
          price,
          ava,
          id,
          image,
          size,
          transit,
          water,
          sun,
          common,
          category,
          mother,
          hanging,
          combo,
          indoor,
          restock,
        };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// TODO: display products
class UI {
  //All Plants
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      if (
        product.ava == 1
        //&& product.category=="succulents"
      ) {
        result += `
      <!-- single product start -->
        <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />`;
        if (product.orgPrice > product.price) {
          result += `             <div class="offer_badge">
              <h3>  <span class="badge badge-pill badge-warning">On Offer</span> </h3>
              </div>`;
        }
        if (product.mother == 1) {
          result += `             <div class="mother_badge">
              <h3>  <span class="badge badge-pill badge-primary">Mother Plant</span> </h3>
              </div>`;
        }
        if (product.restock == 1) {
          result += `             <div class="restock_badge">
              <h3>  <span class="badge badge-pill ">New/Restocked</span> </h3>
              </div>`;
        }
        result += `             <div class="category_badge">
            <h3>  <span class="badge badge-pill"  >${product.category}</span> </h3>
            </div>`;
        if (product.combo == 1) {
          result += `             <div class="category_badge">
              <h3>  <span class="badge badge-pill"  >Combo</span> </h3>
              </div>`;
        }

        result += `</div>
          <div class="d-flex justify-content-center">
          <!-- Button trigger modal -->
          <button type="button"           id="${product.id}"
          value="${product.id}" class="btn btn-link p-0" data-toggle="modal" data-target="#exampleModal${product.id}">
          ${product.id}. ${product.title}
          </button>
          </div>
          
          <!-- Modal -->
          <div class="modal fade" id="exampleModal${product.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header p-0 ml-3 pt-2">
          <h4 class="modal-title text-center" id="exampleModalLabel">
          <strong>${product.id}. ${product.title} </strong>
        </h4>
          <button type="button" class="close  mr-2" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

            <p class="card-text">
              <div class="text-center m-0 p-0" >
                <img
                class="img-fluid"
                style="border-radius: 5%;"
                alt="Responsive image"
                src=${product.image}
                width="200px"
              />
              
              </div>

            </p>
            <table class="table table-hover mt-3">
              <tbody>
              <tr >
                  <td class="py-1">Category</td>
                  <td class="py-1">: ${product.category}</td>
              </tr>
              <tr>
                  <td class="py-1">Transit risk</td>
                  <td class="py-1">: ${product.transit}</td>
              </tr>
              <tr>
                  <td class="py-1">Size</td>
                  <td class="py-1">: ${product.size} Inches </td>
              </tr>
        
              
              <tr>
                  <td class="py-1">Price</td>`;
        if (product.orgPrice > product.price) {
          result += ` <td class="py-1">: <strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}`;
        } else {
          result += `<td class="py-1">:  ₹ ${product.price}`;
        }

        result += `       
                  </td>
              </tr>
          
              <tr>
                  <td class="py-1">Watering</td>
                  <td class="py-1">: ${product.water}</td>
              </tr>
              <tr>
                  <td class="py-1">Sunlight</td>
                  <td class="py-1">: ${product.sun}</td>
              </tr>
              <tr>
              <td class="py-1">Indoor</td>`;
        if (product.indoor == 0) {
          result += `<td class="py-1">: No</td>`;
        } else {
          result += `<td class="py-1">: Yes</td>`;
        }

        result += `</tr>
              </tbody>
            </table>  
            <tr>
            <td>
              <div class="d-flex justify-content-around pt-0" style="color: black;">
              <a href="https://api.whatsapp.com/send?phone=%2B917904050237" target="_blank" class="fab fa-whatsapp-square pt-1"></a>            
              <a href="https://facebook.com/rosaryplanthouse" target="_blank" class="fab fa-facebook pt-1"></a>
              <a href="https://youtube.com/channel/UCUYHYgkyhoVXy5_h8a5ly6w" target="_blank" class="fab fa-youtube pt-1"></a>
              <a href="https://instagram.com/rosary_plant_house?igshid=ksp4zz9pj5lu" target="_blank" class="fab fa-instagram pt-1" style="color: rgb(97, 64, 64);"></a>
           
            </div>
            </td>
          </tr>                    
            <div class="modal-footer py-1 ">
            <div  >
                <button type="button" class="btn btn-outline-danger btn-sm mr-2" data-dismiss="modal">Close</button>
                <button type="button" data-dismiss="modal" class="bag-btn1 btn btn-outline-success btn-sm py-1 ml-2"  data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
            </div>
            </div>
          </div>
        </div>

          </div>`;
        if (product.orgPrice > product.price) {
          result += ` <h4 class="mt-0">Price:<strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}</h4>`;
        } else {
          result += ` <h4 class="mt-0">Price: ₹ ${product.price}</h4>`;
        }
        result += `<h5 class="mt-0">Transit Risk:  ${product.transit}</h5>
          <div class="d-flex justify-content-center">
          <button type="button" class="bag-btn1 btn btn-outline-success btn-sm" data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
          </div>
        </article>
        <!-- single product end -->`;
      }
    });
    try {
      // console.log(result);
      productsDOM.innerHTML = result;
    } catch (e) {
      console.log("Error = " + e);
    }
  }
  //1_lowRisk
  lowRisk_1(products) {
    let result = "";
    products.forEach((product) => {
      if (product.ava == 1 && product.transit == "Low") {
        result += `
      <!-- single product start -->
        <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />`;
        if (product.orgPrice > product.price) {
          result += `             <div class="offer_badge">
              <h3>  <span class="badge badge-pill badge-warning">On Offer</span> </h3>
              </div>`;
        }
        if (product.mother == 1) {
          result += `             <div class="mother_badge">
              <h3>  <span class="badge badge-pill badge-primary">Mother Plant</span> </h3>
              </div>`;
        }
        if (product.restock == 1) {
          result += `             <div class="restock_badge">
              <h3>  <span class="badge badge-pill ">New/Restocked</span> </h3>
              </div>`;
        }
        result += `             <div class="category_badge">
            <h3>  <span class="badge badge-pill"  >${product.category}</span> </h3>
            </div>`;
        if (product.combo == 1) {
          result += `             <div class="category_badge">
              <h3>  <span class="badge badge-pill"  >Combo</span> </h3>
              </div>`;
        }

        result += `</div>
          <div class="d-flex justify-content-center">
          <!-- Button trigger modal -->
          <button type="button"           id="${product.id}"
          value="${product.id}" class="btn btn-link p-0" data-toggle="modal" data-target="#exampleModal${product.id}">
          ${product.id}. ${product.title}
          </button>
          </div>
          
          <!-- Modal -->
          <div class="modal fade" id="exampleModal${product.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header p-0 ml-3 pt-2">
          <h4 class="modal-title text-center" id="exampleModalLabel">
          <strong>${product.id}. ${product.title} </strong>
        </h4>
          <button type="button" class="close  mr-2" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

            <p class="card-text">
              <div class="text-center m-0 p-0" >
                <img
                class="img-fluid"
                style="border-radius: 5%;"
                alt="Responsive image"
                src=${product.image}
                width="200px"
              />
              
              </div>

            </p>
            <table class="table table-hover mt-3">
              <tbody>
              <tr >
                  <td class="py-1">Category</td>
                  <td class="py-1">: ${product.category}</td>
              </tr>
              <tr>
                  <td class="py-1">Transit risk</td>
                  <td class="py-1">: ${product.transit}</td>
              </tr>
              <tr>
                  <td class="py-1">Size</td>
                  <td class="py-1">: ${product.size} Inches </td>
              </tr>
        
              
              <tr>
                  <td class="py-1">Price</td>`;
        if (product.orgPrice > product.price) {
          result += ` <td class="py-1">: <strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}`;
        } else {
          result += `<td class="py-1">:  ₹ ${product.price}`;
        }

        result += `       
                  </td>
              </tr>
          
              <tr>
                  <td class="py-1">Watering</td>
                  <td class="py-1">: ${product.water}</td>
              </tr>
              <tr>
                  <td class="py-1">Sunlight</td>
                  <td class="py-1">: ${product.sun}</td>
              </tr>
              <tr>
              <td class="py-1">Indoor</td>`;
        if (product.indoor == 0) {
          result += `<td class="py-1">: No</td>`;
        } else {
          result += `<td class="py-1">: Yes</td>`;
        }

        result += `</tr>
              </tbody>
            </table>  
            <tr>
            <td>
              <div class="d-flex justify-content-around pt-0" style="color: black;">
              <a href="https://api.whatsapp.com/send?phone=%2B917904050237" target="_blank" class="fab fa-whatsapp-square pt-1"></a>            
              <a href="https://facebook.com/rosaryplanthouse" target="_blank" class="fab fa-facebook pt-1"></a>
              <a href="https://youtube.com/channel/UCUYHYgkyhoVXy5_h8a5ly6w" target="_blank" class="fab fa-youtube pt-1"></a>
              <a href="https://instagram.com/rosary_plant_house?igshid=ksp4zz9pj5lu" target="_blank" class="fab fa-instagram pt-1" style="color: rgb(97, 64, 64);"></a>
           
            </div>
            </td>
          </tr>                    
            <div class="modal-footer py-1 ">
            <div  >
                <button type="button" class="btn btn-outline-danger btn-sm mr-2" data-dismiss="modal">Close</button>
                <button type="button" data-dismiss="modal" class="bag-btn1 btn btn-outline-success btn-sm py-1 ml-2"  data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
            </div>
            </div>
          </div>
        </div>

          </div>`;
        if (product.orgPrice > product.price) {
          result += ` <h4 class="mt-0">Price:<strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}</h4>`;
        } else {
          result += ` <h4 class="mt-0">Price: ₹ ${product.price}</h4>`;
        }
        result += `<h5 class="mt-0">Transit Risk:  ${product.transit}</h5>
          <div class="d-flex justify-content-center">
          <button type="button" class="bag-btn1 btn btn-outline-success btn-sm" data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
          </div>
        </article>
        <!-- single product end -->`;
      }
    });
    try {
      // console.log(result);
      productsDOM1.innerHTML = result;
    } catch (e) {
      console.log("Error = " + e);
    }
  }
  //2_Moderate
  moderateRisk_2(products) {
    let result = "";
    products.forEach((product) => {
      if (product.ava == 1 && product.transit == "Moderate") {
        result += `
      <!-- single product start -->
        <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />`;
        if (product.orgPrice > product.price) {
          result += `             <div class="offer_badge">
              <h3>  <span class="badge badge-pill badge-warning">On Offer</span> </h3>
              </div>`;
        }
        if (product.mother == 1) {
          result += `             <div class="mother_badge">
              <h3>  <span class="badge badge-pill badge-primary">Mother Plant</span> </h3>
              </div>`;
        }
        if (product.restock == 1) {
          result += `             <div class="restock_badge">
              <h3>  <span class="badge badge-pill ">New/Restocked</span> </h3>
              </div>`;
        }
        result += `             <div class="category_badge">
            <h3>  <span class="badge badge-pill"  >${product.category}</span> </h3>
            </div>`;
        if (product.combo == 1) {
          result += `             <div class="category_badge">
              <h3>  <span class="badge badge-pill"  >Combo</span> </h3>
              </div>`;
        }

        result += `</div>
          <div class="d-flex justify-content-center">
          <!-- Button trigger modal -->
          <button type="button"           id="${product.id}"
          value="${product.id}" class="btn btn-link p-0" data-toggle="modal" data-target="#exampleModal${product.id}">
          ${product.id}. ${product.title}
          </button>
          </div>
          
          <!-- Modal -->
          <div class="modal fade" id="exampleModal${product.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header p-0 ml-3 pt-2">
          <h4 class="modal-title text-center" id="exampleModalLabel">
          <strong>${product.id}. ${product.title} </strong>
        </h4>
          <button type="button" class="close  mr-2" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

            <p class="card-text">
              <div class="text-center m-0 p-0" >
                <img
                class="img-fluid"
                style="border-radius: 5%;"
                alt="Responsive image"
                src=${product.image}
                width="200px"
              />
              
              </div>

            </p>
            <table class="table table-hover mt-3">
              <tbody>
              <tr >
                  <td class="py-1">Category</td>
                  <td class="py-1">: ${product.category}</td>
              </tr>
              <tr>
                  <td class="py-1">Transit risk</td>
                  <td class="py-1">: ${product.transit}</td>
              </tr>
              <tr>
                  <td class="py-1">Size</td>
                  <td class="py-1">: ${product.size} Inches </td>
              </tr>
        
              
              <tr>
                  <td class="py-1">Price</td>`;
        if (product.orgPrice > product.price) {
          result += ` <td class="py-1">: <strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}`;
        } else {
          result += `<td class="py-1">:  ₹ ${product.price}`;
        }

        result += `       
                  </td>
              </tr>
          
              <tr>
                  <td class="py-1">Watering</td>
                  <td class="py-1">: ${product.water}</td>
              </tr>
              <tr>
                  <td class="py-1">Sunlight</td>
                  <td class="py-1">: ${product.sun}</td>
              </tr>
              <tr>
              <td class="py-1">Indoor</td>`;
        if (product.indoor == 0) {
          result += `<td class="py-1">: No</td>`;
        } else {
          result += `<td class="py-1">: Yes</td>`;
        }

        result += `</tr>
              </tbody>
            </table>  
            <tr>
            <td>
              <div class="d-flex justify-content-around pt-0" style="color: black;">
              <a href="https://api.whatsapp.com/send?phone=%2B917904050237" target="_blank" class="fab fa-whatsapp-square pt-1"></a>            
              <a href="https://facebook.com/rosaryplanthouse" target="_blank" class="fab fa-facebook pt-1"></a>
              <a href="https://youtube.com/channel/UCUYHYgkyhoVXy5_h8a5ly6w" target="_blank" class="fab fa-youtube pt-1"></a>
              <a href="https://instagram.com/rosary_plant_house?igshid=ksp4zz9pj5lu" target="_blank" class="fab fa-instagram pt-1" style="color: rgb(97, 64, 64);"></a>
           
            </div>
            </td>
          </tr>                    
            <div class="modal-footer py-1 ">
            <div  >
                <button type="button" class="btn btn-outline-danger btn-sm mr-2" data-dismiss="modal">Close</button>
                <button type="button" data-dismiss="modal" class="bag-btn1 btn btn-outline-success btn-sm py-1 ml-2"  data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
            </div>
            </div>
          </div>
        </div>

          </div>`;
        if (product.orgPrice > product.price) {
          result += ` <h4 class="mt-0">Price:<strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}</h4>`;
        } else {
          result += ` <h4 class="mt-0">Price: ₹ ${product.price}</h4>`;
        }
        result += `<h5 class="mt-0">Transit Risk:  ${product.transit}</h5>
          <div class="d-flex justify-content-center">
          <button type="button" class="bag-btn1 btn btn-outline-success btn-sm" data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
          </div>
        </article>
        <!-- single product end -->`;
      }
    });
    try {
      // console.log(result);
      productsDOM2.innerHTML = result;
    } catch (e) {
      console.log("Error = " + e);
    }
  }
  //3_High
  highRisk_3(products) {
    let result = "";
    products.forEach((product) => {
      if (product.ava == 1 && product.transit == "High") {
        result += `
        <!-- single product start -->
          <article class="product">
            <div class="img-container">
              <img
                src=${product.image}
                alt="product"
                class="product-img"
              />`;
        if (product.orgPrice > product.price) {
          result += `             <div class="offer_badge">
                <h3>  <span class="badge badge-pill badge-warning">On Offer</span> </h3>
                </div>`;
        }
        if (product.mother == 1) {
          result += `             <div class="mother_badge">
                <h3>  <span class="badge badge-pill badge-primary">Mother Plant</span> </h3>
                </div>`;
        }
        if (product.restock == 1) {
          result += `             <div class="restock_badge">
                <h3>  <span class="badge badge-pill ">New/Restocked</span> </h3>
                </div>`;
        }
        result += `             <div class="category_badge">
              <h3>  <span class="badge badge-pill"  >${product.category}</span> </h3>
              </div>`;
        if (product.combo == 1) {
          result += `             <div class="category_badge">
                <h3>  <span class="badge badge-pill"  >Combo</span> </h3>
                </div>`;
        }

        result += `</div>
            <div class="d-flex justify-content-center">
            <!-- Button trigger modal -->
            <button type="button"           id="${product.id}"
            value="${product.id}" class="btn btn-link p-0" data-toggle="modal" data-target="#exampleModal${product.id}">
            ${product.id}. ${product.title}
            </button>
            </div>
            
            <!-- Modal -->
            <div class="modal fade" id="exampleModal${product.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header p-0 ml-3 pt-2">
            <h4 class="modal-title text-center" id="exampleModalLabel">
            <strong>${product.id}. ${product.title} </strong>
          </h4>
            <button type="button" class="close  mr-2" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  
              <p class="card-text">
                <div class="text-center m-0 p-0" >
                  <img
                  class="img-fluid"
                  style="border-radius: 5%;"
                  alt="Responsive image"
                  src=${product.image}
                  width="200px"
                />
                
                </div>
  
              </p>
              <table class="table table-hover mt-3">
                <tbody>
                <tr >
                    <td class="py-1">Category</td>
                    <td class="py-1">: ${product.category}</td>
                </tr>
                <tr>
                    <td class="py-1">Transit risk</td>
                    <td class="py-1">: ${product.transit}</td>
                </tr>
                <tr>
                    <td class="py-1">Size</td>
                    <td class="py-1">: ${product.size} Inches </td>
                </tr>
          
                
                <tr>
                    <td class="py-1">Price</td>`;
        if (product.orgPrice > product.price) {
          result += ` <td class="py-1">: <strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}`;
        } else {
          result += `<td class="py-1">:  ₹ ${product.price}`;
        }

        result += `       
                    </td>
                </tr>
            
                <tr>
                    <td class="py-1">Watering</td>
                    <td class="py-1">: ${product.water}</td>
                </tr>
                <tr>
                    <td class="py-1">Sunlight</td>
                    <td class="py-1">: ${product.sun}</td>
                </tr>
                <tr>
                <td class="py-1">Indoor</td>`;
        if (product.indoor == 0) {
          result += `<td class="py-1">: No</td>`;
        } else {
          result += `<td class="py-1">: Yes</td>`;
        }

        result += `</tr>
                </tbody>
              </table>  
              <tr>
              <td>
                <div class="d-flex justify-content-around pt-0" style="color: black;">
                <a href="https://api.whatsapp.com/send?phone=%2B917904050237" target="_blank" class="fab fa-whatsapp-square pt-1"></a>            
                <a href="https://facebook.com/rosaryplanthouse" target="_blank" class="fab fa-facebook pt-1"></a>
                <a href="https://youtube.com/channel/UCUYHYgkyhoVXy5_h8a5ly6w" target="_blank" class="fab fa-youtube pt-1"></a>
                <a href="https://instagram.com/rosary_plant_house?igshid=ksp4zz9pj5lu" target="_blank" class="fab fa-instagram pt-1" style="color: rgb(97, 64, 64);"></a>
             
              </div>
              </td>
            </tr>                    
              <div class="modal-footer py-1 ">
              <div  >
                  <button type="button" class="btn btn-outline-danger btn-sm mr-2" data-dismiss="modal">Close</button>
                  <button type="button" data-dismiss="modal" class="bag-btn1 btn btn-outline-success btn-sm py-1 ml-2"  data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
              </div>
              </div>
            </div>
          </div>
  
            </div>`;
        if (product.orgPrice > product.price) {
          result += ` <h4 class="mt-0">Price:<strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}</h4>`;
        } else {
          result += ` <h4 class="mt-0">Price: ₹ ${product.price}</h4>`;
        }
        result += `<h5 class="mt-0">Transit Risk:  ${product.transit}</h5>
            <div class="d-flex justify-content-center">
            <button type="button" class="bag-btn1 btn btn-outline-success btn-sm" data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
            </div>
          </article>
          <!-- single product end -->`;
      }
    });
    try {
      // console.log(result);
      productsDOM3.innerHTML = result;
    } catch (e) {
      console.log("Error = " + e);
    }
  }
    //3_High
    lowAndModerate_4(products) {
      let result = "";
      products.forEach((product) => {
        if (product.ava == 1 && (product.transit == "Low"||product.transit == "Moderate")) {
          result += `
          <!-- single product start -->
            <article class="product">
              <div class="img-container">
                <img
                  src=${product.image}
                  alt="product"
                  class="product-img"
                />`;
          if (product.orgPrice > product.price) {
            result += `             <div class="offer_badge">
                  <h3>  <span class="badge badge-pill badge-warning">On Offer</span> </h3>
                  </div>`;
          }
          if (product.mother == 1) {
            result += `             <div class="mother_badge">
                  <h3>  <span class="badge badge-pill badge-primary">Mother Plant</span> </h3>
                  </div>`;
          }
          if (product.restock == 1) {
            result += `             <div class="restock_badge">
                  <h3>  <span class="badge badge-pill ">New/Restocked</span> </h3>
                  </div>`;
          }
          result += `             <div class="category_badge">
                <h3>  <span class="badge badge-pill"  >${product.category}</span> </h3>
                </div>`;
          if (product.combo == 1) {
            result += `             <div class="category_badge">
                  <h3>  <span class="badge badge-pill"  >Combo</span> </h3>
                  </div>`;
          }
  
          result += `</div>
              <div class="d-flex justify-content-center">
              <!-- Button trigger modal -->
              <button type="button"           id="${product.id}"
              value="${product.id}" class="btn btn-link p-0" data-toggle="modal" data-target="#exampleModal${product.id}">
              ${product.id}. ${product.title}
              </button>
              </div>
              
              <!-- Modal -->
              <div class="modal fade" id="exampleModal${product.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header p-0 ml-3 pt-2">
              <h4 class="modal-title text-center" id="exampleModalLabel">
              <strong>${product.id}. ${product.title} </strong>
            </h4>
              <button type="button" class="close  mr-2" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
    
                <p class="card-text">
                  <div class="text-center m-0 p-0" >
                    <img
                    class="img-fluid"
                    style="border-radius: 5%;"
                    alt="Responsive image"
                    src=${product.image}
                    width="200px"
                  />
                  
                  </div>
    
                </p>
                <table class="table table-hover mt-3">
                  <tbody>
                  <tr >
                      <td class="py-1">Category</td>
                      <td class="py-1">: ${product.category}</td>
                  </tr>
                  <tr>
                      <td class="py-1">Transit risk</td>
                      <td class="py-1">: ${product.transit}</td>
                  </tr>
                  <tr>
                      <td class="py-1">Size</td>
                      <td class="py-1">: ${product.size} Inches </td>
                  </tr>
            
                  
                  <tr>
                      <td class="py-1">Price</td>`;
          if (product.orgPrice > product.price) {
            result += ` <td class="py-1">: <strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}`;
          } else {
            result += `<td class="py-1">:  ₹ ${product.price}`;
          }
  
          result += `       
                      </td>
                  </tr>
              
                  <tr>
                      <td class="py-1">Watering</td>
                      <td class="py-1">: ${product.water}</td>
                  </tr>
                  <tr>
                      <td class="py-1">Sunlight</td>
                      <td class="py-1">: ${product.sun}</td>
                  </tr>
                  <tr>
                  <td class="py-1">Indoor</td>`;
          if (product.indoor == 0) {
            result += `<td class="py-1">: No</td>`;
          } else {
            result += `<td class="py-1">: Yes</td>`;
          }
  
          result += `</tr>
                  </tbody>
                </table>  
                <tr>
                <td>
                  <div class="d-flex justify-content-around pt-0" style="color: black;">
                  <a href="https://api.whatsapp.com/send?phone=%2B917904050237" target="_blank" class="fab fa-whatsapp-square pt-1"></a>            
                  <a href="https://facebook.com/rosaryplanthouse" target="_blank" class="fab fa-facebook pt-1"></a>
                  <a href="https://youtube.com/channel/UCUYHYgkyhoVXy5_h8a5ly6w" target="_blank" class="fab fa-youtube pt-1"></a>
                  <a href="https://instagram.com/rosary_plant_house?igshid=ksp4zz9pj5lu" target="_blank" class="fab fa-instagram pt-1" style="color: rgb(97, 64, 64);"></a>
               
                </div>
                </td>
              </tr>                    
                <div class="modal-footer py-1 ">
                <div  >
                    <button type="button" class="btn btn-outline-danger btn-sm mr-2" data-dismiss="modal">Close</button>
                    <button type="button" data-dismiss="modal" class="bag-btn1 btn btn-outline-success btn-sm py-1 ml-2"  data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
                </div>
                </div>
              </div>
            </div>
    
              </div>`;
          if (product.orgPrice > product.price) {
            result += ` <h4 class="mt-0">Price:<strike> ₹ ${product.orgPrice}</strike> ₹ ${product.price}</h4>`;
          } else {
            result += ` <h4 class="mt-0">Price: ₹ ${product.price}</h4>`;
          }
          result += `<h5 class="mt-0">Transit Risk:  ${product.transit}</h5>
              <div class="d-flex justify-content-center">
              <button type="button" class="bag-btn1 btn btn-outline-success btn-sm" data-id=${product.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
              </div>
            </article>
            <!-- single product end -->`;
        }
      });
      try {
        // console.log(result);
        productsDOM4.innerHTML = result;
      } catch (e) {
        console.log("Error = " + e);
      }
    }

  getBagButtons() {
    // bag buttons
    const buttons = [...document.querySelectorAll(".bag-btn1")];
    // console.log(buttons);

    buttonsDOM = buttons;

    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);

      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      } else {
        button.addEventListener("click", (event) => {
          event.target.innerText = "In Cart";
          event.target.disabled = true;

          // *get product from products
          let cartItem = { ...Storage.getProduct(id), amount: 1 };
          // console.log(cartItem);

          // *add product to the cart
          cart = [...cart, cartItem];
          // console.log(cart);

          // *save cart in local storage
          Storage.saveCart(cart);
          //console.log(cart);

          // *set cart values
          this.setCartValues(cart);

          // *display cart item
          this.addCartItem(cartItem);

          // *show the cart
          this.showCart();
        });
      }
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
    //console.log(cartTotal, cartItems);
  }

  // add item to cart
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `<img src=${item.image} alt="product" />

            <div>
            <div class="mb-0">
              <h4>${item.id}. ${item.title}</h4>
              </div>
              <h4>Price : ₹ ${item.price}</h4>
              <span class="remove-item" onClick="window.location.reload()" data-id=${item.id}>Remove item</span>
            </div>

            <div>
              <i class="fa fa-plus" aria-hidden="true" data-id=${item.id}></i>
              <p class="item-amount mb-0">${item.amount}</p>
              <i class="fa fa-minus" aria-hidden="true" data-id=${item.id}></i>
            </div>`;

    cartContent.appendChild(div);
    // console.log(cartContent);
  }
  // ? showCart() & hideCart() Method
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }
  // ? setup app
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    //console.log(cart)
    // cart show / hide button
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  // TODO: cart logic functionality
  cartLogic() {
    // clear cart button
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });

    // cart functionality
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild;
        removeItem.parentElement.parentElement;
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-plus")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-minus")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;

        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild;
          location.reload();
          lowerAmount.parentElement.parentElement;
          this.removeItem(id);
        }
      }
    });
  }

  clearCart() {
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    localStorage.removeItem("cart");
    cart = Storage.getCart();
    //setCartValues(cart);
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    //console.log(cartContent.children);
    //console.log("hi");

    this.hideCart();
    location.reload();
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);

    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
  }
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

// TODO: local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  // getProduct() method
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  // ? save cart item local storage
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ? get cart item local storage
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

// add event listener
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // setup app
  ui.setupAPP();
  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      ui.lowRisk_1(products);
      ui.moderateRisk_2(products);
      ui.highRisk_3(products);
      ui.lowAndModerate_4(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
});

function getBilling(cart) {
  //var text="";
  let tempTotal = 0;
  let itemsTotal = 0;
  const val = [];

  cart.map((item) => {
    val.push(
      item.id + ". " + item.title + "- ₹",
      item.price +
        " * " +
        item.amount +
        " = ₹" +
        item.price * item.amount +
        " %0a "
    );
  });

  //console.log(tempTotal, itemsTotal);
  return val.join("");
}

function myFunction() {
  cart = Storage.getCart();

  let priceTotal = 0;
  let itemsTotal = 0;

  cart.map((item) => {
    priceTotal += item.price * item.amount;
    itemsTotal += item.amount;
  });

  var finalText =
    "*Total Plants= " +
    itemsTotal +
    "*%0a*Total Price=₹" +
    priceTotal +
    "*%2Bdelivery%0a%0a";

  //console.log(cart);
  const productText = getBilling(cart);
  //console.log(productText);
  var linkText =
    "https://api.whatsapp.com/send?phone=%2B917904050237&text=*Hello, i have chosen the following plants from your site* %0a";
  window.open(linkText.concat(productText, finalText), "_blank");
}

//marquee
{
  const div = document.createElement("div");
  div.classList.add("marquee");

  div.innerHTML = `<marquee behavior="scroll" direction="left" style="background-color: rgba(255, 255, 0, 0.589);">Please click<strong> Place order</strong> after selecting the plans.</marquee>`;

  cartContent.appendChild(div);
  // console.log(cartContent);
}
//Foot icons
{
  const div = document.createElement("div");
  div.classList.add("foot-icons");

  div.innerHTML = `
  <a href="#" class="fas fa-arrow-alt-circle-up pt-1" style="position: fixed; bottom:20px; right: 10px; "></a>
  <a href="https://api.whatsapp.com/send?phone=%2B917904050237" target="_blank" class="fab fa-whatsapp-square pt-1" style="position: fixed; bottom: 50px; right: 10px; "></a>
  <a href="https://facebook.com/rosaryplanthouse" target="_blank" class="fab fa-facebook pt-1" style="position: fixed; bottom: 80px; right: 10px; "></a>
  <a href="https://instagram.com/rosary_plant_house?igshid=ksp4zz9pj5lu" target="_blank" class="fab fa-instagram pt-1" style="position: fixed; bottom: 110px; right: 10px; "></a>
  <a href="https://youtube.com/channel/UCUYHYgkyhoVXy5_h8a5ly6w" target="_blank" class="fab fa-youtube pt-1" style="position: fixed; bottom: 140px; right: 10px; "></a>
`;

  footIcons.appendChild(div);
  // console.log(cartContent);
}
//Marquee Product
{
  const div = document.createElement("div");
  div.classList.add("marquee-product");

  div.innerHTML = `     <marquee behavior="scroll" direction="left" style="background-color: rgba(91, 91, 59, 0.229);">Please click<strong> Add to Cart </strong> to select a plant and Click on the <strong>Plant Name</strong> to see more details of the plants.</marquee>
  `;

  marqueeProduct.appendChild(div);
  // console.log(cartContent);
}

