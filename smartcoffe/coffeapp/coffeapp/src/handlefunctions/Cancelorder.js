
import axios from "axios";

const baseurl = 'http://127.0.0.1:8000'; 

export const getOrderData = async (orderid) => {
    try {
      const response = await fetch(`${baseurl}/api/getorder/?orderid=${orderid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log("Fetched order data:", data);
      return data;
  
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };





  export const deleteOrder = async (orderid) => {
    try {
      const response = await fetch(`${baseurl}/api/deleteorder/?orderid=${orderid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error deleting order');
      }
  
      console.log(`Order with ID ${orderid} deleted successfully.`);
      return true; 
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };








  
  export const submitHistoryData = async (historyData) => {
    try {
      const response = await fetch(`${baseurl}/api/recordhistory/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historyData),
      });
  
      console.log("History response status:", response.status);
      const result = await response.json();
      console.log("History response body:", result);
  
      if (!response.ok) {
        console.error("Error recording history:", result);
        throw new Error('Error recording history');
      }
  
      return result;
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  export const handleCancelOrder = async (orderid) => {
    try {
      const orderData = await getOrderData(orderid);
  
     
      const historyData = {
        status: 'canceled',
        orderid: orderData.orderid,  
        productname: orderData.productname,  
        producttype: orderData.producttype,
        quantity: orderData.quantity,
        price: orderData.price,
        coffephoto: orderData.coffephoto,
      };
  
      console.log("History data to be submitted:", historyData);
  
      
      await submitHistoryData(historyData);
      await recordNotification(orderid, "canceled", orderData.coffephoto);

      await deleteOrder(orderid);
  
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
  