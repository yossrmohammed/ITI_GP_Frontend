import React, { useEffect, useRef } from 'react';

const PayPal = () => {
  const paypal = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AcpEjxCCKONOsrJMDOwQvFipq9QP48bXHRx0-AA3j6Qqftb_fJSN6EGy8SvKtl8BFiFXBNCrw8z5qaz3&currency=CAD`;
    script.addEventListener("load", () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Cool looking table",
                  amount: {
                    currency_code: "CAD",
                    value: 5000.0,
                  },
                },
              ],
            }).catch((err) => {
              console.error('Error creating order:', err);
              alert('An error occurred during order creation. Please try again.');
            });
          },
          onApprove: async (data, actions) => {
            try {
              const order = await actions.order.capture();
              console.log('Order approved:', order);
              alert('Transaction completed by ' + order.payer.name.given_name);
            } catch (err) {
              console.error('Error capturing order:', err);
              alert('An error occurred during order capture. Please try again.');
            }
          },
          onError: (err) => {
            console.error('Error during transaction:', err);
            alert('An error occurred during the transaction. Please try again.');
          },
        }).render(paypal.current);
      } else {
        console.error('PayPal SDK not available.');
        alert('PayPal SDK not available. Please check your connection or try again later.');
      }
    });
    document.body.appendChild(script);

    return () => {
      if (script) {
        script.removeEventListener("load", () => {});
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url('https://res.cloudinary.com/deqwn8wr6/image/upload/v1719063005/wristwatch-cellphone-credit-card-blue-surface-online-shopping_1_otjflv.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    
      <div ref={paypal}></div>
   
    </div>
  );
};

export default PayPal;
