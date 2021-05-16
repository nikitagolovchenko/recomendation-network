import { db } from '../firebase';

export const fetchProducts = async (): Promise<Product[]> => {
  const collection = await db.collection('products').get();
  let products: Product[] = [];

  collection.forEach(doc => {
    const { title, image, text } = doc.data();

    const product: Product = {
      id: doc.id,
      title,
      image,
      text,
    };

    products.push(product);
  });

  return products;
};
