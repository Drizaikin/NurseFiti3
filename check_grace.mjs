import { verifyCheckout } from './lib/intasend.js';

async function test() {
  try {
    const res = await verifyCheckout('25179296-7793-43da-a6ad-9f1e8c6878bb');
    console.log("Grace:", res);
  } catch (e) {
    console.error(e);
  }
}

test();
