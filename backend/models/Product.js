const { Schema, model } = require('mongoose')
const faker = require('faker')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    image:  {
        type: String,
        required: true
    },
    slug: String,
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    seller: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
},
    { strict: true }
)

ProductSchema.plugin(mongoosePaginate);

const Product = model('Product', ProductSchema)

ProductSchema.pre('save', function () {
    this.slug = faker.helpers.slugify(this.name)
})

module.exports = {  Product, }


