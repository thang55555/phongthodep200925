
const pagination = require("../../common/pagination");
const slug = require("slug");
const fs = require("fs");
const path = require("path");
const Gioi_thieu_trangModel = require("../models/gioi_thieu_trang");
const Thong_tin_trangModel = require("../models/thong_tin_trang");
const Menu_danhmuc_sanphamModel = require("../models/menu_danhmuc_sanpham");
const Menu_nhom_sanphamModel = require("../models/menu_nhom_sanpham");
const Anh_nhom_san_phamModel = require("../models/anh_nhom_san_pham");
const Product_sanphamModel = require("../models/product_sanpham");
const Menu_tintucModel = require("../models/menu_tintuc");
const BaiviettintucModel = require("../models/baiviet_tintuc");
const Menu_dichvuModel = require("../models/menu_dichvu");
const BaivietdichvuModel = require("../models/baiviet_dichvu");
const TuvanModel = require("../models/tuvan");
const ChiaseModel = require("../models/chiase");
const VideoModel = require("../models/video");
const LobanModel = require("../models/loban");
const ImagesModel = require("../models/images");





// nam thành phát


const upload = (req, res) => {
    // fs.renameSync(files.upload.path, path.resolve("src/public/images", files.upload.originalFilename));
    // const newPath = path.resolve("src/public/images", files.upload.originalFilename);
    // let funcNum = req.query.CKEditorFuncNum;                 
    // let msg = 'Upload successfully';
    // res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"','"+newPath+"','"+msg+"');</script>");


    try {
        fs.readFile(req.files.upload.path, function (err, data) {
            var newPath = path.resolve("public/images", req.files.upload.originalFilename);
            fs.writeFile(newPath, data, function (err) {
                if (err) console.log({ err: err });
                else {
                    console.log(req.files.upload.originalFilename);
                    //     imgl = '/images/req.files.upload.originalFilename';
                    //     let img = "<script>window.parent.CKEDITOR.tools.callFunction('','"+imgl+"','ok');</script>";
                    //    res.status(201).send(img);

                    let fileName = req.files.upload.name;
                    let url = '/images/' + fileName;
                    let msg = 'Upload successfully';
                    let funcNum = req.query.CKEditorFuncNum;
                    const add = {
                        images: fileName,
                        note: "01"
                    }
                     new ImagesModel(add).save();
           

                    res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('" + funcNum + "','" + url + "','" + msg + "');</script>");
                }
            });
        });
    } catch (error) {
        console.log(error.message);
    }

}




