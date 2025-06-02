import { useCartStore } from "@/store/cart-store";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Alert, Platform, TouchableOpacity, FlatList, Image } from "react-native";

type CartItemType = {
  id: number;
  title: string;
  image: any;
  price: number;
  quantity: number;
};

type CartItemProps = {
  item: CartItemType;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

const CartItem = ({ item, onDecrement, onIncrement, onRemove }: CartItemProps) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.itemImage} />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.topSection}>
          <View style={styles.titlePriceContainer}>
            <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
            <Text style={styles.totalPrice}>Total: Rs {(item.price * item.quantity).toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => onRemove(item.id)}
            style={styles.removeButton}
          >
            <Text style={styles.removeIcon}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quantitySection}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => onDecrement(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>

            <TouchableOpacity
              onPress={() => onIncrement(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function Cart() {
  const { items, removeItem, incrementItem, decrementItem, getTotalPrice } =
    useCartStore();

  const handleCheckout = () => {
    console.log("Checkout button pressed");
    console.log("Items:", items);
    console.log("Total price:", getTotalPrice());
    
    try {
      Alert.alert("Proceeding Checkout", `Total amount: Rs ${getTotalPrice()}`);
    } catch (error) {
      console.error("Alert error:", error);
      Alert.alert("Checkout", "Processing your order...");
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <StatusBar style="dark" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubtext}>Add some items to get started</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{items.length} items</Text>
      </View>

      <FlatList 
        data={items} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <CartItem 
            item={item} 
            onRemove={removeItem} 
            onIncrement={incrementItem} 
            onDecrement={decrementItem}  
          />
        )}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>Rs:{getTotalPrice()}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={handleCheckout}
          style={styles.checkoutButton}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  itemCount: {
    fontSize: 16,
    color: "#6c757d",
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    marginRight: 16,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titlePriceContainer: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
    lineHeight: 22,
  },
  itemPrice: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1BC464",
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ff5252",
    justifyContent: "center",
    alignItems: "center",
  },
  removeIcon: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantitySection: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityDisplay: {
    minWidth: 50,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  footer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: "#6c757d",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  checkoutButton: {
    backgroundColor: "#1BC464",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#1BC464",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6c757d",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#adb5bd",
  },
});