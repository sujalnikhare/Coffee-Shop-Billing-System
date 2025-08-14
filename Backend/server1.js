// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const CoffeeUserData = require('./models/signupfile');
// const CoffeeItem = require('./models/coffeeItem'); 
// const Customer = require('./models/customer');

// const app = express();
// const MONGO_URI = "mongodb://localhost:27017/PerkLeaf-Coffee";

// //printer
// const ThermalPrinter = require('node-thermal-printer').printer;
// const PrinterTypes = require('node-thermal-printer').types;


// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));


// // Multer setup
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // MongoDB Connection
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.error("MongoDB Connection Error:", err));
// // mongoose.connect(MONGO_URI)
// //   .then(() => console.log("MongoDB Connected"))
// //   .catch((err) => console.error("MongoDB Connection Error:", err));


// // Signup Route
// app.post("/coffeesignupdata", upload.none(), async (req, res) => {
//     try {
//         const { name, mobile, email, pass } = req.body;

//         const existingUser = await CoffeeUserData.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: "Email already registered" });
//         }

//         const newUser = new CoffeeUserData({ name, mobile, email, pass });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         console.error("Signup Error:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // Login Route
// app.post("/login", async (req, res) => {
//     try {
//         const { email, pass } = req.body;

//         const user = await CoffeeUserData.findOne({ email, pass }); // ✅ match model field
//         if (!user) {
//             return res.status(401).json({ error: "Invalid email or password" });
//         }

//         const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
//         res.json({ token });
//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });




// // Add Coffee Item into database
// app.post("/addcoffee", upload.single("image"), async (req, res) => {
//     try {
//         const { name, category, price } = req.body;

//         if (!name || !category || !price || !req.file) {
//             return res.status(400).json({ error: "All fields are required including image" });
//         }

//         const image = req.file.buffer.toString("base64");

//         const newItem = new CoffeeItem({
//             name,
//             category,
//             price,
//             image
//         });

//         await newItem.save();

//         res.status(201).json({ message: "Coffee item added successfully" });
//     } catch (error) {
//         console.error("Error adding coffee item:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });









// // Get categorized coffee items
// app.get("/allcoffee", async (req, res) => {
//     try {
//         const coffeeItems = await CoffeeItem.find();

//         const categorized = {};

//         coffeeItems.forEach(item => {
//             const key = item.category.toLowerCase().replace(/\s+/g, '');
//             if (!categorized[key]) {
//                 categorized[key] = [];
//             }
//             categorized[key].push(item);
//         });

//         res.json(categorized);
//     } catch (error) {
//         console.error("Error fetching coffee items:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });





// // printer code

// // app.post('/print-bill', async (req, res) => {
// //   const { table, customer, items } = req.body;

// // //   const printer = new ThermalPrinter({
// // //     type: PrinterTypes.EPSON,
// // //     interface: 'usb',
// // //     characterSet: 'SLOVENIA',
// // //     removeSpecialCharacters: false,
// // //     lineCharacter: "-",
// // //   });

// // const printer = new ThermalPrinter({
// //   type: PrinterTypes.EPSON,
// //   interface: 'usb', // or 'COM3' or 'tcp://<printer-ip>'
// //   width: 48,
// //   characterSet: 'SLOVENIA',
// //   removeSpecialCharacters: false,
// //   lineCharacter: "-",
// // });


// //   try {
// //     const now = new Date();
// //     const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// //     // 🔒 Constants
// //     const shopName = "PerkLeaf Coffee";
// //     const address = "123 Brew Street, Opp Centre Point, Nagpur - 440024";
// //     const fssai = "215220556801232";
// //     const gstin = "27EAMPS1223M1Z9";

// //     // 🖨️ Build Printable Bill
// //     printer.alignCenter();
// //     printer.setTextDoubleHeight();
// //     printer.println(shopName);
// //     printer.setTextNormal();
// //     printer.println("by PERKLEAF");
// //     printer.println(address);
// //     printer.println(`FSSAI: ${fssai}`);
// //     printer.println(`GSTIN: ${gstin}`);
// //     printer.println("Dine In");
// //     printer.drawLine();