const gioithieutrang = async (req, res) => {
    const gioithieu = await Gioi_thieu_trangModel.find();
    res.render("./admin/thong-tin-trang/gioi-thieu-trang", { gioithieu })
}
const editgioithieutrang = async (req, res) => {
    const id = req.params.id;
    const gioithieu = await Gioi_thieu_trangModel.findById(id);
    res.render("./admin/thong-tin-trang/edit-gioi-thieu-trang", { gioithieu })
}
const updategioithieu = async (req, res) => {
    const id = req.params.id;
    const { files, body } = req;
    const update = {
        linkvideo: body.linkvideo,
        gioithieuchung: body.gioithieuchung,
        content_tamnhin: body.content_tamnhin,
        content_sumenh: body.content_sumenh,
        content_cotloi: body.content_cotloi,
        content_kythuat: body.content_kythuat,
    }
    if(files){
            update["img_tamnhin"] = files[0].originalname,
            update["img_cotloi"] = files[1].originalname,
            update["img_kythuat"] = files[2].originalname
        for (item of files) {
            fs.renameSync(item.path, path.resolve("src/public/site/images/update", item.originalname));
        }
    }

       const add = {
                        images: files[0].originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
       const add1 = {
                        images: files[1].originalname,
                        note: "02"
                    };
        new ImagesModel(add1).save();
       const add2 = {
                        images: files[2].originalname,
                        note: "02"
                    };
        new ImagesModel(add2).save();
       

    await Gioi_thieu_trangModel.updateOne({ _id: id }, { $set: update });
    res.redirect("/admin/gioi-thieu-trang")

}



const thongtintrang = async (req, res) => {
    const thongtintrang = await Thong_tin_trangModel.find();
    res.render("./admin/thong-tin-trang/thong-tin-trang", { thongtintrang })
}
const editthongtintrang = async (req, res) => {
    const id = req.params.id;
    const thongtin = await Thong_tin_trangModel.findById(id);
    res.render("./admin/thong-tin-trang/edit-thong-tin-trang", { thongtin })
}
const updatethongtintrang = async (req, res) => {
    const id = req.params.id;
    const { files, body } = req;
    console.log(files, body );
    const update = {
        sdt: body.sdt, 
        email: body.email,
        tencongty: body.tencongty,
        tieudeFB: body.tieudeFB,
        diachiFB: body.diachiFB,
        linkFB: body.linkFB,
        diachiMap: body.diachiMap,
        linkMap: body.linkMap,
        gioithieu: body.gioithieu,
    }
    if(files.length==2){
        update["images"] = files[0].originalname;
        update["video"] = files[1].originalname;
            const add = {
                        images: files[0].originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
    for (item of files) {
        fs.renameSync(item.path, path.resolve("src/public/site/images/update", item.originalname));
    }
    }


    await Thong_tin_trangModel.updateOne({ _id: id }, { $set: update });
    res.redirect("/admin/thong-tin-trang")
}



const danhmucsanpham = async (req, res) => {
    const danhmuc = await Menu_danhmuc_sanphamModel.find().sort({ _id: -1 });
    const stt = 1;
    res.render("./admin/menu-danh-muc/danh-sach-menu-danh-muc", { danhmuc, stt })
}
const adddanhmucsanpham = async (req, res) => {
    res.render("./admin/menu-danh-muc/add-menu-danh-muc", { data: {} })
}
const adddanhmuc = async (req, res) => {
    let tendanhmuc = req.body;
    const sosanh = await Menu_danhmuc_sanphamModel.find({ tendanhmuc: tendanhmuc.tendanhmuc });
    if (sosanh.length < 1) {
        const add = {
            tendanhmuc: tendanhmuc.tendanhmuc,
            slug: slug(tendanhmuc.tendanhmuc),
            content: tendanhmuc.content
        }
        new Menu_danhmuc_sanphamModel(add).save();
        res.redirect("/admin/danh-muc-san-pham")
    }
    else {
        res.render("./admin/menu-danh-muc/add-menu-danh-muc", { data: { error: "Danh mục đã tồn tại" } })
    }

}
const editdanhmucsanpham = async (req, res) => {
    const id = req.params.id;
    const danhmuc = await Menu_danhmuc_sanphamModel.findById(id);
    res.render("./admin/menu-danh-muc/edit-menu-danh-muc", { danhmuc })
}
const updatedanhmuc = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const danhmuc = {
        tendanhmuc: body.tendanhmuc,
        slug: slug(body.tendanhmuc),
        content: body.content
    }
    await Menu_danhmuc_sanphamModel.updateOne({ _id: id }, { $set: danhmuc });
    res.redirect("/admin/danh-muc-san-pham");
}
const deletedanhmucsanpham = async (req, res) => {
    const id = req.params.id;
    const delnhom = await Menu_nhom_sanphamModel.find({ danhmuc_id: id })
    for (item of delnhom) {
        await Menu_nhom_sanphamModel.deleteOne({ _id: item._id });
        const delproduct = await Product_sanphamModel.find({ nhomsp_id: item._id });
        for (item2 of delproduct) {
            await Product_sanphamModel.deleteOne({ _id: item2._id });
        }
    }

    await Menu_danhmuc_sanphamModel.deleteOne({ _id: id });
    res.redirect("/admin/danh-muc-san-pham")
}






const nhomsanpham = async (req, res) => {
    const nhomsanpham = await Menu_nhom_sanphamModel
        .find()
        .populate({ path: "danhmuc_id" })
        .sort({ _id: -1 });
        const stt = 1;
    res.render("./admin/nhom-san-pham/danh-sach-nhom-san-pham", { nhomsanpham, stt })
}
const addnhomsanpham = async (req, res) => {
    const danhmuc = await Menu_danhmuc_sanphamModel.find()
    res.render("./admin/nhom-san-pham/add-nhom-san-pham", { data: {}, danhmuc })
}
const addnhomsp = async (req, res) => {
    const danhmuc = await Menu_danhmuc_sanphamModel.find()
    const { body } = req;
    const sosanh = await Menu_nhom_sanphamModel.find({ tennhomsanpham: body.tennhomsanpham });
    if (sosanh.length < 1) {
        const add = {
            danhmuc_id: body.danhmuc_id,
            tennhomsanpham: body.tennhomsanpham,
            slug: slug(body.tennhomsanpham),
            quytrinh: body.quytrinh
        }
        new Menu_nhom_sanphamModel(add).save();
        res.redirect("/admin/nhom-san-pham");
    }
    else {
        res.render("./admin/nhom-san-pham/add-nhom-san-pham", { data: { error: "Nhóm sản phẩm đã tồn tại" }, danhmuc })
    }

}
const editnhomsanpham = async (req, res) => {
    const id = req.params.id;
    const editnhom = await Menu_nhom_sanphamModel.findById(id);
    const danhmuc = await Menu_danhmuc_sanphamModel.find();
    res.render("./admin/nhom-san-pham/edit-nhom-san-pham", { editnhom, danhmuc })
}
const updatenhomsanpham = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const update = {
        danhmuc_id: body.danhmuc_id,
        tennhomsanpham: body.tennhomsanpham,
        slug: slug(body.tennhomsanpham),
        quytrinh: body.quytrinh
    }
    await Menu_nhom_sanphamModel.updateOne({ _id: id }, { $set: update });
    res.redirect("/admin/nhom-san-pham")
}
const deletenhomsanpham = async (req, res) => {
    const id = req.params.id;

    const delproduct = await Product_sanphamModel.find({ nhomsp_id: id });
    for (item2 of delproduct) {
        await Product_sanphamModel.deleteOne({ _id: item2._id });
    }
    const delimg = await Anh_nhom_san_phamModel.find({ anhnhom_id: id })
    for (item2 of delimg) {
        await Anh_nhom_san_phamModel.deleteOne({ _id: item2._id });
    }

    await Menu_nhom_sanphamModel.deleteOne({ _id: id });
    res.redirect("/admin/nhom-san-pham")
}

