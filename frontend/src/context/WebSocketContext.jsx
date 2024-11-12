// import React, { createContext, useContext, useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const WebSocketContext = createContext();

// export const WebSocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [data, setData] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const accessToken = localStorage.getItem("upstox_access_token");

//   useEffect(() => {
//     const connectSocket = async () => {
//       try {
//         // Connect to the Socket.IO server with Authorization and Accept headers
//         const socketClient = io("https://api.upstox.com", {
//           path: "/v2/feed/market-data-feed",
//           transports: ["websocket"],
//           extraHeaders: {
//             Authorization: `Bearer ${accessToken}`,
//             Accept: "*/*",
//           },
//         });

//         socketClient.on("connect", () => {
//           console.log("Socket.IO connected");
//           setIsConnected(true);
//         });

//         socketClient.on("disconnect", () => {
//           console.log("Socket.IO disconnected");
//           setIsConnected(false);
//         });

//         socketClient.on("connect_error", (error) => {
//           console.error("Socket.IO connection error:", error);
//         });

//         // Listen for incoming market data
//         socketClient.on("market-data", (message) => {
//           try {
//             setData(message); // Process market data here
//           } catch (e) {
//             console.error("Message processing error:", e);
//           }
//         });

//         setSocket(socketClient);
//       } catch (error) {
//         console.error("Failed to connect to Socket.IO:", error);
//       }
//     };

//     connectSocket();

//     // Clean up the socket connection on component unmount
//     return () => {
//       if (socket) socket.disconnect();
//     };
//   }, [accessToken]);

//   const sendMessage = (message) => {
//     if (socket && socket.connected) {
//       socket.emit("market-data", message);
//     }
//   };

//   return (
//     <WebSocketContext.Provider value={{ data, isConnected, sendMessage }}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// export const useWebSocket = () => {
//   return useContext(WebSocketContext);
// };
