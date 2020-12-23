const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    message: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
});
module.exports = mongoose.model('message', messageSchema);