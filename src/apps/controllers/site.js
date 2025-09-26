// src/apps/controllers/site.js
const ejs = require("ejs");
const path = require("path");
const transporter = require("../../common/transporter");
const Gioi_thieu_trangModel = require("../models/gioi_thieu_trang");
const VideoModel = require("../models/video");
const BaiviettintucModel = require("../models/baiviet_tintuc");
const Menu_danhmuc_sanphamModel = require("../models/menu_danhmuc_sanpham");
const Menu_nhom_sanphamModel = require("../models/menu_nhom_sanpham");
const Menu_dichvuModel = require("../models/menu_dichvu");
const Product_sanphamModel = require("../models/product_sanpham");
const pagination = require("../../common/pagination");
const Anh_nhom_san_phamModel = require("../models/anh_nhom_san_pham");
const ChiaseModel = require("../models/chiase");
const BaivietdichvuModel = require("../models/baiviet_dichvu");
const Menu_tintucModel = require("../models/menu_tintuc");
const TuvanModel = require("../models/tuvan");
const Thong_tin_trangModel = require("../models/thong_tin_trang");
const LobanModel = require("../models/loban");
const mongoose = require('mongoose');

// Helper: validate ObjectId or treat as slug
const findByIdOrSlug = async (Model, idOrSlug, slugField = "slug") => {
  if (mongoose.isValidObjectId(idOrSlug)) {
    return await Model.findById(idOrSlug);
  }
  return await Model.findOne({ [slugField]: idOrSlug });
};

