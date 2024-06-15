import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import { Value } from 'react-native-reanimated';

export default function RiwayatEdit({ navigation, route }) {
    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);

    const simpan = () => {

        setLoading(true)
        axios.post(apiURL + 'riwayat_edit', {
            id: kirim.id,
            fid_anak: kirim.id,
            riwayat_penyakit: kirim.riwayat_penyakit,
            riwayat_penyakit_lain: kirim.riwayat_penyakit_lain,
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
            <MyHeader judul="Riwayat Kesehatan Bayi" onPress={() => navigation.goBack()} />
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

                        <MyPicker iconname="clipboard-outline"
                            label="Penyakit yang diderita bayi / balita : " data={[

                                {
                                    label: 'Tidak ada',
                                    value: 'Tidak ada',
                                },
                                {
                                    label: 'Diare',
                                    value: 'Diare',
                                },
                                {
                                    label: 'Infeksi Saluran Pernafasan Akut (ISPA)',
                                    value: 'Infeksi Saluran Pernafasan Akut (ISPA)',
                                },
                                {
                                    label: 'Kecacingan',
                                    value: 'Kecacingan',
                                },
                                {
                                    label: 'Lainnya',
                                    value: 'Lainnya',
                                },
                            ]} value={kirim.riwayat_penyakit} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    riwayat_penyakit: x
                                })
                            }} />

                        {kirim.riwayat_penyakit == 'Lainnya' &&
                            <MyInput label="Lainnya" iconname="create-outline" onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    riwayat_penyakit_lain: x
                                })
                            }} placeholder="Tulis jika ada penyakit lainnya" />

                        }



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