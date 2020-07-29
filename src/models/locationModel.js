import mongoose, { SchemaTypes } from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    geoCoordinate: {
        lat: { type: SchemaTypes.Number },
        long: { type: SchemaTypes.Number}
    }
})

mongoose.model('Locations', locationSchema, 'Locations');
