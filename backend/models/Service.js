const ServiceSchema=mongoose.Schema({
    subscription:{
        type: String,
        required: true
    }
});

const Service = mongoose.model('service',ServiceSchema);
module.exports = Service;