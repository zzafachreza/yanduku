import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import { Value } from 'react-native-reanimated';

export default function Hasil({ navigation, route }) {
    const [KMS, setKMS] = useState({
        BERAT: '',
        TINGGI: ''
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        axios.post(apiURL + 'gizi', {
            fid_anak: route.params.id
        }).then(res => {
            console.log(res.data);
            setKMS(res.data)
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Pemantauan KMS" onPress={() => navigation.goBack()} />
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


                        <View style={{
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[400],
                                color: colors.primary,
                                textAlign: 'center',
                                fontSize: 18
                            }}>STATUS GIZI: </Text>
                            <View style={{
                                backgroundColor: colors.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderRadius: 10,
                                marginTop: 10,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    color: colors.primary,
                                    fontSize: 26
                                }}>{KMS.BERAT}</Text>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[400],
                                color: colors.primary,
                                textAlign: 'center',
                                fontSize: 18
                            }}>TINGGI BADAN :</Text>
                            <View style={{
                                backgroundColor: colors.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderRadius: 10,
                                marginTop: 10,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    color: colors.primary,
                                    fontSize: 26
                                }}>{KMS.TINGGI}</Text>
                            </View>
                        </View>

                    </View>



                </ScrollView>

                {loading && <ActivityIndicator size="large" color={colors.secondary} />}

                {!loading && <TouchableOpacity onPress={() => navigation.replace('MainApp')} style={{
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
                    }}>SELESAI</Text>
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