import { Alert, StyleSheet, Text, View, Animated, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { NavigationRouteContext, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import { MyGap, MyHeader } from '../../components';
import ProgressCircle from 'react-native-progress-circle'
import { showMessage } from 'react-native-flash-message';
export default function Home({ navigation, route }) {
  const img = new Animated.Value(0.9);


  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([])
  const [key, setKey] = useState('');
  const [TMP, setTMP] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});
  const [loading, setLoading] = useState(true);




  const _getTransaction = async () => {



    getData('user').then(u => {
      setUser(u);
      axios.post(apiURL + 'anak', {
        fid_user: u.id
      }).then(res => {
        console.log(res.data);
        setTMP(res.data);
        setData(res.data)
      })

    })




  }


  useEffect(() => {

    Animated.timing(img, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();


    axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });


    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const [lokasi, setLokasi] = useState({
    lat: 0,
    long: 0
  })




  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
      position: 'relative'

    }}>

      {/* HEADERS */}
      <View style={{
        backgroundColor: colors.white,
        padding: 20,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1
        }}>
          <Text style={{
            fontFamily: fonts.primary[600],
            color: colors.tertiary,
            fontSize: 18,
          }}>Selamat datang, {user.nama_lengkap}</Text>
          <Text style={{
            fontFamily: fonts.primary[400],
            fontSize: 15,
            color: colors.primary,

          }}>
            Aplikasi Yanduku
          </Text>
        </View>
        <View>
          <Image source={require('../../assets/logo.png')} style={{
            width: 50,
            height: 50,
            resizeMode: 'contain'
          }} />
        </View>
      </View>

      <View style={{
        flex: 1,
        backgroundColor: colors.secondary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 10,
      }}>
        <View style={{
          position: 'relative',
        }}>



          <TextInput value={key} onChangeText={x => {
            setKey(x);
            if (x.length > 0) {
              let TMPSrc = data.filter(i => i.nama_bayi.toLowerCase().indexOf(x.toLowerCase()) > -1);
              if (TMPSrc.length > 0) {
                setData(TMPSrc);
              }
            } else {
              setData(TMP);
            }
          }} placeholderTextColor={colors.border} placeholder="CARI" style={{
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10,
            paddingLeft: 40,
            fontFamily: fonts.primary[400],
            fontSize: 18,
            height: 55,
            backgroundColor: colors.white,
          }} />
          <View style={{
            position: 'absolute',
            left: 20,
            top: 25,
          }}>
            <Icon size={25} type='ionicon' name='search-outline' color={colors.border} />
          </View>
        </View>
        <Text style={{
          textAlign: 'center',
          fontFamily: fonts.primary[600],
          fontSize: 20,
          marginVertical: 10,
          color: colors.white
        }}>POSYANDU {user.nama_posyandu}</Text>

        <View style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
          flexDirection: 'row',
          paddingTop: 10,

        }}>
          <Text style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: fonts.primary[600],
            color: colors.secondary,
            fontSize: 20,
            borderBottomWidth: 1,
            borderBottomColor: colors.primary,
          }}>NAMA ORANG TUA</Text>
          <Text style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: fonts.primary[600],
            color: colors.secondary,
            fontSize: 20,
            borderLeftWidth: 1,
            borderLeftColor: colors.primary,
            borderBottomWidth: 1,
            borderBottomColor: colors.primary,
          }}>NAMA BAYI</Text>
        </View>
        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <View style={{
              backgroundColor: colors.white,
              flexDirection: 'row',

            }}>
              <Text style={{
                flex: 1,
                textAlign: 'center',
                fontFamily: fonts.primary[600],
                color: colors.primary,
                fontSize: 20,
                borderBottomWidth: 1,
                borderBottomColor: colors.secondary,
              }}>{item.nama_ibu}</Text>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                borderLeftWidth: 1,
                borderLeftColor: colors.secondary,
                borderBottomWidth: 1,
                borderBottomColor: colors.secondary,
              }}>
                <Text style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: fonts.primary[600],
                  color: colors.primary,
                  fontSize: 20,
                  maxWidth: '90%'

                }}>{item.nama_bayi}</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Detail', item)} style={{
                  padding: 5,
                }}>
                  <Icon type='ionicon' name='search-outline' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus data ini ?', [
                    {
                      text: 'TIDAK'
                    },
                    {
                      text: 'Ya, HAPUS',
                      onPress: () => {
                        axios.post(apiURL + 'delete_anak', {
                          id: item.id
                        }).then(res => {
                          showMessage({
                            type: 'success',
                            message: res.data.message
                          });
                          _getTransaction();
                        })
                      }
                    }
                  ])
                }} style={{
                  padding: 5,
                }}>
                  <Icon type='ionicon' name='trash-outline' color={colors.danger} />
                </TouchableOpacity>
              </View>
            </View>
          )
        }} />



      </View>
      <View style={{
        backgroundColor: colors.secondary,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('Add1')} style={{
          width: 60,
          height: 60,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: 'center',
          backgroundColor: colors.white,
          bottom: 10,
        }}>
          <Icon type='ionicon' name='add' size={40} color={colors.primary} />
        </TouchableOpacity>

      </View>



    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})