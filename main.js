class Vendedor {
  constructor(nombre, salario) {
    this.nombre = nombre;
    this.salario = salario;
    this.cantidadVentas = 0;
    this.totalVentas = 0;
  }

  venta(precio) {
    this.cantidadVentas += 1;
    this.totalVentas += precio;
  }

  comision() {
    let total = 0;
    if (this.cantidadVentas > 4) {
      total += this.totalVentas * 0.1;
    }
    if (this.totalVentas > 5000) {
      total += this.totalVentas * 0.01;
    }
    return Math.round(total);
  }

  total() {
    return this.salario + this.totalVentas + this.comision();
  }
}

function buscarVendedor(nombre) {
  return vendedores.find(vendedor => vendedor.nombre == nombre);
}

function agregarVendedor() {
  let nombre;
  do {
    nombre = prompt("Ingrese el nombre");
    if (buscarVendedor(nombre)) {
      console.log("El nombre ya existe");
    }
  } while (!nombre || buscarVendedor(nombre));
  let salario;
  do {
    salario = parseInt(prompt("Ingrese salario"));
  } while (!salario);
  let vendedor = new Vendedor(nombre, salario);
  vendedores.push(vendedor);
  htmlAgregarVendedor(vendedor);
  localStorage.setItem('vendedores',JSON.stringify(vendedores));
}

function eliminarVendedor(nombre) {
  if (buscarVendedor(nombre)) {
    if (confirm("Confirmar eliminación")) {
      let indice = vendedores.findIndex(vendedor => vendedor.nombre == nombre);
      vendedores.splice(indice, 1);
      htmlEliminarVendedor(nombre);
      localStorage.setItem('vendedores',JSON.stringify(vendedores));
    }
  } else {
    console.log("Vendedor no encontrado");
  }
}

const btnAgregarVendedor = document.getElementById("btnAgregarVendedor");
btnAgregarVendedor.addEventListener('click', () => {
  agregarVendedor();
})

// Arrow function para generar valores random
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function htmlDetallesVendedor(vendedor) {
  let divDetalles = document.getElementById(`detalles${vendedor.nombre}`);
  divDetalles.innerHTML = `
    <p>${vendedor.nombre}</p>
    <p>Salario: <span>$${vendedor.salario}</span></p>
    <p>Cantidad de ventas: <span>${vendedor.cantidadVentas}</span></p>
    <p>Total de ventas: <span>$${vendedor.totalVentas}</span></p>
    <p>Comision: <span>$${vendedor.comision()}</span></p>
    <p>Total: <span>$${vendedor.total()}</span></p>
  `
}

function htmlAgregarVendedor(vendedor) {
  let div = document.createElement('div');
  div.id = `card${vendedor.nombre}`;
  div.className = 'vendedor';
  div.innerHTML = `
    <div class="usericon">
      <input id="agregarVenta${vendedor.nombre}" type="button" value="Venta"</input>
      <input id="eliminarVendedor${vendedor.nombre}" type="button" value ="Eliminar"</input>
    </div>
    <div id="detalles${vendedor.nombre}">
    </div>
  `;
  listaVendedores.appendChild(div);
  htmlDetallesVendedor(vendedor);

  let btnAgregarVenta = document.getElementById(`agregarVenta${vendedor.nombre}`);
  btnAgregarVenta.addEventListener('click', () => {
    let indice = vendedores.findIndex(v => v.nombre == vendedor.nombre);
    let precio;
    do {
      precio = parseInt(prompt("Ingrese precio de la venta"));
    } while (!precio);
    vendedores[indice].venta(precio);
    htmlDetallesVendedor(vendedores[indice]);
    localStorage.setItem('vendedores',JSON.stringify(vendedores));
  });

  let btnEliminarVendedor = document.getElementById(`eliminarVendedor${vendedor.nombre}`);
  btnEliminarVendedor.addEventListener('click', () => {
    eliminarVendedor(vendedor.nombre);
  });
}

function htmlEliminarVendedor(nombre) {
  let cardVendedor = document.getElementById(`card${nombre}`);
  padre = cardVendedor.parentNode;
  padre.removeChild(cardVendedor);
}

// Lista de vendedores con valores random
const listaVendedores = document.getElementById("listaVendedores");
const vendedores = [];

if (localStorage.getItem('vendedores')) {
  let arrVendedores = JSON.parse(localStorage.getItem('vendedores'));
  for (const v of arrVendedores) {
    let vendedor = new Vendedor(v.nombre, v.salario);
    vendedor.cantidadVentas = v.cantidadVentas;
    vendedor.totalVentas = v.totalVentas;
    vendedores.push(vendedor);
    htmlAgregarVendedor(vendedor);
  }
} else {
  for (const nombre of ["Carlos", "Andres", "Belen", "Nora"]) {
    let vendedor = new Vendedor(nombre, randomInt(10000, 20000));
    for (i = 0; i <= randomInt(0, 10); i++) {
      vendedor.venta(randomInt(100, 1000));
    }
    vendedores.push(vendedor);
    htmlAgregarVendedor(vendedor);
  }
  localStorage.setItem('vendedores',JSON.stringify(vendedores));
}
