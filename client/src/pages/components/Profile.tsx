import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

export default function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({ address: address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork({ chainId: 1337 });

  if (isConnected) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-2xl">Your wallet</p>
        <p className="text-gray-500">{address}</p>
        <div>
          <span>
            Chain: {chain?.id} - Balance: {balance?.formatted} ETH
          </span>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => disconnect()}
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
            Disconnect
          </button>
          {chain?.id === 1337 ? (
            <button
              disabled
              className="disabled:opacity-50 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
            >
              Connected to local network
            </button>
          ) : (
            <button
              onClick={() => switchNetwork?.(1337)}
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
            >
              Switch metamask to local network
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-5 mt-2 flex-wrap">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
          {isLoading
            ? connector.id === pendingConnector?.id && " (connecting)"
            : `Connect your ${connector.name} wallet`}
        </button>
      ))}

      {error && (
        <p className="w-full text-center text-red-500">{error.message}</p>
      )}
    </div>
  );
}