// HOME
const home = async (req, res) => {
  try {
    const gioithieutrang = await Gioi_thieu_trangModel.find();
    const video = await VideoModel.find().sort({ _id: -1 }) || [];

    const videoOne = video.length > 0 ? await VideoModel.findById(video[0]._id) : null;

    const tintuc = await BaiviettintucModel.find({ nhap: true }).sort({ _id: -1 }) || [];
    const tintucOne = tintuc.length > 0 ? await BaiviettintucModel.findById(tintuc[0]._id) : null;

    const menudichvu = await Menu_dichvuModel.find({ nhap: true }).limit(2);
    const chiase = await ChiaseModel.find();

    res.render("site/index", { gioithieutrang, video, videoOne, tintuc, tintucOne, menudichvu, chiase });
  } catch (err) {
    console.error("❌ Lỗi tại home:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// CATEGORY DANHMUC (tối ưu: query một lần lấy product thuộc các nhomsp)
const categoryDanhmuc = async (req, res) => {
  try {
    const id = req.params.id;
    const slug = req.params.slug;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send("ID danh mục không hợp lệ");
    }

    const menudanhmuc = await Menu_danhmuc_sanphamModel.findById(id);
    if (!menudanhmuc) return res.status(404).send("Không tìm thấy danh mục");

    const nhomsp = await Menu_nhom_sanphamModel.find({ danhmuc_id: id });

    // Lấy danh sách nhomsp ids
    const nhomIds = nhomsp.map(n => n._id);

    // Tìm tất cả sản phẩm thuộc các nhomsp trên và đã nhap: true (1 query)
    const allProducts = nhomIds.length > 0
      ? await Product_sanphamModel.find({ nhomsp_id: { $in: nhomIds }, nhap: true }).sort({ _id: -1 })
      : [];

    // Pagination (client-side logic preserved: page, limit)
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const totalRows = allProducts.length;
    const totalPages = Math.ceil(totalRows / limit);
    const skip = (page - 1) * limit;

    const product = allProducts.slice(skip, skip + limit);

    res.render("./site/category_menu", {
      menudanhmuc,
      nhomsp,
      product,
      slug,
      id,
      page,
      totalPages,
      next: page + 1,
      hasNext: page < totalPages,
      prev: page - 1,
      hasPrev: page > 1,
      pages: pagination(page, totalPages),
    });
  } catch (err) {
    console.error("❌ Lỗi tại categoryDanhmuc:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// CATEGORY ITEM (nhom sản phẩm)
const categoryitem = async (req, res) => {
  try {
    const id = req.params.id;
    const slug = req.params.slug;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send("ID nhóm không hợp lệ");
    }

    const category = await Menu_nhom_sanphamModel.findById(id).populate({ path: "danhmuc_id" });
    if (!category) return res.status(404).send("Không tìm thấy nhóm");

    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const totalRows = await Product_sanphamModel.countDocuments({ nhomsp_id: id, nhap: true });
    const totalPages = Math.ceil(totalRows / limit);

    const product = await Product_sanphamModel
      .find({ nhomsp_id: id, nhap: true })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const image = await Anh_nhom_san_phamModel.find({ anhnhom_id: id });
    const imageOne = image[0] || [];
    const total = image.slice(1); // phù hợp với logic cũ
    const chiase = await ChiaseModel.find();

    res.render("./site/category_item", {
      category, product, image, imageOne, total,
      page,
      totalPages,
      next: page + 1,
      hasNext: page < totalPages,
      prev: page - 1,
      hasPrev: page > 1,
      pages: pagination(page, totalPages),
      slug, id,
      chiase,
    });
  } catch (err) {
    console.error("❌ Lỗi tại categoryitem:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// CATEGORY DICHVU (giữ logic ghép baiviet + product nhưng an toàn hơn)
const categorydichvu = async (req, res) => {
  try {
    const id = req.params.id;
    const slug = req.params.slug;

    const category = await Menu_dichvuModel.findById(id);
    const categorynhom = await Menu_dichvuModel.find();

    // bảo vệ nếu category không tồn tại
    if (!category) return res.status(404).send("Không tìm thấy danh mục dịch vụ");

    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const totalRows1 = await BaivietdichvuModel.countDocuments({ menudichvu_id: id, nhap: true });
    const totalRows2 = await Product_sanphamModel.countDocuments({ menudichvu_id: id, spdv: true, nhap: true });
    const totalRows = totalRows1 + totalRows2;

    const totalPages = Math.ceil(totalRows / (limit * 2));

    const baiviets = await BaivietdichvuModel
      .find({ menudichvu_id: id, nhap: true })
      .populate({ path: "menudichvu_id" })
      .sort({ _id: -1 });

    const products = await Product_sanphamModel
      .find({ menudichvu_id: id, spdv: true, nhap: true })
      .populate({ path: "menudichvu_id" })
      .sort({ _id: -1 });

    // logic phân trang kết hợp (giữ nguyên thuật toán của bạn nhưng an toàn hơn với bound checks)
    const baiviet = [];
    const product = [];

    // helper to push safely
    const pushRange = (arrSource, dest, from, to) => {
      for (let i = Math.max(0, from); i < Math.min(arrSource.length, to); i++) {
        dest.push(arrSource[i]);
      }
    };

    if (totalRows === 0) {
      // nothing
    } else if (totalRows1 < totalRows2) {
      if (page * limit <= totalRows1) {
        pushRange(baiviets, baiviet, skip, page * limit);
        pushRange(products, product, skip, page * limit);
      } else {
        // original complex cases — simplified and made bounds-safe
        // fill baiviet remainder then products
        pushRange(baiviets, baiviet, skip, totalRows1);
        const remaining = limit * 2 - (baiviet.length);
        pushRange(products, product, skip, skip + remaining);
      }
    } else if (totalRows1 > totalRows2) {
      if (page * limit <= totalRows2) {
        pushRange(baiviets, baiviet, skip, page * limit);
        pushRange(products, product, skip, page * limit);
      } else {
        pushRange(products, product, skip, totalRows2);
        const remaining = limit * 2 - (product.length);
        pushRange(baiviets, baiviet, skip, skip + remaining);
      }
    } else {
      // equal counts
      pushRange(baiviets, baiviet, skip, Math.min(totalRows1, page * limit));
      pushRange(products, product, skip, Math.min(totalRows2, page * limit));
    }

    res.render("./site/category_dichvu", {
      category, categorynhom,
      page,
      totalPages,
      next: page + 1,
      hasNext: page < totalPages,
      prev: page - 1,
      hasPrev: page > 1,
      pages: pagination(page, totalPages),
      id, slug, product, baiviet,
    });
  } catch (err) {
    console.error("❌ Lỗi tại categorydichvu:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// PRODUCT DICHVU (an toàn với image[])
const productdichvu = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await BaivietdichvuModel.findById(id);
    if (!product) return res.status(404).send("Không tìm thấy bài viết dịch vụ");

    const total = Array.isArray(product.image) ? product.image.length : 0;
    const imgOne = total > 0 ? (product.image[0]?.images || []) : [];

    const category = await Menu_dichvuModel.findById(product.menudichvu_id);

    const category_noibat = await BaivietdichvuModel.find({ nhap: true })
      .populate({ path: "menudichvu_id" })
      .sort({ _id: -1 });

    const image = [];
    if (total > 1) {
      for (let i = 1; i < total; i++) {
        image.push({
          images: product.image[i]?.images || [],
          stt: product.image[i]?.stt || i
        });
      }
    }

    res.render("./site/product_dichvu", { product, category, category_noibat, imgOne, image });
  } catch (err) {
    console.error("❌ Lỗi tại productdichvu:", err);
    res.status(500).send("Có lỗi xảy ra khi load dịch vụ");
  }
};

// CATEGORY TINTUC
const categoryitintuc = async (req, res) => {
  try {
    const id = req.params.id; // có thể là ObjectId hoặc slug
    const slug = req.params.slug;

    const category = await findByIdOrSlug(Menu_tintucModel, id);
    if (!category) return res.status(404).send("Không tìm thấy danh mục");

    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const product = await BaiviettintucModel.find({ menutintuc_id: category._id, nhap: true }).sort({ _id: -1 });

    const totalRows = await Product_sanphamModel.countDocuments({ spdv: true, nhap: true });
    const totalPages = Math.ceil(totalRows / limit);

    const products = await Product_sanphamModel
      .find({ spdv: true, nhap: true })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const menuproduct = await Menu_danhmuc_sanphamModel.find();

    res.render("./site/category_tintuc", {
      product,
      category,
      products,
      menuproduct,
      slug,
      id,
      page,
      totalPages,
      next: page + 1,
      hasNext: page < totalPages,
      prev: page - 1,
      hasPrev: page > 1,
      pages: pagination(page, totalPages),
    });
  } catch (err) {
    console.error("❌ Lỗi tại categoryitintuc:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// PRODUCT TINTUC (ObjectId or slug)
const productTinTuc = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await findByIdOrSlug(BaiviettintucModel, id);
    if (!product) return res.status(404).send("Không tìm thấy bài viết");

    const category = await Menu_tintucModel.findById(product.menutintuc_id);

    const baiviet = await BaiviettintucModel.find({
      menutintuc_id: product.menutintuc_id,
      nhap: true,
    }).sort({ _id: -1 });

    res.render("./site/product_tintuc", { product, baiviet, category });
  } catch (err) {
    console.error("❌ Lỗi tại productTinTuc:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// DANH SACH VIDEO
const danhsachvideo = async (req, res) => {
  try {
    const baiviet = await BaivietdichvuModel.find({ nhap: true });
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;
    const totalRows = await VideoModel.countDocuments();
    const totalPages = Math.ceil(totalRows / limit);
    const product = await VideoModel.find({}).sort({ _id: -1 }).skip(skip).limit(limit);

    res.render("./site/danhsachvideo", {
      product,
      page,
      totalPages,
      next: page + 1,
      hasNext: page < totalPages,
      prev: page - 1,
      hasPrev: page > 1,
      pages: pagination(page, totalPages),
      baiviet
    });
  } catch (err) {
    console.error("❌ Lỗi tại danhsachvideo:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// PRODUCT VIDEO
const productvideo = async (req, res) => {
  try {
    const id = req.params.id;
    const baiviet = await Product_sanphamModel.find({ nhap: true });
    const product = await VideoModel.findById(id);
    if (!product) return res.status(404).send("Không tìm thấy video");
    res.render("./site/product_video", { product, baiviet });
  } catch (err) {
    console.error("❌ Lỗi tại productvideo:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// GIOI THIEU
const gioithieu = async (req, res) => {
  try {
    const chiase = await ChiaseModel.find();
    const product = await Gioi_thieu_trangModel.find();
    res.render("./site/gioithieu", { product, chiase });
  } catch (err) {
    console.error("❌ Lỗi tại gioithieu:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// LIEN HE
const lienhe = async (req, res) => {
  try {
    const thongtin = await Thong_tin_trangModel.find();
    res.render("./site/lienhe", { thongtin });
  } catch (err) {
    console.error("❌ Lỗi tại lienhe:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// PRODUCT SP (sửa an toàn + populate nhomsp_id)
const productsp = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(400).send("ID sản phẩm không hợp lệ");

    const product = await Product_sanphamModel.findById(id).populate("nhomsp_id");
    if (!product) return res.status(404).send("Không tìm thấy sản phẩm");

    let category_danhmuc = null;
    if (product.nhomsp_id && product.nhomsp_id.danhmuc_id) {
      category_danhmuc = await Menu_danhmuc_sanphamModel.findById(product.nhomsp_id.danhmuc_id);
    }

    const product_noibat = await Product_sanphamModel.find({ nhap: true }).limit(5).sort({ _id: -1 });

    res.render("./site/product", { product, category_danhmuc, product_noibat });
  } catch (err) {
    console.error("❌ Lỗi tại productsp:", err);
    res.status(500).send("Có lỗi xảy ra khi load sản phẩm");
  }
};

// OTHER SIMPLE ROUTES
const thuocloban = async (req, res) => {
  try {
    const product = await LobanModel.find();
    res.render("./site/thuoc-lo-ban", { product });
  } catch (err) {
    console.error("❌ Lỗi tại thuocloban:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};
const success = async (req, res) => res.render("./site/success");
const tuvan = async (req, res) => res.render("./site/tuvan");

const guilienhe = async (req, res) => {
  try {
    const body = req.body || {};
    const lienhe = {
      name: body.name || " ",
      lienhe: body.lienhe || " ",
      email: body.email || " ",
      diachi: body.diachi || " ",
      loaicongtrinh: body.loaicongtrinh || " ",
      mucdautu: body.mucdautu || " ",
      img: body.img || " ",
      yeucau: body.yeucau || " ",
      trangthai: false,
    };
    await new TuvanModel(lienhe).save();
    res.redirect("/success");
  } catch (err) {
    console.error("❌ Lỗi tại guilienhe:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

const search = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    // đảm bảo đã tạo index text trên model Product_sanphamModel nếu dùng $text
    const products = await Product_sanphamModel
      .find({ $text: { $search: keyword }, nhap: true })
      .sort({ _id: -1 });

    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const totalRows = products.length;
    const totalPages = Math.ceil(totalRows / limit);
    const product = products.slice(skip, skip + limit);

    res.render("./site/search", {
      products, keyword, product,
      page,
      totalPages,
      next: page + 1,
      hasNext: page < totalPages,
      prev: page - 1,
      hasPrev: page > 1,
      pages: pagination(page, totalPages),
    });
  } catch (err) {
    console.error("❌ Lỗi tại search:", err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

module.exports = {
  home,
  categoryDanhmuc,
  categoryitem,
  categorydichvu,
  categoryitintuc,
  danhsachvideo,
  gioithieu,
  lienhe,
  productTinTuc,
  productsp,
  productdichvu,
  success,
  thuocloban,
  tuvan,
  productvideo,
  guilienhe,
  search,
};
