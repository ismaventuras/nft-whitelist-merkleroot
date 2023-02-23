import Head from "next/head";
import { accounts } from "@/config";
import Profile from "./components/Profile";
import Validate from "./components/Validate";
import MerkleTree from "merkletreejs";
import { ethers } from "ethers";
const { keccak256 } = ethers.utils;

function generateTree(addressList: string[]) {
  const leafNodes = addressList.map((addr) => keccak256(addr));
  return new MerkleTree(leafNodes, keccak256, { sort: true });
};

export default function Home() {
  const tree = generateTree(accounts);

  return (
    <>
      <Head>
        <title>NFT-Whitelist-MerkleTree</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto mt-4">
        <p className="text-2xl mb-2 text-center">
          Use one of the following keys to test the merkle root
        </p>
        <div className="m-2">
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="break-all block max-w-sm p-6 bg-white border border-green-200 rounded-lg shadow hover:bg-green-100">
              <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Whitelisted Private key:
              </p>
              <p className="font-normal text-gray-700">
                0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
              </p>
            </div>
            <div className="break-all max-w-sm p-6 bg-white border border-red-200 rounded-lg shadow hover:bg-red-100">
              <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Not whitelisted Private key:
              </p>
              <p className="font-normal text-gray-700">
                0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82
              </p>
            </div>
          </div>
        </div>
        <div>
          <Profile />
        </div>
        <div className="mt-4">
          <p className="text-xl text-center">
            {" "}
            Validate if you can mint or not
          </p>
          <Validate tree={tree} />
        </div>
      </div>
      {/* <div className='container'>
        <h1>NFT Whitelist</h1>
        <div style={{display:'flex',gap:'1em', flexDirection:'column', justifyItems:'center', alignItems:'center'}}>
          <ConnectButton />
          {isConnected && chain?.id && chain.id !== 1337 && <SwitchNetworkButton />}
          <ClaimButton />
        </div>
      </div> */}
    </>
  );
}
