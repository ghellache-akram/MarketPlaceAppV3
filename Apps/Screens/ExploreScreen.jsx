import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "../../fireBaseConfig";
import LatestItemList from "../Componenets/HomeScreen/LatestItemList";

export default function ExploreScreen() {
  const [productList, setProductList] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    setProductList([]);
    const q = query(collection(db, "UserPost"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setProductList((productList) => [...productList, doc.data()]);
    });
  };
  return (
    <ScrollView className="p-5 py-8">
      <Text className="text-[30px] font-bold ">Explore More </Text>
      <LatestItemList latestItemList={productList} />
    </ScrollView>
  );
}
