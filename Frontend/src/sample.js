import React, { useRef } from "react";

const PrintReceipt = ({ customerInfo, cartItems, tableNumber }) => {
    const printRef = useRef();

    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // restore app
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // const order = {
    //     name: "John Doe",
    //     phone: "9876543210",
    //     table: 5,
    //     items: [
    //         { name: "Tea", quantity: 2, price: 10 },
    //         { name: "Coffee", quantity: 1, price: 15 },
    //     ]
    // };

    // printReceipt(order);


    return (
        <div>
            <button onClick={handlePrint} className="btn btn-primary">🖨️ Print Bill</button>

            <div ref={printRef} style={{ display: "none" }}>
                <div style={{ width: "58mm", fontFamily: "monospace", fontSize: "12px" }}>
                    <h3 style={{ textAlign: "center" }}>🧾 Shreyans POS</h3>
                    <p>Table No: {tableNumber}</p>
                    <p>Customer: {customerInfo.name}</p>
                    <p>Phone: {customerInfo.phone}</p>
                    <p>--------------------------------</p>
                    <p>Item        Qty  Price  Total</p>

                    {cartItems.map((item, i) => (
                        <p key={i}>
                            {item.name.padEnd(10)}
                            {String(item.quantity).padEnd(4)}
                            ₹{item.price.toFixed(2)}
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                    ))}

                    <p>--------------------------------</p>
                    <p>Total: ₹{totalAmount.toFixed(2)}</p>
                    <p>--------------------------------</p>
                    <p style={{ textAlign: "center" }}>Thank you! Visit Again 🙏</p>
                </div>
            </div>
        </div>
    );
};

export default PrintReceipt;
