const express = require("express");
const { getContacts, createContact, removeContact } = require("../controllers/contactsController");
const { authenticate } = require("../middlewares/authenticate");
const validateBody = require("../decorators/validateBody");
const contactsSchema = require("../schemas/contactsSchema");
const isValid = require("../middlewares/isValided");


const routerContact = express.Router();

routerContact.get("/", authenticate, getContacts);
routerContact.post("/", authenticate, validateBody(contactsSchema), createContact);
routerContact.delete("/:contactId", authenticate,isValid, removeContact);
// routerContact.put("/:contactId", authenticate);

module.exports = routerContact;
