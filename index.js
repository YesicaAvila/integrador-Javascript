const products = document.querySelector(".prendas-container");
const productCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categoria = document.querySelector(".botones");
const listaCateg = document.querySelectorAll(".categoria");
const btnVermas = document.querySelector(".btn-mas");
const btnBuy = document.querySelector(".btn-buy");
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".carrito");
const menuBtn = document.querySelector(".icono-menu");
const carrito = document.querySelector(".cart");
const hamburMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (carritoList) => {
    localStorage.setItem("cart", JSON.stringify(carritoList));
};

const renderProducto = (product) => {
    const {id, name, precio, cardImg} = product;
    return `
    <div class="prendas-1"> 
        <img src="${cardImg}" alt="${name}" class="buzo-1"/> 
        <div class="prendas-1-info"> 
           <h4>${name}</h4> 
           <p>$${precio}</p> 
           <button class="btn-add" data-id="${id}" data-name="${name}" data-precio="${precio}" data-card-img="${cardImg}">Agregar!</button>
        </div> 
    </div>
    `;
};


//mostrar division de productos
const renderDivProd = (index = 0) => {
    products.innerHTML += productControl.dividedProducts[index]
     .map(renderProducto)
     .join("");
         
};
// filtrado:
const renderFiltroProd = (categoria) => {
    const productList = productsIndumentaria.filter((product) => {
        return product.categoria === categoria
    })
    products.innerHTML = productList.map(renderProducto).join("");
};
// mostrar productos filtrados y sin filtrar
const renderProd = (index = 0, categoria = undefined) => {
    if (!categoria) {
        renderDivProd(index);
        return;

    }
    renderFiltroProd(categoria);
};
// Boton ver mas se oculte o se muestre:
const statusBtnVermas = (categoria) => {
    if(!categoria) {
        btnVermas.classList.remove("hidden");
        return;

    }
    btnVermas.classList.add("hidden");
};
// botones activados:
const btnActiveState = (selectedCategoria) => {
    const categoria = [ ...listaCateg];
    categoria.forEach((categoriaBtn) => {
        if (categoriaBtn.dataset.categoria !== selectedCategoria) {
            categoriaBtn.classList.remove("active");
            return;
        }
        categoriaBtn.classList.add("active");
    });
};

const filterState = (e) => {
    const selectedCategoria = e.target.dataset.categoria;
    statusBtnVermas(selectedCategoria);
    btnActiveState(selectedCategoria);

};
// flitrar productos:
const aplicarFilter = (e) => {
    if(!e.target.classList.contains("categoria")) {
        return;
    } else {
        filterState(e);
    }
    if (!e.target.dataset.categoria) {
        products.innerHTML = "";
        renderProd();
    } else {
        renderProd(0, e.target.dataset.categoria);
        productControl.proxIndex = 1;
    }

};
const ultIndex = () => {
    return (
        productControl.proxIndex === productControl.prodLimit
    );
};
// boton de ver mas:
const masProductos = () => {
    renderProd(productControl.proxIndex);
    productControl.proxIndex++;
    if (ultIndex()) {
        btnVermas.classList.add("hidden");
    }
};
// Menu haburguesa
const toggleMenu = () => {
    hamburMenu.classList.toggle("open-menu");
    if (carrito.classList.contains("open-cart")) {
        carrito.classList.remove("open-cart")
        return;
    }
    overlay.classList.toggle("show-overlay");
};

// Carrito:
const toggleCart = () => {
    carrito.classList.toggle("open-cart");
    if (hamburMenu.classList.contains("open-menu")) {
        hamburMenu.classList.remove("open-menu");
        return;
    }
    overlay.classList.toggle("show-overlay");
};
// Cerra el menu hamburguesa en cualquier lado con click
const cerraConClick = (e) => {
    if (!e.target.classList.contains("navbar-link")) {
        return;
    }
    hamburMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");

};

