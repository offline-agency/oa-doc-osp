---
title: AWS Blockchain Laravel
description: What the experimental pre-1.0 AWS Blockchain Laravel package actually does, which drivers work, and why its AWS drivers fail with the current AWS SDK.
gitName: aws-blockchain-laravel
packageVersion: '0.0.4'
sourceCommit: d06245ab1aded65d6f5a19c62e6c86416b2fce23
---

# AWS Blockchain Laravel

A pre-1.0 Laravel package that defines a common driver interface for recording and verifying "events" on a ledger, plus Artisan commands for compiling, deploying and calling smart contracts. It ships four drivers: a mock driver, an EVM JSON-RPC driver, an Amazon Managed Blockchain driver and an Amazon QLDB driver.

This is the **v0.0 reference**, documenting release [0.0.4](https://github.com/offline-agency/aws-blockchain-laravel/releases/tag/0.0.4) (12 November 2025), checked on 19 October 2026. [Packagist](https://packagist.org/packages/offline-agency/aws-blockchain-laravel) source and dist references match the source commit above.

::: warning Experimental release
At 0.0.4 only the mock driver works end to end. The Managed Blockchain and QLDB drivers call AWS operations that do not exist in the AWS SDK for PHP, the EVM driver cannot be selected through the package's driver manager, and several commands report success without doing the work. Do not use this release to record or verify production data. The details, checked against the source and the SDK, are below.
:::

## Versions and compatibility

| Documentation line | Latest release | Status |
| --- | --- | --- |
| [v0.0](/aws-blockchain-laravel/v0.0/) | `0.0.4` | Pre-1.0, experimental; no support policy, changelog or security policy is published |

GitHub releases and Packagist list `0.0.1` to `0.0.4`, all published between 5 and 12 November 2025. No commit has been pushed to the repository since 0.0.4.

## Requirements

The [Composer manifest](https://github.com/offline-agency/aws-blockchain-laravel/blob/d06245ab1aded65d6f5a19c62e6c86416b2fce23/composer.json) requires PHP `^8.3`, Illuminate `support`, `container`, `console` and `database` at `^11.0|^12.0`, `aws/aws-sdk-php ^3.0` and `kornrunner/keccak ^1.0`. Laravel 13 is outside these constraints. The package also uses `Http`, `Log`, `config_path()` and `storage_path()`, so it expects a full Laravel application.

On 19 October 2026 a Composer 2.10.2 resolution of `offline-agency/aws-blockchain-laravel 0.0.4` (platform PHP 8.4) succeeded, selecting `aws/aws-sdk-php` 3.401.3 and Illuminate 12.

## Installation

```bash
composer require offline-agency/aws-blockchain-laravel:0.0.4
php artisan vendor:publish --tag=aws-blockchain-laravel-config
php artisan vendor:publish --tag=aws-blockchain-laravel-migrations
php artisan migrate
```

Publish the configuration: the service provider does not merge a default config, so without `config/aws-blockchain-laravel.php` the driver list is empty and resolving any driver, including `mock`, throws `Driver 'mock' is not configured.`

The migrations create `blockchain_contracts` (name, version, `evm`/`fabric` type, address, network, ABI, deployment data, status, upgrade links) and `blockchain_transactions` (hash, contract, method, parameters, gas, status, block number).

## Configuration

The published `config/aws-blockchain-laravel.php` contains:

| Key | Env | Default |
| --- | --- | --- |
| `default_driver` | `BLOCKCHAIN_DRIVER` | `mock` |
| `public_driver` | `BLOCKCHAIN_PUBLIC_DRIVER` | `mock` |
| `private_driver` | `BLOCKCHAIN_PRIVATE_DRIVER` | `mock` |
| `drivers.mock` | | `type: mock` |
| `drivers.managed_blockchain` | `AWS_DEFAULT_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_BLOCKCHAIN_NETWORK_ID`, `AWS_BLOCKCHAIN_MEMBER_ID`, `AWS_BLOCKCHAIN_NODE_ID`, `BLOCKCHAIN_CHANNEL_NAME`, `BLOCKCHAIN_CHAINCODE_NAME` | region `us-east-1`, channel `mychannel`, chaincode `supply-chain` |
| `drivers.qldb` | `AWS_DEFAULT_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_QLDB_LEDGER_NAME` | ledger `supply-chain-ledger` |
| `data_categories` | | Lists of public and private category names |
| `contracts.networks` | `BLOCKCHAIN_MAINNET_RPC`, `BLOCKCHAIN_SEPOLIA_RPC`, `BLOCKCHAIN_LOCAL_RPC`, `ETHERSCAN_API_KEY` | `mainnet`, `sepolia`, `local` (EVM) and `fabric` |
| `contracts.default_network` | `BLOCKCHAIN_CONTRACT_NETWORK` | `local` |
| `contracts.compiler` | `SOLC_PATH`, `SOLC_OPTIMIZE`, `SOLC_OPTIMIZE_RUNS`, `SOLC_EVM_VERSION` | `solc`, optimised, 200 runs, `paris` |
| `contracts.gas`, `contracts.deployment`, `contracts.hot_reload` | `BLOCKCHAIN_GAS_LIMIT`, `BLOCKCHAIN_AUTO_VERIFY`, `BLOCKCHAIN_HOT_RELOAD` and others | See the [config file](https://github.com/offline-agency/aws-blockchain-laravel/blob/d06245ab1aded65d6f5a19c62e6c86416b2fce23/config/aws-blockchain-laravel.php) |

The AWS drivers read credentials only from these keys; they do not use the SDK's default credential chain.

## Drivers

The service provider binds `blockchain` (a `BlockchainManager`), `blockchain.public` and `blockchain.private`. The `AwsBlockchain\Laravel\Facades\Blockchain` facade proxies the manager:

```php
use AwsBlockchain\Laravel\Facades\Blockchain;

$driver = Blockchain::publicDriver();
$id = $driver->recordEvent(['product_origin' => 'IT']);
$event = $driver->getEvent($id);
$valid = $driver->verifyIntegrity($id, ['product_origin' => 'IT']);
```

Every driver implements `BlockchainDriverInterface`: `recordEvent`, `getEvent`, `verifyIntegrity`, `isAvailable`, `getType`, `getDriverInfo`, `deployContract`, `callContract`, `estimateGas`, `getTransactionReceipt`, `getGasPrice`, `sendTransaction` and `getBalance`. The manager creates only `mock`, `managed_blockchain` and `qldb` driver types; any other type throws `Driver type '…' is not supported.`

| Driver | Status at 0.0.4 |
| --- | --- |
| `MockDriver` | Works. Keeps events in memory for the current process and verifies them with a SHA-256 hash. For tests and local development only. |
| `EvmDriver` | Partial. Contract deployment, calls, gas and receipts use direct JSON-RPC (`eth_sendTransaction`, `eth_call`, `eth_estimateGas`), so the node must hold and unlock the sending account; there is no local signing. `recordEvent` returns a random id without writing anything, `getEvent` always returns `null` and `verifyIntegrity` always returns `true`. The manager cannot create it, so it is usable only by instantiating it yourself. |
| `ManagedBlockchainDriver` | Does not work. It calls `invoke`, `describeNetwork` and `getTransaction` on the AWS `ManagedBlockchainClient`, which offers none of these operations (the Managed Blockchain API manages networks, members and nodes; it does not invoke chaincode). With the SDK, `recordEvent` throws `Operation not found: Invoke`, `getEvent` returns `null` and `verifyIntegrity` returns `false`. `deployContract` sends no request and returns `status: success`. |
| `QldbDriver` | Does not work. The AWS SDK for PHP removed the QLDB and QLDB Session clients in 3.359.8 (7 November 2025, "deprecated" in the [SDK changelog](https://github.com/aws/aws-sdk-php/blob/3.360.0/CHANGELOG.md)); with any SDK from that version on, the driver falls back to an internal stub and `recordEvent` fails. On earlier SDKs it would still fail: it sends `SendCommand` through the QLDB control-plane client, which has no such operation, passes parameters as `StringValue` instead of Ion values, and never commits its transactions. |

Service status, from AWS: Amazon Managed Blockchain [stops accepting new customers on 29 October 2026 and ends access on 29 September 2027](https://docs.aws.amazon.com/managed-blockchain/latest/hyperledger-fabric-dev/what-is-managed-blockchain.html) (checked 19 October 2026).

The Managed Blockchain and QLDB drivers log the full event `data` array at info and error level. If you experiment with them, do not pass personal or confidential data.

## Contract commands

The provider registers these commands when running in the console. They obtain the driver with `app('blockchain')->driver()`, the configured default driver, regardless of `--network`:

| Command | Arguments and options |
| --- | --- |
| `blockchain:compile` | `source`, `name`, `--contract-version=1.0.0`, `--json` (runs `solc`) |
| `blockchain:deploy` | `name`, `--constructor`, `--params`, `--network`, `--from`, `--source`, `--contract-version=1.0.0`, `--verify`, `--preview`, `--gas-limit`, `--json` |
| `blockchain:call` | `contract`, `method`, `--params`, `--from`, `--network`, `--wait`, `--gas-limit`, `--json` |
| `blockchain:upgrade` | `identifier`, `--preserve-state`, `--migration`, `--source`, `--from`, `--network`, `--json` |
| `blockchain:rollback` | `contract`, `--target-version`, `--from`, `--json` |
| `blockchain:test` | `name`, `--network=local`, `--coverage`, `--source`, `--json` |
| `blockchain:list` | `--network`, `--status`, `--json` |
| `blockchain:status` | `contract`, `--network`, `--json` |
| `blockchain:verify` | `contract`, `--network`, `--json` |
| `blockchain:watch` | `--network=local`, `--interval=1000` |

Behaviour to know before relying on them:

- `blockchain:verify` contacts no block explorer: it waits two seconds and reports the contract as verified.
- Upgrades use placeholder proxy bytecode, and `--migration` runs no script.
- For state-changing calls and their gas estimates, `ContractInteractor` sends only a selector derived from SHA-256 instead of Keccak-256, without the encoded parameters, so the data does not match what a Solidity contract expects. Read-only calls through `EvmDriver::callContract` use the separate `AbiEncoder`, which uses Keccak.
- Contract artifacts are stored under `storage/app/contracts/{name}/{version}/`.

## Upstream README claims not supported by 0.0.4

- An `evm` entry under `drivers` and EVM support through the manager: the published config has no `evm` driver and the manager rejects the type.
- "Automatic categorization of public vs private data": `data_categories` is defined in the config but not read by any class.
- `blockchain:deploy --upgradeable`: the command has no such option.
- Production use of Managed Blockchain and QLDB: see [Drivers](#drivers).
- Links to `CHANGELOG.md`, `CONTRIBUTING.md` and `SECURITY.md`: none of these files exists at the tag. The README also credits `italia/spid-laravel`, which this package does not use.

## Testing and evidence

On the release commit `d06245a`, the upstream [Tests workflow](https://github.com/offline-agency/aws-blockchain-laravel/actions/runs/19313153502) (PHP 8.3 and 8.4 with Laravel 11 and 12, static analysis and a security check) and the code style workflow passed (checked 19 October 2026). These tests inject mocked AWS clients, so they do not show that the AWS drivers work.

For this page the drivers were also exercised offline against `aws/aws-sdk-php` 3.401.3 with dummy credentials; the SDK rejected the Managed Blockchain operations before sending any request. No AWS account, Ethereum node or block explorer was used.

## Source, support and license

Use the [repository](https://github.com/offline-agency/aws-blockchain-laravel) for issues. No support policy, security policy or changelog is published, and GitHub private vulnerability reporting is not enabled. The package is distributed under the [MIT license](https://github.com/offline-agency/aws-blockchain-laravel/blob/d06245ab1aded65d6f5a19c62e6c86416b2fce23/LICENSE).
