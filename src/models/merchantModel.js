import mongoose, { SchemaTypes } from 'mongoose';

var merchantSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "Users"  
    },
    name: {
        type: String,
    },
    location: {
        type: SchemaTypes.ObjectId,
        ref: 'Locations'
    },
    serviceLocations: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Locations'
        }
    ],
    serviceRadius: Number,
    availabilty: [
        {
            weekdays: {
                serviceActive: {
                    type: Boolean, 
                    default: true,
                },
                starttime: Number, // 1000
                endtime: Number // 2100
            },
            weekends: {
                serviceActive: {
                    type: Boolean, 
                    default: true,
                },
                starttime: Number,
                endtime: Number
            }
        }
    ],
    serviceActive: {
        type: Boolean,
        default: true,
    }
})

mongoose.model('Merchants', merchantSchema, 'Merchants');
