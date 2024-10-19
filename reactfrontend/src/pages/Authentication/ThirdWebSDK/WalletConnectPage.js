import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { ThirdwebProvider } from "thirdweb/react";

import {
    inAppWallet,
    createWallet,
} from "thirdweb/wallets";

const client = createThirdwebClient({
    clientId: "1c63164edf1d734189c4544b653d5a35",
});

const wallets = [
    inAppWallet({
        auth: {
            options: ["x"],
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
];

function Example() {
    return (
        <ThirdwebProvider>
            <ConnectButton
                client={client}
                wallets={wallets}
                connectModal={{ size: "compact" }}
            />
        </ThirdwebProvider>
    );
}

export default Example;