import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import { Value } from 'react-native-reanimated';

export default function CekAdd({ navigation, route }) {
    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);

    const simpan = () => {

        setLoading(true)
        axios.post(apiURL + 'cek_edit', {
            id: kirim.id,
            berat_badan: kirim.berat_badan,
            tinggi_badan: kirim.tinggi_badan,
            lingkar_kepala: kirim.lingkar_kepala,
            lingkar_lengan: kirim.lingkar_lengan,
            lingkar_dada: kirim.lingkar_dada,
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
            <MyHeader judul="Hasil Pegukuran di Posyandu" onPress={() => navigation.goBack()} />
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

                        <MyInput keyboardType='number-pad' value={kirim.berat_badan} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                berat_badan: x
                            })
                        }} iconname="speedometer-outline" placeholder="Berat Badan" label="Berat Badan (kg)" />
                        <MyGap jarak={10} />
                        <MyInput keyboardType='number-pad' value={kirim.tinggi_badan} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                tinggi_badan: x
                            })
                        }} iconname="analytics-outline" placeholder="Panjang / Tinggi Badan" label="Panjang / Tinggi Badan (cm)" />
                        <MyGap jarak={10} />
                        <MyInput keyboardType='number-pad' value={kirim.lingkar_kepala} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                lingkar_kepala: x
                            })
                        }} iconname="happy-outline" placeholder="Lingkar Kepala" label="Lingkar Kepala (cm)" />
                        <MyGap jarak={10} />
                        <MyInput keyboardType='number-pad' value={kirim.lingkar_lengan} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                lingkar_lengan: x
                            })
                        }} iconname="hand-right-outline" placeholder="Lingkar Lengan" label="Lingkar Lengan (cm)" />
                        <MyGap jarak={10} />
                        <MyInput keyboardType='number-pad' value={kirim.lingkar_dada} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                lingkar_dada: x
                            })
                        }} iconname="fitness-outline" placeholder="Lingkar Dada" label="Lingkar Dada (cm)" />
                        <MyGap jarak={10} />


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