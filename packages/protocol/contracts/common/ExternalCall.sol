pragma solidity ^0.5.13;

import "openzeppelin-solidity/contracts/utils/Address.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

library ExternalCall {
  using SafeMath for uint256;

  event FailedMetaTransaction(string error);

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

  /**
   * @notice Executes external call with refund to sender.
   * @param destination The address to call.
   * @param value The CELO value to be sent.
   * @param gasLimit Gas limit for entire transaction including initial relay.
   * @param metaGasLimit Gas limit for Meta Transaction.
   * @param data The data to be sent.
   * @return The call return value.
   */
  function executeWithRefund(
    address destination,
    uint256 value,
    uint256 gasLimit,
    uint256 metaGasLimit,
    bytes memory data
  ) internal returns (bytes memory) {
    if (data.length > 0) require(Address.isContract(destination), "Invalid contract address");
    bool success;
    bytes memory returnData;
    uint256 partialRefund = gasLimit.sub(gasLeft());
    msg.sender.transfer(partialRefund);
    if(this.balance >= metaGasLimit) {
      (success, returnData) = destination.call.value(value).gas(metaGasLimit)(data);
      if (!success) {
        emit FailedMetaTransaction("Refundable Meta Transaction Failed"); //Can we emit an event from a library?
      }
    }
    uint256 buffer = 4747; // TODO: determine this constant (gas required for operations after msg.sender.transfer)
    msg.sender.transfer(gasLimit.sub(gasLeft()).sub(partialRefund).add(buffer));
    return returnData;
  }
}
