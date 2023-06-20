const fs = require('fs');
var faker = require('faker');
const { hashSync } = require("bcrypt")
const saltRounds = 10
const { Product } = require('../models/Product');
const { User } = require('../models/User');
const { connectDB } = require('../db');
const { winstonLogger } = require('../winston/logger');
const dotenv = require("dotenv");

dotenv.config({ path: '../config.env' })


function readFiles(_fileName) {

  let JSONString = fs.readFileSync(`${__dirname}/${_fileName}.json`, 'utf-8')

  let JSONObject = JSON.parse(JSONString)

  return JSONObject.map((value) => {
    return {
      name: value['name'],
      manufacturer: value['productOwner'],
      type: _fileName,
      image: `assets/${_fileName}/${value['img']}`,
      stock: 20,
      price: Number(value['price'].toString().substring(1)),
      slug: faker.helpers.slugify(value.name)
      // no need to delete  val['productOwner']
    }
  })
}

const requireData = async () => {

  let loop = 0
  let users = []
  //  1st 10 users are customers
  for (loop = 0; loop < 9; loop++) {
    users.push(new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: hashSync("123456", saltRounds),
      role: "seller",
      address: {
        first: faker.address.streetAddress(),
        second: "London, UK"
      },
      creditCard: {
        number: faker.finance.creditCardNumber(),
        CVV: faker.finance.creditCardCVV()
      }
    })
    )
  }
  users.push(new User({
    name: "seller123",
    email: "ridwanmonjur@gmail.com",
    password: hashSync("123456", saltRounds),
    role: "seller"
  })
  )
  // 11th user is admin
  users.push(new User({
    name: "admin123",
    email: "mjrrdn@gmail.com",
    password: hashSync("123456", saltRounds),
    role: "admin"
  }))
  // 12th user is superadmin
  users.push(new User({
    name: "superadmin123",
    email: "superadmin@gmail.com",
    password: hashSync("123456", saltRounds),
    role: "superadmin"
  }))
  // 13th user is customer
  users.push(new User({
    name: "customer123",
    email: "mjrrdnasm@gmail.com",
    password: hashSync("123456", saltRounds),
    role: "customer"
  }))
  // 14th-22th users are customers
  for (loop = 0; loop < 10; loop++) {
    users.push(new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: hashSync("123456", saltRounds),
      role: "customer",
      address: {
        first: faker.address.streetAddress(),
        second: "London, UK"
      },
      creditCard: {
        number: faker.finance.creditCardNumber(),
        CVV: faker.finance.creditCardCVV()
      }
    })
    )
  }


  try {
    users = await User.create(users)
  }
  catch {
    winstonLogger.error("error")
  }
  let JSONStringProducts = [...readFiles("accessories"), ...readFiles("boots"), ...readFiles("jerseys")]

  JSONStringProducts.forEach(function (value) {
    // 13th-22th users are customers
    value['seller'] = users[faker.datatype.number({ 'min': 13, 'max': 20 })]._id
  })
  for (loop = 0; loop < 20; loop++) {
    JSONStringProducts[loop]['seller'] = users[9]._id
  }
  try {
    await Product.create(JSONStringProducts)
    winstonLogger.info("Data requireed.... ")
  } catch (err) {
    winstonLogger.error(err)
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    winstonLogger.info('Data Destroyed...')
  } catch (err) {
    winstonLogger.error(err)
  }
}

connectDB()

if (process.argv[2] === '-i') {
  requireData()
} else if (process.argv[2] === '-d') {
  deleteData()
}

exports.resetData = async () => {
  try {
    await deleteData()
    await requireData()
    const users = await User.find({})
    const products = await Product.find({})
    winstonLogger.info({
      products, users
    });
    winstonLogger.info("Data replaced...")
  } catch (err) {
    winstonLogger.error(err)
  }
}

