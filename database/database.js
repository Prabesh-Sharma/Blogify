const mongoose = require('mongoose');

exports.connectDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://prabeshsharma26:hello@cluster0.kmsqw3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};
