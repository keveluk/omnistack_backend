const Dev = require("../models/Dev");
const toarray = require("../utils/toArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs, distancia } = req.query;
    const techarray = toarray(techs.toLowerCase());
    const result = await Dev.find({
      techs: {
        $in: techarray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: distancia
        }
      }
    });

    res.json(result);
  }
};
