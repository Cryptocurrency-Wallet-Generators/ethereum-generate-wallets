const { Wallet, utils } = require('ethers');
const fs = require('fs');

async function generateWallets(count) {
    const wallets = [];
    for (let i = 0; i < count; i++) {
        // Generate a random wallet with 24-word mnemonic (256 bits of entropy)
        // Default is 128 bits which gives 12 words
        const entropy = utils.randomBytes(32); // 32 bytes = 256 bits for 24 words
        const wallet = Wallet.fromMnemonic(utils.entropyToMnemonic(entropy));

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

    console.log(`Generated ${walletCount} wallets with 24-word mnemonics and saved to ${outputFileName}`);
}

main().catch(console.error);
