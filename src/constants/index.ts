export const NFT_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "function revealNft(uint256 tokenId, string memory tokenURI) external",
  "function tokenURI(uint256 tokenId) public view returns (string memory) ",
  "function tokenIds() public view returns(uint256)",
  "function tokenIdByUser(address) public view returns(uint256)",
  "function mint(bool _isNight) external",
  "function ownerOf(uint256 _tokenId) public view returns (address)",
  "function transferFrom(address from,address to, uint256 tokenId)",
  "event MintEvent(uint256 _tokenId)",
  "event MetadataUpdate(uint256 _tokenId)",
];
