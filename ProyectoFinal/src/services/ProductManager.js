
import { existsSync, readFileSync, writeFileSync } from "fs";

// Public class -> Instance a new object with file path 
// Example: const pm = new pm("PATH")
// This class doesnt use async methods! 

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    if (existsSync(this.path)) {
      // Take path and ask if it exists
      this.#readFile();
    } else {
      // else write a document
      this.#writeProducts([]);
    }
  }

  // @desc    Read the document in given path
  // @access  Private
  #readFile() {
    return JSON.parse(readFileSync(this.path));
  }

  // @desc    Write a doc with products array on it
  // @access  Private
  #writeProducts(products) {
    return writeFileSync(this.path, JSON.stringify(products));
  }

  // @desc    Add a product to file
  // @access  Public

  addProduct( {title, description, price, status, thumbnail, code, stock, category} ) {
    const products = this.#readFile(); // Take products from file
    const findCode = products.find((product) => product.code === code); // Look for a product with same code given
    if (!findCode) {
      // If it's ok, add product to array
      products.push({
        title,
        description,
        status,
        price,
        thumbnail,
        code,
        category,
        stock,
        id: this.#getMaxId() + 1,
      });
      this.#writeProducts(products); // Save it on file
      return "Object added";
    }
    return "Object code already exist";
  }

  // @desc    Get id
  // @access  Private

  #getMaxId() {
    let maxId = 0;
    this.#readFile().map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  // @desc    Get array from file
  // @access  Public

  getProducts() {
    return this.#readFile(); // Get products from file
  }

  // @desc   Get product by Id
  // @param   id: number to filter by
  // @access  Public

  getProductById(id) {
    // Get products with same ID on file
    const product = this.#readFile().find((product) => product.id === id);
    if (product) {
      return product;
    }
    return "Not found";
  }

  // @desc   Update an object from file
  // @params id: number to apply, key: element of object, value: new value
  // @access Public

  updateProduct(id, key, value) {
    let products = this.#readFile();
    const product = products.find((producto) => producto.id === id);
    product[key] = value;
    this.deleteProduct(id);
    products = this.#readFile();
    products.push(product);
    this.#writeProducts(products);
    console.log("Object updated!");
  }

  // @desc     Delete product by Id
  // @param   id: number to filter by
  // @access  Public

  deleteProduct(id) {
    const products = this.#readFile();
    const filteredProducts = products.filter((product) => product.id !== id);
    if (filteredProducts !== products) {
      this.#writeProducts(filteredProducts);
      return "Object deleted";
    }
    return "Object doesn't exist";
  }
}
