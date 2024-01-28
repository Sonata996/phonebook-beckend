const { getAllContacts } = require("../servises/contactServises");

const getContacts = async (req, res, next) => {
  try {
    const { user } = req;
    const contacts = await getAllContacts(user._id);

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = { getContacts };
