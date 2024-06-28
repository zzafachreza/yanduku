import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import moment from 'moment';

export default function Add1({ navigation, route }) {
    const [kirim, setKirim] = useState({
        nama_ibu: '',
        nama_ayah: '',
        umur_ibu: '',
        pendidikan_ibu: '',
        pekerjaan_ibu: '',
        pekerjaan_ayah: '',
        nomor_telepon: '',
        nama_bayi: '',
        tempat_lahir: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        berat_lahir: '',
        panjang_lahir: '',
        riwayat_kelahiran: '',
        tanggal_vaksin: moment().format('YYYY-MM-DD'),
        alamat_lengkap: '',
        fid_user: '',
    });

    const simpan = () => {
        console.log(kirim);
        navigation.navigate('Add2', kirim)
    }

    useEffect(() => {
        getData('user').then(res => {
            setKirim({
                ...kirim,
                fid_user: res.id
            })
        })
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Identitas Bayi / Balita" onPress={() => navigation.goBack()} />
            <View style={{
                flex: 1,
                backgroundColor: colors.white,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,

            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        padding: 20,
                        marginBottom: 20,
                        backgroundColor: colors.background,
                        borderRadius: 30,
                    }}>
                        <MyInput value={kirim.nama_bayi} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                nama_bayi: x
                            })
                        }} label="NAMA BAYI / BALITA" placeholder="NAMA BAYI / BALITA" iconname='happy-outline' />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.tempat_lahir} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                tempat_lahir: x
                            })
                        }} label="TEMPAT LAHIR" placeholder="TEMPAT LAHIR" iconname='home-outline' />
                        <MyGap jarak={10} />
                        <MyCalendar label="TANGGAL LAHIR" value={kirim.tanggal_lahir} onDateChange={x => {
                            setKirim({
                                ...kirim,
                                tanggal_lahir: x
                            })
                        }} iconname="calendar-outline" />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.berat_lahir} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                berat_lahir: x
                            })
                        }} label="BERAT BADAN LAHIR (KG)" placeholder="BERAT BADAN LAHIR" iconname='speedometer-outline' />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.panjang_lahir} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                panjang_lahir: x
                            })
                        }} label="PANJANG BADAN LAHIR (CM)" placeholder="PANJANG BADAN LAHIR" iconname='analytics-outline' />
                        <MyGap jarak={10} />
                        <MyPicker iconname="clipboard-outline" label="RIWAYAT KELAHIRAN" data={[
                            {
                                label: 'NORMAL',
                                value: 'NORMAL'
                            },
                            {
                                label: 'CAESAR',
                                value: 'CAESAR'
                            },
                            {
                                label: 'VACUM',
                                value: 'VACUM'
                            },
                            {
                                label: 'FORCEPS',
                                value: 'FORCEPS'
                            },
                        ]} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                riwayat_kelahiran: x
                            })
                        }} />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.alamat_lengkap} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                alamat_lengkap: x
                            })
                        }} label="ALAMAT LENGKAP DOMISILI BAYI / BALITA" placeholder="ALAMAT LENGKAP DOMISILI BAYI / BALITA" iconname='location-outline' />
                        <MyGap jarak={10} />



                    </View>

                    <TouchableOpacity onPress={simpan} style={{
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
                        }}>BERIKUTNYA</Text>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            borderColor: colors.secondary,

                        }}>
                            <Icon type='ionicon' color={colors.secondary} name='arrow-forward' />
                        </View>
                    </TouchableOpacity>

                </ScrollView>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})