import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import diary from "./../../assets/images/diary.png";
import explore from "./../../assets/images/explore.png";
import profile from "./../../assets/images/profile.png";
import logout from "./../../assets/images/logout.png";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { isLoaded, signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: "My Products",
      icon: diary,
      path: "my-product",
    },
    {
      id: 2,
      name: "Explore",
      icon: explore,
      path: "Explore",
    },
    {
      id: 3,
      name: "Ghellache",
      icon: profile,
      url: "",
    },
    {
      id: 4,
      name: "Log-Out",
      icon: logout,
    },
  ];
  const { user } = useUser();
  const navigation = useNavigation();
  const onMenuPress = (item) => {
    if (item.name == "Log-Out") {
      signOut();
      return;
    }
    item?.path ? navigation.navigate(item.path) : null;
  };
  return (
    <View className="p-5 bg-white flex-1">
      <View className="items-center mt-14">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[100px] h-[100px] rounded-full "
        />
        <Text className=" font-bold text-[25px] mt-2 ">{user?.fullName} </Text>
        <Text className=" text-gray-500  text-[18px] mt-2 ">
          {user?.primaryEmailAddress.emailAddress}{" "}
        </Text>
      </View>
      <View>
        <FlatList
          data={menuList}
          numColumns={3}
          style={{ marginTop: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onMenuPress(item)}
              className="flex-1 p-5 border-[1px] items-center mx-1 mt-4 rounded-lg border-blue-400 bg-blue-50"
            >
              {item.icon && (
                <Image source={item?.icon} className="w-[50px] h-[50px]  " />
              )}
              <Text className=" text-[12px] mt-2 text-blue-700 text-center ">
                {item.name}{" "}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
