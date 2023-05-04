import React, { useEffect, useState } from 'react';
import { UserInfo } from "@web3auth/base";
import { Eoa } from "../Eoa";
import { Tasks } from "../Tasks";
import { useAppSelector } from "../../store/hooks";
import { GaslessWalletInterface } from "@gelatonetwork/gasless-onboarding";
import { Loading } from "../Loading";
import ReCAPTCHA from "react-google-recaptcha";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import { GetAllNFTusers } from "../../../src/graphql/index";

interface PlaceHolderProps {
  connected: boolean;
  user: Partial<UserInfo> | null;
  wallet: { address: string; chainId: number } | null;
  smartWallet: GaslessWalletInterface | null;
  isDeployed: boolean;
  tokenId: string;
  ownerOf: string;
  isLoading: boolean;
  imageUrl: string;
  imageName: string;
  toggleConnect: () => {};
  mint: () => {};
  captcha: (token: any) => {};
  selectTime: (val: any) => {};
}

interface NftUser {
  tokenId: string;
  lastUpdatedTimestamp: number;
  owner?: {
    addresses: string[];
  };
}

interface NftUsersAllData {
  TokenBalance: NftUser[];
}

const largeProps = {
  force: 0.6,
  duration: 5000,
  particleCount: 200,
  height: 1600,
  width: 1600,
};

async function fetchData() {
  const data = await GetAllNFTusers();
  console.log("@@@@1", data.TokenBalance[0].tokenId);
  console.log("@@@@2", data.TokenBalance[0].tokenAddress);
  console.log("@@@@3", data.TokenBalance[0].owner.addresses[0]);
  console.log("@@@@4", data.TokenBalance[0].lastUpdatedTimestamp);
  return data
}

