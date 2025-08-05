import { fetchMovieDetails } from "@/apiservices/api";
import useFetch from "@/apiservices/useFetch";
import { icons } from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
  valueClassName?: string;
}
const MovieInfo = ({ label, value, valueClassName = "" }: MovieInfoProps) => (
  <View className="flex-col items-start mt-5 justify-normal">
    <Text className="text-sm font-normal text-light-200">{label}</Text>
    <Text className={`mt-2 text-sm font-bold  ${valueClassName}`}>
      {value || "N/A"}
    </Text>
  </View>
);

const Detail = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            className="w-full h-[550px]"
            resizeMode="stretch"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
          />
        </View>
        <View className="flex-col items-start justify-center px-5 mt-5">
          <Text className="text-xl font-bold text-white">{movie?.title}</Text>
          <View className="flex-row items-start mt-2 gap-x-1">
            <Text className="text-sm text-light-200">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-sm text-light-200">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center px-2 py-1 mt-2 rounded-md bg-dark-100 gap-x-1">
            <Image source={icons.star} className="size-4 " />
            <Text className="text-sm font-bold text-white">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-sm text-light-200">
              {movie?.vote_count} votes
            </Text>
          </View>
          <MovieInfo
            label="Overview"
            value={movie?.overview}
            valueClassName="text-white"
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Release Date"
              value={movie?.release_date}
              valueClassName="text-light-100"
            />
            <MovieInfo
              label="Status"
              value={movie?.status}
              valueClassName="text-light-100"
            />
          </View>
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
            valueClassName="text-light-100"
          />
          <MovieInfo
            label="Countries"
            value={
              movie?.production_countries?.map((g) => g.name).join(" - ") ||
              "N/A"
            }
            valueClassName="text-light-100"
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} million`}
              valueClassName="text-light-100"
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue) / 1_000_000}`}
              valueClassName="text-light-100"
            />
          </View>
          <MovieInfo
            label="Tagline"
            value={movie?.tagline || "N/A"}
            valueClassName="text-light-100"
          />
          <MovieInfo
            label="Production Company"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
            valueClassName="text-light-100"
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className="absolute left-0 right-0 mx-5 rounded-lg bottom-5 bg-accent py-3.5 flex flex-row items-start justify-center z-15"
      >
        <Image
          source={icons.arrow}
          className="mt-0.5 rotate-180 mr-1 size-5"
          tintColor="#fff"
        />
        <Text className="text-base text-white font-sm">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
