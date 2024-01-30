

const {
  getAllContacts,
  addContact,
  dellContact,
} = require("../servises/contactServises");

const getContacts = async (req, res, next) => {
  try {
    const { user } = req;
    const contacts = await getAllContacts(user._id);

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { user, body } = req;
    const contact = await addContact(body, user._id);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { user } = req;

    const contact = await dellContact(contactId, user._id);
    if (!contact) {
      res.status(404).json({
        message: "not found",
      });
      return;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};




module.exports = { getContacts, createContact, removeContact };
