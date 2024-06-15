import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import { Value } from 'react-native-reanimated';

export default function VaksinEdit({ navigation, route }) {
    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);

    const simpan = () => {

        setLoading(true)
        axios.post(apiURL + 'vaksin_edit', {

            id: kirim.id,
            nama_vaksin: kirim.nama_vaksin,
            tanggal: kirim.tanggal,
        }).then(res => {
            console.log(res.data);
            SweetAlert.showAlertWithOptions({
                title: MYAPP,
                subTitle: res.data.message,
                style: 'success',
                cancellable: true
            },
                callback => navigation.goBack());
        }).finally(res => {
            setLoading(false)
        })
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        padding: 20,
                        marginBottom: 20,

                        borderRadius: 30,
                    }}>

                        <MyCalendar label="Tanggal Imunisasi" value={kirim.tanggal} onDateChange={x => {
                            setKirim({
                                ...kirim,
                                tanggal: x
                            })
                        }} />
                        <MyGap jarak={20} />
                        <MyPicker iconname="eyedrop-outline"
                            label="Nama Vaksin" data={[
                                {
                                    label: 'HBO',
                                    value: 'HBO'
                                },
                                {
                                    label: 'BCG',
                                    value: 'BCG'
                                },
                                {
                                    label: 'DPT-HB-Hib',
                                    value: 'DPT-HB-Hib'
                                },
                                {
                                    label: 'Polio',
                                    value: 'Polio'
                                },
                                {
                                    label: 'PCV',
                                    value: 'PCV'
                                },
                                {
                                    label: 'Rotavirus',
                                    value: 'Rotavirus'
                                },
                                {
                                    label: 'Influenza',
                                    value: 'Influenza'
                                },
                                {
                                    label: 'Campak',
                                    value: 'Campak'
                                },

                                {
                                    label: 'Booster DPT-HB-Hib',
                                    value: 'Booster DPT-HB-Hib'
                                },
                                {
                                    label: 'MR',
                                    value: 'MR'
                                },
                                {
                                    label: 'PCV Booster',
                                    value: 'PCV Booster'
                                },
                                {
                                    label: 'Varisela',
                                    value: 'Varisela'
                                },
                                {
                                    label: 'Hepatitis A',
                                    value: 'Hepatitis A'
                                },
                                {
                                    label: 'Tifoid',
                                    value: 'Tifoid'
                                },
                                {
                                    label: 'Booster MR',
                                    value: 'Booster MR'
                                },
                            ]} value={kirim.nama_vaksin} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    nama_vaksin: x
                                })
                            }} />





                    </View>



                </ScrollView>

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

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})