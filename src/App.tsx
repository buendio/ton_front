import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";
import { useCallback, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawal,
  } = useMainContract();

  const { tonConnectUI } = useTonConnect();

  const [connected, setConnected] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string | null>(null);


  const userPlatform = useCallback(() => {
    setPlatform(WebApp.platform === "unknown" ? null : WebApp.platform);
  }, []);







  useEffect(() => {
    WebApp.expand();
    userPlatform();
    setConnected(tonConnectUI.connected);

    tonConnectUI.onStatusChange((status) => {
      setConnected(status !== null);
    });
  }, [tonConnectUI, userPlatform]);

  return (
    <div>
      <div className="container">
        <div className="button-container">
          <h3>Contract Data:</h3>
          <TonConnectButton />
        </div>
        <div className="data-container">
          <b>Our contract Address:</b>
          <p>{contract_address}</p>
          <hr />
          <b>Our contract Owner:</b>
          <p>{owner_address?.toString()}</p>
          <hr />
          {contract_balance && (
            <>
              <b>Our contract Balance:</b>
              <p>{fromNano(contract_balance)}</p>
              <hr />
            </>
          )}
          {recent_sender && (
            <>
              <b>Recent sender:</b>
              <p>{recent_sender.toString()}</p>
              <hr />
            </>
          )}
          <div>
            <b>Counter Value:</b>
            <p>{counter_value ?? "Loading..."}</p>
            <hr />
          </div>
        </div>

        <h3>Contract actions: </h3>
        <div className="data-container">
          {connected ? (
            <>
              <div className="button-container">
                <p>Increment counter by 1</p>
                <button onClick={sendIncrement}>Start</button>
              </div>
              <hr />

              <div className="button-container">
                <p>Deposit contract by 1 TON</p>
                <button onClick={sendDeposit}>Start</button>
              </div>
              <hr />

              <div className="button-container">
                <p>Withdrawal 0.2 TON</p>
                <button onClick={sendWithdrawal}>Start</button>
              </div>
            </>
          ) : (
            <p>Connect wallet to start action</p>
          )}
        </div>
        <div>
          <a
            href="https://testnet.tonscan.org/address/EQCS7PUYXVFI-4uvP1_vZsMVqLDmzwuimhEPtsyQKIcdeNPu"
            target="_blank"
          >
            explorer
          </a>
          <br />
          <a href="https://github.com/buendio/ton_front" target="_blank">
            github
          </a>
          <div>{platform}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
