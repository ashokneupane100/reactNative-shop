import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { ORDERS } from "@/assets/orders";

const OrderDetails = () => {
    const { slug } = useLocalSearchParams<{ slug: string }>();
    console.log(slug);

    const order = ORDERS.find(order => order.slug === slug);
    if (!order) return <Redirect href="/404" />

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `${order.details}`,headerShown:true }} />
            <Text style={styles.item}>{order.item}</Text>
            <View style={[styles.statusBadge, styles[`statusBadge_${order.status}`]]}>
                <Text style={styles.statusText}>{order.status}</Text>
            </View>
            <Text style={styles.details}>{order.details}</Text>
            <Text style={styles.date}>{order.date}</Text>
            <Text style={styles.itemsTitle}>Items Ordered:</Text>
            <FlatList 
                data={order.items}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Image source={item.heroImage} style={styles.heroImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.title}</Text>
                            <Text style={styles.itemPrice}>Rs{item.price}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default OrderDetails;

const styles: { [key: string]: any } = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
    },
    item: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    details: {
        fontSize: 16,
        marginBottom: 16,
        color: "#333",
    },
    statusBadge: {
        padding: 8,
        borderRadius: 4,
        alignSelf: "flex-start",
        marginBottom: 16,
    },
    statusBadge_Pending: {
        backgroundColor: "#ffcc00",
    },
    statusBadge_Completed: {
        backgroundColor: "#4caf50",
    },
    statusBadge_Shipped: {
        backgroundColor: "#2196f3",
    },
    statusBadge_InTransit: {
        backgroundColor: "#ff9800",
    },
    statusText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
    date: {
        fontSize: 14,
        color: "#555",
        marginBottom: 16,
    },
    itemsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    orderItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        padding: 16,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
    },
    heroImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: "#1BC464",
        fontWeight: "600",
    },
});