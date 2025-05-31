import chargingStation from "../models/chargingStation.js";
import mongoose from "mongoose";

//POST v1/addChargingStation
export const addCS= async(req,res) => {
    try{
        console.log('POST /api/v1/addChargingStation');
        await chargingStation.create(req.body);
        return res.status(201).json({message:"Charging station created successfully"});
    } catch(err){
        console.error(err.name);
        if (err.code === 11000) {
            return res.status(409).json({ message: "Charging station already exists" });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Enter all the fields" });
        }
        return res.status(500).send("Internal Server Error");
    }
};

//GET v1/allChargingStations
export const viewAllCS = async(req,res)=>{
    try{
        console.log('GET /v1/allChargingStations');
        const stations = await chargingStation.find({});
        if(stations.length>=1){
            return res.status(200).json({message:"Fetched all tickets", stations});
        } else{
            return res.status(404).json({message:"No charging stations found"});
        }
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};

// PUT /api/v1/updateChargingStation/:id
export const updateCS = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid MongoDB ObjectId" });
    }

  try {
    console.log(`PUT /api/v1/updateChargingStation/${id}`);

    const updatedStation = await chargingStation.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } 
    );
    
    if (!updatedStation) {
      return res.status(404).json({ message: "Charging station not found" });
    }
   
    return res.status(200).json({ message: "Charging station updated", data: updatedStation });
  } 
  
  catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//DELETE /api/v1/deleteChargingStation

export const deleteCS = async(req,res)=>{
    console.log('/DELETE /api/v1/deleteChargingStation');
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid MongoDB ObjectId" });
    }
    console.log("ID FOUND");
    try{
        const x = await chargingStation.deleteOne({_id:id});
        console.log(x);
        return res.status(200).json({message:"Successfully deleted"});
    } catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};