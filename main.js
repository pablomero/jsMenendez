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

async function agregarVendedor() {

  const {
    value: inputs
  } = await Swal.fire({
    title: 'Agregar Vendedor',
    html: `<label for="swal-nombre">Nombre:</label>
          <input id="swal-nombre" name="swal-nombre" class="swal2-input" placeholder="Nombre">
          <label for="swal-salario">Salario:</label>
          <input id="swal-salario" name="swal-salario" class="swal2-input" placeholder="Salario" type="number">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Agregar',
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      return [
        document.getElementById('swal-nombre').value,
        parseInt(document.getElementById('swal-salario').value)
      ]
    }
  });
  //desestructuración
  let {
    nombre,
    salario
  } = inputs;
  if (!nombre) {
    new Swal("Ingrese un nombre");
  } else {
    if (buscarVendedor(nombre)) {
      new Swal("El nombre ya existe");
    } else {
      //operador ternario
      salario = salario ? salario : 0;
      let vendedor = new Vendedor(nombre, salario);
      vendedores.push(vendedor);
      htmlAgregarVendedor(vendedor);
    }
  }
}

function eliminarVendedor(nombre) {
  if (buscarVendedor(nombre)) {
    Swal.fire({
      title: 'Confirmar eliminación',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = vendedores.findIndex(vendedor => vendedor.nombre == nombre);
        vendedores.splice(indice, 1);
        htmlEliminarVendedor(nombre);
        Swal.fire(
          'Vendedor eliminado',
          '',
          'success'
        )
      }
    })

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
    Swal.fire({
      title: 'Ingrese precio de la venta',
      input: 'number',
      inputLabel: 'Precio',
      showCancelButton: true,
      inputValidator: (value) => {
        if (parseInt(value)) {
          vendedores[indice].venta(parseInt(value));
          htmlDetallesVendedor(vendedores[indice]);
        }
      }
    })
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

//usando fetch para traer json de Vendedores
fetch('https://raw.githubusercontent.com/pablomero/jsMenendez/main/vendedores.json')
  .then((res) => {
    return res.json();
  })
  .then((jsonObj) => {
    for (const v of jsonObj) {
      let vendedor = new Vendedor(v.nombre, v.salario);
      vendedor.cantidadVentas = v.cantidadVentas;
      vendedor.totalVentas = v.totalVentas;
      vendedores.push(vendedor);
      htmlAgregarVendedor(vendedor);
    }
  })
