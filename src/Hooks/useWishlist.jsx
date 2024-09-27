import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../Axios/axiosInstance';

const useWishlist = () => {
    const token = localStorage.getItem('authToken')
    const addWishlistMutation = useMutation({
        mutationFn: async (newWishlistItem) => {
            const response = await axiosInstance.post('/wishlist', newWishlistItem, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            refetch();
        },
    });

    const { isLoading, data = [], refetch, isError, error } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const response = await axiosInstance.get('/wishlists', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }
    });

    const removeFromWishlist = async (id) => {
        try {
            const response = await axiosInstance.delete(`/wishlist/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log('Wishlist item deleted successfully');
                refetch();
            } else {
                console.error('Failed to delete item:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting item:', error.response?.data?.message || error.message);
        }
    };


    return {
        isLoading,
        data,
        refetch,
        isError,
        error,
        removeFromWishlist,
        addWishlist: addWishlistMutation.mutate,
        wishlistCount: data.length,
    };
};

export default useWishlist;
