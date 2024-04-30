import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    user && (
      <View>
        <View className="flex flex-row items-center gap-4">
          <Image
            source={{ uri: user?.imageUrl }}
            className="rounded-full w-12 h-12"
          />
          <View>
            <Text className="text-[16px]">Welcome,</Text>
            <Text className="text-[20px]">{user.fullName}</Text>
          </View>
        </View>
        <View className="p-[9px] px-5 bg-blue-50 mt-5 border-[1px] border-blue-300  rounded-full flex flex-row items-center">
          <Ionicons name="search" size={24} color="gray" />
          <TextInput
            placeholder="Search"
            className="ml-2 text-[18px]"
            onChangeText={(value) => console.log(value)}
          />
        </View>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  searchBar: {
    paddingTop: 7,
    borderWidth: 1,
    borderRadius: 20,
    width: "90%",
    textAlign: "center",
    fontSize: 17,
  },
});
