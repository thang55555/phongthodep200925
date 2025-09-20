const Menu_tintucModel = require("../models/menu_tintuc");
const Menu_dichvuModel = require("../models/menu_dichvu");
const Thong_tin_trangModel = require("../models/thong_tin_trang");
const Menu_danhmuc_sanphamModel = require("../models/menu_danhmuc_sanpham")
const Menu_nhom_sanphamModel = require("../models/menu_nhom_sanpham");
module.exports = async (req, res, next)=>{
    res.locals.menudv = await Menu_dichvuModel.find();
    res.locals.menutt = await Menu_tintucModel.find();
    res.locals.thongtintrang = await Thong_tin_trangModel.find();
    const menu = await Menu_danhmuc_sanphamModel.find();
    const MENU=[];
    for(item of menu){
        const menu2 = await Menu_nhom_sanphamModel.find({danhmuc_id: item._id});
        Menu = {
            menu1: item.tendanhmuc, 
            menu1slug: item.slug,
            menu1id: item._id,
            menu2: menu2
        }
       MENU.push(Menu);
    }
    res.locals.MENU = MENU;
    res.locals.email = req.session.email;
     if (req.method === 'GET' && !req.originalUrl.match(/\.(js|css|png|jpg|svg|ico|woff2?)$/) && !req.originalUrl.includes('wc-ajax')) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    //lấy url hiện tại
    res.locals.fullUrl = fullUrl;
  }
    next();
}
