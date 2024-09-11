import { useMemo } from 'react';

const useTextContent = (title, description) => {
    return useMemo(() => ({
        title,
        description,
    }), [title, description]);
};

export default useTextContent;