const PlaceHolderApp = (props: PlaceHolderProps) => {
  const [extractedData, setExtractedData] = useState<NftUser[]>([]);
  const [hasFollowed, setHasFollowed] = useState(false);

  useEffect(() => {
    fetchData()
      .then((nftUsersALLData: NftUsersAllData) => {
        const nftUsers = nftUsersALLData.TokenBalance;
        const data = nftUsers.map((user: NftUser) => {
          return {
            tokenId: user.tokenId,
            owner: user.owner,
            lastUpdatedTimestamp: user.lastUpdatedTimestamp,
          };
        });
        setExtractedData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const tasks = useAppSelector((state) => state.tasks.tasks);

  

  return (
    <div>
      <div className="flex flex-row  justify-content-center align-items-center mt-2 mr-4 ml-4">
        <div className="card bg-white bg-opacity-50 grow shadow-xl basis-1/5">
          <div
            style={{ alignItems: "center" }}
            className="card-body justify-content-center align-items-center"
          >
            <div className="flex flex-col justify-content-center align-items-center">
              <h2 className="text-2xl underline underline-offset-4 font-semibold text-black mt-2">
                Crypto for all users through gas less ＆ walletless NFT minting
              </h2>
              <p className="text-2 font-semibold text-black mt-2">
              Users can mint a great AI Generative NFT with no gas cost and no wallet to create. Just one mint per user!
              </p>
            </div>
            {props.isLoading ? (
              <Loading />
            ) : (
              <div>
                {!props.connected && (
                  <div>
                    {/* <div className="App">
                      <ReCAPTCHA
                        sitekey="6LcX0X4lAAAAAFVXjal2000EVuT57VdQCnqU1jbH"
                        onChange={(token) => props.captcha(token)}
                      />
                    </div> */}
                    <button
                      style={{ borderColor: "unset", color: "white" }}
                      className="btn btn-primary mt-2 bg-purple-500"
                      onClick={() => props.toggleConnect()}
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {props.connected ? (
            <div className="pt-1 flex-col justify-content-center align-items-center">
              <Eoa
                user={props.user}
                wallet={props.wallet}
                smartAddress={props.smartWallet?.getAddress()!}
                isDeployed={props.isDeployed}
              />

              <div className="mb-4 flex-column self-center mt-8">
                <div className="container mx-auto my-8">
                  <h1 className="text-2xl font-bold my-4 text-black">Recent NFT Users</h1>
                  <p className=" text-black font-bold">
                    Total NFTs minted {props.tokenId}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-black">
                    <h2 className="font-semibold text-black">Token ID</h2>
                    <h2 className="font-semibold text-black">Owner Address</h2>
                    <h2 className="font-semibold text-black">Last Updated Timestamp</h2>
                    {extractedData.map((item, index) => (
                      <React.Fragment key={index}>
                        <p className="truncate">{item.tokenId}</p>
                        <p className="truncate">{item.owner?.addresses[0]}</p>
                        <p className="truncate">{item.lastUpdatedTimestamp}</p>
                      </React.Fragment>
                    ))}
                  </div>
                  
              </div>
                {props.ownerOf == "0" ? (
                  <div className="">
                    <h1 className="text-2xl text-black font-bold">
                      Let's Free Mint!
                    </h1>
                    <p className="text-gray-500">Do you want your NFT by nightime or daylight</p>
                    <div style={{ width: "200px", margin: "25px auto 10px" }}>
                      <Dropdown
                        placeholder="Select an option"
                        options={["By Day", "By Night"]}
                        value="By Night"
                        onSelect={(value) => props.selectTime(value)}
                      />
                    </div>
                      <button onClick={()=> setHasFollowed(true)} className='btn p-2 bg-twitter border-0 m-2'>
                    <a href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Ekyoko1_japan&region=follow_link&screen_name=kyoko1_japan" className="text-white" data-size="large" data-show-count="false">
                      Follow @kyoko1_japan
                      </a>
                      </button>
                    { <button
                      style={{
                        borderColor: "unset",
                        color: "white",
                        width: "200px",
                      }}
                      className="btn btn-primary mt-2 bg-purple-500"
                      onClick={() => props.mint()}
                      disabled={!hasFollowed}
                    >
                      Mint
                    </button> }
                    {/* <p>Minting Period Finished</p> */}
                  </div>
                ) : (
                  <div className="mt-2">
                    <h3> Your Token : {props.imageName}</h3>
                    {props.imageUrl == "" ? (
                      <p></p>
                    ) : (
                      <img
                        width={250}
                        height={250}
                        style={{ margin: " 20px auto" }}
                        src={`https://ipfs.io/ipfs/${props.imageUrl}`}
                      />
                    )}
                    <div></div>
                    
                    <div>
                      <a
                        href={`https://opensea.io/assets/matic/0x9EA4AADea08135948C963acFBE10E8E72E9EBfdb/${props.ownerOf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-md text-black">
                          <span
                            style={{ color: "#f5c3a6", marginRight: "5px" }}
                            className="underline"
                          >
                            View
                          </span>{" "}
                          your NFT on OpenSea
                        </p>
                      </a>
                    </div>
                    
                    <div>
                      <a
                        href={`https://beta.app.gelato.network/task/0x6e9ee6b129c9f58dd46c77808c9451c18bc80b9bd1ef87313e8c37ae22639cbb?chainId=137`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-md text-black">
                          <span
                            style={{ color: "#f5c3a6", marginRight: "5px" }}
                            className="underline "
                          >
                            {" "}
                            Explore
                          </span>{" "}
                          this Web3 Function
                        </p>
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div>
                {props.connected && (
                  <button
                    style={{
                      marginBottom: "20px",
                      borderColor: "unset",
                      color: "black",
                      background: "transparent",
                    }}
                    className="btn btn-primary mt-4  border-neutral-100 border-color"
                    onClick={() => props.toggleConnect()}
                  >
                    Sign Out
                  </button>
                )}
              </div>
              {tasks.length > 0 && (
                <div className="flex flex-col pb-14">
                  <div className="mt-10 h-[0.1rem] bg-[#b45f63] opacity-20" />
                  <Tasks />
                </div>
              )}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceHolderApp;
