import mongoose from 'mongoose'
import userSchema from './userModel.js'
import bookSchema from './bookModel.js'
import categorySchema from './categoryModel.js'

const uri = "mongodb+srv://bookAdmin:123456abc@cluster0.zcuygau.mongodb.net/?appName=Cluster0"
async function main() {
  await mongoose.connect(uri)
}
main().then(() => {
  console.log('mongodb connected');
}).catch((err) => {
  console.log(err);
})

const User = mongoose.model('User', userSchema)
const Book = mongoose.model("Book", bookSchema)
const Category = mongoose.model("Category", categorySchema)
export { User, Book, Category }