const cerrarScroll = () => {
    if(!hamburMenu.classList.contains("open-menu") && !carrito.classList.contains("open-cart")) {
        return

    }
    hamburMenu.classList.remove("open-menu");
    carrito.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

const closeClick = () => {
    hamburMenu.classList.remove("open-menu");
    carrito.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

// renderizar carrito:
const renderCardIndumentaria = (compraProd) => {
    const {id, name, precio, cardImg, quantity } = compraProd;
    return `
    <div class="cart-indum">
       <img src="${cardImg}" alt="${name}" /> 
       <div class="cart-indum1">
            <h3 class="item-title">${name}</h3>
            <span class="item-price">$${precio}</span>
        </div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}> - </span>
            <span class="item-quantity"> ${quantity} </span>
            <span class="quantity-handler up" data-id=${id}> + </span>
        </div>
    </div>

    
    `;
};
// renderizar carrito:
const renderCard = () => {
    if (!cart.length) {
        productCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
        return;

    }
    productCart.innerHTML = cart.map(renderCardIndumentaria).join("");
};
// Total de carrito:
const totalProduct = () => {
    return cart.reduce((acc, cur) =>{
        return acc + Number(cur.precio) * cur.quantity
    }, 0);
};
// mostrar el total del carrito:
const mostrarTotal = () => {
    total.innerHTML = `$${totalProduct().toFixed(2)}`;
};
// renderizar burbuja de carrito:
const renderBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => {
        return acc + cur.quantity;
    }, 0);
};
// desactivar boton de compra y vaciar carrito:
const deshabBtn = (btn) => {
    if(!cart.length) {
        btn.classList.add("disabled");

    } else {
        btn.classList.remove("disabled");
    }
};

const checkCartState = () => {
    saveLocalStorage(cart);
    renderCard();
    mostrarTotal();
    deshabBtn(btnBuy);
    deshabBtn(deleteBtn);
    renderBubble();
};
// addProduct:
const agregarProd = (e) => {
    if (!e.target.classList.contains("btn-add")) {
        return;

    }

    const { id, name, precio, cardImg } = e.target.dataset;
    
    
    const product = productData(id, name, precio, cardImg);

    if(carritoExistente(product)) {
        addUnit(product);
        modalSuccess("Se agregó una unidad con éxito");

    } else {
        insertProduct(product);
        modalSuccess("El producto se agregó al carrito");
        
    }

    checkCartState();
};

const productData = (id, name, precio, cardImg) => {
    return { id, name, precio, cardImg };
};
// productos en el carrito:isExistingCartProduct
const carritoExistente = (product) => {
    return cart.find((item) => {
        return item.id === product.id;
    });
};
// // suma la cantidad de unidades de los productos:
const addUnit = (product) => {
    cart = cart.map((compraProd) => {
        return compraProd.id === product.id
        ? { ...compraProd, quantity: compraProd.quantity + 1
        }
        : compraProd;
    });

};

// // Activar el modal add
const modalSuccess = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove("active-modal");
    }, 1500);
};
// // insertar producto en el carrito:
const insertProduct = (product) => {
    cart = [
        ...cart,
        {
            ...product,
            quantity: 1,
        },
    ];
};
// boton de quitar producto (-) existingCArtProduct?
const btnLess = (id) => {
    const existingCartProduct = cart.find((item) => {
        return item.id === id
    });

    if(existingCartProduct.quantity === 1) {
        if(window.confirm("¿Desea eliminar el producto del carrito?")) {
            removerProdCarrito(existingCartProduct);

        }
        return;
    }
    eliminarProd(existingCartProduct);
    
};
// boton de agregar producto(+):
const plusEvent = (id) => {
    const existingCartProduct = cart.find((item) => {
        return item.id === id;
    });
    addUnit(existingCartProduct)


}

const removerProdCarrito = (existingProduct) => {
    cart = cart.filter((product) => product.id !== 
    existingProduct.id);
    checkCartState();
};

const eliminarProd = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id ? {
            ...product, quantity: Number(product.quantity) -1 }
            : product;
    });
};

const handleQuantity = (e) => {
    if(e.target.classList.contains("down")) {
        btnLess(e.target.dataset.id);

    } else if (e.target.classList.contains("up")) {
        plusEvent(e.target.dataset.id);


    }
    checkCartState();

};

const resetCartItems = () => {
    cart = [];
    checkCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
    if(window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
    }

};

const completeBuy = () => {
    completeCartAction("¿Desea completar su compra?", "Gracias por su compra");
};
const vaciarCart = () => {
    completeCartAction("¿Desea eliminar los productos de su carrito?", 
    "Productos eliminado");

};

// ejecutar
const init = () => {
    renderProd();
    categoria.addEventListener("click", aplicarFilter);
    btnVermas.addEventListener("click", masProductos);
    menuBtn.addEventListener("click", toggleMenu);
    cartBtn.addEventListener("click",toggleCart);
    window.addEventListener("scroll", cerrarScroll);
    overlay.addEventListener("click", closeClick);
    document.addEventListener("DOMContentLoaded", renderCard);
    document.addEventListener("DOMContentLoaded", mostrarTotal);
    products.addEventListener("click", agregarProd);
    productCart.addEventListener("click", handleQuantity);
    btnBuy.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", vaciarCart);
    deshabBtn(btnBuy);
    deshabBtn(deleteBtn);
    renderBubble();
};

init();