// useMarketDataFeed.js
import { useEffect, useState, useRef } from "react";
import proto from "./marketDataFeed.proto";
import { Buffer } from "buffer";
import protobuf from "protobufjs";

let protobufRoot = null;
const initProtobuf = async () => {
  if (!protobufRoot) {
    protobufRoot = await protobuf.load(proto);
    console.log("Protobuf initialization complete");
  }
};

const getUrl = async () => {
  const token = localStorage.getItem("upstox_access_token");
  const apiUrl = "https://api-v2.upstox.com/feed/market-data-feed/authorize";
  let headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const res = await response.json();
  return res.data.authorizedRedirectUri;
};

const blobToArrayBuffer = async (blob) => {
  if ("arrayBuffer" in blob) return await blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject();
    reader.readAsArrayBuffer(blob);
  });
};

const decodeProtobuf = (buffer) => {
  if (!protobufRoot) {
    console.warn("Protobuf part not initialized yet!");
    return null;
  }
  const FeedResponse = protobufRoot.lookupType(
    "com.upstox.marketdatafeeder.rpc.proto.FeedResponse"
  );
  const message = FeedResponse.decode(buffer);
  const feeds = message.feeds;
  const instrumentKey = Object.keys(feeds)[0];
  return feeds[instrumentKey]?.ff?.indexFF?.ltpc?.ltp ?? null;
};

export const useMarketDataFeed = (instrumentKey) => {
  const [isConnected, setIsConnected] = useState(false);
  const [price, setPrice] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      if (!protobufRoot) {
        await initProtobuf();
      }

      try {
        const wsUrl = await getUrl();
        if (wsRef.current) return;

        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          setIsConnected(true);
          console.log("Connected to WebSocket");

          const data = {
            guid: "someguid",
            method: "sub",
            data: {
              mode: "full",
              instrumentKeys: [instrumentKey],
            },
          };
          ws.send(Buffer.from(JSON.stringify(data)));
        };

        ws.onmessage = async (event) => {
          const arrayBuffer = await blobToArrayBuffer(event.data);
          const buffer = Buffer.from(arrayBuffer);
          const currentPrice = decodeProtobuf(buffer);
          if (currentPrice !== null) {
            setPrice(currentPrice);
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          console.log("Disconnected from WebSocket");
        };

        ws.onerror = (error) => {
          setIsConnected(false);
          console.error("WebSocket error:", error);
        };
      } catch (error) {
        console.error("WebSocket connection error:", error);
      }
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [instrumentKey]);

  return { isConnected, price };
};
