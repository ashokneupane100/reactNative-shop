import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Product } from "../../assets/types/product";
import { Link } from "expo-router";

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <Link asChild href={`/product/${product.slug}`}>
      <Pressable style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed
      ]}>
        <View style={styles.imageContainer}>
          <Image source={product.heroImage} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.price}>
            Rs {product.price.toLocaleString('en-NP', { minimumFractionDigits: 2 })}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: "100%",
    height: 140,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  content: {
    padding: 12,
    minHeight: 70,
  },
  title: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginBottom: 6,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    color: "#1BC464",
    fontWeight: "bold",
  },
});