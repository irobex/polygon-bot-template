# Fast Polygon RPC Bot Template — Minimal Polygon Bot Using JSON-RPC

This repository is a minimal **Polygon RPC for bots** example.  
It reads blockchain state through a standard **polygon json rpc** endpoint.

## What is this?

- A simple Node.js bot example (ethers) that reads data from a **polygon rpc endpoint**
- It does **not** store blocks locally (no indexing, no database)
- It polls / subscribes to new blocks and fetches state from an RPC provider

## How it works (architecture)

- **Erigon** is the upstream **polygon node** (full node backend)
- **FastPolygon** is the gateway (Kong) that applies API keys, rate limits, and billing
- Your bot sends standard **web3 rpc** requests (Ethereum compatible RPC) to FastPolygon

## Quick Start

### 1) Install deps

```bash
npm i ethers
```

### 2) Set your API key

Get a key from `https://app.fastpolygon.tech`, then:

```bash
export FP_API_KEY="YOUR_API_KEY"
```

### 3) Run the bot

```bash
node bot.js
```

## RPC Endpoint

Main format:

- `https://rpc.fastpolygon.tech/v1/YOUR_API_KEY`

Fallback (query key):

- `https://rpc.fastpolygon.tech/v1?api_key=YOUR_API_KEY`

## Notes on limits

This is a shared SaaS-style **polygon rpc provider**:

- You may see **429** when you exceed your plan RPS.
- If you delete the key or exhaust monthly quota, requests can return **401/403**.

## Limitations

- The backend is a **non-archive** node: some historical state queries at old blocks may fail.
- This template is intentionally minimal: it does not implement retries/backoff by default.

## FAQ

**Do I need to implement JSON-RPC methods?**  
No. You send standard Ethereum JSON-RPC requests; FastPolygon proxies them to the upstream node.

**Is this an indexer?**  
No. It does not store blocks. It reads from RPC in real time.
