import { BlockExplorerDataType, getBlockExplorerUrl } from "../utils";

export const SmartWallet: React.FC<{
  address: string;
  isDeployed: boolean;
  chainId: number;
}> = (props) => {
  console.log(props);
  return (
    <div className="flex flex-col gap-3  bg-opacity-30 ">
    <div className="flex flex-column gap-1 justify-center">
      <div className="flex flex-row gap-1 justify-center ">
        <p className="text-md  text-base font-medium">
          {" "}
          Smart Wallet Address{" "}
        </p>
        <a
          href={`https://polygonscan.com/address/${props.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-md text-base text-gray-500">{props.address}</p>
        </a>
        {props.isDeployed ? "is Deployed" : "Not Deployed Yet"}
      </div>
    </div>
    </div>
  );
};
