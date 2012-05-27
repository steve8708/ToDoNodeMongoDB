// Todos model
function make(Schema, mongoose) {
	var TodoSchema = new Schema({
	  title: String,
	  done: Boolean,
	});

    return mongoose.model('Todo', TodoSchema);
}

module.exports.make = make;