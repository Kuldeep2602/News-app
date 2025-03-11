import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";
import axios from "axios";  // ✅ Import axios
import { NewsCard } from "../components/NewsCard";

export const CategoryScreen = ({route}) => {

    const API_KEY = "xxxxxxxxxxxxxxx"; // ENTER YOUR API KEY 
    const COUNTRY = 'us';
    const {category} = route.params;
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews(); // ✅ Call the function inside useEffect
    }, []);

    const fetchNews = async () => {
        const newsUrl = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=${category}&apiKey=${API_KEY}`; // ✅ Fixed typo in `country`
        try {
            const res = await axios.get(newsUrl);
            setNews(res.data.articles);
            setLoading(false);
        } catch (error) {
            console.error("News API Failed to Fetch News:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`${category.toUpperCase()} News`}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="red" />  // ✅ Fixed `color`
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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#eee',
        padding: 20

    },
});
