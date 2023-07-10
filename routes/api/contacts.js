// const express = require('express')
// const contacts = require('../../models/contacts')
import express from 'express';
import contacts from '../../models/contacts.js';
import {HttpErrors} from '../../helpers';
const router = express.Router()
// const { id, name, phone, email } = contacts;

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result);
  }catch (error) {
    // res.status(500).json({
    //   message: "Server error"
    // })
       next(error)
   }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id)
    if (!result) {
      throw HttpErrors(404, "Not found")
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //   message: "Not found"
      // })  
    }
    res.json(result);
  } catch (error) {
    // const { status = 500, message = 'Server error' } = error;
    // res.status(status).json({
    //   message,
    next(error)
    // })
   }
  
})

router.post('/', async (req, res, next) => {
  try {
    const result = await contacts.addContact(name, email, phone);
  res.json(result)
  } catch (error) {
  //  res.status(500).json({
  //     message: "Server error"
  //   })
       next(error)
   }
   
})

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await contacts.removeContact(id);
  res.json(result)
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error"
    // })
       next(error)
   }
  
})

router.put('/:id', async (req, res, next) => {
  try {
    const result = await contacts.updateContact(id, { name, email, phone });
  res.json(result)
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error"
    // })
       next(error)
   }
   
})

export default router;
