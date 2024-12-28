/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/lottery_dapp.json`.
 */
export type LotteryDapp = {
  "address": "FEDUDry6bZTsd8qGXZFqDYPCboWEzEKgDTy3H6yR57nx",
  "metadata": {
    "name": "lotteryDapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    }
  ]
};