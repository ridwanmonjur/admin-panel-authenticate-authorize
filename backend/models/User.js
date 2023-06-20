const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const { Roles } = require('../helper/Roles');

const UserSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    password:
    {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: String,
        default: 'customer',
        required: true,
        enum: [Roles.Admin, Roles.Customer, Roles.Seller, Roles.SuperAdmin],
    },
    token: {
        resetPassword: String,
        verifyEmail: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    address: {
        first: String,
        second: String
    },
    creditCard: {
        number: String,
        CVV: {
            type: String,
            required: false,
        }
    },
})
UserSchema.plugin(mongoosePaginate);


const User = model('User', UserSchema)

module.exports = { User }
