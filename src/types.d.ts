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

interface UserInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface User {
  uid: string;
  email: string;
  displayName: string;
}