// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChemicalTracking {

    struct Chemical {
        uint id;
        string name;
        string description;
        address owner;
        uint256 timestamp;
        string status; // e.g., "Manufactured", "In Transit", "Delivered"
    }

    mapping(uint => Chemical) public chemicals;
    mapping(address => uint[]) public ownerChemicals;
    uint public chemicalCount;

    event ChemicalRegistered(uint id, string name, string description, address owner);
    event ChemicalStatusUpdated(uint id, string status);

    modifier onlyOwner(uint _id) {
        require(msg.sender == chemicals[_id].owner, "You are not the owner of this chemical.");
        _;
    }

    // Function to register a new chemical
    function registerChemical(string memory _name, string memory _description) public {
        chemicalCount++;
        chemicals[chemicalCount] = Chemical(chemicalCount, _name, _description, msg.sender, block.timestamp, "Manufactured");
        ownerChemicals[msg.sender].push(chemicalCount);
        emit ChemicalRegistered(chemicalCount, _name, _description, msg.sender);
    }

    // Function to update the status of a chemical
    function updateChemicalStatus(uint _id, string memory _status) public onlyOwner(_id) {
        chemicals[_id].status = _status;
        emit ChemicalStatusUpdated(_id, _status);
    }

    // Function to get chemical details
    function getChemical(uint _id) public view returns (string memory, string memory, address, uint, string memory) {
        Chemical memory chem = chemicals[_id];
        return (chem.name, chem.description, chem.owner, chem.timestamp, chem.status);
    }

    // Function to get all chemicals owned by an address
    function getOwnerChemicals(address _owner) public view returns (uint[] memory) {
        return ownerChemicals[_owner];
    }
}
