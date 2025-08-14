import axios from "axios";

export const printReceipt = async (billData) => {
  try {
    const res = await axios.post("http://localhost:5001/print-receipt", billData);
    console.log("Print status:", res.data);
  } catch (err) {
    console.error("Print Error:", err.message);
  }
};
