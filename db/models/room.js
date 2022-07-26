const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: { // is the chat's parent (like Ogólne, Głosowe, etc.) (Backroom + name)
        type: String,
        required: true
    },
    owner: { // Take user Discord ID
        type: String,
        required: true,
        minlength: 1,
    },
    users: {  // Takes users Discord IDs
        type: [String],
        required: true,
        default: [],
    },
    chats: { // chats has an array of chat IDs
        type: [Object],
        required: true,
        minlength: 1,
    },
    category: {
        type: String,
        required: true,
        minlength: 1,
    },
    server: {
        type: String,
        required: true,
    },
    settings: { // settings is the chat's additional settings
        type: Object,
        required: true,
        default: {
            isConfigured: false,
            isArchived: false,
        }
    }
}, { timestamps: true }); // timestamps is a plugin that adds createdAt and updatedAt fields to the schema

module.exports = mongoose.model('Room', RoomSchema);