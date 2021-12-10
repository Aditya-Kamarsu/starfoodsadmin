const AddressSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    h_no:{
        type:String,
        required: true
    },
    street:{
        type:String,
        required: true
    },
    locality:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    pincode:{
        type:String,
        required: true
    }
});

const Address = mongoose.model('address',AddressSchema);
module.exports = Address;