
import React, { useState ,useEffect} from 'react';
import 
{Alert} from 'react-native';

const baseurl = 'http://127.0.0.1:8000';


export const gethistoryData = async (orderid) => {
    try {
        const response = await fetch(`${baseurl}/api/gethistory/?orderid=${orderid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log("Fetched history data:", data);
          return data;
      
        } catch (error) {
          console.error('Error fetching history data:', error);
        }
      };





      

      export const deletehistory = async (orderid) => {
        try {
          const response = await fetch(`${baseurl}/api/deletehistory/?orderid=${orderid}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Error deleting History');
          }
      
          console.log(`History with ID ${orderid} deleted successfully.`);
          return true; 
        } catch (error) {
          console.error('Error deleting History:', error);
        }
      };




      export const submitorderData = async (Newdata) => {
        try {
            console.log("data before submitting",Newdata);
          const response = await fetch(`${baseurl}/api/recordorder/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Newdata),
          });
      
          console.log("Order response status:", response.status);
          const result = await response.json();
          console.log("Order response body:", result);
          Alert.alert("canceled order :",Newdata.orderid,"successfully ordered")

      
          if (!response.ok) {
            console.error("Error recording order:", result);
            throw new Error('Error recording order');
          }
      
          return result;
      
        } catch (error) {
          console.error('Error:', error);
        }
      };



      
      
  
      const fetchNewOrderId = async () => {
         let newid
          try {
            const response = await fetch(`${baseurl}/api/latestorder/`);
            const data = await response.json();
            
            
            
            newid=data.new_orderid; 
            return newid
            
          } catch (err) {
            console.error("Error fetching new order ID:", err);
            
          }
        };


       

        


      export const handleReorder = async (orderid) => {
        try {
          const orderData = await gethistoryData(orderid);
      
          const newOrderId = await fetchNewOrderId(); 
          const Neworderdata = {
                                          
            orderid:newOrderId, 
            productname:orderData.productname,  
            producttype: orderData.producttype,
            quantity: orderData.quantity,
            price: orderData.price,
            coffephoto: orderData.coffephoto,
          };

          
      
          console.log("Order data to be submitted:", Neworderdata);
          console.log("orderid to be submitted",newOrderId);
      
          
          await submitorderData(Neworderdata);
    
          await recordNotification(newOrderId, "re-order", orderData.coffephoto);
          await deletehistory(orderid);
      
        } catch (error) {
          console.error('Error:', error);
        }
      };


      const recordNotification = async (notiid, notitype, notiphoto) => {
        try {
          const response = await fetch(`${baseurl}/api/recordnotification/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              notiid: notiid,
              notitype: notitype,
              notiphoto: notiphoto,
            }),
          });
      
          const data = await response.json();
          
          if (response.ok) {
            console.log("Notification recorded successfully:", data);
          } else {
            console.error("Error recording notification:", data);
          }
        } catch (err) {
          console.error("Error fetching record notification:", err);
        }
      };