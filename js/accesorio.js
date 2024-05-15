// Bicicletas
// (document.getElementById) Selecciona el elemento por id y lo guarda en la variable
const productoContainer = document.getElementById("producto-container");
// Capturamos el id del carrito
const verCarrito = document.getElementById("verCarrito");
// Capturamos el id padre del modal
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let contador = 0; // Variable externa para llevar un seguimiento del contador
let color;

// Cascos
accesorios.forEach((accesorio, index) => {
    let accesorioDiv = document.createElement("div");
    accesorioDiv.className = `product`;
    accesorioDiv.innerHTML = `
        <div class="img">
            <img id="imgProd${index}" src="${accesorio.img.img1}" width="400px"/>
        </div>
        <div class="details">
            <div class="title">
                <h3>${accesorio.nombre} <br/> <small>${accesorio.tipo}</small></h3>
            </div>
            <div class="colores">
                <h4 class="col">Colores</h4>
                <ul class="productos">
                    ${accesorio.colores.map(function(color, colorIndex) {
                    claseAuto = `color${contador++}`;
                    console.log(contador);
                    /* Usamos atributos data-img-index y data-color-index para almacenar los índices del producto y el color respectivamente. 
                    Estos atributos pueden ser útiles en JavaScript para rastrear la información relacionada con cada elemento <li>.*/
                    return `<li id="${claseAuto}" class="${claseAuto}" data-img-index="${index}" data-color-index="${colorIndex}">${color}</li>`;
                    }).join('')}
                </ul>
            </div>
            <div class="buy">
                <div class="price">
                    <span>$${accesorio.precio}</span>
                </div>
                <div class="btn">
                    <a href="" id="comprar" class="comprar">Comprar</a>
                </div>
            </div>
        </div>
    `;
    
    productoContainer.append(accesorioDiv);

    // Conseguir el id de el boton comprar
    const comprar = accesorioDiv.querySelector(".comprar");

    comprar.addEventListener("click", (event) => {
        event.preventDefault();  // Evita el comportamiento predeterminado del enlace.

        let id;
        let img;

        // Guardo el id y la imagen según el color que se necesite
        switch (color) {
            case 1:
                id = accesorio.id.id1;
                img = accesorio.img.img1;
                break;
            case 2:
                id = accesorio.id.id2;
                img = accesorio.img.img2;
                break;
            case 3:
                id = accesorio.id.id3;
                img = accesorio.img.img3;
                break;
            default:
                alert("Ingrese un color válido.");
        }

        // Buscar si el producto ya está en el carrito
        let productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            // El producto ya está en el carrito, actualiza la cantidad.
            productoExistente.cantidad += accesorio.cantidad;
        } else {
            // El producto no está en el carrito, agrégalo.
            carrito.push({
                id: id,
                img: img,
                nombre: accesorio.nombre,
                precio: accesorio.precio,
                cantidad: accesorio.cantidad,
            });
        }

        console.log(carrito);
        carritoCounter();
        saveLocal();
    });
    
    // Ahora puedes acceder a los elementos después de crearlos y cambiar la imagen
    const coloresLiProductos = document.querySelectorAll(".colores .productos li");
    coloresLiProductos.forEach(li => {
        li.addEventListener("click", function() {
            // Obtenemos el indice del producto
            const imgIndex = this.getAttribute("data-img-index");
 
            // Obtenemos el indice de color
            const colorIndex = this.getAttribute("data-color-index");
             
            // Usamos el id de donde esta colocada la imagen
            const imgElement = document.getElementById(`imgProd${imgIndex}`);
 
            switch (colorIndex) {
                case '0':
                    imgElement.src = accesorios[imgIndex].img.img1;
                    console.log("1");
                    color = 1;
                    break;
                case '1':
                    imgElement.src = accesorios[imgIndex].img.img2;
                    console.log("2");
                    color = 2;
                    break;
                case '2':
                    imgElement.src = accesorios[imgIndex].img.img3;
                    color = 3;
                    console.log("3");
                break;
            }

            switch (colorIndex) {
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

// (DOMContentLoaded) se asegura de ejecutar el codigo luego de que carge la pagina
// (addEventListener) agregar un evento a un elemento HTML.
document.addEventListener('DOMContentLoaded', function() {
    generateCarouselItems();
});

function generateCarouselItems() {
    // (querySelector) Selecciona el primer elemento con la clase ".carousel-inner"
    var carouselInner = document.querySelector('.grande');

    let contador = 0; // Variable externa para llevar un seguimiento del contador

    var indicesToShow = [0, 4, 5, 7]; // Índices que deseas mostrar en el carrusel

    for (var i = 0; i < indicesToShow.length; i++) {
        var index = indicesToShow[i];

        var carrucelProd = accesorios[index]; // Obtiene el producto del arreglo, usando indiceToShow

         // (carrucel carrucel-${index}) Es la manera que usamos para darle estilo css por separado a cada bici
        // (map) Crea un arreglo en base a un arreglo ya existente
        var item = `
                <div id="carrucel-container" class="carrucel-container">
                    <div class="carrucel carrucel-${index}">
                        <div class="img">
                            <img id="carruselImg${index}" src="${carrucelProd.img.img1}" width="400px"/>
                        </div>
                        <div class="details">
                            <div class="title">
                                <h3>${carrucelProd.nombre} <br/> <small>${carrucelProd.tipo}</small></h3>
                            </div>
                            <div class="description">
                                <h4>Descripcion</h4>
                                <p>${carrucelProd.descripcion}</p>
                            </div>
                            <div class="colores">
                                <h4>Colores</h4>
                                <ul class="carru">
                                    ${carrucelProd.colores.map(function(color, colorIndex) {
                                    if (contador == 3){ 
                                         contador = 12;
                                    }  else if (contador == 18){
                                        contador = 21;
                                    }
                                    const claseAutoincrementable = `color${contador++}`;
                                    console.log(contador);
                                    /* Usamos atributos data-img-index y data-color-index para almacenar los índices del producto y el color respectivamente. 
                                    Estos atributos pueden ser útiles en JavaScript para rastrear la información relacionada con cada elemento <li>.*/
                                    return `<li id="${claseAutoincrementable}" class="${claseAutoincrementable}" data-img-index="${index}" data-color-index="${colorIndex}">${color}</li>`;
                                    }).join('')}
                                </ul>
                            </div>
                            <div class="buy">
                                <div class="price">
                                    <span>$${carrucelProd.precio}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        carouselInner.innerHTML += item;
    };

    // Ahora puedes acceder a los elementos después de crearlos y cambiar la imagen
    const coloresLiCarrusel = document.querySelectorAll(".colores .carru li");

    coloresLiCarrusel.forEach(li => {
        li.addEventListener("click", function() {
            // Obtenemos el indice del producto
            const imgIndex = this.getAttribute("data-img-index");

            // Obtenemos el indice de color
            const colorIndex = this.getAttribute("data-color-index");
            console.log(colorIndex);
            
            // Usamos el id de donde esta colocada la imagen
            const imgElement = document.getElementById(`carruselImg${imgIndex}`);

            switch (colorIndex) {
                case '0':
                    imgElement.src = accesorios[imgIndex].img.img1;
                    break;
                case '1':
                    imgElement.src = accesorios[imgIndex].img.img2;
                    break;
                case '2':
                    imgElement.src = accesorios[imgIndex].img.img3;
                    break;
            }

            switch (colorIndex) {
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
}

// Set item
const saveLocal = () => {
    // JSON.stringify lo pasa a String
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Get item
JSON.parse(localStorage.getItem("carrito"));