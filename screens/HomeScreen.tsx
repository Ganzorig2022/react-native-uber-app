import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white`}>
      <View style={tw`p-5`}>
        <Image
          source={{ uri: 'https://links.papareact.com/gzs' }}
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
        />
        {/* ======GOOGLE PLACES SEARCH====== */}
        <GooglePlacesAutocomplete
          placeholder='Where from?'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            //1) storing the "longitude, latitude" to REDUX store
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data?.description,
              })
            );
          }}
          fetchDetails={true}
          debounce={400}
          minLength={2}
          // returnKeyType={'Search'}
          enablePoweredByContainer={false}
          nearbyPlacesAPI='GooglePlacesSearch'
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
