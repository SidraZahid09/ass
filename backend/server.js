require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const app = require("./app");

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`AssetElevatte API running at http://localhost:${port}`);
});
