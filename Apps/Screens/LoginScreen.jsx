import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ClerkProvider, useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const SignInWithOAuth = () => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    useWarmUpBrowser();
  };

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View className="">
      <Image
        source={require("./../../assets/images/Home.jpg")}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8 mt-[-20px] rounded-t-3xl bg-slate-100 pb-60  ">
        <Text className="text-[25px] font-bold">Community MarketPlace</Text>
        <Text className="text-[15px] text-slate-500 mt-6">
          Buy Sell MarketPlace where you can sell old item and make real money
        </Text>
        <TouchableOpacity
          className="p-4 bg-blue-500 rounded-full mt-20"
          onPress={onPress}
        >
          <Text className="text-white text-center text-[15px]">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
