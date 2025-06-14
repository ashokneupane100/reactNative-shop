import { Link, router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CATEGORIES } from "@/assets/categories";
import { supabase } from "@/lib/supabase";
import { useToast } from "react-native-toast-notifications";
import { Category } from "@/assets/types/category";

export const ListHeader = () => {
  const toast = useToast();

  const renderCategory = ({ item }: { item: any }) => (
    <Link asChild href={`/categories/${item.slug}`}>
      <Pressable style={styles.categoryItem}>
        <View style={styles.categoryImageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
        </View>
        <Text style={styles.categoryText}>{item.name}</Text>
      </Pressable>
    </Link>
  );

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.show("Error signing out: " + error.message, {
          type: "danger",
          placement: "top",
          duration: 3000,
        });
      } else {
        toast.show("Signed out successfully", {
          type: "success",
          placement: "top",
          duration: 2000,
        });
        router.replace("/auth");
      }
    } catch (err) {
      toast.show("An unexpected error occurred", {
        type: "danger",
        placement: "top",
        duration: 3000,
      });
      console.error("Unexpected error during sign out:", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Ecommerce App made By</Text>
            <Text style={styles.userName}> Ashok Neupane</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <Link href="/cart" asChild>
            <Pressable style={styles.cartButton}>
              {({ pressed }) => (
                <>
                  <FontAwesome
                    name="shopping-cart"
                    size={20}
                    color="#333"
                    style={{ opacity: pressed ? 0.7 : 1 }}
                  />
                  <View style={styles.cartBadge}>
                    <Text style={styles.badgeText}>10</Text>
                  </View>
                </>
              )}
            </Pressable>
          </Link>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <FontAwesome name="sign-out" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Special Offer</Text>
          <Text style={styles.heroSubtitle}>Up to 25% OFF</Text>
          <Text style={styles.heroDescription}>On selected items</Text>
          <Pressable style={styles.shopButton}>
            <Text style={styles.shopButtonText}>SHOP NOW</Text>
          </Pressable>
        </View>
        <View style={styles.heroImageSection}>
          <Image
            source={require("@/assets/images/hero.png")}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.slug}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          ItemSeparatorComponent={() => <View style={styles.categorySpace} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 20,
  },

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  greeting: {
    fontSize: 14,
    color: "#666",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cartButton: {
    position: "relative",
    padding: 8,
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#1BC464",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  signOutButton: {
    padding: 8,
  },

  // Hero Banner Styles
  heroBanner: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    minHeight: 140,
  },
  heroContent: {
    flex: 1,
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  heroDescription: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 15,
  },
  shopButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  shopButtonText: {
    color: "#4A90E2",
    fontWeight: "bold",
    fontSize: 12,
  },
  heroImageSection: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: 80,
    height: 80,
  },

  // Categories Styles
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  categoriesList: {
    paddingRight: 10,
  },
  categoryItem: {
    alignItems: "center",
    width: 70,
  },
  categoryImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  categorySpace: {
    width: 15,
  },
});
