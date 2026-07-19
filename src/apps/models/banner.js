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
    title: {
        type: String,
        required: true,
    },
    metadescription: {
        type: String,
        required: true,
    },
    metakeywords: {
        type: String,
        required: true,
    }, 
      content: []
    
}, {
    timestamps: true,
});

const BannerModel = mongoose.model("Banner", bannerSchema, "banner");
module.exports = BannerModel; 
