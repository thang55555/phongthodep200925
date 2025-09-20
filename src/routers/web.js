const express = require("express")
const router = express.Router();

//admin Controller
const AdminController = require("../apps/controllers/admin");
const AuthController = require("../apps/controllers/auth");
const ProductController = require("../apps/controllers/product");

// Middleware
const AuthMiddleware = require ("../../src/apps/middlewares/auth")
const UploadMiddleware = require("../apps/middlewares/upload")
const multipartMiddleware = require("../apps/middlewares/ckeditor")
router.post("/upload", multipartMiddleware, ProductController.upload);


//site
const SiteController =require("../apps/controllers/site")



// Router Admin
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);
router.post("/admin/login",AuthMiddleware.checkLogin, AuthController.postLogin);
router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);
router.get("/admin/dashboard", AuthMiddleware.checkAdmin, AdminController.index);




// nam thành phát
router.get("/admin/gioi-thieu-trang", AuthMiddleware.checkAdmin, ProductController.gioithieutrang);
router.get("/admin/edit-gioi-thieu-trang/:id", AuthMiddleware.checkAdmin, ProductController.editgioithieutrang);
router.post("/update-gioi-thieu-trang/:id", AuthMiddleware.checkAdmin,
    UploadMiddleware.array("images", 20), 
    ProductController.updategioithieu);


router.get("/admin/thong-tin-trang", AuthMiddleware.checkAdmin, ProductController.thongtintrang);
router.get("/admin/edit-thong-tin-trang/:id", AuthMiddleware.checkAdmin, ProductController.editthongtintrang);
router.post("/admin/update-thong-tin-trang/:id", AuthMiddleware.checkAdmin,
    UploadMiddleware.array("images", 20), 
    ProductController.updatethongtintrang);


router.get("/admin/danh-muc-san-pham", AuthMiddleware.checkAdmin, ProductController.danhmucsanpham);
router.get("/admin/add-danh-muc-san-pham", AuthMiddleware.checkAdmin, ProductController.adddanhmucsanpham);
router.post("/admin/add-danh-muc", AuthMiddleware.checkAdmin,
    UploadMiddleware.array("images", 20), 
    ProductController.adddanhmuc);
