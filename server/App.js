const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');

const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = config.get('port') || 3003;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use('/api/auth', require('./routes/auth.routes'));

// errors, last MiddleWare
app.use(errorHandler);

const start = async () => {
	try {
		console.log(`connection to MongoDB`);
		mongoose
			.connect(config.get('mongoUrl'), {})
			.then(() => console.log(`conection succes to mongoDB`))
			.catch((e) => console.log(`cannot connect to mongoDB ${e}`));
		app.listen(PORT, () => console.log(`server start on port ${PORT}`));
	} catch (error) {
		console.log(`Server Error ${error.message}`);
		process.exit();
	}
};

start();
