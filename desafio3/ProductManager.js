import { existsSync, readFileSync, writeFileSync } from "fs";

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath; 
    if (existsSync(this.path)) { // Take path and ask if it exists
      this.#readFile();
    } else { // else write a document
      this.#writeProducts([]);
    }
  }
  
  
  /**
   * @returns json from path
   */
  #readFile() {
    return JSON.parse(readFileSync(this.path)); // Read the document in the given path
  }

  /**
  *  @desc
   * @param {*} products
   * @returns
   */
  #writeProducts(products) {
    return writeFileSync(this.path, JSON.stringify(products)); // Write a doc with products array on it
  }
  

  addProduct(title, description, price, thumbnail, code, stock) {
    const products = this.#readFile(); // Take products from file
    const findCode = products.find((product) => product.code === code); // Look for a product with same code given 
    if (!findCode) { // If it's ok, add product to array
      products.push({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.#getMaxId() + 1,
      });
      this.#writeProducts(products); // Save it on file
      return "product added";
    }
    return "product code already exist";
  }



  #getMaxId() { // Id generator
    let maxId = 0;
    this.#readFile().map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  
  getProducts() {
    return this.#readFile(); // Get products from file
  }

  getProductById(id) { // Get products with same ID on file
    const product = this.#readFile().find((product) => product.id === id);
    if (product) {
      return product;
    }
    return "Not found";
  }

  updateProduct(id, key, value) {
    let products = this.#readFile();
    const product = products.find((producto) => producto.id === id);
    product[key] = value;
    this.deleteProduct(id);
    products = this.#readFile();
    products.push(product);
    this.#writeProducts(products);
    console.log("Producto Actualizado");
  }
 
  deleteProduct(id) {
    const products = this.#readFile();
    const filteredProducts = products.filter((product) => product.id !== id);
    if (filteredProducts !== products) {
      this.#writeProducts(filteredProducts);
      return "Product deleted";
    }
    return "Product doesn't exist";
  }
}




