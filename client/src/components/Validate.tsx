import type MerkleTree from "merkletreejs";
import { useAccount } from "wagmi";
import { getProof } from "@/utils/merkle";
import Claim from "@/components/Claim";

export default function Validate({ tree }: { tree: MerkleTree }) {
  const { address, isConnected } = useAccount();
  const proof = address && getProof(tree, address);
  const validProof = proof && proof?.length > 0;

  if (validProof) {
    return <Claim proof={proof} />;
  }

  if (address) {
    return (
      <p className="text-red-500 text-center mt-4">
        Account {address} cant claim
      </p>
    );
  }

  return <></>;
}
