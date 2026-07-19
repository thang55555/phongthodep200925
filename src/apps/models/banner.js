const mongoose = require("../../common/database")();

const bannerSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true, 
    },
    
}, {
    timestamps: true,
});

const BannerModel = mongoose.model("Banner", bannerSchema, "banner");
module.exports = BannerModel; 
