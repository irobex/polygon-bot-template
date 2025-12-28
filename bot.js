import { JsonRpcProvider } from "ethers";

const API_KEY = process.env.FP_API_KEY;
if (!API_KEY) {
  console.error("Set FP_API_KEY");
  process.exit(1);
}

const provider = new JsonRpcProvider(`https://rpc.fastpolygon.tech/v1/${API_KEY}`);

let last = null;

async function tick() {
  const bn = await provider.getBlockNumber();
  if (last === null) {
    last = bn;
    console.log("start block:", bn);
    return;
  }
  if (bn > last) {
    for (let b = last + 1; b <= bn; b++) {
      const block = await provider.getBlock(b);
      console.log("new block", b, "txs", block.transactions.length);
    }
    last = bn;
  }
}

setInterval(() => tick().catch((e) => console.error("tick error", e)), 5000);
