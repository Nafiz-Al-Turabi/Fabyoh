import { useMemo } from 'react';

const useBackgroundStyles = (imageUrl) => {
    return useMemo(() => ({
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        height: '38vh',
    }), [imageUrl]);
};

export default useBackgroundStyles;
