/**
 * @brief C-based SwipeLeft BPF program
 */
#include <solana_sdk.h>

uint64_t swiperight(SolParameters *params) {

  if (params->ka_num < 1) {
    sol_log("Greeted account not included in the instruction");
    return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
  }

  // Get the account to say increment swipe left on
  SolAccountInfo *account = &params->ka[0];

  // The account must be owned by the program in order to modify its data
  /*if (!SolPubkey_same(account->owner, params->program_id)) {
    sol_log("Account does not have the correct program id");
    return ERROR_INCORRECT_PROGRAM_ID;
  } */

  // The data must be large enough to hold an uint32_t value
  if (account->data_len < sizeof(uint32_t)) {
    sol_log("Account data length too small to hold uint32_t value");
    return ERROR_INVALID_ACCOUNT_DATA;
  }

  uint32_t *num_right = (uint32_t *)account->data;
  *num_right += 1;

  sol_log("Swiped right");

  return SUCCESS;
}

extern uint64_t entrypoint(const uint8_t *input) {
  sol_log("Swipe Right C program entrypoint");

  SolAccountInfo accounts[1];
  SolParameters params = (SolParameters){.ka = accounts};

  if (!sol_deserialize(input, &params, SOL_ARRAY_SIZE(accounts))) {
    return ERROR_INVALID_ARGUMENT;
  }

  return swiperight(&params);
}