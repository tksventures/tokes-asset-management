# Tokes Asset Management
_Snapshot and distribution tool for Waves Assets_

## Setup and Usage

1. Clone repository and change to the root directory
2. `npm install`
3. Create a new file called `.env` in the root
4. Insert values accord to the (Configuration)[#configuration] guidelines
5. `npm start`
6. Follow presented instructions

## Configuration

All definitions should be placed in the `.env` file or added as environment variables to the `start` command

| Key | Description |
| --- | --- |
| `WAVES_NODE` | Base Rest API URL of a synced waves node |
| `TOKEN_NAME` | Name of the token (cosmetic/informational, does not require accuracy) |
| `TOKEN_ASSET_ID` | The Asset ID of the token you wish to snapshot |
| `TARGET_ASSET_ID` | The Asset ID of the token you wish to distribute  |
| `DISTR_MULTIPLIER` | A factor of the old token amount for the new distribution |
| `DISTR_BLACKLIST` | Comma separated string of addresses to exclude from the distribution |
