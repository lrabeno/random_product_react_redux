const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const faker = require('faker')

const db = new Sequelize(
    process.env.DATABASE_URL || 'redux_hw_crazy_products',
     'postgres',
     'Ny1knicks23',{
    host: 'localhost',
    dialect: 'postgres'
  });

const Product = db.define('product', {
    name: {
        type: STRING
    }
})

const Manufacturer = db.define('manufacturer', {
    name: {
        type: STRING
    }
})


const syncAndSeed = async() => {
    await db.sync({force: true});
    const [hat, pant, stapler, google, facebook, amazon] = await Promise.all([
        Product.create({name: 'spaghetti hat'}),
        Product.create({name: 'cat pants'}),
        Product.create({name: 'jello stapler'}),
        Manufacturer.create({name: 'Google'}),
        Manufacturer.create({name: 'Facebook'}),
        Manufacturer.create({name: 'Amazon'}),
    ])
}

module.exports = {
    syncAndSeed,
    db,
    Product,
    Manufacturer
}