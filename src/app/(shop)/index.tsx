import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PRODUCTS } from '../../../assets/products';
import ProductListItem from '../../components/product-list-item';
import { ListHeader } from '@/components/list-header';

const Home = () => {
  return (
    <View style={styles.container}>
      <FlatList 
        data={PRODUCTS}
        renderItem={({item}) => <ProductListItem product={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={
          <View>
            <ListHeader />
            <View style={styles.productsHeader}>
              <Text style={styles.productsTitle}>Featured Products</Text>
            </View>
          </View>
        }
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  flatListContent: {
    paddingBottom: 120,
  },
  flatListColumn: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 15,
  },
  itemSeparator: {
    height: 15,
  },
  productsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});