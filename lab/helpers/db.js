// // helpers/db.js
// const mongoose = require('mongoose');

// module.exports = async () => {
//     try {
//         await mongoose.connect(process.env.MONGOURI || 'mongodb://127.0.0.1:27017/users', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('DB connected');
//     } catch (error) {
//         console.error('DB connection error:', error);
//     }
// };
const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const uri = 'mongodb://127.0.0.1:27017/users';
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected to:', uri);
    } catch (error) {
        console.error('DB connection error:', error);
    }
};

