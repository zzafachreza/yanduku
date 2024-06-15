import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const MyDimensi = (windowHeight * windowHeight) / 10000;

export const fonts = {
  primary: {
    300: 'Oswald-Light',
    400: 'Oswald-Regular',
    600: 'Oswald-SemiBold',
    700: 'Oswald-Bold',
    800: 'Oswald-ExtraBold',
    900: 'Oswald-Black',
    normal: 'HammersmithOne-Regular',
  },
  secondary: {
    200: 'Oswald-ExtraLight',
    300: 'Oswald-Light',
    400: 'Oswald-Regular',
    600: 'Oswald-Medium',
    700: 'Oswald-Bold',
    800: 'Oswald-ExtraBold',
    900: 'Oswald-Black',
    normal: 'Fonetis',
  },
};
