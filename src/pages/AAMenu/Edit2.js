import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

export default function Edit2({ navigation, route }) {
    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);

    const simpan = () => {
        console.log(kirim);
        setLoading(true)
        axios.post(apiURL + 'edit_anak', kirim).then(res => {
            console.log(res.data);
            SweetAlert.showAlertWithOptions({
                title: MYAPP,
                subTitle: res.data.message,
                style: 'success',
                cancellable: true
            },
                callback => navigation.goBack());
        }).then(res => {
            setLoading(false)
        })
        // navigation.navigate('Add2', kirim)
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Ubah Identitas Orang Tua" onPress={() => navigation.goBack()} />
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
                        <MyInput value={kirim.nama_ibu} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                nama_ibu: x
                            })
                        }} label="NAMA IBU" placeholder="NAMA IBU" iconname='person-outline' />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.nama_ayah} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                nama_ayah: x
                            })
                        }} label="NAMA AYAH" placeholder="NAMA AYAH" iconname='person-outline' />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.umur_ibu} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                umur_ibu: x
                            })
                        }} label="UMUR IBU" placeholder="UMUR IBU" iconname='options-outline' />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.pendidikan_ibu} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                pendidikan_ibu: x
                            })
                        }} label="TINGKAT PENDIDIKAN IBU" placeholder="TINGKAT PENDIDIKAN IBU" iconname='school-outline' />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.pekerjaan_ibu} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                pekerjaan_ibu: x
                            })
                        }} label="PEKERJAAN IBU" placeholder="PEKERJAAN IBU" iconname='business-outline' />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.pekerjaan_ayah} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                pekerjaan_ayah: x
                            })
                        }} label="PEKERJAAN AYAH" placeholder="PEKERJAAN AYAH" iconname='business-outline' />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.nomor_telepon} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                nomor_telepon: x
                            })
                        }} label="NOMOR TELEPON" placeholder="NOMOR TELEPON" iconname='call-outline' />
                        <MyGap jarak={10} />
                        {/* <MyGap jarak={10} />
                        <MyInput value={kirim.nama_bayi} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                nama_bayi: x
                            })
                        }} label="NAMA BAYI" placeholder="NAMA BAYI" iconname='happy-outline' />
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
                        }} label="BERAT BADAN LAHIR" placeholder="BERAT BADAN LAHIR" iconname='speedometer-outline' />
                        <MyGap jarak={10} />
                        <MyInput value={kirim.panjang_lahir} onChangeText={x => {
                            setKirim({
                                ...kirim,
                                panjang_lahir: x
                            })
                        }} label="PANJANG BADAN LAHIR" placeholder="PANJANG BADAN LAHIR" iconname='analytics-outline' />
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
                        <MyGap jarak={10} /> */}
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