router.get("/admin/edit-danh-muc-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.editdanhmucsanpham);
router.post("/admin/update-danh-muc-san-pham/:id", AuthMiddleware.checkAdmin,
    UploadMiddleware.array("images", 20), 
    ProductController.updatedanhmuc);
router.get("/admin/delete-danh-muc-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.deletedanhmucsanpham);


router.get("/admin/nhom-san-pham", AuthMiddleware.checkAdmin, ProductController.nhomsanpham);
router.get("/admin/add-nhom-san-pham",AuthMiddleware.checkAdmin, ProductController.addnhomsanpham);
router.post("/admin/add-nhom-sp", AuthMiddleware.checkAdmin,
    UploadMiddleware.single("images"), 
    ProductController.addnhomsp);
router.get("/admin/edit-nhom-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.editnhomsanpham);
router.post("/admin/update-nhom-san-pham/:id", AuthMiddleware.checkAdmin,
UploadMiddleware.single("images"),
ProductController.updatenhomsanpham);
router.get("/admin/push-nhom-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.pushanhnhomsanpham);
router.post("/admin/push-anh/:id",
    UploadMiddleware.single("images"), 
    ProductController.pushanh);
router.get("/admin/delete-nhom-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.deletenhomsanpham);
router.get("/admin/anh-nhom-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.anhnhomsanpham);
router.get("/admin/edit-anh-nhom-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.editanhnhomsanpham);
router.post("/admin/upload-anh-nhom-san-pham/:id", AuthMiddleware.checkAdmin,
    UploadMiddleware.single("images"), 
    ProductController.uploadanhnhomsanpham);
router.get("/admin/delete-anh-nhom-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.deleteanhnhomsanpham);


router.get("/admin/danh-sach-san-pham", AuthMiddleware.checkAdmin, ProductController.danhsachsanpham);
router.post("/admin/add-product", AuthMiddleware.checkAdmin,
    UploadMiddleware.array("images", 20),
    ProductController.addproduct);
router.get("/admin/add-san-pham", AuthMiddleware.checkAdmin, ProductController.addsanpham);
router.get("/admin/edit-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.editsanpham);
router.post("/admin/upload-san-pham/:id", AuthMiddleware.checkAdmin,
    UploadMiddleware.array("images", 20),
    ProductController.uploadsanpham);
router.get("/admin/upload-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.uploadsanpham2);
router.get("/admin/delete-san-pham/:id", AuthMiddleware.checkAdmin, ProductController.deletesanpham);


router.get("/admin/danh-sach-menu-tin-tuc", AuthMiddleware.checkAdmin, ProductController.menutintuc);
router.get("/admin/add-menu-tin-tuc", AuthMiddleware.checkAdmin, ProductController.addmenutintuc);
router.post("/admin/add-category-tin-tuc", AuthMiddleware.checkAdmin, ProductController.addcategorytintuc);
router.get("/admin/edit-menu-tin-tuc/:id", AuthMiddleware.checkAdmin, ProductController.editmenutintuc);
router.post("/admin/update-menu-tin-tuc/:id", AuthMiddleware.checkAdmin, ProductController.updatemenutintuc);
router.get("/admin/delete-menu-tin-tuc/:id", AuthMiddleware.checkAdmin, ProductController.deletemenutintuc);

router.get("/admin/danh-sach-bai-viet-tin-tuc", AuthMiddleware.checkAdmin, ProductController.danhsachbaiviettintuc);
router.get("/admin/add-bai-viet-tin-tuc", AuthMiddleware.checkAdmin, ProductController.addbaiviettintuc);
router.post("/admin/upload-bai-viet-tin-tuc", AuthMiddleware.checkAdmin, 
    UploadMiddleware.array("images", 20),
    ProductController.uploadbaiviettintuc);
router.get("/admin/edit-bai-viet-tin-tuc/:id", AuthMiddleware.checkAdmin, ProductController.editbaiviettintuc);
router.post("/admin/update-bai-viet-tin-tuc/:id", AuthMiddleware.checkAdmin,
    UploadMiddleware.array("images", 20),
    ProductController.updatebaiviettintuc);
router.get("/admin/update-bai-viet-tin-tuc/:id", AuthMiddleware.checkAdmin,ProductController.updatebaiviettintuc2);
router.get("/admin/delete-bai-viet-tin-tuc/:id", AuthMiddleware.checkAdmin, ProductController.deletebaiviettintuc);


router.get("/admin/menu-dich-vu", AuthMiddleware.checkAdmin, ProductController.menudichvu);
router.get("/admin/add-menu-dich-vu", AuthMiddleware.checkAdmin, ProductController.addmenudichvu);
router.post("/admin/upload-menu-dich-vu", AuthMiddleware.checkAdmin,
    UploadMiddleware.single("images"),
    ProductController.uploadmenudichvu);
router.get("/admin/edit-menu-dich-vu/:id", AuthMiddleware.checkAdmin,
    UploadMiddleware.single("images"), 
    ProductController.editmenudichvu);
router.post("/admin/update-menu-dich-vu/:id", AuthMiddleware.checkAdmin, UploadMiddleware.single("images"), ProductController.updatemenudichvu);
router.get("/admin/delete-menu-dich-vu/:id", AuthMiddleware.checkAdmin, ProductController.deletemenudichvu);

router.get("/admin/bai-viet-dich-vu", AuthMiddleware.checkAdmin, ProductController.baivietdichvu);
router.get("/admin/add-bai-viet-dich-vu", AuthMiddleware.checkAdmin, ProductController.addbaivietdichvu);
router.post("/admin/upload-bai-viet-dich-vu", AuthMiddleware.checkAdmin,
UploadMiddleware.array("images", 20),
ProductController.uploadbaivietdichvu);
router.get("/admin/edit-bai-viet-dich-vu/:id", AuthMiddleware.checkAdmin, ProductController.editbaivietdichvu);
router.post("/admin/update-bai-viet-dich-vu/:id", AuthMiddleware.checkAdmin, 
UploadMiddleware.array("images", 20),
ProductController.updatebaivietdichvu);
router.get("/admin/update-bai-viet-dich-vu/:id", AuthMiddleware.checkAdmin, ProductController.updatebaivietdichvu2);
router.get("/admin/delete-bai-viet-dich-vu/:id", AuthMiddleware.checkAdmin, ProductController.deletebaivietdichvu);

router.get("/admin/danh-sach-yeu-cau-tu-van", AuthMiddleware.checkAdmin, ProductController.yeucautuvan);
router.post("/admin/edit-yeu-cau-tu-van/:id", ProductController.edityeucautuvan);

router.get("/admin/chia-se-khach-hang", AuthMiddleware.checkAdmin, ProductController.chiasekhachhang);
router.get("/admin/add-chia-se-khach-hang", AuthMiddleware.checkAdmin, ProductController.addchiasekhachhang);
router.post("/admin/upload-chia-se-khach-hang", AuthMiddleware.checkAdmin,
    UploadMiddleware.single("images"), 
    ProductController.uploadchiasekhachhang);
router.get("/admin/edit-chia-se-khach-hang/:id", AuthMiddleware.checkAdmin, ProductController.editchiasekhachhang);

router.post("/admin/update-chia-se-khach-hang/:id",  AuthMiddleware.checkAdmin,
    UploadMiddleware.single("images"), 
    ProductController.updatechiasekhachhang);
router.get("/admin/delete-chia-se-khach-hang/:id", AuthMiddleware.checkAdmin, ProductController.deletechiasekhachhang);

router.get("/admin/thuoc-lo-ban", AuthMiddleware.checkAdmin, ProductController.thuocloban);
router.get("/admin/edit-thuoc-lo-ban/:id", AuthMiddleware.checkAdmin, ProductController.editthuocloban);
router.post("/admin/update-thuoc-lo-ban/:id", AuthMiddleware.checkAdmin,UploadMiddleware.single("images"), ProductController.updatethuocloban);

router.get("/admin/danh-sach-video", AuthMiddleware.checkAdmin, ProductController.video);
router.get("/admin/add-video", AuthMiddleware.checkAdmin, ProductController.addvideo);
router.post("/admin/upload-video", AuthMiddleware.checkAdmin, ProductController.uploadvideo);
router.get("/admin/edit-video/:id", AuthMiddleware.checkAdmin, ProductController.editvideo);
router.post("/admin/update-video/:id", AuthMiddleware.checkAdmin, ProductController.updatevideo);
router.get("/admin/delete-video/:id", AuthMiddleware.checkAdmin, ProductController.deletevideo);

router.get("/admin/search", AuthMiddleware.checkAdmin, ProductController.search);
router.get("/admin/danh-sach-anh", AuthMiddleware.checkAdmin, ProductController.dsanh);
router.get("/admin/danh-sach-anh/tieu-de", AuthMiddleware.checkAdmin, ProductController.dsanhtieude);
router.get("/admin/danh-sach-anh/content", AuthMiddleware.checkAdmin, ProductController.dsanhconent);









// Router Site
router.get("/", SiteController.home);
router.get("/category-menu/:slug/:id", SiteController.categoryDanhmuc);
router.get("/category-item/:slug/:id", SiteController.categoryitem);
router.get("/category-dich-vu/:slug/:id", SiteController.categorydichvu);
router.get("/category-tintuc/:slug/:id", SiteController.categoryitintuc);
router.get("/danh-sach-video", SiteController.danhsachvideo);
router.get("/gioi-thieu", SiteController.gioithieu);
router.get("/lien-he", SiteController.lienhe);
router.get("/product-tin-tuc/:slug/:id", SiteController.productTinTuc);
router.get("/product/:slug/:id", SiteController.productsp);
router.get("/product-video/:slug/:id", SiteController.productvideo);
router.get("/product-dichvu/:slug/:id", SiteController.productdichvu);
router.get("/success", SiteController.success);
router.get("/thuoc-lo-ban", SiteController.thuocloban);
router.get("/tu-van", SiteController.tuvan);
router.get("/search", SiteController.search);
router.post("/gui-lien-he",
    UploadMiddleware.single("images"),
    SiteController.guilienhe);
 

 
module.exports = router;