// //     printer.alignLeft();
// //     printer.println(`Bill No: PL-${Date.now().toString().slice(-5)}   Order No: ${Date.now().toString().slice(-3)}`);
// //     printer.println(`Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
// //     printer.println(`Table: ${table}`);
// //     printer.println(`Customer: ${customer.name}`);
// //     printer.println(`Phone: ${customer.phone}`);
// //     printer.drawLine();

// //     printer.tableCustom([
// //       { text: "Item", align: "LEFT", width: 0.5 },
// //       { text: "Qty", align: "CENTER", width: 0.2 },
// //       { text: "Rate", align: "CENTER", width: 0.15 },
// //       { text: "Amt", align: "RIGHT", width: 0.15 },
// //     ]);

// //     items.forEach(item => {
// //       const itemTotal = item.price * item.quantity;
// //       printer.tableCustom([
// //         { text: item.name, align: "LEFT", width: 0.5 },
// //         { text: item.quantity.toString(), align: "CENTER", width: 0.2 },
// //         { text: item.price.toFixed(2), align: "CENTER", width: 0.15 },
// //         { text: itemTotal.toFixed(2), align: "RIGHT", width: 0.15 },
// //       ]);
// //     });

// //     printer.drawLine();
// //     printer.alignRight();
// //     printer.bold(true);
// //     printer.println(`TOTAL: ₹${total.toFixed(2)}`);
// //     printer.bold(false);
// //     printer.drawLine();

// //     printer.setTextNormal();
// //     printer.alignCenter();
// //     printer.println("Live life from one high to another ☕");
// //     printer.println("THANK YOU");
// //     printer.println(now.toLocaleString());
// //     printer.cut();

// //     // ✅ Console Bill Preview
// //     console.log("\n========= PERKLEAF COFFEE BILL PREVIEW =========");
// //     console.log(`${shopName}\nby PERKLEAF`);
// //     console.log(address);
// //     console.log(`FSSAI: ${fssai} | GST: ${gstin}`);
// //     console.log("Dine In");
// //     console.log("------------------------------------------------");
// //     console.log(`Bill No: PL-${Date.now().toString().slice(-5)}   Order No: ${Date.now().toString().slice(-3)}`);
// //     console.log(`Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
// //     console.log(`Table: ${table}`);
// //     console.log(`Customer: ${customer.name} | Phone: ${customer.phone}`);
// //     console.log("------------------------------------------------");
// //     items.forEach(item => {
// //       const amt = item.quantity * item.price;
// //       console.log(`${item.name}  x${item.quantity} @ ₹${item.price}  => ₹${amt}`);
// //     });
// //     console.log("------------------------------------------------");
// //     console.log(`TOTAL: ₹${total.toFixed(2)}`);
// //     console.log("------------------------------------------------");
// //     console.log("Live life from one high to another ☕");
// //     console.log(now.toLocaleString());
// //     console.log("================================================\n");

// //     const isConnected = await printer.isPrinterConnected();
// //     if (!isConnected) throw new Error("Printer not connected.");
// //     await printer.execute();

// //     res.status(200).send("🧾 Bill sent to printer and console preview printed!");
// //   } catch (err) {
// //     console.error("Print error:", err);
// //     res.status(500).send("❌ Failed to print bill.");
// //   }
// // });



// app.post('/print-bill', async (req, res) => {
//   const { table, customer, items } = req.body;

//   const printer = new ThermalPrinter({
//     type: PrinterTypes.EPSON, // Assuming EPSON command set, common for thermal printers
//     interface: 'COM3', // <--- CHANGE THIS: Replace 'COM3' with your printer's actual COM port
//     // If it's a different interface, uncomment and use one of the options below:
//     // interface: 'tcp://192.168.1.100', // For network printers (replace with printer's IP)
//     // interface: '/dev/usb/lp0', // For Linux/macOS USB printers
//     width: 48,
//     characterSet: 'SLOVENIA', // To support ₹
//     removeSpecialCharacters: false,
//     lineCharacter: "-",
//   });

