interface Product {
  id: string;
  title: string;
  image: string;
  text: string;
}

interface Review {
  id: string;
  rate: number;
  text: string;
  userId: string;
  productId: string;
}

interface User {
  id: string;
  username: string;
}