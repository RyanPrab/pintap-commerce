import useNotification from "../useNotification";

const useUpdateCart = () => {
  const { showNotification } = useNotification();
  const updateCartHandler = async (payload) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}carts/${payload.cartId}`;
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())

      showNotification({
        status: 'success',
        title: 'Update Cart',
        message: 'Your cart has been successfully updated'
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  };

  return {
    updateCartHandler
  };
};

export default useUpdateCart;
