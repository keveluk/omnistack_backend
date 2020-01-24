const Dev = require("../models/Dev");
const axios = require("axios");
const toarray = require("../utils/toArray");
module.exports = {
  async getdevs(req, res) {
    let search = await Dev.find();
    res.json(search);
  },

  async savedev(req, res) {
    const { github_username, latitude, longitude, techs } = req.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const techsarray = toarray(techs);
      const dev = await Dev.create({
        name: req.body.name,
        github_username: req.body.github_username,
        bio: response.data.bio,
        avatar_url: response.data.avatar_url,
        techs: techsarray,
        location: location
      });
      res.json(dev);
    } else {
      res.json({ message: "Usuário já cadastrado" });
    }
  }
};
