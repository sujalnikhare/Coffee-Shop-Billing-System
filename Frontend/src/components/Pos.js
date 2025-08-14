import React, { useRef } from "react";

const PosPrinter = () => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // to restore scripts etc
  };

  return (
    <div className="p-4">
      <button 
        onClick={handlePrint} 
        className="bg-blue-500 text-white p-2 rounded"
      >
        Print Receipt
      </button>

      <div ref={printRef} style={{ display: "none" }}>
        <div style={{ 
          width: "58mm", 
          fontFamily: "monospace", 
          fontSize: "12px" 
        }}>
          <h3 style={{ textAlign: "center" }}>Shreyans POS80</h3>
          <p>-------------------------------</p>
          <p>Item        Qty   Price   Total</p>
          <p>Tea         2     10.00   20.00</p>
          <p>Coffee      1     15.00   15.00</p>
          <p>-------------------------------</p>
          <p>Total:                35.00</p>
          <p>Thank you for shopping!</p>
          <p>-------------------------------</p>
          <p style={{ textAlign: "center" }}>Visit Again!</p>
        </div>
      </div>
    </div>
  );
};

export default PosPrinter;