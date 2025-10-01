// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title ActivityNFT
 * @dev NFT contract for Actify platform activity verification
 */
contract ActivityNFT is ERC721, Ownable {
    uint256 public nextId;
    IERC20 public rewardToken;
    uint256 public rewardAmount;

    mapping(uint256 => string) public activityMeta;

    event ActivityMinted(address indexed user, uint256 tokenId, string metadata);

    constructor(address _rewardToken, uint256 _rewardAmount) 
        ERC721("Actify Activity", "ACTA") 
        Ownable(msg.sender) 
    {
        rewardToken = IERC20(_rewardToken);
        rewardAmount = _rewardAmount;
    }

    /**
     * @dev Mint activity NFT and distribute rewards
     * @param to Address to receive NFT
     * @param metadata Activity metadata (JSON string)
     * @return tokenId The minted token ID
     */
    function mintActivity(address to, string memory metadata) external onlyOwner returns (uint256) {
        uint256 id = ++nextId;
        _safeMint(to, id);
        activityMeta[id] = metadata;
        
        if (rewardAmount > 0) {
            require(rewardToken.transfer(to, rewardAmount), "Reward transfer failed");
        }
        
        emit ActivityMinted(to, id, metadata);
        return id;
    }

    /**
     * @dev Update reward amount (only owner)
     * @param _amt New reward amount
     */
    function setRewardAmount(uint256 _amt) external onlyOwner {
        rewardAmount = _amt;
    }
}
