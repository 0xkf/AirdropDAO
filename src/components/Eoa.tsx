import { UserInfo } from "@web3auth/base";
export const Eoa: React.FC<{
  user: Partial<UserInfo> | null;
  wallet: { address: string; chainId: number } | null;
  smartAddress: string;
  isDeployed: boolean;
}> = (props) => {
  const { user, wallet } = props;

  return (
    <div className="flex flex-col  bg-opacity-30 mb-2">
      {user && (
        <div className="flex flex-column justify-center">
          {user.email && (
            <div>
              <h1 className="text-2xl text-black font-bold">
                Your account information
              </h1>
              <div className="flex flex-row  justify-center">
                
                <p className="text-md mt-1 text-black font-medium">
                  Logged in with:{" "}
                </p>
                <p className="text-md mt-1 text-black font-medium">
                  {user?.email}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex mt-2 flex-col justify-center">
        <p className="text-md mb-1 text-base  font-medium">
          <span className="text-black"> Wallet: </span> 
          <a
            href={`https://polygonscan.com/address/${wallet?.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <span style={{ color: "#C9A0DC" }} className="underline ">
              {" "}
              {wallet?.address.substring(0,6)}....{wallet?.address.substring(wallet?.address.length-6)}
            </span>
          </a>
        </p>
        <p className="text-md  text-base font-medium">
          <span className="text-black">Smart Wallet: </span>
          <a
            href={`https://polygonscan.com/address/${props.smartAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <span style={{ color: "#C9A0DC" }} className="underline ">
              {" "}
              {props.smartAddress.substring(0,6)}....{props.smartAddress.substring(props.smartAddress.length-6)}
            </span>
          </a>
        </p>
      </div>
      <p className="text-md text-base text-gray-500">
        {" "}
        {props.isDeployed ? "is Deployed" : "Not Deployed Yet"}
      </p>
    </div>
  );
};
