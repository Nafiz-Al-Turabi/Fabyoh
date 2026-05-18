import axiosInstance from '../Axios/axiosInstance';

const normalizeCategory = (category = '') =>
  category.toLowerCase().replace(/[\s-]+/g, '');

const extractProducts = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.products)) {
    return payload.products;
  }

  return [];
};

const normalizeProduct = (product, index = 0) => ({
  ...product,
  id: product.id ?? product._id ?? index,
  _id: product._id ?? String(product.id ?? index),
  category: normalizeCategory(product.category ?? ''),
  imageSecond: product.imageSecond ?? product.imageMain ?? '',
  colors: Array.isArray(product.colors) ? product.colors : [],
});

export const loadProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    const products = extractProducts(response.data);

    if (products.length > 0) {
      return products.map(normalizeProduct);
    }
  } catch (error) {
    console.warn('Backend products request failed, using local fallback.', error);
  }

  const response = await fetch('/products.json');

  if (!response.ok) {
    throw new Error('Failed to load products.');
  }

  const products = extractProducts(await response.json());
  return products.map(normalizeProduct);
};

export const loadProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    const product = response.data?.product ?? response.data;

    if (product) {
      return normalizeProduct(product);
    }
  } catch (error) {
    console.warn(`Backend product request failed for id "${id}", using local fallback.`, error);
  }

  const products = await loadProducts();
  const matchedProduct = products.find(
    (product) => String(product._id) === String(id) || String(product.id) === String(id),
  );

  if (!matchedProduct) {
    throw new Error('Product not found.');
  }

  return matchedProduct;
};
