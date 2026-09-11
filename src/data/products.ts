import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White Sneakers',
    price: 59.99,
    image: 'https://placehold.co/300x300?text=Sneakers',
    description: 'Comfortable everyday sneakers with a minimalist design.',
    category: 'Footwear',
    stock: 15,
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://placehold.co/300x300?text=Denim+Jacket',
    description: 'Classic blue denim jacket, unisex fit.',
    category: 'Outerwear',
    stock: 8,
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://placehold.co/300x300?text=Headphones',
    description: 'Noise-cancelling over-ear headphones with 30hr battery life.',
    category: 'Electronics',
    stock: 20,
  },
  {
    id: '4',
    name: 'Canvas Tote Bag',
    price: 24.99,
    image: 'https://placehold.co/300x300?text=Tote+Bag',
    description: 'Durable canvas tote, perfect for daily use.',
    category: 'Accessories',
    stock: 30,
  },
];