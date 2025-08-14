import React, { useState } from "react";
import axios from "axios";

function AddCoffeeItem() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !category || !price || !imageFile) {
            alert("Please fill all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("image", imageFile); // Will be sent as file

        try {
            await axios.post("http://localhost:5009/addcoffee", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Coffee item added successfully");
            // Clear form
            setName("");
            setCategory("");
            setPrice("");
            setImageFile(null);
        } catch (err) {
            console.error(err);
            alert("Failed to add coffee item");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>Add Coffee Item</h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            /><br /><br />

            <input
                type="text"
                placeholder="Category (e.g., Hot Coffee)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            /><br /><br />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            /><br /><br />

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
            /><br /><br />

            <button type="submit">Add Item</button>
        </form>
    );
}

export default AddCoffeeItem;
