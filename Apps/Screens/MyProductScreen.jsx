import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../fireBaseConfig";
import LatestItemList from "../Componenets/HomeScreen/LatestItemList";
import { useNavigation } from "@react-navigation/native";

export default function MyProductScreen() {
  const { user } = useUser();
  const [productList, setProductList] = useState([]);
  const db = getFirestore(app);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("focus", (e) => {
      getUserPost();
    });
  }, [navigation]);
  useEffect(() => {
    user && getUserPost();
  }, [user]);
  const getUserPost = async () => {
    setProductList([]);
    const q = query(
      collection(db, "UserPost"),
      where("userEmail", "==", user?.primaryEmailAddress.emailAddress)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setProductList((productList) => [...productList, doc.data()]);
    });
  };
  return (
    <View>
      <LatestItemList latestItemList={productList} />
    </View>
  );
}
