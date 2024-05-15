const pintarCarrito = () => {

    // Lo vacio y lo muestro
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    
    // Creo la estructura
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 clas="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";
    modalHeader.append(modalButton);

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })

    // Defino lo que voy a mostrar, que ya se encuentra en el carrito
    carrito.forEach((carro) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content1";
        carritoContent.innerHTML = `
            <img src="${carro.img}" class="imgCarrito">
            <h3>${carro.nombre}</h3>
            <p>$${carro.precio}</p>
            <img src="img/iconos/restar.png" alt="" class="restar"/>
            <p>Cantidad: ${carro.cantidad}</p>
            <img src="img/iconos/sumar.png" alt=""  class="sumar"/>
            <p>Total: $${carro.cantidad * carro.precio}</p>
            <img src="img/iconos/eliminar.png" alt="" class="delete-product"/>

        `;
        modalContainer.append(carritoContent);

        // Restar cantidad de producto
        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if(carro.cantidad !== 1) {
                carro.cantidad--;
                saveLocal();
            }
            pintarCarrito();
        });

        // Sumar cantidad de producto
        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            carro.cantidad++;
            saveLocal();
            pintarCarrito();
        })

        // Boton eliminar producto
        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(carro.id);
        })
    });

    // Reduce recorre el carrito, recibe 2 parametros,
    // Primero el acumulador y despues "el" que me representa cada un de los productos
    // Y el 0 es el numero con el que arranca el acumulador
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    // Muestro el total a pagar de todos los productos
    const totalComprado = document.createElement("div");
    totalComprado.className = "total-content";
    totalComprado.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalComprado);
};

// Muestro el carrito
verCarrito.addEventListener("click", pintarCarrito);

// Funcion eliminar correcto
const eliminarProducto = (id) => {
    // Me busca de todo lo que hay en el carrito los id
    const foundId = carrito.find((element) => element.id === id);

    // Filtro el carrito, y le pido que me retorne
    // todos los elementos distintos a foundId
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
};

// Funcion cantidad de cada producto
const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

    if(carrito.length === 0 ){
        cantidadCarrito.style.display = "none";
    }
};

// Actualizo la cantidad de producto
carritoCounter();