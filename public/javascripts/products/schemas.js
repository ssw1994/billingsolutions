var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let productSchema = new Schema({
    _id: ObjectId,
    productName: String,
    description: String,
    price: Number,
    quantity: Number,
    discount: Number,
    createdBy: ObjectId,
    createdOn: Date,
    modifiedBy: ObjectId,
    modifiedOn: Date
}
);

let proudct = new mongoose.model('Product',productSchema,'tblproducts');
//module.exports = proudct;

let imageSchema = new Schema({
    _id: ObjectId,
    productId: ObjectId,
    base64: Buffer,
    physicalName: String,
    logicalName: String,
    path: String,
    type: String,
    createdBy: ObjectId,
    createdOn: Date,
    modifiedBy: ObjectId,
    modifiedOn: Date
})

let image = new mongoose.model('tblImages',imageSchema);
//module.exports = image;

let rrScehema = new Schema({
    _id: ObjectId,
    productId: ObjectId,
    userId: ObjectId,
    review: String,
    rating: Number,
    createdBy: ObjectId,
    createdOn: Date,
    modifiedBy: ObjectId,
    modifiedOn: Date
});

let RandR = new mongoose.model('tblProductReviews',rrScehema);
//module.exports = RandR;

const Model = {
    proudct:proudct,
    image:image,
    RandR:RandR
}

module.exports = Model;
