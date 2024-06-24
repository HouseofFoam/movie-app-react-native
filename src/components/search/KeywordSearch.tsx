import { API_ACCESS_TOKEN } from "@env";
import { useState } from "react";
import { View, Text, TextInput, FlatList, Dimensions } from "react-native";
import { Movie } from "../../types/app";
import MovieItem from "../movies/MovieItem";
import { SafeAreaView } from "react-native-safe-area-context";

const win = Dimensions.get("window");
export default function KeywordSearch() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const getMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${keyword}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });
  };
  return (
    <SafeAreaView>
      <TextInput
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 999,
          marginVertical: 10,
        }}
        onSubmitEditing={() => {
          getMovieDetail();
        }}
        onChangeText={(text) => {
          setKeyword(text);
        }}
      >
        {keyword}
      </TextInput>
      <FlatList
        style={{ marginTop: 20, paddingLeft: 10, marginBottom: 420 }}
        data={movies}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <MovieItem
              movie={item}
              size={{
                width: 100,
                height: 160,
              }}
              coverType={"poster"}
            />
          </View>
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
