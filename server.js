const app = require("./app");
const mongooConect = require("./db/conection");

const { PORT } = process.env;

const startServer = async () => {
  try {
    await mongooConect();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
