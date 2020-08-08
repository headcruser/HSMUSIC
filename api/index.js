"use strict";
const mongoose = require("mongoose"),
  app = require("./app"),
  port = process.env.PORT || 3977,
  uri = `mongodb://${process.env.HOST_MONGO}:${process.env.PORT_MONGO}/${process.env.DB_MONGO}`,
  options = {
    useNewUrlParser: true,
    socketTimeoutMS: 45000,
    useUnifiedTopology: true,
  };

mongoose.Promise = global.Promise;

(async () => {
  try {
    await mongoose.connect(uri, options);
    app.listen(port, function () {
      console.log("Server API HSMUSIC in http://localhost:" + port);
    });
  } catch (err) {
    console.log(`Error API HMUSIC ${err}`);
  }
})();