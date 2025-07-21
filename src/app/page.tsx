"use client";

import { useState } from "react";
import { useAccount, useSignTypedData } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const defaultDomain = {
  name: "Clementine",
  version: "1",
  chainId: 5115,
  verifyingContract: "0x0000000000000000000000000000000000000000" as `0x${string}`,
};

const defaultTypes = {
  Outpoint: [
    { name: "txid", type: "bytes32" },
    { name: "vout", type: "uint32" },
  ],
  Withdrawal: [
    { name: "withdrawal_id", type: "uint32" },
    { name: "input_signature", type: "bytes" },
    { name: "input_outpoint", type: "Outpoint" },
    { name: "output_script_pubkey", type: "bytes" },
    { name: "output_amount", type: "uint32" },
  ],
};

const defaultValue = {
  withdrawal_id: 1,
  input_signature: "0x",
  input_outpoint: {
    txid: "0x0000000000000000000000000000000000000000000000000000000000000000",
    vout: 0,
  },
  output_script_pubkey: "0x",
  output_amount: 0,
};

type TypeDefinition = { name: string; type: string }[];

export default function Home() {
  const { isConnected } = useAccount();
  const [domain, setDomain] = useState(defaultDomain);
  const [types, setTypes] = useState<Record<string, TypeDefinition>>(defaultTypes);
  const [value, setValue] = useState(defaultValue);
  const [signature, setSignature] = useState("");
  const [selectedType, setSelectedType] = useState("Mail");
  const [editingJson, setEditingJson] = useState<"domain" | "types" | "message" | null>(null);

  const { signTypedDataAsync } = useSignTypedData();

  const handleSign = async () => {
    try {
      const sig = await signTypedDataAsync({
        domain,
        types,
        primaryType: selectedType,
        message: value,
      });
      setSignature(sig);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  const handleJsonEdit = (
    section: "domain" | "types" | "message",
    jsonStr: string
  ) => {
    try {
      const parsed = JSON.parse(jsonStr);
      switch (section) {
        case "domain":
          setDomain(parsed);
          break;
        case "types":
          setTypes(parsed);
          break;
        case "message":
          setValue(parsed);
          break;
      }
      setEditingJson(null);
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  const JsonEditor = ({
    value,
    onSave,
  }: {
    value: any;
    onSave: (value: string) => void;
  }) => {
    const [text, setText] = useState(JSON.stringify(value, null, 2));
    return (
      <div className="space-y-4">
        <textarea
          className="w-full h-64 font-mono text-sm p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={() => onSave(text)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => setEditingJson(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const DataSection = ({
    title,
    data,
    section,
  }: {
    title: string;
    data: any;
    section: "domain" | "types" | "message";
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={() => setEditingJson(section)}
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          Edit
        </button>
      </div>
      {editingJson === section ? (
        <JsonEditor
          value={data}
          onSave={(value) => handleJsonEdit(section, value)}
        />
      ) : (
        <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );

  return (
    <main className="min-h-screen p-8 font-sans bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            EIP-712 Typed Data Signer
          </h1>
          <ConnectButton />
        </div>

        <div className="space-y-6">
          <DataSection title="Domain Data" data={domain} section="domain" />
          <DataSection title="Types Definition" data={types} section="types" />
          <DataSection title="Message Data" data={value} section="message" />

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <label className="font-medium">Primary Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2"
              >
                {Object.keys(types).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {isConnected ? (
              <button
                onClick={handleSign}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-medium"
              >
                Sign Message
              </button>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-2">
                Connect your wallet to sign messages
              </p>
            )}
          </div>

          {signature && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Signature</h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg break-all font-mono text-sm">
                {signature}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
