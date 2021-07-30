pragma solidity ^0.5.13;

import "openzeppelin-solidity/contracts/utils/Address.sol";

library ExternalCall {

  event FailedMetaTransaction(
    string error
  );


  /**
   * @notice Executes external call.
   * @param destination The address to call.
   * @param value The CELO value to be sent.
   * @param data The data to be sent.
   * @return The call return value.
   */
  function execute(address destination, uint256 value, bytes memory data)
    internal
    returns (bytes memory)
  {
    if (data.length > 0) require(Address.isContract(destination), "Invalid contract address");
    bool success;
    bytes memory returnData;
    (success, returnData) = destination.call.value(value)(data);
    require(success, "Transaction execution failed.");
    return returnData;
  }

  // TODO
  /**
   * @notice Executes external call with refund to sender.
   * @param destination The address to call.
   * @param value The CELO value to be sent.
   * @param gasLimit Gas limit for entire transaction including initial relay.
   * @param metaGasLimit Gas limit for Meta Transaction.
   * @param data The data to be sent.
   * @return The call return value.
   */
  function executeWithRefund(address destination, uint256 value, uint256 gasLimit, uint256 metaGasLimit, bytes memory data)
    internal
    returns (bytes memory)
  {
    // TODO
    if (data.length > 0) require(Address.isContract(destination), "Invalid contract address");
    bool success;
    bytes memory returnData;
    uint256 partialRefund = 4747; // TODO: determine this constant (gas required for all operations before destination.call)
    msg.sender.transfer(partialRefund);
    (success, returnData) = destination.call.value(value).gas(metaGasLimit)(data); // TODO
    
    if(!success) {
      emit FailedMetaTransaction("Refundable Meta Transaction Failed");
    }

    uint256 buffer = 4747; // TODO: determine this constant (gas required for operations after msg.sender.transfer)
    msg.sender.transfer(gasLimit - gasLeft() - partialRefund + buffer);
    
    return returnData;
  }
}