//   try {
//     const now = new Date();
//     const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     // 🔒 Constants
//     const shopName = "PerkLeaf Coffee";
//     const address = "123 Brew Street, Opp Centre Point, Nagpur - 440024";
//     const fssai = "215220556801232";
//     const gstin = "27EAMPS1223M1Z9";

//     // 🖨️ Build Printable Bill
//     printer.alignCenter();
//     printer.setTextDoubleHeight();
//     printer.println(shopName);
//     printer.setTextNormal();
//     printer.println("by PERKLEAF");
//     printer.println(address);
//     printer.println(`FSSAI: ${fssai}`);
//     printer.println(`GSTIN: ${gstin}`);
//     printer.println("Dine In");
//     printer.drawLine();

//     printer.alignLeft();
//     printer.println(`Bill No: PL-${Date.now().toString().slice(-5)}    Order No: ${Date.now().toString().slice(-3)}`);
//     printer.println(`Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
//     printer.println(`Table: ${table}`);
//     printer.println(`Customer: ${customer.name}`);
//     printer.println(`Phone: ${customer.phone}`);
//     printer.drawLine();

//     printer.tableCustom([
//       { text: "Item", align: "LEFT", width: 0.5 },
//       { text: "Qty", align: "CENTER", width: 0.2 },
//       { text: "Rate", align: "CENTER", width: 0.15 },
//       { text: "Amt", align: "RIGHT", width: 0.15 },
//     ]);

//     items.forEach(item => {
//       const itemTotal = item.price * item.quantity;
//       printer.tableCustom([
//         { text: item.name, align: "LEFT", width: 0.5 },
//         { text: item.quantity.toString(), align: "CENTER", width: 0.2 },
//         { text: item.price.toFixed(2), align: "CENTER", width: 0.15 },
//         { text: itemTotal.toFixed(2), align: "RIGHT", width: 0.15 },
//       ]);
//     });

//     printer.drawLine();
//     printer.alignRight();
//     printer.bold(true);
//     printer.println(`TOTAL: ₹${total.toFixed(2)}`);
//     printer.bold(false);
//     printer.drawLine();

//     printer.setTextNormal();
//     printer.alignCenter();
//     printer.println("Live life from one high to another ☕");
//     printer.println("THANK YOU");
//     printer.println(now.toLocaleString());
//     printer.cut();

//     // ✅ Console Bill Preview (already present, good for debugging)
//     console.log("\n========= PERKLEAF COFFEE BILL PREVIEW =========");
//     console.log(`${shopName}\nby PERKLEAF`);
//     console.log(address);
//     console.log(`FSSAI: ${fssai} | GST: ${gstin}`);
//     console.log("Dine In");
//     console.log("------------------------------------------------");
//     console.log(`Bill No: PL-${Date.now().toString().slice(-5)}    Order No: ${Date.now().toString().slice(-3)}`);
//     console.log(`Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
//     console.log(`Table: ${table}`);
//     console.log(`Customer: ${customer.name} | Phone: ${customer.phone}`);
//     console.log("------------------------------------------------");
//     items.forEach(item => {
//       const amt = item.quantity * item.price;
//       console.log(`${item.name}    x${item.quantity} @ ₹${item.price}    => ₹${amt}`);
//     });
//     console.log("------------------------------------------------");
//     console.log(`TOTAL: ₹${total.toFixed(2)}`);
//     console.log("------------------------------------------------");
//     console.log("Live life from one high to another ☕");
//     console.log(now.toLocaleString());
//     console.log("================================================\n");

//     const isConnected = await printer.isPrinterConnected();
//     if (!isConnected) {
//       console.error("Printer connection check failed: Printer not connected.");
//       throw new Error("Printer not connected.");
//     }
//     await printer.execute();

//     res.status(200).send("🧾 Bill sent to printer and console preview printed!");
//   } catch (err) {
//     console.error("Print error:", err);
//     res.status(500).send(`❌ Failed to print bill: ${err.message}`);
//   }
// });








// // order place customer details
// app.post("/customer-order", async (req, res) => {
//     const { name, phone, superCoins, orderDetails } = req.body;

//     if (!name || !phone || superCoins === undefined) {
//         return res.status(400).json({ message: "Name, phone, and superCoins are required." });
//     }

//     try {
//         let customer = await Customer.findOne({ phone: phone });

