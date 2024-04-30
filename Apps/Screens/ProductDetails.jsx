import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Button,
  Share,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../fireBaseConfig";

export default function ProductDetails({ navigation }) {
  const nav = useNavigation();
  const db = getFirestore(app);
  const { params } = useRoute();
  const [product, setProduct] = useState([]);
  const { user } = useUser();
  const deletePost = () => {
    Alert.alert("Do you want to Delete", "Are you want to delete this poste?", [
      {
        text: "Yes",
        onPress: () => deleteFromFireStore(),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };
  const deleteFromFireStore = async () => {
    console.log("Deleted");
    const q = query(
      collection(db, "UserPost"),
      where("title", "==", product.title)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref).then((resp) => {
        console.log("Deleted the Doc ...");
        nav.goBack();
      });
    });
  };
  const sendEmailMessage = () => {
    const subject = "Regarding " + product.title;
    const body =
      "Hi " + product.userName + "\n" + "I am intrested in this product";
    Linking.openURL(
      "mailto:" + product.userEmail + "?subject=" + subject + "&body=" + body
    );
  };
  useEffect(() => {
    params && setProduct(params.product);
    shareButton();
  }, [params, navigation]);

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="share-social-sharp"
          onPress={() => shareProduct()}
          size={24}
          color="white"
          style={{ marginRight: 20 }}
        />
      ),
    });
  };
  const shareProduct = async () => {
    const content = {
      message: product?.title + "\n" + product?.desc,
    };
    Share.share(content).then(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <ScrollView className="bg-white">
      <Image source={{ uri: product.image }} className="h-[350px] w-full " />
      <View className="p-3">
        <Text className="text-[24px]  ">{product?.title}</Text>
        <View className="items-baseline">
          <Text className="p-1 px-2 mt-2 font-bold rounded-full text-blue-500 bg-blue-200  ">
            {product.category}
          </Text>
        </View>
        <Text className="mt-3 font-bold text-[20px] ">Description</Text>
        <Text className="text-[17px] text-gray-500 ">{product?.desc} </Text>
      </View>
      {/* User Informations */}
      <View className="p-2 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
        <Image
          source={{ uri: product.userImage }}
          className="w-10 h-10 rounded-full "
        />
        <View>
          <Text className="font-bold text-[18px] ">{product.userName} </Text>
          <Text className="text-gray-500">{product.userEmail} </Text>
        </View>
      </View>
      {user?.primaryEmailAddress.emailAddress == product.userEmail ? (
        <TouchableOpacity
          onPress={() => deletePost()}
          className="z-40 bg-red-500 p-4 m-5 rounded-full"
        >
          <Text className="text-center text-white">Delete Post</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => sendEmailMessage()}
          className="z-40 bg-blue-500 p-4 m-5 rounded-full"
        >
          <Text className="text-center text-white">Send Message</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
