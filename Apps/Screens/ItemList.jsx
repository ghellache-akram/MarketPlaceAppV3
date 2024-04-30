import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../fireBaseConfig";
import LatestItemList from "../Componenets/HomeScreen/LatestItemList";

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    params && getItemByCategory();
  }, [params]);
  const getItemByCategory = async () => {
    setItemList([]);
    setLoading(true);
    const q = query(
      collection(db, "UserPost"),
      where("category", "==", params.category)
    );
    const snapshot = await getDocs(q);
    setLoading(false);
    snapshot.forEach((doc) => {
      setItemList((itemList) => [...itemList, doc.data()]);
      setLoading(false);
    });
  };
  return (
    <View className="p-2">
      {loading ? (
        <ActivityIndicator size={"large"} color={"#3b82f6"} />
      ) : itemList?.length > 0 ? (
        <LatestItemList latestItemList={itemList} heading={""} />
      ) : (
        <Text className="text-[25px] text-center pt-24 mt-5 font-bold text-gray-400 ">
          No Post Found
        </Text>
      )}
    </View>
  );
}
