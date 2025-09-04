const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair, // Allow to create new wallet
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair(); // Create new Wallet
// const publicKey = wallet._keypair.publicKey;
const publicKey = new PublicKey(wallet._keypair.publicKey); // Convert to PublicKey object [Good Practices]
const secretKey = wallet._keypair.secretKey;

const getWalletBalance = async () => {
  try {
    // Solana Having 3 Type of Network
    // mainnet, devnet, testnet
    // devnet is replica of mainnet for testing solana application with fake currency [Like a playground]
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(publicKey);
    console.log(`Wallet Balance: ${walletBalance / LAMPORTS_PER_SOL} SOL`);
  } catch (err) {
    console.error("Error fetching wallet balance: ", err);
  }
};

const airDropSolana = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      0.01 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.error("Error Airdropping Solana: ", err);
  }
};

// console.log("Public Key:", publicKey);
// console.log("Secret Key:", secretKey);

const main = async () => {
  await getWalletBalance();
  await airDropSolana();
  await getWalletBalance();
};

main();
