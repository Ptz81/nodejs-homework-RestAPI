import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getAll from './all.js'
import getById from './getById.js'
import addContact from './add.js'
import deleteContact from './delete.js'
import updateContact from './update.js'
import updateFavorite from './updateFavorite.js'


export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact), 
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact)
}