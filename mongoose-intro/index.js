const mongoose = require('mongoose');

// const bookSchema = mongoose.Schema({
// 	title: {
// 		type: String,
// 		required: true
// 	},
// 	author: String,
// 	pages: Number,
// 	released: Date,
// 	genre: String
// })

// more complex book schema

const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		maxLength: 50
	},
	pages: {
		type: Number,
		max: 5000
	},
	inStock: {
		type: Boolean,
		default: true
	},
	genre: {
		type: String,
		enum: ['Fiction', 'History', 'Classic']
	}
})

const Book = mongoose.model('Book', bookSchema);

mongoose.connect('mongodb://localhost/mongoose-intro')
	.then(() => {
		console.log('successfully connected');
	})
	.catch(err => {
		console.log(err);
	})
// https://mongoosejs.com/docs/queries.html
// CRUD - Create Read Update Delete 

// create a book with the passed properties
// Book.create({
// 	author: 'Haruki Murakami',
// 	pages: 300
// })
// 	.then(bookFromDB => console.log(bookFromDB))
// 	.catch(err => console.log(err))

// use insertMany() to pass an array of books 

// READ
// get all the books from the collection - find() - no parameter

// Book.find()
// 	.then(books => console.log(books));

// Book.find({ author: 'Haruki Murakami' }).limit(1).then(book => console.log(book))

// retrieve a book by it's id
// Book.findById('6130e804efbdfcff1458e428').then(book => console.log(book));


// UPDATE
// findOneAndUpdate() - {query}, {fields to be updated} 
// Book.findOneAndUpdate({ title: 'Norwegian Wood' }, { pages: 500 }, { new: true })
// 	.then(book => console.log(book));

// updateMany() findByIdAndUpdate()

// DELETE
// Book.findOneAndDelete({ title: 'Norwegian Wood' }).then(book => console.log(book));


// a user schema

// john peter miller
// -> John Peter Miller
const userSchema = mongoose.Schema({
	name: {
		type: String,
		set: value => {
			return value
				.split(' ')
				.map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
				.join(' ')
		}
	}
})

const User = mongoose.model('User', userSchema);
User.create({ name: 'john peter miller' })
	.then(user => {
		console.log(user)
		mongoose.connection.close();
	})
	.catch(err => console.log(err))