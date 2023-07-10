// const express = require('express')
// const contacts = require('../../models/contacts')
import express from 'express';
import contacts from '../../models/contacts.js';

const router = express.Router()
const { id, name, phone, email } = contacts;

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result);
  }catch (error) {
    res.status(500).json({
      message: "Server error"
    })
   }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await contacts.getContactById(id)
  res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
   }
  
})

router.post('/', async (req, res, next) => {
  try {
    const result = await contacts.addContact(name, email, phone);
  res.json(result)
  } catch (error) {
   res.status(500).json({
      message: "Server error"
    })
   }
   
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await contacts.removeContact(id);
  res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
   }
  
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const result = await contacts.updateContact(id, { name, email, phone });
  res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
   }
   
})

export default router;
