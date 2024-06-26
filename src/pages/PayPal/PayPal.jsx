/* eslint-disable react/prop-types */

import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/auth/authSlice';
import Swal from 'sweetalert2';

function PayPal() {
  const paypal = useRef();
  const location = useLocation();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  console.log(location.state);
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
                  description:  location.state.description || "Payment description",
                  amount: {
                    currency_code: "CAD",
                    value:  parseFloat(location.state.amount) || 4000,
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
              const dateWithoutDayOfWeek = location.state.full_date.date.split(', ').slice(1).join(', ');
              const parsedDate = dayjs(dateWithoutDayOfWeek, 'MMMM D, YYYY');
              const formattedDate = parsedDate.format('YYYY/MM/DD');
              console.log(formattedDate);
              const order = await actions.order.capture();
              console.log('Order approved:', order);
              const response = await axiosInstance.post('/payments', {
                patient_id : user.id,
                medic_id : location.state.medic_id,
                medic_role : location.state.medic_role,
                kind_of_visit : location.state.kind_of_visit,
                day : location.state.full_date.day.substring(0,3),
                date : formattedDate,
                amount : location.state.amount,
                order_id : order.id,
              });
              Swal.fire({
                icon: "success",
                text: "Payment finished successfully",
                showConfirmButton: true,
                timer: 1500
              });
              navigate('/');
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
        backgroundImage: `url('https://res.cloudinary.com/deqwn8wr6/image/upload/v1719070142/desk-concept-cyber-monday_rtge4c.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    
    <div 
       style={{
        width:'25%', 
       //marginLeft:'25%'       
      }}
      ref={paypal}></div>
   
    </div>
  );
}

export default PayPal;
