import Product from "../models/product.model.js"

export async function GetAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      products: products
    });
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export async function GetProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(error.message);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export async function CreateProduct(req, res) {
  try {
    const { name, description, price, quantity, available } = req.body;

    const product = new Product({
      name,
      description,
      price,
      quantity,
      available
    });

    const savedProduct = await product.save();

    console.log(`Product created: ${savedProduct.name}.`);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export async function UpdateProduct(req, res) {
  try {
    const { name, description, price, quantity, available } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        quantity,
        available
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      console.error(`Product update failed: ${req.params.id} not found.`);

      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log(`Successfully updated ${req.params.id}`);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      console.error(`Invalid ID: ${req.params.id}`);

      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: validationErrors
      });
    }

    console.error(error.message);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export async function DeleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      console.error(`Invalid ID: ${req.params.id}`);

      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    console.error(error.message);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};