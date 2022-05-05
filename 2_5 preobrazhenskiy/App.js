import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width} = Dimensions.get('window');
const SPACING = 25;
const THUMB_SIZE = 93;

const IMAGES = {
  image1: require('./assets/images/first.jpg'),
  image2: require('./assets/images/second.jpg'),
  image3: require('./assets/images/third.jpg'),
  image4: require('./assets/images/fourth.jpg'),
  image5: require('./assets/images/fifth.jpg'),
  image6: require('./assets/images/sixth.jpg'),
  image7: require('./assets/images/seventh.jpg'),
};

const  App=() => {
  const carouselRef = useRef();
  const flatListRef = useRef();
  const [images, setImages] = useState([
    {id: 'first', image: IMAGES.image1},
    {id: 'second', image: IMAGES.image2},
    {id: 'third', image: IMAGES.image3},
    {id: 'fourth', image: IMAGES.image4},
    {id: 'fifth', image: IMAGES.image5},
    {id: 'sixth', image: IMAGES.image6},
    {id: 'seventh', image: IMAGES.image7},
  ]);

  const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
  );

  const [indexSelected, setIndexSelected] = useState(0);

  const onSelect = (indexSelected) => {
    setIndexSelected(indexSelected);

    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true,
    });
  };

  const onTouchThumbnail = (touched) => {
    if (touched === indexSelected) return;

    carouselRef?.current?.snapToItem(touched);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center'}}>

          <View style={{flex: 1/2, marginTop: 300, bottom: -2, position: 'relative'}}>
        <Carousel
          ref={carouselRef}
          layout="default"
          data={images}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => onSelect(index)}
          renderItem={({item, index}) => (
            <Image
              key={index}
              style={{width: '100%', height: '100%', borderRadius: 5,}}
              source={item.image}
            />
          )}
        />
        <Pagination
          inactiveDotColor="gray"
          dotColor={'white'}
          activeDotIndex={indexSelected}
          dotsLength={images.length}
          animatedDuration={90}
          inactiveDotScale={1}
        />
        
      <FlatList
        ref={flatListRef}
        horizontal={true}
        data={images}
        style={{position: 'absolute', bottom: -230}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onTouchThumbnail(index)}
            activeOpacity={0.9}>
            <Image
              style={{

                width: THUMB_SIZE,
                height: THUMB_SIZE,
                marginRight: SPACING,
                borderRadius: 90,
                borderWidth: index === indexSelected ? 15 : 8,
                borderColor: index === indexSelected ? 'white' : 'yellow',
              }}
              source={item.image}
            />
          </TouchableOpacity>)}/>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default App;