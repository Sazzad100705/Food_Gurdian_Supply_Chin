// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MyContract is Ownable {
    using SafeMath for uint256;

    struct Product {
        address owner;
        string title;
        string description;
        uint256 quantity;
        uint256 price;
        string manufacturerName;
        uint256 manufacturerNo;
        uint256 dateNTime;
        string image;
        address[] buyers; //donaters
        uint256[] totalAmounts; // donations
        uint256 amountcollected;
        string category;
        string upc;
        string transactionHash;
    }

    mapping(string => string) public upcToTxHash;
    mapping(uint256 => Product) public products;

    uint256 public numberOfProducts = 0;

    // avtivity status of the contract
    bool public emergencyMode; // default: false

    /// Will arise when msg.value is lower than minAmount
    /// `minAmount` minimmum amount
    /// @param minAmount the minnimum acceptable ETH amount to fund
    /// @param payedAmount the ETH amount funded by user
    error LowEtherAmount(uint minAmount, uint payedAmount);

    // modifiers
    modifier privilageEntity(uint _id) {
        _privilagedEntity(_id);
        _;
    }

    modifier notInEmergency() {
        require(!emergencyMode);
        _;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    // Preventing entering null values as campaign details
    modifier notNull(
        string memory title,
        string memory description,
        uint256 quantity,
        uint256 price,
        string memory image
    ) {
        _nullChecker(title, description, quantity, price, image);
        _;
    }

    function createProduct(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _quantity,
        uint256 _price,
        string memory _manufacturerName,
        uint256 _manufacturerNo,
        uint256 _dateNTime,
        string memory _image,
        string memory _category,
        string memory _upc,
        string memory _transactionHash
    ) public returns (uint256) {
        Product storage product = products[numberOfProducts];

        product.owner = _owner;
        product.title = _title;
        product.description = _description;
        product.quantity = _quantity;
        product.price = _price;
        product.manufacturerName = _manufacturerName;
        product.manufacturerNo = _manufacturerNo;
        product.dateNTime = _dateNTime;
        product.image = _image;
        product.amountcollected = 0;
        product.category = _category;
        product.upc = _upc;
        product.transactionHash = _transactionHash;

        numberOfProducts++;
        //returns the newly created product
        return numberOfProducts - 1;
    }

    function storeData(string memory _upc, string memory _txHash) external {
        upcToTxHash[_upc] = _txHash;
    }

    function getTxHash(
        string memory _upc
    ) external view returns (string memory) {
        return upcToTxHash[_upc];
    }

    function getBuyers(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (products[_id].buyers, products[_id].totalAmounts);
    }

    function showProducts() public view returns (Product[] memory) {
        Product[] memory allProduct = new Product[](numberOfProducts);

        for (uint i = 0; i < numberOfProducts; i++) {
            Product storage item = products[i];

            allProduct[i] = item;
        }
        return allProduct;
    }

    /// @notice Deleting a specific fundraising campaign
    /// @param _id campaign id
    /// @return true, if deleting be correctly done
    function deleteProduct(
        uint256 _id
    ) external privilageEntity(_id) notInEmergency returns (bool) {
        require(
            products[_id].owner > address(0),
            "No Product exist with this ID"
        );
        // if(campaigns[_id].amountCollected > 0 wei) {
        //     _refundDonators(_id);
        // }
        delete products[_id];

        emit Action(_id, "Product Deleted", msg.sender, block.timestamp);

        numberOfProducts -= 1;
        return true;
    }

    /// @notice Preventing unauthorized entity to execute specific function
    /// @param _id product id
    function _privilagedEntity(uint256 _id) internal view {
        require(
            msg.sender == products[_id].owner || msg.sender == owner(),
            "Unauthorized Entity"
        );
    }

    /** @notice Update a fundraising campaign
     *  @param _id campign id
     *  @param _title new title of the fundraising campaign
     *  @param _description new description of the fundraising campaign
     *  @param _quantity new description of the fundraising campaign
     *  @param _price new desired ETH target amount of the fundraising campaign(based on wei)
     *  @param _image new image address of the fundraising campaign
     *  @return status of campaign update request
     */

    function UpdateProduct(
        uint256 _id,
        string memory _title,
        string memory _description,
        uint256 _quantity,
        uint256 _price,
        string memory _image
    )
        external
        privilageEntity(_id)
        notNull(_title, _description, _quantity, _price, _image)
        notInEmergency
        returns (bool)
    {
        // Making a pointer for a product

        Product storage product = products[_id];
        require(product.owner > address(0), "No product exist with this ID");

        product.title = _title;
        product.description = _description;
        product.quantity = _quantity;
        product.price = _price;
        product.image = _image;
        product.amountcollected = 0;

        emit Action(_id, "Product Updated", msg.sender, block.timestamp);
        return true;
    }

    /// @notice Donate to an specific fundraising campaign
    /// @param _id campaign id
    function buyProduct(uint256 _id) external payable notInEmergency {
        if (msg.value == 0 wei)
            revert LowEtherAmount({minAmount: 1 wei, payedAmount: msg.value});
        Product storage product = products[_id];
        require(product.owner > address(0), "No campaign exist with this ID");

        uint256 amount = msg.value;
        product.amountcollected = product.amountcollected.add(amount);

        product.buyers.push(msg.sender);
        product.totalAmounts.push(amount);

        emit Action(_id, "Purchase item", msg.sender, block.timestamp);
    }

    function _nullChecker(
        string memory _title,
        string memory _description,
        uint256 _quantity,
        uint256 _price,
        string memory _image
    ) internal pure {
        require(
            (bytes(_title).length > 0 &&
                bytes(_description).length > 0 &&
                _price > 0 &&
                _quantity > 0 &&
                bytes(_image).length > 0),
            "Null value not acceptable"
        );
    }
}
