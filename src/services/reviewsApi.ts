import { db } from '../firebase';

export const fetchReviews = async (): Promise<Review[]> => {
  const collection = await db
    .collection('reviews')
    .orderBy('createdAt', 'desc')
    .get();
  let reviews: Review[] = [];

  collection.forEach(doc => {
    const { createdAt, productId, rate, text, userId } = doc.data();

    const review: Review = {
      id: doc.id,
      createdAt,
      productId,
      rate,
      text,
      userId,
    };

    reviews.push(review);
  });

  return reviews;
};

export const addReviewsApi = async (review: Review): Promise<string> => {
  const docRef = await db.collection('reviews').add(review);
  return docRef.id;
};
