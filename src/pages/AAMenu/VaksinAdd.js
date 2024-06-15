import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import { Value } from 'react-native-reanimated';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';

export default function VaksinAdd({ navigation, route }) {
    const [kirim, setKirim] = useState({
        ...route.params,
        tanggal_vaksin: moment().format('YYYY-MM-DD')
    });
    const [loading, setLoading] = useState(false);

    const [vaksin, setVaksin] = useState([
        {
            nama: 'HBO',
            cek: 0,
        },
        {
            nama: 'BCG',
            cek: 0,
        },
        {
            nama: 'DPT-HB-Hib',
            cek: 0,
        },
        {
            nama: 'Polio',
            cek: 0,
        },
        {
            nama: 'PCV',
            cek: 0,
        },
        {
            nama: 'Rotavirus',
            cek: 0,
        },
        {
            nama: 'Influenza',
            cek: 0,
        },
        {
            nama: 'Campak',
            cek: 0,
        },
        {
            nama: 'Booster DPT-HB-Hib',
            cek: 0,
        },
        {
            nama: 'MR',
            cek: 0,
        },
        {
            nama: 'PCV Booster',
            cek: 0,
        },
        {
            nama: 'Varisela',
            cek: 0,
        },
        {
            nama: 'Hepatitis A',
            cek: 0,
        },
        {
            nama: 'Tifoid',
            cek: 0,
        },
        {
            nama: 'Booster MR',
            cek: 0,
        },
    ])

    const simpan = () => {

        if (vaksin.filter(i => i.cek > 0).length > 0) {
            setLoading(true)
            axios.post(apiURL + 'vaksin_add', {
                fid_anak: kirim.id,
                nama_vaksin: kirim.nama_vaksin,
                tanggal_vaksin: kirim.tanggal_vaksin,
                vaksin: vaksin.filter(i => i.cek > 0)
            }).then(res => {
                console.log(res.data);
                SweetAlert.showAlertWithOptions({
                    title: MYAPP,
                    subTitle: res.data.message,
                    style: 'success',
                    cancellable: true
                },
                    callback => navigation.goBack());
                // navigation.navigate('Hasil', {
                //     id: kirim.id
                // });
            }).finally(res => {
                setLoading(false)
            })
        } else {
            showMessage({
                message: 'silahkan pilih minimal 1 !'
            })
        }
        // navigation.navigate('Add2', kirim)
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Riwayat Imunisasi" onPress={() => navigation.goBack()} />
            <View style={{
                flex: 1,
                backgroundColor: colors.white,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: colors.background,

            }}>

                <ScrollView>
                    <View style={{
                        padding: 20,
                        marginBottom: 20,

                        borderRadius: 30,
                    }}>


                        <MyCalendar label="Tanggal Imunisasi" value={kirim.tanggal_vaksin} onDateChange={x => {
                            setKirim({
                                ...kirim,
                                tanggal_vaksin: x
                            })
                        }} />
                        <FlatList data={vaksin} renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    padding: 10,
                                    borderWidth: 1,
                                    marginVertical: 5,
                                    borderRadius: 10,
                                    borderColor: colors.border,
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.primary[400],
                                        color: colors.primary,
                                        fontSize: 15,
                                    }}>{item.nama}</Text>
                                    <TouchableOpacity onPress={() => {
                                        let tmp = [...vaksin];
                                        if (tmp[index].cek > 0) {
                                            tmp[index].cek = 0;
                                        } else {
                                            tmp[index].cek = 1;
                                        }
                                        setVaksin(tmp);
                                    }} style={{
                                        width: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                        <Icon color={item.cek > 0 ? colors.success : colors.border} type='ionicon' name='checkmark-circle' size={30} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }} />



                    </View>





                    {loading && <ActivityIndicator size="large" color={colors.secondary} />}

                    {!loading && <TouchableOpacity onPress={simpan} style={{
                        marginBottom: 20,
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginRight: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 18,
                            color: colors.secondary,
                            marginRight: 10,
                        }}>SIMPAN</Text>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            borderColor: colors.secondary,

                        }}>
                            <Icon type='ionicon' color={colors.secondary} name='checkmark' />
                        </View>
                    </TouchableOpacity>}
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})