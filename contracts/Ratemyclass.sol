// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Ratemyclass is ERC721URIStorage {

  using Counters for Counters.Counter;
  Counters.Counter public _totalNFTs;
  uint public _totalClasses = 0;
  mapping(uint => ClassesBluePrint) public listOfClasses;
  mapping(uint => CommentBluePrint) public listOfComments;

  struct ClassesBluePrint {
    uint id;
    string cid;
    uint targetAmmount;
    uint totalDonations;
    address organizer;
  }

  struct CommentBluePrint {
    uint id;
    string cid;
    address organizer;
  }

  event GroupCreated (
    uint id,
    string cid,
    uint targetAmmount,
    address organizer
  );

  event commentCreated (
    uint id,
    string cid,
    address organizer
  );

  constructor() ERC721("RatemyClass", "RMC") {}


  // calldata is read only, use for funct inputs as params
  function createClass(string calldata _cid, uint _targetAmmount) public {
    listOfClasses[_totalClasses] = ClassesBluePrint(_totalClasses, _cid, _targetAmmount, 0, msg.sender);
    emit GroupCreated(_totalClasses, _cid, _targetAmmount, msg.sender);
    _totalClasses++;
  }

  function donate(uint _donationId, uint _donationAmmount) public {
    ClassesBluePrint storage _currentGroup = listOfClasses[_donationId];
    _currentGroup.totalDonations += _donationAmmount;
  }

  function getAllGroups() public view returns (ClassesBluePrint[] memory) {
      ClassesBluePrint[] memory groupsArray = new ClassesBluePrint[](_totalClasses);

      for (uint i = 0; i < _totalClasses; i++) {
          ClassesBluePrint storage currentItem = listOfClasses[i];
          groupsArray[i] = currentItem;
      }
      return groupsArray;
  }

}


