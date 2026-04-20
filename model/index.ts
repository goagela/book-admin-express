const mongoose = require('mongoose')
const userSchema = require('./userModel')

const uri = "mongodb+srv://bookAdmin:123456abc@cluster0.zcuygau.mongodb.net/?appName=Cluster0"
async function main() {
  mongoose.connect(uri)
}
main().then(() => {
  console.log('mongodb connected');
}).catch((err) => {
  console.log(err);
})

const User = mongoose.model('User', userSchema)
module.exports = { User }