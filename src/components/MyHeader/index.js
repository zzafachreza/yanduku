import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { MyDimensi, colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import MyMenu from '../MyMenu';
export default function MyHeader({ onPress, judul }) {

  return (


    <View style={{
      flexDirection: 'row',
      backgroundColor: colors.white,
      padding: 5,
      height: 60,
      marginBottom: 10,
      alignItems: 'center',
      borderBottomWidth: 0,
      borderBottomColor: colors.black,
    }}>
      <TouchableOpacity onPress={onPress} style={{
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.tertiary,
      }}>
        <Icon type='ionicon' name='arrow-back-outline' size={MyDimensi / 2} color={colors.tertiary} />
      </TouchableOpacity>
      <Text style={{
        flex: 1,
        left: -16,
        textAlign: 'center',
        fontFamily: fonts.primary[600],
        fontSize: 16,
        color: colors.tertiary
      }}>{judul}</Text>
    </View>

  );
}

const styles = StyleSheet.create({});
