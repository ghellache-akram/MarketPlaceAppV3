import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Categories({ categoryList }) {
  const navigation = useNavigation();
  return (
    <View className="mt-3">
      <Text className="p-1 font-bold text-[20px]">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Item-List", { category: item.name })
            }
            className="flex-1 items-center justify-center p-2 border-[1px] bg-blue-50 border-blue-200
          m-1 h-[80px] rounded-lg"
          >
            <Image
              source={{ uri: item?.icon }}
              className="h-[35px] w-[35px] "
            />
            <Text className="text-[12px] mt-1">{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
