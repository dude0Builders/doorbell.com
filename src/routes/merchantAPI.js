import { router } from './index';
import user from "../models/userModel";
import userType from "../models/userTypeModel";
import merchantType from "../models/merchantModel";
import locationModel from "../models/locationModel";
import mongoose, { mongo } from "mongoose";

const Merchant = mongoose.model("Merchants");
const Location = mongoose.model("Locations");
const User = mongoose.model("Users");

router.get("/merchant/list", auth, (req, res, next) => {
    Merchant.find((err, merchants) => {
        if (err) {
             return res.status(500).json({
        'message': 'Error occurred while fetching merchant list ' + err.message
      });
        }
        if (!merchants) {
            return res.status(404).json({
                "message": "No Products available"
            })
        }
        return res.status(200).json(merchants);
    })
});

router.post("/merchant/create", auth, (req, res, next) => {
    if (!req.body.name || !req.body.location || !req.body.serviceLocations || !req.body.serviceRadius) {
        return res.status(403).json({
            "message": "Please fill all the fields"
        })
    }
    try {
        const newMerchant = new Merchant();
        newMerchant.name = req.sanitize(req.body.name);
        newMerchant.location = req.sanitize(req.body.location);
        newMerchant.serviceLocations = req.sanitize(req.body.serviceLocations);
        newMerchant.serviceRadius = req.sanitize(req.body.serviceRadius);
        newMerchant.availability = req.sanitize(req.body.availability);
        newMerchant.serviceActive = req.sanitize(req.body.serviceActive);
        if (!req.body.userId) {
            const userId = req.sanitize(req.body.userId);
            result = await User.findById(userId);
            if (result) {
                newMerchant.userId = userId;
            }
        }
        await newMerchant.save();
    } catch (err) {
        return res.status(500).json({
            "message": "Error occurred while creating a merchant" + err.message 
        })
    }
    return res.status(200).json({
        message: "Successfully Created a merchant"
    })
})

router.put('/merchant/associate', auth, async (req, res) => {
    if (!req.body.userId || !req.body.merchantId) {
        return res.status(400).json({
            "message": "Missing User data"
        })
    }
    try {
        const UserData = await User.findById(req.sanitize(req.body.userId));
        const MerchantData = await Merchant.findById(req.sanitize(req.body.merchantId));
        MerchantData.userId = UserData.id;
        const result = await MerchantData.save();
        if (!result) {
            return res.status(500).json({ message: "Error while saving the userData" })
        }
    } catch (err) {
         return res.status(500).json({ message: "Error occurred while associating" + err.message })
    }
    return res.status(200).json({ message: "Merchant Associated with the user successfully" });
})