import { ActivityIndicator, Alert, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { MYAPP, apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyHeader, MyInput } from '../../components';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const isFocus = useIsFocused();

    const getDataTransaksi = () => {
        setLoading(true);
        axios.post(apiURL + 'riwayat', {
            fid_anak: item.id
        }).then(res => {
            setData(res.data);
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (isFocus) {
            getDataTransaksi();
        }
    }, [isFocus]);



    const MYList = ({ label, value }) => {
        return (
            <View style={{
                flexDirection: 'row',
                // alignItems: 'center'
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.primary[400],
                    color: colors.primary,
                    fontSize: 15
                }}>{label}</Text>
                <Text style={{
                    flex: 0.1,
                    fontFamily: fonts.primary[400],
                    color: colors.primary,
                    fontSize: 15
                }}>:</Text>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.primary[400],
                    color: colors.primary,
                    fontSize: 15
                }}>{value}</Text>
            </View>
        )
    }


    const __renderItem = ({ item }) => {
        return (



            <View style={{
                borderWidth: 1,
                borderColor: colors.primary,
                marginVertical: 10,
                padding: 10,
                width: '100%',
                position: 'relative',
                borderRadius: 10,
                overflow: 'hidden'
            }}>

                <MYList label="Tanggal" value={moment(item.tanggal).format('dddd, DD MMM YYYY')} />
                <MYList label="Riwayat Penyakit" value={item.riwayat_penyakit} />


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('RiwayatEdit', item)} style={{
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        borderRadius: 10,
                        marginRight: 10,
                    }}>
                        <Icon type='ionicon' name='create-outline' color={colors.primary} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                        {
                            text: 'TIDAK'
                        },
                        {
                            text: "HAPUS",
                            onPress: () => {
                                axios.post(apiURL + 'riwayat_delete', {
                                    id: item.id
                                }).then(res => {
                                    console.log(res.data);
                                    showMessage({
                                        type: 'success',
                                        message: res.data.message
                                    })
                                    getDataTransaksi();
                                })
                            }
                        }
                    ])} style={{
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        borderRadius: 10,
                    }}>
                        <Icon type='ionicon' name='trash-outline' color={colors.danger} size={30} />
                    </TouchableOpacity>
                </View>
            </View>




        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Riwayat Kesehatan Bayi" onPress={() => navigation.goBack()} />



            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    backgroundColor: colors.background,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>


                    <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }


            <View style={{
                padding: 10,
            }}>
                <MyButton onPress={() => navigation.navigate('RiwayatAdd', {
                    ...item,
                    riwayat_penyakit: 'Tidak Ada'
                })} title="Tambah" Icons="add" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})