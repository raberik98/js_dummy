import Order from "../models/order.model.js"
import CheckForRequestedItem from "../services/store.service.js"


export async function GetAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export async function GetOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export async function GetOrdersByUserId(req, res) {
  try {
    const orders = await Order.find({ userId: req.USER_ID });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export async function CreateOrder(req, res) {
  try {
    const { productsIds, balance, submitted } = req.body;

    for (const productId of productsIds) {
      const result = await CheckForRequestedItem(productId)
      if (result.success !== true) {
        throw new Error(`Product: ${productId} doesn't exist.`)
      }
    }
    
    const order = new Order({
      userId: req.USER_ID,
      productsIds,
      balance,
      submitted
    });
    
    const savedOrder = await order.save();
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: savedOrder
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export async function UpdateOrder(req, res) {
  try {
    const { productsIds, balance, submitted } = req.body;

    for (const productId of productsIds) {
      const result = await CheckForRequestedItem(productId)
      if (result.success !== true) {
        throw new Error(`Product: ${productId} doesn't exist.`)
      }
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        userId: req.USER_ID,
        productsIds,
        balance,
        submitted
      },
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: order
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
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
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export async function AddProductToOrder(req, res) {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const result = await CheckForRequestedItem(productId)
    if (result.success !== true) {
      throw new Error(`Product: ${productId} doesn't exist.`)
    }
    
    const order = await Order.findOneAndUpdate(
      { 
        _id: req.params.id,
        userId: req.USER_ID
      },
      {
        $push: { productsIds: productId }
      },
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product added to order',
      data: order
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


export async function RemoveProductFromOrder(req, res) {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }
    
    const order = await Order.findByIdAndUpdate(
      { 
        _id: req.params.id,
        userId: req.USER_ID
      },
      {
        $pull: { productsIds: productId }
      },
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product removed from order',
      data: order
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export async function SubmitOrder(req, res) {
  try {
    const order = await Order.findOne({ 
        _id: req.params.id,
        userId: req.USER_ID
      });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    if (order.submitted) {
      return res.status(400).json({
        success: false,
        message: 'Order already submitted'
      });
    }
    
    order.submitted = true;
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'Order submitted successfully',
      data: order
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export async function DeleteOrder(req, res) {
  try {
    const order = await Order.findOneAndDelete({ 
        _id: req.params.id,
        userId: req.USER_ID
      });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: order
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};