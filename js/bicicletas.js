// Bicicletas
// (document.getElementById) Selecciona el elemento por id y lo guarda en la variable
const productContainer = document.getElementById("product-container");
// Capturamos el id del carrito
const verCarrito = document.getElementById("verCarrito");
// Capturamos el id padre del modal
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let product_num = 0;
let contador = 0; // Variable externa para llevar un seguimiento del contador


bicicletas.forEach((bicicleta, index) => {
    let productDiv = document.createElement("div");
    productDiv.className = `product`;

    productDiv.innerHTML = `
        <div class="img">
            <img src="${bicicleta.img}" width="200px"/>
        </div>
        <div class="details">
            <div class="title">
                <h3>${bicicleta.nombre} <br/> <small>${bicicleta.tipo}</small></h3>
            </div>
            <div class="rodados">
                <h4>Rodados</h4>
                <ul class="productos">
                    ${bicicleta.rodados.map(function(rodado, rodadoIndex) {
                    const claseAuto = `rodado${contador++}`;
                    console.log(contador);
                    /* Usamos atributos data-img-index y data-color-index para almacenar los índices del producto y el color respectivamente. 
                    Estos atributos pueden ser útiles en JavaScript para rastrear la información relacionada con cada elemento <li>.*/
                    return `<li id="${claseAuto}" class="${claseAuto}" data-img-index="${index}" data-rodado-index="${rodadoIndex}">${rodado}</li>`;
                    }).join('')}
                </ul>
            </div>
            <div class="buy">
                <div class="price">
                    <span>$${bicicleta.precio}</span>
                </div>
                <div class="btn">
                    <a href="" id="comprar" class="comprar">Comprar</a>
                </div>
            </div>
        </div>
    `;
    
    productContainer.append(productDiv);

    // Conseguir el id de el boton comprar
    const comprar = productDiv.querySelector(".comprar");

    // Le agrego una escucha al boton comprar para agregar los elementos al carrito
    comprar.addEventListener("click", (event) => {
        event.preventDefault();  // Evita el comportamiento predeterminado del enlace.

        // Buscamos un producto repetido, el id si es igual al biciID me da true, sino false
        const repeat = carrito.some((repeatProduct)  => repeatProduct.id === bicicleta.id);
        if(repeat){
            carrito.map((bici) => {
                if(bici.id === bicicleta.id){
                    bici.cantidad++;
                }
            });
        } else {
            // Cuando el ususario da click en el boton comprar me llevo los elementos al array carrito
            carrito.push({
                id: bicicleta.id,
                img: bicicleta.img,
                nombre: bicicleta.nombre,
                precio: bicicleta.precio,
                cantidad: bicicleta.cantidad,
            });
        }
        console.log(carrito);
        carritoCounter();
        saveLocal();
    });

    // Ahora puedes acceder a los elementos después de crearlos y cambiar la imagen
    const rodadosLiProductos = document.querySelectorAll(".rodados .productos li");
    rodadosLiProductos.forEach(li => {
        li.addEventListener("click", function() {
            // Obtenemos el indice del producto
            const rodadoIndex = this.getAttribute("data-rodado-index");

            switch (rodadoIndex) {
                case '0':
                case '1':
                case '2':
                    // Primero, asegurémonos de que todos los elementos tengan la clase "seleccionado" desactivada
                    document.querySelectorAll('.seleccionado').forEach(function(element) {
                        element.classList.remove('seleccionado');
                    });
            
                    // Luego, activamos la clase "seleccionado" en el elemento actual
                    this.classList.toggle('seleccionado');
                    break;
            }
        });
    });

});

// Set item
const saveLocal = () => {
    // JSON.stringify lo pasa a String
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Get item
JSON.parse(localStorage.getItem("carrito"));