const pushanhnhomsanpham = async (req, res) => {
    const id = req.params.id;
    const push = await Menu_nhom_sanphamModel.findById(id);
    res.render("./admin/nhom-san-pham/push-img-danh-muc-sp", { push})
}
const pushanh = async (req, res) => {
    const id = req.params.id;
    const { file, body } = req;
    if (file) {
        fs.renameSync(file.path, path.resolve("src/public/site/images/update", file.originalname));
        const image = {
            anhnhom_id: id,
            images: file.originalname,
            content: body.content,
        }
        new Anh_nhom_san_phamModel(image).save();
         const add = {
                        images: file.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
    }
      res.redirect("/admin/nhom-san-pham")
}


const anhnhomsanpham = async (req, res) => {
    const id = req.params.id;
    const anhnhom = await Anh_nhom_san_phamModel.find({ anhnhom_id: id }).sort({ _id: -1 });
    const tieude = await Menu_nhom_sanphamModel.findById(id);
    const stt = 1;
    res.render("./admin/nhom-san-pham/danh-sach-anh-nhom-san-pham", { anhnhom, tieude, stt })
}
const editanhnhomsanpham = async (req, res) => {
    const id = req.params.id;
    const editanh = await Anh_nhom_san_phamModel.findById(id);
    const tieude = await Menu_nhom_sanphamModel.findById(editanh.anhnhom_id);
    const danhmuc = await Menu_nhom_sanphamModel.find();
    res.render("./admin/nhom-san-pham/edit-anh-nhom-san-pham", { editanh, tieude, danhmuc })
}
const uploadanhnhomsanpham = async (req, res) => {
    const id = req.params.id;
    const { file, body } = req;
    const update = {
        anhnhom_id: body.tennhomsanpham_id,
        content: body.content,
    }
    if (file) {
        const images = file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/site/images/update", file.originalname));
        update["images"] = images;
         const add = {
                        images: file.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
    }
    await Anh_nhom_san_phamModel.updateOne({ _id: id }, { $set: update });
      res.redirect(`/admin/anh-nhom-san-pham/${body.tennhomsanpham_id}`);
}
const deleteanhnhomsanpham = async (req, res) => {
    const id = req.params.id;
    await Anh_nhom_san_phamModel.deleteOne({ _id: id });
    res.redirect("/admin/nhom-san-pham")
}


const danhsachsanpham = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = page * limit - limit;
    const totalRows = await Product_sanphamModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows / limit)
    const product = await Product_sanphamModel
        .find()
        .sort({ _id: -1 })
        .populate({ path: "nhomsp_id" })
        .populate({ path: "menudichvu_id" })
        .skip(skip)
        .limit(limit);
        const next = page + 1;
        const hasNext = page < totalPages ? true : false;
        const prev = page - 1;
        const hasPrev = page > 1 ? true : false;
        const stt = 1;
     
    res.render("./admin/danh-sach-san-pham/danh-sach-san-pham", { product, stt,
        page,
        totalPages,
        next,
        hasNext,
        prev,
        hasPrev,
        pages: pagination(page, totalPages), })
}
const addsanpham = async (req, res) => {
    const danhmuc = await Menu_nhom_sanphamModel.find();
    const dichvu = await Menu_dichvuModel.find();
    res.render("./admin/danh-sach-san-pham/add-san-pham", { danhmuc, dichvu })
}
const addproduct = async (req, res) =>{
    const { files, body } = req;
    const products = {
        nhomsp_id: body.danhmuc_id,
        tieudesp: body.tieudesp,
        spdv: body.spdv == "on",
        menudichvu_id: body.dichvu_id,
        metadescription: body.metadescription,
        metakeywords: body.metakeywords,
        slug: slug(body.tieudesp),
        chudautu: body.chudautu,
        diachi: body.diachi,
        congnang: body.congnang,
        kinhphi: body.kinhphi,
        loaihinh: body.loaihinh,
        donvi: body.donvi,
        dientich: body.dientich,
        namthicong: body.namthicong,
        danhmuc_id: body.danhmuc_id,
        content: body.content,
        nhap: body.nhap == "on",
    };
 
    if (files) {
        const uploadimg = [];
        for (item of files) {
            uploadimg.push(item.originalname);
            fs.renameSync(item.path, path.resolve("src/public/site/images/update", item.originalname));
                const add = {
                        images: item.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
        }

        const image = [];
        for (var i = 0; i < files.length; i++) {
            img = {
                stt: i,
                images: uploadimg[i]
            }
            image.push(img)
        }
        products["image"] = image;
   
    }
    new Product_sanphamModel(products).save();
    res.redirect("/admin/danh-sach-san-pham");

}


const editsanpham = async (req, res) => {
    const id = req.params.id;
    const page = req.query.page;
    const danhmuc = await Menu_nhom_sanphamModel.find();
    const product = await Product_sanphamModel.findById(id);
    const dichvu = await Menu_dichvuModel.find();
    res.render("./admin/danh-sach-san-pham/edit-san-pham", { danhmuc, product,dichvu, page })
}

const uploadsanpham= async (req, res) =>{
    const id = req.params.id;
    const { files, body } = req;
    const products = {
        nhomsp_id: body.danhmuc_id,
        tieudesp: body.tieudesp,
        spdv: body.spdv == "on",
        menudichvu_id: body.dichvu_id,
        metadescription: body.metadescription,
        metakeywords: body.metakeywords,
        slug: slug(body.tieudesp),
        chudautu: body.chudautu,
        diachi: body.diachi,
        congnang: body.congnang,
        kinhphi: body.kinhphi,
        loaihinh: body.loaihinh,
        donvi: body.donvi,
        dientich: body.dientich,
        namthicong: body.namthicong,
        danhmuc_id: body.danhmuc_id,
        content: body.content,
        nhap: body.nhap == "on",
    };
    if (files) {
        const uploadimg = [];
        for (item of files) {
            uploadimg.push(item.originalname);
            fs.renameSync(item.path, path.resolve("src/public/site/images/update", item.originalname));
             const add = {
                        images: item.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
        }
        if(files.length > 0){
          const image = [];
            for (var i = 0; i < files.length; i++) {
            img = {
                stt: i,
                images: uploadimg[i]
            }
            image.push(img)
        }
        products["image"] = image;
    }
    }
    await Product_sanphamModel.updateOne({ _id: id }, { $set: products });
    res.redirect('/admin/danh-sach-san-pham?page=' + req.query.page);
}



const uploadsanpham2 = async (req, res) => {
    const id = req.params.id;
    const product = await Product_sanphamModel.findById(id);
    if(product.nhap == true){
        const products = {
            nhap: false
        }
        await Product_sanphamModel.updateOne({ _id: id }, { $set: products });
    }
    else{
        const products = {
            nhap: true
        }
        await Product_sanphamModel.updateOne({ _id: id }, { $set: products });
    }
  res.redirect('/admin/danh-sach-san-pham?page=' + req.query.page);
}

const deletesanpham = async (req, res) => {
    const id = req.params.id;
    await Product_sanphamModel.deleteOne({ _id: id });
    res.redirect('/admin/danh-sach-san-pham?page=' + req.query.page);
}



const menutintuc = async (req, res) => {
    const category_tintuc = await Menu_tintucModel.find().sort({ _id: -1 });
    const stt = 1;
    res.render("./admin/menu-tin-tuc/danh-sach-menu-tin-tuc", { category_tintuc, stt })
}
const addmenutintuc = async (req, res) => {
    res.render("./admin/menu-tin-tuc/add-menu-tin-tuc", { data: {} })
}
const addcategorytintuc = async (req, res) => {
    const body = req.body;
    const sosanh = await Menu_tintucModel.find({ menutintuc: body.menutintuc });
    if (sosanh.length < 1) {
        const addcategory = {
            menutintuc: body.menutintuc,
            slug: slug(body.menutintuc),
            linkvideo: body.linkvideo,
        }
        new Menu_tintucModel(addcategory).save();
        res.redirect("/admin/danh-sach-menu-tin-tuc")
    }
    else {
        res.render("./admin/menu-tin-tuc/add-menu-tin-tuc", { data: { error: "Nhóm sản phẩm đã tồn tại" } })
    }
}
const editmenutintuc = async (req, res) => {
    const id = req.params.id;
    const update = await Menu_tintucModel.findById(id);
    res.render("./admin/menu-tin-tuc/edit-menu-tin-tuc", { update })
}
const updatemenutintuc = async (req, res) => {
    const id = req.params.id;
    const update = {
        menutintuc: req.body.menutintuc,
        slug: slug(req.body.menutintuc),
        linkvideo: req.body.linkvideo,
    }
    await Menu_tintucModel.updateOne({ _id: id }, { $set: update });
    res.redirect("/admin/danh-sach-menu-tin-tuc")
}
const deletemenutintuc = async (req, res) => {
    const id = req.params.id;
    const delbaiviet = await BaiviettintucModel.find({ menutintuc_id: id })
    for (item2 of delbaiviet) {
        await BaiviettintucModel.deleteOne({ _id: item2._id });
    }

    await Menu_tintucModel.deleteOne({ _id: id });
    res.redirect("/admin/danh-sach-menu-tin-tuc")
}

const danhsachbaiviettintuc = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = page * limit - limit;
    const totalRows = await BaiviettintucModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows / limit);
    const product_baiviettintuc = await BaiviettintucModel
        .find()
        .populate({ path: "menutintuc_id" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);
        const next = page + 1;
        const hasNext = page < totalPages ? true : false;
        const prev = page - 1;
        const hasPrev = page > 1 ? true : false;
        const stt = 1;
    res.render("./admin/menu-tin-tuc/danh-sach-bai-viet-tin-tuc", { product_baiviettintuc, stt,
        page,
        totalPages,
        next,
        hasNext,
        prev,
        hasPrev,
        pages: pagination(page, totalPages), })
}
const addbaiviettintuc = async (req, res) => {
    const category = await Menu_tintucModel.find();
    res.render("./admin/menu-tin-tuc/add-bai-viet-tin-tuc", { category })
}
const uploadbaiviettintuc = async (req, res) => {
    const { files, body } = req;
    const product = {
        menutintuc_id: body.menutintuc_id,
        tieudebaiviet: body.tieudebaiviet,
        slug: slug(body.tieudebaiviet),
        content: body.content,
        metadescription: body.metadescription,
        metakeywords: body.metakeywords,
    }
    if (files) {
        for (item of files) {
            const image = item.originalname;
            fs.renameSync(item.path, path.resolve("src/public/site/images/update", item.originalname));
            product["image"] = image;
                            const add = {
                        images: item.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
        }
    }
    new BaiviettintucModel(product).save();
    res.redirect('/admin/danh-sach-bai-viet-tin-tuc?page=' + req.query.page)
}
const editbaiviettintuc = async (req, res) => {
    const id = req.params.id;
    const page = req.query.page;
    const product = await BaiviettintucModel.findById(id);
    const category = await Menu_tintucModel.find();
    res.render("./admin/menu-tin-tuc/edit-bai-viet-tin-tuc", { product, category, page })
}
const updatebaiviettintuc = async (req, res) => {
    const id = req.params.id;
    const { files, body } = req;
    const product = {
        menutintuc_id: body.menutintuc_id,
        tieudebaiviet: body.tieudebaiviet,
        slug: slug(body.tieudebaiviet),
        content: body.content,
        metadescription: body.metadescription,
        metakeywords: body.metakeywords,
    }
    if (files) {
        for (item of files) {
            const image = item.originalname;
            fs.renameSync(item.path, path.resolve("src/public/site/images/update", item.originalname));
            product["image"] = image;
                            const add = {
                        images: item.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
        }
    }
    await BaiviettintucModel.updateOne({ _id: id }, { $set: product });
     res.redirect('/admin/danh-sach-bai-viet-tin-tuc?page=' + req.query.page)

}
const updatebaiviettintuc2 = async (req, res) => {
    const id = req.params.id;
    const product = await BaiviettintucModel.findById(id);
    if(product.nhap == true){
        const products = {
            nhap: false
        }
        await BaiviettintucModel.updateOne({ _id: id }, { $set: products });
    }
    else{
        const products = {
            nhap: true
        }
        await BaiviettintucModel.updateOne({ _id: id }, { $set: products });
    }
       res.redirect('/admin/danh-sach-bai-viet-tin-tuc?page=' + req.query.page)
}
const deletebaiviettintuc = async (req, res) => {
    const id = req.params.id;
    await BaiviettintucModel.deleteOne({ _id: id });
       res.redirect('/admin/danh-sach-bai-viet-tin-tuc?page=' + req.query.page)
}




const menudichvu = async (req, res) => {
    const category = await Menu_dichvuModel.find().sort({ _id: -1 });
    const stt = 1;
    res.render("./admin/menu-dich-vu/danh-sach-menu-dich-vu", { category, stt })
}
const addmenudichvu = async (req, res) => {
    res.render("./admin/menu-dich-vu/add-menu-dich-vu", { data: {} });
}
const uploadmenudichvu = async (req, res) => {
    const { file, body } = req;
    const sosanh = await Menu_dichvuModel.find({ menudichvu: body.menudichvu });
    if (sosanh.length < 1) {
        const addcategory = {
            menudichvu: body.menudichvu,
            slug: slug(body.menudichvu),
            content: body.content
        }
        if (file) {
            const images = file.originalname;
            fs.renameSync(file.path, path.resolve("src/public/site/images/update", file.originalname));
            addcategory["images"] = images;
                 const add = {
                        images: file.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
        }
        new Menu_dichvuModel(addcategory).save();
        res.redirect("/admin/menu-dich-vu")
    }
    else {
        res.render("./admin/menu-dich-vu/add-menu-dich-vu", { data: { error: "Menu đã tồn tại" } })
    }
}
const editmenudichvu = async (req, res) => {
    const id = req.params.id;
    const category = await Menu_dichvuModel.findById(id);
    res.render("./admin/menu-dich-vu/edit-menu-dich-vu", { category })
}
const updatemenudichvu = async (req, res) => {
    const id = req.params.id;
    const { file, body } = req;
    const category = {
        menudichvu: body.menudichvu,
        slug: slug(body.menudichvu),
        content: body.content
    }
    if (file) {
        const images = file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/site/images/update", file.originalname));
        category["images"] = images;
             const add = {
                        images: file.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
    }
    await Menu_dichvuModel.updateOne({ _id: id }, { $set: category });
    res.redirect("/admin/menu-dich-vu")
}
const deletemenudichvu = async (req, res) => {
    const id = req.params.id;
    const delbaiviet = await BaivietdichvuModel.find({ menudichvu_id: id })
    for (item2 of delbaiviet) {
        await BaivietdichvuModel.deleteOne({ _id: item2._id });
    }
    await Menu_dichvuModel.deleteOne({ _id: id });
    res.redirect("/admin/menu-dich-vu")
}




const baivietdichvu = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = page * limit - limit;
    const totalRows = await BaivietdichvuModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows / limit);
    const product = await BaivietdichvuModel
    .find()
    .populate({ path: "menudichvu_id" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
    const next = page + 1;
    const hasNext = page < totalPages ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false;
    const stt = 1;
    res.render("./admin/menu-dich-vu/danh-sach-bai-viet-dich-vu", { product, stt,
        page,
        totalPages,
        next,
        hasNext,
        prev,
        hasPrev,
        pages: pagination(page, totalPages), })
}
const addbaivietdichvu = async (req, res) => {
    const category = await Menu_dichvuModel.find();
    res.render("./admin/menu-dich-vu/add-bai-viet-dich-vu", { category })
}
const uploadbaivietdichvu = async (req, res) => {
    const { files, body } = req;
    const product = {
        menudichvu_id: body.menudichvu_id,
        tieudesp: body.tieudesp,
        slug: slug(body.tieudesp),
        chudautu: body.chudautu,
        congnang: body.congnang,
        diachi: body.diachi,
        kinhphi: body.kinhphi,
        loaihinh: body.loaihinh,
        donvi: body.donvi,
        dientich: body.dientich,
        namthicong: body.namthicong,
        content: body.content,
        metadescription: body.metadescription,
        metakeywords: body.metakeywords,
    }
    if (files) {
        const uploadimg = [];
        for (item of files) {
            uploadimg.push(item.originalname);
            fs.renameSync(item.path, path.resolve("src/public/site/images/update", item.originalname));
                 const add = {
                        images: item.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
        }

        const image = [];
        for (var i = 0; i < files.length; i++) {
            img = {
                stt: i,
                images: uploadimg[i]
            }
            image.push(img)
        }
        product["image"] = image;
    }

    new BaivietdichvuModel(product).save();
    res.redirect('/admin/bai-viet-dich-vu?page=' + req.query.page);

}
const editbaivietdichvu = async (req, res) => {
    const id = req.params.id;
    const page = req.query.page;
    const product = await BaivietdichvuModel.findById(id);
    const category = await Menu_dichvuModel.find();
    res.render("./admin/menu-dich-vu/edit-bai-viet-dich-vu", { product, category, page });
}
const updatebaivietdichvu = async (req, res) => {
    const id = req.params.id;
    const { files, body } = req;
    const product = {
        menudichvu_id: body.menudichvu_id,
        tieudesp: body.tieudesp,
        slug: slug(body.tieudesp),
        chudautu: body.chudautu,
        congnang: body.congnang,
        diachi: body.diachi,
        kinhphi: body.kinhphi,
        loaihinh: body.loaihinh,
        donvi: body.donvi,
        dientich: body.dientich,
        namthicong: body.namthicong,
        content: body.content,
        metadescription: body.metadescription,
        metakeywords: body.metakeywords,
    }
    if (files.length > 0) {
        const uploadimg = [];
        for (item of files) {
            uploadimg.push(item.originalname);
            fs.renameSync(item.path, path.resolve("src/public/site/images/update", item.originalname));
                 const add = {
                        images: item.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
        }

        const image = [];
        for (var i = 0; i < files.length; i++) {
            img = {
                stt: i,
                images: uploadimg[i]
            }
            image.push(img)
        }
        product["image"] = image;
    }
    await BaivietdichvuModel.updateOne({ _id: id }, { $set: product });
    res.redirect('/admin/bai-viet-dich-vu?page=' + req.query.page);
}

const updatebaivietdichvu2 = async (req, res) => {
    const id = req.params.id;
    const product = await BaivietdichvuModel.findById(id);
    if(product.nhap == true){
        const products = {
            nhap: false
        }
        await BaivietdichvuModel.updateOne({ _id: id }, { $set: products });
    }
    else{
        const products = {
            nhap: true
        }
        await BaivietdichvuModel.updateOne({ _id: id }, { $set: products });
    }
    res.redirect('/admin/bai-viet-dich-vu?page=' + req.query.page);
}

const deletebaivietdichvu = async (req, res) => {
    const id = req.params.id;
    await BaivietdichvuModel.deleteOne({ _id: id });
    res.redirect('/admin/bai-viet-dich-vu?page=' + req.query.page);
}




const yeucautuvan = async (req, res) => {
    const product = await TuvanModel.find().sort({ _id: -1 });
    const stt = 1;
    res.render("./admin/tu-van/yeu-cau-tu-van", { product, stt })
}
const edityeucautuvan = async (req, res) => {
    const id = req.params.id;
    const product = {
        trangthai: req.body.trangthai == "true"
    }
    await TuvanModel.updateOne({ _id: id }, { $set: product });
    res.redirect("/admin/danh-sach-yeu-cau-tu-van")
}


const chiasekhachhang = async (req, res) => {
    const product = await ChiaseModel.find().sort({ _id: -1 });
    const stt = 1;
    res.render("./admin/chia-se-khach-hang/danh-sach-chia-se-KH", { product, stt })
}
const addchiasekhachhang = async (req, res) => {
    res.render("./admin/chia-se-khach-hang/add-chia-se-kh")
}
const uploadchiasekhachhang = async (req, res) => {
    const { file, body } = req;
    const product = {
        name: body.name,
        content: body.content
    }
    if (file) {
        fs.renameSync(file.path, path.resolve("src/public/site/images/update", file.originalname));
        product["images"] = file.originalname;
             const add = {
                        images: file.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
    }
    new ChiaseModel(product).save();
    res.redirect("/admin/chia-se-khach-hang");
}
const editchiasekhachhang = async (req, res) => {
    const id = req.params.id;
    const product = await ChiaseModel.findById(id);
    res.render("./admin/chia-se-khach-hang/edit-chia-se-KH", { product }) 
}
const updatechiasekhachhang = async (req, res) => {
    const id = req.params.id;
    const { file, body } = req;
    const product = {
        name: body.name,
        content: body.content
    }
    if (file) {
        fs.renameSync(file.path, path.resolve("src/public/site/images/update", file.originalname));
        product["images"] = file.originalname;
             const add = {
                        images: file.originalname,
                        note: "02"
                    };
        new ImagesModel(add).save();
    }
    await ChiaseModel.updateOne({ _id: id }, { $set: product });
    res.redirect("/admin/chia-se-khach-hang");
}
const deletechiasekhachhang = async (req, res) => {
    const id = req.params.id;
    await ChiaseModel.deleteOne({ _id: id });
    res.redirect("/admin/chia-se-khach-hang")
}


const video = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = page * limit - limit;
    const totalRows = await VideoModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows / limit);
    const product = await VideoModel
    .find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
    const next = page + 1;
    const hasNext = page < totalPages ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false;
    const stt = 1;
    res.render("./admin/video/danh-sach-video", { product, stt,
        page,
        totalPages,
        next,
        hasNext,
        prev,
        hasPrev,
        pages: pagination(page, totalPages) })
}
const addvideo = async (req, res) => {

    res.render("./admin/video/add-video")
}
const uploadvideo = async (req, res) => {
    const product = {
        tieude: req.body.tieude,
        content: req.body.content,
        slug: slug(req.body.tieude),
        linkvideo: req.body.linkvideo
    }
    new VideoModel(product).save();
    res.redirect("/admin/danh-sach-video")
}
const editvideo = async (req, res) => {
    const id = req.params.id;
    const product = await VideoModel.findById(id);
    res.render("./admin/video/edit-video", { product })
}
const updatevideo = async (req, res) => {
    const id = req.params.id;
    const product = {
        tieude: req.body.tieude,
        content: req.body.content,
        slug: slug(req.body.tieude),
        linkvideo: req.body.linkvideo
    }
    await VideoModel.updateOne({ _id: id }, { $set: product });
    res.redirect("/admin/danh-sach-video")
}
const deletevideo = async (req, res) => {
    const id = req.params.id;
    await VideoModel.deleteOne({ _id: id });
    res.redirect("/admin/danh-sach-video")
}
const search = async (req, res) => {
    const keyword = req.query.keyword || "";
    const products = await Product_sanphamModel
        .find({
            $text: {
                $search: keyword,
            }
        })
        .sort({ _id: -1 });

    const product = await BaivietdichvuModel
        .find({
            $text: {
                $search: keyword,
            }
        })
        .sort({ _id: -1 })    
    const product2 = await BaiviettintucModel
        .find({
            $text: {
                $search: keyword,
            }
        })
        .sort({ _id: -1 })    
    const total = products.length + product.length + product2.length
    res.render("./admin/search", {products, keyword, total, product, product2})
}


const thuocloban = async (req, res) => {
    const product = await LobanModel.find();
    res.render("./admin/lo-ban/lo-ban", {product})
}
const editthuocloban = async (req, res) => {
    const id = req.params.id;
    const product = await LobanModel.findById(id);
    res.render("./admin/lo-ban/edit-lo-ban", {product})
}
const updatethuocloban = async (req, res) => {
    const id = req.params.id;
    const product = {
        metadescription: req.body.metadescription,
        content: req.body.content,
        metakeywords: req.body.metakeywords,
        title: req.body.title,

    }
    await LobanModel.updateOne({ _id: id }, { $set: product });
    res.redirect("/admin/thuoc-lo-ban")
}
//danh sách ảnh


const dsanh = async (req, res) => {
    const tieude = await ImagesModel.find({note: '02'});
    const content = await ImagesModel.find({note: '01'});
    res.render("./admin/danh-sach-anh/menu-danh-sach",{tieude, content})
}

const dsanhtieude = async (req, res) => {
        const image = await ImagesModel.find({note: '02'}).sort({ _id: -1 });
    res.render("./admin/danh-sach-anh/danh-sach-anh-tieu-de", {image})
}
const dsanhconent = async (req, res) => {
        const image = await ImagesModel.find({note: '01'}).sort({ _id: -1 });
    res.render("./admin/danh-sach-anh/danh-sach-anh-content",{image})
}


module.exports = {

    upload, gioithieutrang, editgioithieutrang, updategioithieu, thongtintrang, editthongtintrang, updatethongtintrang,
    danhmucsanpham, adddanhmucsanpham, adddanhmuc, updatedanhmuc, editdanhmucsanpham, deletedanhmucsanpham,
    nhomsanpham, addnhomsanpham, addnhomsp, editnhomsanpham, updatenhomsanpham, deletenhomsanpham,
    anhnhomsanpham, editanhnhomsanpham,  uploadanhnhomsanpham, pushanhnhomsanpham, pushanh, deleteanhnhomsanpham,
    danhsachsanpham, addsanpham, addproduct, editsanpham, uploadsanpham, deletesanpham,
    menutintuc, addmenutintuc, addcategorytintuc, deletemenutintuc, editmenutintuc, updatemenutintuc,
    danhsachbaiviettintuc,  addbaiviettintuc, uploadbaiviettintuc,  editbaiviettintuc,  updatebaiviettintuc,
    deletebaiviettintuc, menudichvu, addmenudichvu, uploadmenudichvu, editmenudichvu, updatemenudichvu,
    deletemenudichvu, baivietdichvu, addbaivietdichvu, uploadbaivietdichvu, editbaivietdichvu, updatebaivietdichvu,
    deletebaivietdichvu, yeucautuvan, edityeucautuvan, chiasekhachhang, addchiasekhachhang, uploadchiasekhachhang,
    editchiasekhachhang, updatechiasekhachhang, deletechiasekhachhang, video,  addvideo, uploadvideo,  editvideo,
    updatevideo,  deletevideo, search, uploadsanpham2, updatebaiviettintuc2,updatebaivietdichvu2,
    thuocloban, editthuocloban, updatethuocloban, dsanh, dsanhtieude, dsanhconent, 
}