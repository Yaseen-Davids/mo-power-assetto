import { useEffect, useMemo, useState } from "react";

function App() {
  const [power, setPower] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [copied, toggleCopied] = useState(false);

  const formatted = useMemo(() => {
    if (power === "" || data === "") return "";

    return data
      .split("\n")
      .map((row) => {
        const [_r, _p] = row.split("|");
        const _pInt = parseInt(_p) + parseInt(power);
        return `${_r}|${_pInt}`;
      })
      .join("\n");
  }, [power, data]);

  const copyToClipboard = () => {
    toggleCopied(true);
    navigator.clipboard.writeText(formatted);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        toggleCopied(!copied);
      }, 5000);
    }
  }, [copied]);

  return (
    <div
      className="flex flex-col gap-5"
      style={{ marginTop: "20px", marginLeft: "200px", marginRight: "200px" }}
    >
      <h1 className="text-3xl font-bold text-gray-600">Mo power baby!</h1>
      <div className="grid grid-cols-3 gap-4 place-content-center ">
        <div className="flex justify-center">
          <textarea
            name="data"
            placeholder="Paste `power.lut` data here"
            className="w-96 h-96 px-4 py-2 rounded drop-shadow"
            style={{ height: "600px" }}
            value={data}
            onChange={(event) => setData(event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <div>
            <input
              name="power"
              placeholder="Add the horses"
              className="w-72 px-6 py-2 rounded drop-shadow"
              value={power}
              onChange={(event) => setPower(event.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-2">
          <textarea
            name="data"
            placeholder="Mo power baby!"
            className="w-96 h-96 px-4 py-2 rounded drop-shadow"
            style={{ height: "600px" }}
            value={formatted}
          />
          <div className="flex justify-center items-center flex-col">
            <button
              disabled={copied}
              className="bg-cyan-400 rounded-full py-2 px-16 text-white"
              onClick={copyToClipboard}
            >
              Copy
            </button>
            {copied && <p>Copied to clipboard!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
