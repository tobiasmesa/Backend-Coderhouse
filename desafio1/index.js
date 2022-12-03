class ProductManager {
  constructor() {
    this.products = [];
  }

  #getMaxId() {
    let maxId = 0;
    this.products.map((product) => {
      if (product.id > maxId) {
        maxId = product.id;
      }
    });
    return maxId;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!this.products.find((product) => product.code === code)) {
      const product = {
        id: this.#getMaxId() + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.push(product);
      return "Added!";
    }
    return "Not added, code already exists!";
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    return this.products.find((product) => product.id === id) || "Not found";
  }
}

//! Instancia de la clase ProductManager

const pm = new ProductManager();

console.log(pm.getProducts()); // Return an empty array

pm.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  "200",
  "Sin imagen",
  "abc123",
  "25"
);

console.log("Con un producto añadido: ", pm.getProducts());

pm.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  "200",
  "Sin imagen",
  "abc123",
  "25"
);

console.log(pm.getProductsById(2));
console.log(pm.getProductsById(1));