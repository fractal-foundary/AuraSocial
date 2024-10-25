import { useNavigate } from 'react-router-dom';

function Marketplace() {
    const handleRedirect = () => {
        window.location.href = 'https://marketplace.thirdweb-preview.com/';
    };

    return (
        <div>
            {handleRedirect}
        </div>
    );
}

export default Marketplace;