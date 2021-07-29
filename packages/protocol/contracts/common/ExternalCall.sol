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
   * @notice Executes external call.
   * @param destination The address to call.
   * @param value The CELO value to be sent.
   * @param data The data to be sent.
   * @param metaGasLimit Gas limit for Meta Transaction
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
    uint256 partialEstimate = 1000; // TODO: EXPERIMENTALLY DETERMINE THIS CONSTSANT/ASK YORKE
    msg.sender.transfer(partialEstimate);
    (success, returnData) = destination.call.value(value).gas(metaGasLimit)(data); // TODO
    
    if(!success) {
      emit FailedMetaTransaction("Refundable Meta Transaction Failed");
    }
    
    msg.sender.transfer(gasLimit - gasLeft() - partialEstimate + buffer);
    
    return returnData;
  }
}
