// Bicicletas
// (document.getElementById) Selecciona el elemento por id y lo guarda en la variable
const cascoContainer = document.getElementById("casco-container");
// Capturamos el id del carrito
const verCarrito = document.getElementById("verCarrito");
// Capturamos el id padre del modal
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let contador = 0; // Variable externa para llevar un seguimiento del contador
let color;

// Cascos
cascos.forEach((casco, index) => {
    let cascoDiv = document.createElement("div");
    cascoDiv.className = `product`;
    cascoDiv.innerHTML = `
        <div class="img">
            <img id="cascoImg${index}" src="${casco.img.img1}" width="400px"/>
        </div>
        <div class="details">
            <div class="title">
                <h3>${casco.nombre} <br/> <small>${casco.tipo}</small></h3>
            </div>
            <div class="colores">
                <h4 class="col">Colores</h4>
                <ul class="productos">
                    ${casco.colores.map(function(color, colorIndex) {
                    const claseAuto = `color${contador++}`;
                    console.log(contador);
                    /* Usamos atributos data-img-index y data-color-index para almacenar los índices del producto y el color respectivamente. 
                    Estos atributos pueden ser útiles en JavaScript para rastrear la información relacionada con cada elemento <li>.*/
                    return `<li id="${claseAuto}" class="${claseAuto}" data-img-index="${index}" data-color-index="${colorIndex}">${color}</li>`;
                    }).join('')}
                </ul>
            </div>
            <div class="buy">
                <div class="price">
                    <span>$${casco.precio}</span>
                </div>
                <div class="btn">
                    <a href="" id="comprar" class="comprar">Comprar</a>
                </div>
            </div>
        </div>
    `;
    
    cascoContainer.append(cascoDiv);

    // Conseguir el id del botón comprar
    const comprar = cascoDiv.querySelector(".comprar");

    comprar.addEventListener("click", (event) => {
        event.preventDefault();  // Evita el comportamiento predeterminado del enlace.

        let id;
        let img;

        // Guardo el id y la imagen según el color que se necesite
        switch (color) {
            case 1:
                id = casco.id.id1;
                img = casco.img.img1;
                break;
            case 2:
                id = casco.id.id2;
                img = casco.img.img2;
                break;
            case 3:
                id = casco.id.id3;
                img = casco.img.img3;
                break;
            default:
                alert("Ingrese un color válido.");
        }

        // Buscar si el producto ya está en el carrito
        let productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            // El producto ya está en el carrito, actualiza la cantidad.
            productoExistente.cantidad += casco.cantidad;
        } else {
            // El producto no está en el carrito, agrégalo.
            carrito.push({
                id: id,
                img: img,
                nombre: casco.nombre,
                precio: casco.precio,
                cantidad: casco.cantidad,
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
            const imgElement = document.getElementById(`cascoImg${imgIndex}`);
 
            switch (colorIndex) {
                case '0':
                    imgElement.src = cascos[imgIndex].img.img1;
                    color = 1;
                    console.log("1");
                    break;
                case '1':
                    imgElement.src = cascos[imgIndex].img.img2;
                    color = 2;
                    console.log("2");
                    break;
                case '2':
                    imgElement.src = cascos[imgIndex].img.img3;
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
    var carrucelGeneral = document.querySelector('.grande');

    let contador = 0; // Variable externa para llevar un seguimiento del contador

    var indicesToShow = [0, 2, 4, 8]; // Índices que deseas mostrar en el carrusel

    for (var i = 0; i < indicesToShow.length; i++) {
        var index = indicesToShow[i];

        var activeClass = i === 0 ? 'active' : '';

        var carrucelProd = cascos[index]; // Obtiene el producto del arreglo, usando indiceToShow

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
                                         contador = 6;
                                    } else if (contador == 9){
                                        contador = 12;
                                    }  else if (contador == 15){
                                        contador = 24;
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

        carrucelGeneral.innerHTML += item;
    }
   
    // Ahora puedes acceder a los elementos después de crearlos y cambiar la imagen
    const coloresLiCarrusel = document.querySelectorAll(".colores .carru li");

    coloresLiCarrusel.forEach(li => {
        li.addEventListener("click", function() {
            // Obtenemos el indice del producto
            const imgIndex = this.getAttribute("data-img-index");

            // Obtenemos el indice de color
            const colorIndex = this.getAttribute("data-color-index");
            
            // Usamos el id de donde esta colocada la imagen
            const imgElement = document.getElementById(`carruselImg${imgIndex}`);

            console.log(imgIndex)
            
            switch (colorIndex) {
                case '0':
                    imgElement.src = cascos[imgIndex].img.img1;
                    break;
                case '1':
                    imgElement.src = cascos[imgIndex].img.img2;
                    break;
                case '2':
                    imgElement.src = cascos[imgIndex].img.img3;
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