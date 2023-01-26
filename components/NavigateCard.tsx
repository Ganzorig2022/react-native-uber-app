import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from '@rneui/themed';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      {/* ====GO BACK ICON==== */}
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen' as never)}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon
            name='chevron-left'
            type='font-awesome-5'
            color='black'
            size={16}
            style={tw`mr-2`}
          />
        </TouchableOpacity>
      </View>
      <Text style={tw`text-center py-5 text-xl`}>Hi, this is Ganzo</Text>
      {/* ====GOOGLE PLACE SEARCH==== */}
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            onPress={(data, details = null) => {
              //1) storing the "longitude, latitude" to REDUX store
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data?.description,
                })
              );
              navigation.navigate('RideOptionsCard' as never);
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            enablePoweredByContainer={false}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            styles={toInputBoxStyles}
          />
        </View>
        <NavFavourites />
        <View
          style={tw`flex-row bg-white justify-evenly border-gray-100 border-t`}
        >
          <TouchableOpacity
            style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
            onPress={() => navigation.navigate('RideOptionsCard' as never)}
          >
            <Icon
              name='car'
              type='font-awesome'
              color='white'
              size={16}
              style={tw`mr-2`}
            />
            <Text style={tw`text-white text-center`}>Rides</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex flex-row w-24 px-4 py-3 rounded-full`}
          >
            <Icon
              name='hamburger'
              type='font-awesome-5'
              color='black'
              size={16}
              style={tw`mr-2`}
            />
            <Text style={tw`text-black text-center`}>Eats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 10,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
