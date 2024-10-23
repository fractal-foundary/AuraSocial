import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { ThirdwebProvider } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
    clientId: "1c63164edf1d734189c4544b653d5a35",
});

const wallets = [
    createWallet("walletConnect"),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
];

export default function WalletConnectPage() {
    return (
        <div class="flex justify-center items-center h-screen ml-[55%]" >

            <div class="bg-blue-500 p-10 rounded-md">

                <ThirdwebProvider>
                    <ConnectButton
                        client={client}
                        wallets={wallets}
                        connectButton={{ label: "Connect Your Wallet" }}
                        connectModal={{
                            size: "wide",
                            title: "Connect Your Wallet",
                            showThirdwebBranding: false,
                        }}
                    />
                </ThirdwebProvider>
            </div>
        </div>
    );
}
