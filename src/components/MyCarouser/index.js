import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { colors } from '../../utils/colors';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MyDimensi, fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';


export default function MyCarouser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();



  const [data, setData] = useState([]);

  const renderCarouselItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('ArtikelDetail', item)}>
      <View style={{
        width: 300,
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden'
      }}>
        <Image
          source={{
            uri: item.image
          }}
          style={{
            // resizeMode: 'contain',
            height: 150,
            width: 300,
          }}
        />

      </View>
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    axios.post(apiURL + 'slider').then(res => {
      console.log(res.data);
      setData(res.data)
    })
  }, [])

  return (
    <View style={{
      marginTop: 10,
    }}>
      <Carousel
        loop={true}
        // layout="stack"
        layoutCardOffset={18}
        data={data}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    // position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: colors.black,
    opacity: 1,
    height: 150,
    width: 300,
    borderRadius: 10,
    // overflow: 'hidden',
  },
  cardImage: {
    height: 250,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
});
