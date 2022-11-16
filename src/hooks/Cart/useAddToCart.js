import useNotification from "../useNotification";

const useAddToCart = () => {
  const { showNotification } = useNotification();
  const addToCartHandler = async (payload) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}carts/add`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())

      showNotification({
        status: 'success',
        title: 'Add To Cart',
        message: 'Adding product to cart successfully!'
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  }

  return {
    addToCartHandler
  };
};

export default useAddToCart;
