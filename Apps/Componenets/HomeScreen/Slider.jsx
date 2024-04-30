import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";

export default function Slider({ sliderList }) {
  return (
    <View className="mt-5">
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.image }}
              className="h-[200px] w-[300px] mr-3 rounded-lg object-contain"
            />
          </View>
        )}
      />
    </View>
  );
}