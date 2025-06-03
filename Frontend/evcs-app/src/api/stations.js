import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


// GET /allChargingStations
export const allChargingStations = async () => {
    try {
        const response = await axios.get(`${API_URL}/allChargingStations`,{
            headers:{
                Authorization : localStorage.getItem('token')
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