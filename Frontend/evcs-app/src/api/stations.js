import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


// GET /allChargingStations
export const allChargingStations = async () => {
    try {
        const response = await axios.get(`${API_URL}/allChargingStations`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        console.log(response.data);
        return response.data.stations;
    } catch (err) {
        if (err.response) {
            console.log(err.response.message);
            return err.response.message;
        } else {
            console.error(err);
            return { message: "Something went wrong" };
        }
    }
};

// POST /addChargingStation
export const addChargingStation = async (station) => {
    try {
        const response = await axios.post(`${API_URL}/addChargingStation`, station, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            console.error(err.response.data.message);
            throw new Error(err.response.data.message);
        } else {
            console.error(err);
            throw new Error("Something went wrong");
        }
    }
};

// PUT /updateChargingStation
export const updateChargingStation = async (station) => {
    try {
        console.log(station.name)
        const response = await axios.put(`${API_URL}/updateChargingStation/${station.name}`,station, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        console.log("Success ",response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            console.error(err.response.data.message);
            throw new Error(err.response.data.message);
        } else {
            console.error(err);
            throw new Error("Something went wrong");
        }
    }
}

// DELETE /deleteChargingStation
export const deleteChargingStation = async(station) => {
    try{
        console.log(station.name);
        const response = await axios.delete(`${API_URL}/deleteChargingStation/${station.name}`, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });
        return response.data;
    } catch(err){
        if (err.response) {
            console.error(err.response.data.message);
            throw new Error(err.response.data.message);
        } else {
            console.error(err);
            throw new Error("Something went wrong");
        }
    }
}
