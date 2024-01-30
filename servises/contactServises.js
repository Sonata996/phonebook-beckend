const Contact = require("../db/models/contactsModel.js");

const getAllContacts = async (owner) => {
  const result = await Contact.find({ owner });
  return result;
};

const addContact = async (data, owner) => {
  const contact = await Contact.create({ ...data, owner });
  return contact;
};

const dellContact = async (_id, owner) =>{
  const contact = await Contact.findOneAndDelete({_id, owner});
  return contact;
}
module.exports = { getAllContacts, addContact, dellContact };
