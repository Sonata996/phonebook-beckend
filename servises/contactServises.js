const Contact = require("../db/models/contactsModel.js");

const getAllContacts = async (owner) => {
  const result = await Contact.find({ owner });
  return result;
};

module.exports = { getAllContacts };
