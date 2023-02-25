import { ERC721_MerkleRoot_ABI } from "@/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export default function Claim({ proof }: { proof: string[] }) {
  const { config, error } = usePrepareContractWrite({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: ERC721_MerkleRoot_ABI,
    functionName: "claimWhitelist",
    args: [proof],
  });
  const { write, error: cwError, data } = useContractWrite(config);
  return (
    <div className="flex justify-center flex-wrap gap-2">
      <button
        disabled={!write}
        onClick={() => write?.()}
        className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Claim NFT
        </span>
      </button>
      <div className="break-all m-2">
        {data && <p className="break-all">Transaction hash: {data.hash}</p>}
        {error && <p className="text-red-400">{error.message}</p>}
        {cwError && <p className="text-red-400">{cwError.message}</p>}
      </div>
    </div>
  );
}
