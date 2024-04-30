import { View, Text, Image, ScrollView } from "react-native";
import Header from "./../Componenets/HomeScreen/Header";
import Slider from "../Componenets/HomeScreen/Slider";
import React, { useEffect, useState } from "react";
import { getFirestore, orderBy } from "firebase/firestore";
import { app } from "../../fireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Categories from "../Componenets/HomeScreen/Categories";
import LatestItemList from "../Componenets/HomeScreen/LatestItemList";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [slidersList, setSlidersList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  useEffect(() => {
    getSliders();
  }, []);
  const getSliders = async () => {
    setSlidersList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSlidersList((slidersList) => [...slidersList, doc.data()]);
    });
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));

    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  useEffect(() => {
    getLatestItemList();
  }, []);

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(
      collection(db, "UserPost"),
      orderBy("createdAt", "desc")
    );

    querySnapshot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  return (
    <ScrollView className="py-8 px-6 bg-white flex-1">
      <Header />
      {/* Slider */}
      <Slider sliderList={slidersList} />
      {/* Category List */}
      <Categories categoryList={categoryList} />
      {/* Latest Item List */}
      <LatestItemList
        latestItemList={latestItemList}
        heading={"Latest Items"}
      />
    </ScrollView>
  );
}
