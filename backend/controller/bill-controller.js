const db = require("../model");
const createBill = async (req, res, next) => {
  try {
    const { total_cost, payment, discount, product_list } = req.body;

    // Tạo hóa đơn mới
    const newBill = new db.Bill({
      total_cost,
      payment,
      discount,
      product_list,
    });

    // Lưu hóa đơn vào cơ sở dữ liệu
    const savedBill = await newBill.save();

    // Cập nhật số lượng sản phẩm trong kho
    const insufficientProducts = [];

    await Promise.all(product_list.map(async (item) => {
      const product = await db.Product.findById(item.productId);
      if (product) {
        if (product.quantity < item.quantityP) {
          insufficientProducts.push(product.name); // Thêm vào danh sách sản phẩm không đủ
        } else {
          product.quantity -= item.quantityP; // Giảm số lượng theo số lượng đã mua
          await product.save(); // Lưu thay đổi vào cơ sở dữ liệu
        }
      }
    }));

    // Kiểm tra xem có sản phẩm nào không đủ không
    if (insufficientProducts.length > 0) {
      // Nếu có sản phẩm không đủ, xóa hóa đơn đã tạo
      await db.Bill.findByIdAndDelete(savedBill._id);
      return res.status(400).json({
        message: `Số lượng sản phẩm không đủ trong kho: ${insufficientProducts.join(', ')}`,
      });
    }

    res.status(201).json(savedBill);
  } catch (error) {
    res.status(500).json({
      message: "Error creating bill",
      type: 500,
      error: error.message,
    });
  }
};

module.exports = { createBill };
