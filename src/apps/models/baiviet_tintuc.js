const mongoose = require("../../common/database")();

const baiviettintucSchema = new mongoose.Schema({
    menutintuc_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu_tintuc",
    },
    tieudebaiviet: {
        type: String,
        required: true,
        text: true,
    },
    nhap: {
        type: Boolean,
    },
    metadescription: {
        type: String,
        required: true,
    },
    metakeywords: {
        type: String,
        required: true, 
    },
    slug:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    content: []
    
}, {
    timestamps: true,
});

const BaiviettintucModel = mongoose.model("Baiviet_tintuc", baiviettintucSchema, "baiviet_tintuc");
module.exports = BaiviettintucModel; 
