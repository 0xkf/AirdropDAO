import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core"

const AIRSTACK_ENDPOINT = "https://api.airstack.xyz/gql"
const AIRSTACK_API_KEY = process.env.REACT_APP_AIRSTACK_API_KEY

// Initializing Client 🚀
const client = new ApolloClient({
    uri: AIRSTACK_ENDPOINT,
    cache: new InMemoryCache(),
    headers: { Authorization: AIRSTACK_API_KEY || "" },
})

export async function GetAllNFTusers(): Promise<any> {
    const query = gql`
      query ListERC721TokenHolders {
        TokenBalances(
          input: {filter: {tokenAddress: {_eq: "0x981116f806898f1c1ecb1d3bf2af4f2140b1bb92"}, tokenType: {_eq: ERC721}}, blockchain: polygon, limit: 10}
        ) {
          TokenBalance {
            owner {
              addresses
            }
            tokenAddress
            tokenId
            amount
            lastUpdatedTimestamp
          }
        }
      }
    `

    const response = await client.query({
        query,
        variables: {
        },
    })
    return response.data.TokenBalances
}

