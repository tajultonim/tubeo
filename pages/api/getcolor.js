import axios from "axios";
const getColors = require("get-image-colors");

export default async function color(req, res) {
  let path = req.query.path;
  let url = "https://image.tmdb.org/t/p/original" + path;
  await axios({ method: "get", url, responseType: "arraybuffer" }).then(
    async function (response) {
      let buffer = Buffer.from(response.data, "binary");
      let colors = await getColors(buffer, "image/jpg");
      colors = colors.map((color) => color.hex());
    }
  );
}
