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
}

// Arrow function para generar valores random
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Lista de vendedores con valores random
const vendedores = [];
for (const nombre of ["Carlos", "Andres", "Belen", "Nora"]) {
  let vendedor = new Vendedor(nombre, randomInt(10000, 20000));
  for (i = 0; i <= randomInt(0, 10); i++) {
    vendedor.venta(randomInt(100, 1000));
  }
  vendedores.push(vendedor);
}

function buscarVendedor(nombre) {
  return vendedores.find(vendedor => vendedor.nombre == nombre);
}

function menuVendedor(indice) {
  let opcion;
  do {
    opcion = prompt(
      "1-Ingresar venta\n" +
      "2-Calcular sueldo\n" +
      "x-Volver"
    );
    switch (opcion) {
      case "1":
        let precio;
        do {
          precio = parseInt(prompt("Ingrese precio de la venta"));
        } while (!precio);
        vendedores[indice].venta(precio);
        break;
      case "2":
        let vendedor = vendedores[indice];
        console.log(`Sueldo base: $ ${vendedor.salario}\n` +
          `${vendedor.cantidadVentas} ventas por $${vendedor.totalVentas}\n` +
          `Comisión: $${vendedor.comision()}\n` +
          `Total: $${(vendedor.salario + vendedor.totalVentas + vendedor.comision())}`);
        break;
      case "x":
        console.log("Volviendo al menú inicial");
        break;
      default:
        console.log("Opcion no válida");
    }

  } while (opcion != "x");
}

function listarVendedores() {
  console.log(vendedores.map(vendedor => vendedor.nombre).join("\n"));
  let nombre;
  do {
    nombre = prompt("Ingrese nombre del vendedor para agregar venta");
    if (buscarVendedor(nombre)) {
      let indice = vendedores.findIndex(vendedor => vendedor.nombre == nombre);
      menuVendedor(indice);
    } else {
      console.log("Vendedor no encontrado");
    }
  } while (!nombre || !buscarVendedor(nombre));
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
  vendedores.push(new Vendedor(nombre, salario));
}

function eliminarVendedor() {
  let nombre = prompt("Ingrese el nombre del vendedor a eliminar");
  if (buscarVendedor(nombre)) {
    if (confirm("Confirmar eliminación")) {
      let indice = vendedores.findIndex(vendedor => vendedor.nombre == nombre);
      vendedores.splice(indice, 1);
    }
  } else {
    console.log("Vendedor no encontrado");
  }
}

// Comienzo del simulador
let opcion;
do {
  opcion = prompt(
    "1-Vendedores\n" +
    "2-Agregar vendedor\n" +
    "3-Eliminar vendedor\n" +
    "x-Salir"
  );

  switch (opcion) {
    case "1":
      listarVendedores();
      break;
    case "2":
      agregarVendedor();
      break;
    case "3":
      eliminarVendedor();
      break;
    case "x":
      console.log("Finalizando ejecución");
      break;
    default:
      console.log("Opción inválida");
  }

} while (opcion != "x");
