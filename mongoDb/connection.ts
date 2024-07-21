const mongoose = require('mongoose');


module.exports = () => {
    // const connectionParams = {
    //     useNewUrlParser: "true",
    //     useUnifiedTopology: "true"
    // }

    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected Database");
    }
    catch (error) {
        // console.log(error.message)
        console.log('nOT CoNNeCted')

    }
}