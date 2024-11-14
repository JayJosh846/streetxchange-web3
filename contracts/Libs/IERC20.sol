// SPDX-License-Identifier: MIT OR LGPL-2.0-or-later
pragma solidity ^0.8.5;

/**
 * @title ERC20Basic
 * @dev Simple version of FreeMoney ERC20 interface
 */
interface IERC20 {

    event Transfer(address indexed from, address indexed to, uint256 value);
     // Called when new token are issued
    event Issue(uint256 amount, address indexed mintedTo);
    // Called when tokens are redeemed
    event Redeem(uint256 amount);
    // Called if contract ever adds fees
    event Params(uint256 baseFee);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
   
    function balanceOf(address _address) external view returns (uint256 balance);

    function totalSupply() external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);
    function transferToEscrow(address _from, address _to, uint256 _value, address _airline, uint256 flightRefund)external returns (bool);
    function withdrawFromEscrow(address _from, address _to)external returns (bool);

    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool);

    function approve(address _escrow, address _spender, uint256 _value) external returns (bool);
}
