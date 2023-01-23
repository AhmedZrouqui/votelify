import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { connectSocket } from "../redux/slices/socket";
import { connectUser } from "../redux/slices/userSlice";

const Home: NextPage = () => {
  const user = useAppSelector((state) => state.user);
  const { ws } = useAppSelector((state) => state.socket);
  const [socketIsConnected, setSocketIsConnected] = useState<boolean>(
    () => ws?.connected || false
  );
  const [data, setData] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ws === undefined) {
      dispatch(connectSocket());
      console.log(ws);
    } else {
      setSocketIsConnected(ws.connected);
      ws.on("IS_CONNECTED", (data) => {
        setData(data.data);
      });
    }
  }, [ws]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>Socket connected : {socketIsConnected}</p>
        {socketIsConnected ? (
          <button>Connect socket</button>
        ) : (
          <button onClick={() => dispatch(connectUser())}>Connect User</button>
        )}
        {data.length > 0 && <p>{data}</p>}
      </div>
    </div>
  );
};

export default Home;
