import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NFTCard({ nftId, metaMaskAddress }) {
  const [nftData, setNFTData] = useState(null);

  useEffect(() => {
    async function fetchNFTData() {
      try {
        const response = await axios.get(`https://api.opensea.io/api/v1/asset/${nftId}`);
        setNFTData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNFTData();
  }, [nftId]);

  if (!nftData) {
    return <div>Loading...</div>;
  }

  const { name, image_url } = nftData;

  return (
    <div>
      <h2>{name}</h2>
      <img src={image_url} alt={name} />

      <div>MetaMask Address: {metaMaskAddress}</div>
      {/* 여기에서 메타마스크 주소를 사용할 수 있습니다 */}
    </div>
  );
}

export default NFTCard;
