#!/usr/bin/env node
/* eslint-env node */

const { Wallet } = require('ethers');
const fs = require('fs');

async function generateWallets(count) {
    const wallets = [];
    for (let i = 0; i < count; i++) {
        // Generate a random wallet with mnemonic
        const wallet = Wallet.createRandom();

        // Save wallet info
        wallets.push({
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase
        });
    }

    return wallets;
}

async function main() {
    const walletCount = 50; // Number of wallets to generate
    const wallets = await generateWallets(walletCount);

    // Save wallets to a file
    const outputFileName = 'ethereum_wallets.json';
    fs.writeFileSync(outputFileName, JSON.stringify(wallets, null, 2));

    console.log(`Generated ${walletCount} wallets and saved to ${outputFileName}`);
}

main().catch(console.error);
