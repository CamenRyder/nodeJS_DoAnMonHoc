let mongoose = require('mongoose');
let brandSchema = mongoose.Schema({
    tenLoai:{
        type:String,
        required:true,
        unique:true
    },
    anhDaiDien:{
        type:String,
        default:"",
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
module.exports = mongoose.model('brand',brandSchema)