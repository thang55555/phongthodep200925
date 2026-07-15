const mongoose = require("../../common/database")();
const menu_dichvuSchema = new mongoose.Schema({
    menudichvu:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    images:{
        type: String, 

        
        required: true,
    },
    content: [],
               title: {
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
    web: {
        type: [String],
        defadef: [],
    }, 
 
    
}, {timestamps:true});
const Menu_dichvuModel = mongoose.model("Menu_dichvu", menu_dichvuSchema, "menu_dichvu");
module.exports = Menu_dichvuModel;