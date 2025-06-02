import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "@/assets/products";
import { useCartStore } from "@/store/cart-store";
import { FontAwesome } from "@expo/vector-icons";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const toast = useToast();

  const product = PRODUCTS.find((product) => product.slug === slug);

  if (!product) return <Redirect href={"/404"} />;

  const { items, addItem, incrementItem, decrementItem } = useCartStore();

  const cartItem = items.find((item) => item.id === product?.id);

  const initialQuantity = cartItem ? cartItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = () => {
    if (quantity < product.maxQuantity) {
      setQuantity(quantity + 1);
      incrementItem(product.id);
    } else {
      toast.show("Limit reached for the product..."),
        {
          type: "danger",
          placement: "top",
          duration: 2000,
          animationType: "slide-in",
        };
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      decrementItem(product.id);
    }
  };

  const addToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      image: product.heroImage,
      price: product.price,
      quantity,
    });

    toast.show("Added to cart", {
      type: "success",
      placement: "top",
      duration: 2000,
      animationType: "slide-in",
    });
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.title || "Product" }} />

      <Image source={product.heroImage} style={styles.heroImage} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{product.title}</Text>

        <Text style={styles.slug}>{product.slug}</Text>

        <View style={styles.priceContainer}>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Unit Price</Text>
            <Text style={styles.price}>Rs {product.price}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>Rs {totalPrice}</Text>
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
            >
              <FontAwesome name="minus" size={16} color="#fff" />
            </TouchableOpacity>

            <View style={styles.quantityDisplay}>
              <Text style={styles.quantity}>{quantity}</Text>
            </View>

            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <FontAwesome name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={addToCart}
            style={styles.addToCartButton}
            activeOpacity={0.8}
          >
            <View style={styles.addToCartButtonInner}>
              <FontAwesome
                name="shopping-cart"
                size={20}
                color="#fff"
                style={styles.cartIcon}
              />
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              <Text style={styles.addToCartPrice}>Rs {totalPrice}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  heroImage: {
    width: "100%",
    height: 280,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#2c3e50",
    textAlign: "center",
  },
  slug: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 15,
  },
  priceBox: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  priceLabel: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 5,
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1BC464",
  },
  quantityContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 25,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quantityButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#007bff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  quantityDisplay: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 18,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    minWidth: 30,
  },
  addToCartButton: {
    backgroundColor: "#1BC464",
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: "100%",
    shadowColor: "#1BC464",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(27, 196, 100, 0.2)",
  },
  addToCartButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cartIcon: {
    marginRight: 10,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  addToCartPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.9,
  },
  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  addToCartSubtext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.9,
  },
  errorMessage: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
});
