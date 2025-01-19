# NFTance
Mint, buy, sell, and explore unique digital NFTs on our platform, providing secure and transparent ownership of digital content.
## Tech Stack
### Frontend
- React.js
- Material UI
- CSS
- Ethersjs
### Backend
- Solidity
- IPFS (Pinata)
- openzeppelin



## Features of NFTance:

- Creation and Ownership: Users can easily create, manage, and monetize their own NFTs, ensuring true ownership.
- Trading: Users can list their digital NFTs for sale, purchase, or trade.
- Content Security: To protect intellectual property, the platform implements watermarks on NFT images and restricts video previews to a few seconds, reducing the risk of unauthorized screenshots and content theft.
- Ownership Transfer: Automatic transfer of ownership upon transaction completion.

## Smart Contracts:
- contract.sol: Smart contract for minting and managing digital NFTs and handling marketplace functionalities like sale, purchase, or trade.
- OpenZeppelin: Implementation of the ERC721 standard for non-fungible tokens (NFTs).

## Run Locally

Clone the project

```bash
  git clone https://github.com/Aditya-Chaurasia11/NFTance.git
```

Go to the project directory

```bash
  cd NFTance
```

Install dependencies

```bash
  npm install
```

Start the Game

```bash
  npm run dev
```

## Project flow

  Check this for video demo [Click here](https://youtu.be/rfjsWe0nXk8?si=BVPZeXnx-LAJh-EB)

- NFT Creation
    - Upload Video or image & Metadata: Users upload their video or image to IPFS and provide metadata like title and description.
    - Mint NFT: The createNFT function in contract.sol mints the video or image and metadata as an NFT on the blockchain.

![Gameplay](https://i.postimg.cc/VkCq3vSP/img11.jpg.jpg)


- Listing NFT for Sale
    - Set Sale Price: Users set the price for their NFT.
    - List on Marketplace: The Mapitem function in Marketplace.sol lists the NFT and marks it for sale.

![Gameplay](https://i.postimg.cc/RFXKcnYK/img22.jpg)


- Marketplace Browsing
    - Browse NFTs: Users explore available NFTs using filter options.
    - Preview Video: Users watch a short preview of the video before purchasing.
    - Watermarks: Images are watermarked to prevent unauthorized use while maintaining visual quality.

 ![Gameplay](https://i.postimg.cc/8kYrNDgp/img33.jpg)



- Purchasing NFT
    - Select NFT: Choose the NFT to buy.
    - Complete Purchase: Process the transaction to transfer ownership.
 
[![img44.jpg](https://i.postimg.cc/vDRB9YG5/img44.jpg)](https://postimg.cc/dZBwcKk0)

  
