import { API_ACCESS_TOKEN, API_URL } from "@env";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function MovieDetail({ navigation }: any): JSX.Element {
  const fetchData = (): void => {
    // Gantilah dengan akses token Anda
    if (API_URL == null || API_ACCESS_TOKEN.length == null) {
      throw new Error("ENV not found");
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(API_URL, options)
      .then(async (response) => await response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <View style={styles.movieDetailContainer}>
      <Text>Movie Detail</Text>
      <Button title="Fetch Data" onPress={() => fetchData()} />
      <Button title="Kembali" onPress={() => navigation.pop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  movieDetailContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
