const Category = require("../model/category-model");

const createNewCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Không được để trống" });
    }
    const newCategory = new Category({
      name,
    });
    await newCategory.save();
    res.status(201).json({
      message: "Tạo mới thành công",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra trong quá trình tạo danh mục." });
  }
};

const getAllCategory= async (req, res, next)=>{
    try {
        const  categories = await Category.find();
        const data= categories.map((ce)=>({
            id:ce._id,
            name:ce.name,
            delete_id: ce.delete_id,
            status: ce.status
        }))
        res.status(200).json({ data
            })

    } catch (error) {
        next(error)
    }
}
module.exports= {createNewCategory, getAllCategory}