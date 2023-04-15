import "./App.css";
import NavBar from "./components/NavBar";
import { resolve } from "path";
import useTitle from "./hooks/useTitle";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Contract, ethers } from "ethers";
import { addTask } from "./store/slices/taskSlice";
import { addError } from "./store/slices/errorSlice";
import PlaceHolderApp from "./components/apps/PlaceHolder";
import * as dotenv from "dotenv";
import axios from "axios";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  GaslessWalletInterface,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { getChainConfig } from "./utils";
import { Tasks } from "./components/Tasks";
import { NFT_ABI } from "./constants";
import ConfettiExplosion from "confetti-explosion-react";


const nftAddres = "0x981116f806898F1C1eCB1d3BF2AF4f2140B1BB92"

const largeProps = {
  force: 0.6,
  duration: 5000,
  particleCount: 200,
  height: 1600,
  width: 1600,
};

function App() {
  const dispatch = useAppDispatch();
  const [gelatoLogin, setGelatoLogin] = useState<
    GaslessOnboarding | undefined
  >();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tokenId, setTokenId] = useState<string>("0");
  const [ownerOf, setAlreadyOwnerId] = useState<string>("0");
  const [captCha, setCaptcha] = useState<boolean | null>(null);
  const [web3AuthProvider, setWeb3AuthProvider] =
    useState<SafeEventEmitterProvider | null>(null);
  const [smartWallet, setSmartWallet] = useState<GaslessWalletInterface | null>(
    null
  );
  const [connected, setConnected] = useState(false);

 

  const [contract, setContract] = useState<Contract | null>(null);
  const [user, setUser] = useState<Partial<UserInfo> | null>(null);
  const [wallet, setWallet] = useState<{
    address: string;
    balance: string;
    chainId: number;
  } | null>(null);
  const [isDeployed, setIsDeployed] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [nftTime, setNftTime] = useState<string>("By Night");
  const [isExploding, setExploding] = useState(false);
  
  const toggleConnect = async () => {
    if (connected == true) {
      logout();
    } else {
     // if(captCha == true) {

      connectButton();
      //}
    }
  };

  const selectTime = async (value: any) => {

    setNftTime(value.value);
  };


 const captcha = async (token:string) => {

 setCaptcha(true)

 }

  const transfer = async () => {
    setIsLoading(true);
    const nftTimeFlag = nftTime == 'By Day' ? false : true;



    const smartAd= smartWallet?.getAddress()

    const { data } = await contract!.populateTransaction.transferFrom(smartAd, wallet?.address,+ownerOf);
    let tx = await smartWallet?.sponsorTransaction(nftAddres, data!);
    console.log(`https://relay.gelato.digital/tasks/status/${tx?.taskId}`);
  };

  const mint = async () => {
    setIsLoading(true);
    const nftTimeFlag = nftTime == 'By Day' ? false : true;
    const { data } = await contract!.populateTransaction.mint(nftTimeFlag);
    let tx = await smartWallet?.sponsorTransaction(nftAddres, data!);
    console.log(`https://relay.gelato.digital/tasks/status/${tx?.taskId}`);
  };

  //// Login
  const connectButton = async () => {
    // dispatch(addTask('taskId'));




    if (!gelatoLogin) {
      return;
    }
    const web3authProvider = await gelatoLogin.login();
    setWeb3AuthProvider(web3authProvider);
  };

  //// Logout
  const logout = async () => {
    if (!gelatoLogin) {
      return;
    }
    await gelatoLogin.logout();
    setWeb3AuthProvider(null);
    setWallet(null);
    setUser(null);
    setSmartWallet(null);
    setContract(null);
    setAlreadyOwnerId("0");
    setTokenId("0");
    setImageName("");
    setImageUrl("");
    setConnected(false);
  };

  /// Initial Use Effect will always run and prepare the gasless Wallet
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {

        const smartWalletConfig: GaslessWalletConfig = {
          apiKey: process.env.REACT_APP_SPONSOR_API_KEY_MAINNET || ""
        };
        const loginConfig: LoginConfig = {
          chain: {
            id: 137,
            rpcUrl: "https://polygon.llamarpc.com", 
          },
          ui: {
            theme: "dark",
          },
          openLogin: {
            redirectUrl: `${window.location.origin}`,
          },
          domains: []
        };
        const gelatoLogin = new GaslessOnboarding(
          loginConfig,
          smartWalletConfig
        );
        await gelatoLogin.init();

        setGelatoLogin(gelatoLogin);
        const provider = gelatoLogin.getProvider();
        
        if (provider) {
          setWeb3AuthProvider(provider);
        }
      } catch (error) {
        dispatch(addError((error as Error).message));
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

   // captCha
  /// Use effect will run when web3AuthProvider is set, this happens only when the user logs in after redirect or already logged
  useEffect(() => {
    const init = async () => {
      if (!gelatoLogin || !web3AuthProvider) {
        return;
      }

      setIsLoading(true);
      const web3Provider = new ethers.providers.Web3Provider(web3AuthProvider!);
      const signer = web3Provider.getSigner();
      setWallet({
        address: await signer.getAddress(),
        balance: (await signer.getBalance()).toString(),
        chainId: await signer.getChainId(),
      });

      const user = await gelatoLogin.getUserInfo();
      setUser(user);

      const gelatoSmartWallet = gelatoLogin.getGaslessWallet();
      setSmartWallet(gelatoSmartWallet);

      setIsDeployed(await gelatoSmartWallet.isDeployed());

    
      /// Instantiate the contract
      const contract = new ethers.Contract(
        nftAddres,
        NFT_ABI,
        new ethers.providers.Web3Provider(web3AuthProvider!).getSigner()
      );
      


      /// UI update when mint event is fired (we check if the minted token is ours)
      contract.on("MintEvent", async (_tokenId: any) => {
        const alreadyOwnerId = (
          await contract.tokenIdByUser(gelatoSmartWallet.getAddress())
        ).toString();
        const currentTokenId = (await contract.tokenIds()).toString();
        setTokenId(currentTokenId);
        if (alreadyOwnerId == _tokenId.toString()) {
          setAlreadyOwnerId(alreadyOwnerId);
          let ipfs = await contract!.tokenURI(+alreadyOwnerId);

          let url = ipfs.replace("ipfs://", "");

          let res = await axios.get(`https://nftstorage.link/ipfs/${url}`);

          setIsDeployed(await gelatoSmartWallet!.isDeployed());

          const persons = res.data;
          setImageName("Waiting for OpenAI to generate your NFT");
          setImageUrl(persons.image.replace("ipfs://", ""));

          setIsLoading(false);
          setExploding(false);
          setExploding(true);

          setTimeout(() => {
            setExploding(false);
          }, 5000);
        }
      });

      /// UI update when metadata update event is  fired (we check if the minted token is ours)
      contract.on("MetadataUpdate", async (_tokenId: any) => {
        const alreadyOwnerId = (
          await contract.tokenIdByUser(gelatoSmartWallet.getAddress())
        ).toString();
        const currentTokenId = (await contract.tokenIds()).toString();
        setTokenId(currentTokenId);
        if (alreadyOwnerId == _tokenId.toString()) {
          setAlreadyOwnerId(alreadyOwnerId);
          let ipfs = await contract!.tokenURI(+alreadyOwnerId);

          let url = ipfs.replace("ipfs://", "");

          let res = await axios.get(`https://nftstorage.link/ipfs/${url}`);

          const nft = res.data;
          setImageName(nft.name.replace("Eth Zurich","EthZurich"));
          setImageUrl(nft.image.replace("ipfs://", ""));
        }
      });

      setConnected(true);
      setContract(contract);

  

      const currentTokenId = (await contract.tokenIds()).toString();
    
   
      setTokenId(currentTokenId);


      const alreadyOwnerId = (
        await contract.tokenIdByUser(gelatoSmartWallet.getAddress())
      ).toString();

      setAlreadyOwnerId(alreadyOwnerId);


      if (alreadyOwnerId != "0") {
        const currentOwner = await contract.ownerOf(+alreadyOwnerId);
        let ipfs = await contract.tokenURI(+alreadyOwnerId);
        let url = ipfs.replace("ipfs://", "");
        let res = await axios.get(`https://nftstorage.link/ipfs/${url}`);
        const nft = res.data;
        setImageName(nft.name.replace("Eth Zurich","EthZurich"));
        setImageUrl(nft.image.replace("ipfs://", ""));
      } else {

      }


      setIsLoading(false);
    };
    init();
  }, [web3AuthProvider]);

  useTitle("ETHGlobal Tokyo Gasless Minting");

  return (
    <div className="App bg-purple-gradient bg-slate-600 h-screen flex flex-col content-center">
      <NavBar />
      <div className="flex justify-center">
        {isExploding && <ConfettiExplosion {...largeProps} />}
      </div>

      <PlaceHolderApp
        tokenId={tokenId}
        ownerOf={ownerOf}
        user={user}
        wallet={wallet}
        smartWallet={smartWallet}
        isDeployed={isDeployed}
        connected={connected}
        imageUrl={imageUrl}
        imageName={imageName}
        isLoading={isLoading}
        toggleConnect={toggleConnect}
        mint={mint}
        captcha={captcha}
        selectTime={selectTime}
      />
    </div>
  );
}

export default App;
