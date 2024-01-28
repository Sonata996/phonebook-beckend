const express = require("express");
const { getContacts } = require("../controllers/contactsController");

const routerContact = express.Router();

routerContact.get("/", getContacts);
routerContact.post("/");
routerContact.delete("/:contactId");
routerContact.put("/:contactId");

module.exports = routerContact;
