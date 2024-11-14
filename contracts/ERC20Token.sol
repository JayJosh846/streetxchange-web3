// SPDX-License-Identifier: MIT OR LGPL-2.0-or-later
pragma solidity ^0.8.5;

// import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./Operations.sol";
import "./Libs/IERC20.sol";
import "./Pausable.sol";
import "./Libs/Safemath.sol";

/**
 * @title Basic FreeMoney token.
 */
contract ERC20Token is IERC20, Pausable {
    using SafeMath for uint256;
    Operations internal operation;

    /// @dev counter to allow mutex lock with only one SSTORE operation
    uint256 private _guardCounter;

    /**
     * _name Token Name
     * _symbol Token _symbol
     * _decimals Token decimals
     */
    string public name = "WRAPCBDC";
    string public symbol = "CNGN";
    uint256 public decimals = 2;


    // additional variables for use if transaction fees ever became necessary
    uint256 internal _totalIssued;
    uint256 internal _totalRedeemed;
    uint256 internal _totalSupply;
    uint256 public baseFee = 0;
    uint256 public maximumFee = 0;
    uint256 public constant MAX_UINT = 2**256 - 1;

    mapping (address => uint256) internal refundPassengerFee;
    mapping (address => uint256) internal flightFees;
    mapping (address => uint256) internal airlineFee;
    mapping(address => mapping(address => uint256)) internal allowed;
    mapping(address => uint256) internal balances;

    /**
     * @dev Fix for the ERC20 short address attack.
     */
    modifier onlyPayloadSize(uint256 size) {
        require(!(msg.data.length < size + 4));
        _;
    }

    modifier nonReentrant() {
    _guardCounter += 1;
    uint256 localCounter = _guardCounter;
    _;
    require(localCounter == _guardCounter);
    }

    constructor(address _address){
        operation = Operations(_address);

    // The counter starts at one to prevent changing it from zero to a non-zero
    // value, which is a more expensive operation.
    _guardCounter = 1;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    /**
     * Issue a new amount of tokens these tokens are deposited into the owner address
     * This is for issuing of token to the user or the beneficiary of the NGO
     * @param _amount Number of tokens to be issued
     */
    function issue(uint256 _amount, address _mintedTo) public nonReentrant onlyOwner {
        require(_totalSupply + _amount > _totalSupply);
        //require(balances[owner] + _amount > balances[_mintedTo]);

        balances[_mintedTo] += _amount;
        _totalSupply += _amount;
        _totalIssued += _amount;
        emit Issue(_amount, _mintedTo);
    }

    /**
     * Redeem tokens.
     * These tokens are withdrawn from the owner address if the balance must be enough to cover the redeem
     * or the call will fail.
     *
     * @param _amount Number of tokens to be issued
     */
    function redeem(uint256 _amount) public nonReentrant onlyOwner {
        require(_totalSupply >= _amount);
        require(balances[owner] >= _amount);

        _totalSupply -= _amount;
        balances[owner] -= _amount;
        _totalRedeemed += _amount;
        emit Redeem(_amount);
    }

    function setParams(uint256 platformFee)
        public
        onlyOwner
    {
        // Ensure transparency by hardcoding limit beyond which fees can never be added
        require(platformFee < 5);

        baseFee = platformFee;
        // maximumFee = newMaxFee.mul(10**decimals);

        emit Params(baseFee);
    }

    function totalIssued()
        public
        view
        returns (uint256)
    {
        return _totalIssued;
    }

    function totalRedeemed()
        public
        view
        returns (uint256)
    {
        return _totalRedeemed;
    }

    /**
     * @dev Gets the balance of the specified address.
     * @param _address The address to return the its balance.
     * @return balance An uint256 representing the amount owned by the _address.
     */
    function balanceOf(address _address) 
        public 
        override 
        view 
        returns (uint256 balance) {
        return balances[_address];
    }

    /**
     * @dev transfer token for a specified address
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transfer(address _to, uint256 _value)
        public
        whenNotPaused
        override
        nonReentrant
        onlyPayloadSize(2 * 32)
        returns (bool)
    {
        require(!operation.IsBlackListed(_to), "Account is BlackListed");

        balances[_msgSender()] = balances[_msgSender()].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(_msgSender(), _to, _value);

        return true;
    }

    /**
     * @dev transferToEscrow token for a specified address to escrow contract
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transferToEscrow(address _from, address _to, uint256 _value, address _airline, uint256 flightRefund)
        public
        whenNotPaused
        override
        nonReentrant
        onlyPayloadSize(2 * 32)
        returns (bool)
    {
        require(!operation.IsBlackListed(_to), "Account is BlackListed");
        
        uint256 fee = _value.mul(baseFee).div(100);

        uint256 sendAmount = _value.sub(fee);
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(sendAmount);
        if (fee > 0) {
            balances[owner] = balances[owner].add(fee);
            emit Transfer(_from, owner, fee);
        }

        allowed[_to][_from] = 0;
        allowed[_to][_airline] = 0;
        allowed[_to][_to] = 0;
        

        refundPassengerFee[_from] = refundPassengerFee[_from].add(sendAmount.sub(_value.mul(flightRefund).div(100))); 
        airlineFee[_airline] = airlineFee[_airline].add(_value.mul(flightRefund).div(100));
        flightFees[_to] = flightFees[_to].add(sendAmount.sub(_value.mul(flightRefund).div(100)));

        approve(_to, _from, refundPassengerFee[_from]);
        approve(_to, _airline, airlineFee[_airline]);
        approve(_to, _to, flightFees[_to]);

        emit Transfer(_from, _to, sendAmount);

        return true;
    }
    
    /**
     * @dev passengerClaimWithdrawal tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _refundPassengerFee The amount to be refunded to passenger
     */
    function passengerClaimWithdrawal(
        address _from,
        address _to,
        uint256 _refundPassengerFee
    ) 
        public 
        whenNotPaused
        nonReentrant
        onlyPayloadSize(2 * 32)
        returns (bool) 
        {
        require(!operation.IsBlackListed(_to), "Account is BlackListed");

        uint256 _allowance = _refundPassengerFee;
        uint256 fee = (_allowance.mul(baseFee)).div(100);
        if (fee > maximumFee) {
            fee = maximumFee;
        }
        uint256 sendAmount = _allowance.sub(fee);
        
        allowed[_from][_to] = sendAmount.sub(sendAmount);
        allowed[_from][_from] =  allowed[_from][_from].sub(sendAmount);
        refundPassengerFee[_to] = _allowance.sub(sendAmount);
        flightFees[_from] =  allowed[_from][_from];
        
        
        balances[_from] = balances[_from].sub(sendAmount);
        balances[_to] = balances[_to].add(sendAmount);
        if (fee > 0) {
            balances[owner] = balances[owner].add(fee);
            emit Transfer(_from, owner, fee);
        }
        emit Transfer(_from, _to, _allowance);


        return true;
    }

    /**
     * @dev WithdrawFromEscrow tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     */
    function withdrawFromEscrow(
        address _from,
        address _to
    ) 
        public 
        whenNotPaused
        nonReentrant
        override
        onlyPayloadSize(2 * 32)
        returns (bool) 
        {
        //Call function only when escrow or passenger is cancelled, delayed
        require(!operation.IsBlackListed(_to), "Account is BlackListed");

        uint256 _allowance = allowed[_from][_to];
        uint256 fee = (_allowance.mul(baseFee)).div(100);
        if (fee > maximumFee) {
            fee = maximumFee;
        }
        
        allowed[_from][_to] = _allowance.sub(_allowance);
        airlineFee[_to] = _allowance.sub(_allowance);

        
        uint256 sendAmount = _allowance.sub(fee);
        balances[_from] = balances[_from].sub(_allowance);
        balances[_to] = balances[_to].add(sendAmount);
        if (fee > 0) {
            balances[owner] = balances[owner].add(fee);
            emit Transfer(_from, owner, fee);
        }
        emit Transfer(_from, _to, sendAmount);

        return true;
    }

    /**
     * @dev WithdrawFlightFee tokens from escrow to Airline Address
     * @param _escrow address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     */
    function withdrawFlightFee(
        address _escrow,
        address _to
    ) 
        public 
        whenNotPaused
        nonReentrant
        onlyPayloadSize(2 * 32)
        returns (bool) 
        {
        //Call function only when escrow or passenger is cancelled, delayed
        require(!operation.IsBlackListed(_to), "Account is BlackListed");

        uint256 _allowance = allowed[_escrow][_escrow];
        uint256 fee = (_allowance.mul(baseFee)).div(100);
        if (fee > maximumFee) {
            fee = maximumFee;
        }
       
        allowed[_escrow][_escrow] = _allowance.sub(_allowance);
        flightFees[_to] = _allowance.sub(_allowance);
        
        uint256 sendAmount = _allowance.sub(fee);
        balances[_escrow] = balances[_escrow].sub(_allowance);
        balances[_to] = balances[_to].add(sendAmount);
        if (fee > 0) {
            balances[owner] = balances[owner].add(fee);
            emit Transfer(_escrow, owner, fee);
        }
        emit Transfer(_escrow, _to, sendAmount);

        return true;
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint the amount of tokens to be transferred
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) 
        public 
        whenNotPaused
        nonReentrant
        override
        onlyPayloadSize(3 * 32)
        returns (bool) 
        {
        //Call function only when escrow or passenger is cancelled, delayed

        require(!operation.IsBlackListed(_to), "Account is BlackListed");

        uint256 _allowance = allowed[_from][_msgSender()];

        uint256 fee = (_value.mul(baseFee)).div(10000);
        if (fee > maximumFee) {
            fee = maximumFee;
        }
        if (_allowance < MAX_UINT) {
            allowed[_from][_msgSender()] = _allowance.sub(_value);
        }
        uint256 sendAmount = _value.sub(fee);
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(sendAmount);
        if (fee > 0) {
            balances[owner] = balances[owner].add(fee);
            emit Transfer(_from, owner, fee);
        }
        emit Transfer(_from, _to, sendAmount);

        return true;
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * @param _spender The address which will spend the funds.
     * @param _value The amount of tokens to be spent.
     */
    function approve(address _escrow, address _spender, uint256 _value)
        public
        override
        onlyPayloadSize(2 * 32)
        returns (bool)
    {
        require(!operation.IsBlackListed(_spender), "Account is BlackListed");
        require(
            !((_value != 0) && (allowed[_escrow][_spender] != 0)),
            "ERC20Token: Approved"
        );

        allowed[_escrow][_spender] = _value;

        emit Approval(_escrow, _spender, _value);

        return true;
    }

    /**
     * @dev Function to check the amount of tokens that an owner allowed to a spender.
     * @param _owner address The address which owns the funds.
     * @param _spender address The address which will spend the funds.
     * @return remaining A uint specifying the amount of tokens still available for the spender.
     */
    function allowance(address _owner, address _spender)
        public
        override
        view
        returns (uint256 remaining)
    {
        return allowed[_owner][_spender];
    }
}
