const OrderSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    category:{
        type: Object,
        category_description:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        }
    },
    duration:{
        fromDate:{
            type: Date,
            default: Date.now
        },
        toDate:{
            type: Date,
            default: Date.now + 15
        }
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    }
});

const Order = mongoose.model('order',OrderSchema);
module.exports = Order;