//         if (customer) {
//             customer.superCoins += superCoins;
//             if (orderDetails) {
//                 customer.orders.push(orderDetails);
//             }
//             await customer.save();
//             return res.status(200).json({ message: "Customer super coins updated successfully", customer });
//         } else {
//             customer = new Customer({
//                 name,
//                 phone,
//                 superCoins,
//                 orders: orderDetails ? [orderDetails] : []
//             });
//             await customer.save();
//             return res.status(201).json({ message: "New customer created successfully", customer });
//         }
//     } catch (err) {
//         console.error("Error storing/updating customer:", err);
//         if (err.code === 11000) {
//             return res.status(409).json({ message: "A customer with this phone number already exists." });
//         }
//         res.status(500).json({ message: "Server error while processing customer data." });
//     }
// });





// // Start the Server
// app.listen(5001)

















































const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const CoffeeUserData = require('./models/signupfile');
const CoffeeItem = require('./models/coffeeItem');
const Customer = require('./models/customer');

const app = express();
const MONGO_URI = "mongodb://localhost:27017/PerkLeaf-Coffee";

//printer
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB Connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
// mongoose.connect(MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));


// Signup Route
app.post("/coffeesignupdata", upload.none(), async (req, res) => {
    try {
        const { name, mobile, email, pass } = req.body;

        const existingUser = await CoffeeUserData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const newUser = new CoffeeUserData({ name, mobile, email, pass });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, pass } = req.body;

        const user = await CoffeeUserData.findOne({ email, pass }); // ✅ match model field
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




// Add Coffee Item into database
app.post("/addcoffee", upload.single("image"), async (req, res) => {
    try {
        const { name, category, price } = req.body;

        if (!name || !category || !price || !req.file) {
            return res.status(400).json({ error: "All fields are required including image" });
        }

        const image = req.file.buffer.toString("base64");

        const newItem = new CoffeeItem({
            name,
            category,
            price,
            image
        });

        await newItem.save();

        res.status(201).json({ message: "Coffee item added successfully" });
    } catch (error) {
        console.error("Error adding coffee item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});









// Get categorized coffee items
app.get("/allcoffee", async (req, res) => {
    try {
        const coffeeItems = await CoffeeItem.find();

        const categorized = {};

        coffeeItems.forEach(item => {
            const key = item.category.toLowerCase().replace(/\s+/g, '');
            if (!categorized[key]) {
                categorized[key] = [];
            }
            categorized[key].push(item);
        });

        res.json(categorized);
    } catch (error) {
        console.error("Error fetching coffee items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});








app.post('/print-bill', async (req, res) => {
    const { table, customer, items } = req.body;

    const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON, // Assuming EPSON command set, common for thermal printers
        interface: 'COM3', // <--- CHANGE THIS: Replace 'COM3' with your printer's actual COM port
        // If it's a different interface, uncomment and use one of the options below:
        // interface: 'tcp://192.168.1.100', // For network printers (replace with printer's IP)
        // interface: '/dev/usb/lp0', // For Linux/macOS USB printers
        width: 48,
        characterSet: 'SLOVENIA', // To support ₹
        removeSpecialCharacters: false,
        lineCharacter: "-",
    });

    try {
        const isConnected = await printer.isPrinterConnected();
        if (!isConnected) {
            console.error("Printer connection check failed: Printer not connected or not reachable.");
            return res.status(500).send("❌ Failed to print bill: Printer not connected or not reachable.");
        }

        const now = new Date();
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // 🔒 Constants
        const shopName = "PerkLeaf Coffee";
        const address = "123 Brew Street, Opp Centre Point, Nagpur - 440024";
        const fssai = "215220556801232";
        const gstin = "27EAMPS1223M1Z9";

        // 🖨️ Build Printable Bill
        printer.alignCenter();
        printer.setTextDoubleHeight();
        printer.println(shopName);
        printer.setTextNormal();
        printer.println("by PERKLEAF");
        printer.println(address);
        printer.println(`FSSAI: ${fssai}`);
        printer.println(`GSTIN: ${gstin}`);
        printer.println("Dine In");
        printer.drawLine();

        printer.alignLeft();
        printer.println(`Bill No: PL-${Date.now().toString().slice(-5)}     Order No: ${Date.now().toString().slice(-3)}`);
        printer.println(`Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
        printer.println(`Table: ${table}`);
        printer.println(`Customer: ${customer.name}`);
        printer.println(`Phone: ${customer.phone}`);
        printer.drawLine();

        printer.tableCustom([
            { text: "Item", align: "LEFT", width: 0.5 },
            { text: "Qty", align: "CENTER", width: 0.2 },
            { text: "Rate", align: "CENTER", width: 0.15 },
            { text: "Amt", align: "RIGHT", width: 0.15 },
        ]);

        items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            printer.tableCustom([
                { text: item.name, align: "LEFT", width: 0.5 },
                { text: item.quantity.toString(), align: "CENTER", width: 0.2 },
                { text: item.price.toFixed(2), align: "CENTER", width: 0.15 },
                { text: itemTotal.toFixed(2), align: "RIGHT", width: 0.15 },
            ]);
        });

        printer.drawLine();
        printer.alignRight();
        printer.bold(true);
        printer.println(`TOTAL: ₹${total.toFixed(2)}`);
        printer.bold(false);
        printer.drawLine();

        printer.setTextNormal();
        printer.alignCenter();
        printer.println("Live life from one high to another ☕");
        printer.println("THANK YOU");
        printer.println(now.toLocaleString());
        printer.cut();

        // ✅ Console Bill Preview (already present, good for debugging)
        console.log("\n========= PERKLEAF COFFEE BILL PREVIEW =========");
        console.log(`${shopName}\nby PERKLEAF`);
        console.log(address);
        console.log(`FSSAI: ${fssai} | GST: ${gstin}`);
        console.log("Dine In");
        console.log("------------------------------------------------");
        console.log(`Bill No: PL-${Date.now().toString().slice(-5)}     Order No: ${Date.now().toString().slice(-3)}`);
        console.log(`Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
        console.log(`Table: ${table}`);
        console.log(`Customer: ${customer.name} | Phone: ${customer.phone}`);
        console.log("------------------------------------------------");
        items.forEach(item => {
            const amt = item.quantity * item.price;
            console.log(`${item.name}     x${item.quantity} @ ₹${item.price}     => ₹${amt}`);
        });
        console.log("------------------------------------------------");
        console.log(`TOTAL: ₹${total.toFixed(2)}`);
        console.log("------------------------------------------------");
        console.log("Live life from one high to another ☕");
        console.log(now.toLocaleString());
        console.log("================================================\n");


        await printer.execute();

        res.status(200).send("🧾 Bill sent to printer and console preview printed!");
    } catch (err) {
        console.error("Print error:", err);
        // More specific error message for the frontend
        let errorMessage = "Failed to print bill due to a server error.";
        if (err.message.includes("Printer not connected")) {
            errorMessage = "Failed to print bill: Printer not connected or not configured correctly (e.g., COM port).";
        }
        res.status(500).send(`❌ ${errorMessage}`);
    }
});








// order place customer details
app.post("/customer-order", async (req, res) => {
    const { name, phone, superCoins, orderDetails } = req.body;

    if (!name || !phone || superCoins === undefined) {
        return res.status(400).json({ message: "Name, phone, and superCoins are required." });
    }

    try {
        let customer = await Customer.findOne({ phone: phone });

        if (customer) {
            customer.superCoins += superCoins;
            if (orderDetails) {
                customer.orders.push(orderDetails);
            }
            await customer.save();
            return res.status(200).json({ message: "Customer super coins updated successfully", customer });
        } else {
            customer = new Customer({
                name,
                phone,
                superCoins,
                orders: orderDetails ? [orderDetails] : []
            });
            await customer.save();
            return res.status(201).json({ message: "New customer created successfully", customer });
        }
    } catch (err) {
        console.error("Error storing/updating customer:", err);
        if (err.code === 11000) {
            return res.status(409).json({ message: "A customer with this phone number already exists." });
        }
        res.status(500).json({ message: "Server error while processing customer data." });
    }
});





// Start the Server
app.listen(5001)