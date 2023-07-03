const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({ 
    username: {
        type: String,
        required: true
    }, 
    courses: {
        type: Array,
        required: true
    } 
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;