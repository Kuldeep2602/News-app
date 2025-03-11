import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { NewsCard } from "../components/NewsCard";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

export const HomeScreen = () => {
  const API_KEY = "b6f2b5345b084f7f8eb7492adb4d6228";
  const COUNTRY = "us";
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`;
    try {
      const res = await axios.get(newsUrl);
      setNews(res.data.articles);
      setLoading(false);
    } catch (error) {
      console.error("News API Failed to Fetch News:", error);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => signOut(getAuth()).then(() => navigation.replace("Login")) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Headlines in {COUNTRY}</Text>
        <MaterialIcons name="logout" size={28} color="black" onPress={handleLogout} style={styles.logoutIcon} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NewsCard news={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  logoutIcon: {
    padding: 5,
  },
});
