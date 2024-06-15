import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput } from '../../components'
import { apiURL, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Detail({ navigation, route }) {

    const [item, setItem] = useState(route.params);
    const [KMS, setKMS] = useState({
        BERAT: '',
        TINGGI: '',
    })

    const isFocus = useIsFocused();

    const [open, setOpen] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    })

    useEffect(() => {
        if (isFocus) {
            __GetTransaction()
        }
    }, [isFocus]);

    const __GetTransaction = () => {
        axios.post(apiURL + 'anak_detail', {
            fid_anak: item.id
        }).then(res => {
            setItem(res.data[0])
        })

        axios.post(apiURL + 'gizi', {
            fid_anak: item.id
        }).then(res => {
            console.log(res.data);
            setKMS(res.data)
        })
    }

    const MYList = ({ label, value }) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
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
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul={`${item.nama_ibu} / ${item.nama_bayi}`} onPress={() => navigation.goBack()} />
            <View style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 20,

            }}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View>
                        <TouchableOpacity onPress={() => {
                            setOpen({
                                ...open,
                                [0]: !open[0]
                            })
                        }} style={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            zIndex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 20
                            }}>IDENTITAS BAYI / BALITA</Text>
                        </TouchableOpacity>
                        {open[0] && <View style={{
                            backgroundColor: '#EAEFF0',
                            padding: 20,
                            marginTop: -20,
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,

                        }}>
                            <MyGap jarak={20} />
                            <MYList label="Nama Bayi" value={item.nama_bayi} />
                            <MYList label="Tempat Lahir" value={item.tempat_lahir} />
                            <MYList label="Tanggal Lahir" value={item.tanggal_lahir} />
                            <MYList label="Berat Badan" value={item.berat_lahir} />
                            <MYList label="Panjang Badan Lahir" value={item.panjang_lahir} />
                            <MYList label="Riwayat Kelahiran" value={item.riwayat_kelahiran} />
                            <MYList label="Alamat Lengkap" value={item.alamat_lengkap} />
                            <View style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Edit', item)} style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                }}>
                                    <Icon type='ionicon' color={colors.primary} size={25} name='create-outline' />
                                </TouchableOpacity>
                            </View>
                        </View>}
                    </View>

                    <View style={{
                        marginTop: 10,
                    }}>
                        <TouchableOpacity onPress={() => {
                            setOpen({
                                ...open,
                                [1]: !open[1]
                            })
                        }} style={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            zIndex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 20
                            }}>IDENTITAS ORANG TUA</Text>
                        </TouchableOpacity>
                        {open[1] && <View style={{
                            backgroundColor: '#EAEFF0',
                            padding: 20,
                            marginTop: -20,
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,

                        }}>
                            <MyGap jarak={20} />
                            <MYList label="Nama Ibu" value={item.nama_ibu} />
                            <MYList label="Nama Ayah" value={item.nama_ayah} />
                            <MYList label="Umur Ibu" value={item.umur_ibu} />
                            <MYList label="Tingkat Pendidikan Ibu" value={item.pendidikan_ibu} />
                            <MYList label="Pekerjaan Ibu" value={item.pekerjaan_ibu} />
                            <MYList label="Pekerjaan Ayah" value={item.pekerjaan_ayah} />
                            <MYList label="Nomor Telepon" value={item.nomor_telepon} />
                            <View style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Edit2', item)} style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                }}>
                                    <Icon type='ionicon' color={colors.primary} size={25} name='create-outline' />
                                </TouchableOpacity>
                            </View>
                        </View>}
                    </View>

                    <View style={{
                        marginTop: 10,
                    }}>
                        <TouchableOpacity onPress={() => {
                            setOpen({
                                ...open,
                                [2]: !open[2]
                            })
                        }} style={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            zIndex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 20
                            }}>RIWAYAT KESEHATAN BAYI / BALITA</Text>
                        </TouchableOpacity>
                        {open[2] && <View style={{
                            backgroundColor: '#EAEFF0',
                            padding: 20,
                            marginTop: -20,
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,

                        }}>
                            <MyGap jarak={20} />
                            <MYList label="Penyakit yang diderita" value={item.riwayat_penyakit} />
                            <View style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Riwayat', item)} style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                }}>
                                    <Icon type='ionicon' color={colors.primary} size={25} name='create-outline' />
                                </TouchableOpacity>
                            </View>
                        </View>}
                    </View>

                    <View style={{
                        marginTop: 10,
                    }}>
                        <TouchableOpacity onPress={() => {
                            setOpen({
                                ...open,
                                [3]: !open[3]
                            })
                        }} style={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            zIndex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 20
                            }}>HASIL PENGUKURAN DI POSYANDU</Text>
                        </TouchableOpacity>
                        {open[3] && <View style={{
                            backgroundColor: '#EAEFF0',
                            padding: 20,
                            marginTop: -20,
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,

                        }}>
                            <MyGap jarak={20} />

                            <MYList label="Berat Badan" value={item.berat_badan + ' kg'} />
                            <MYList label="Panjang / Tinggi Badan" value={item.tinggi_badan + ' cm'} />
                            <MYList label="Lingkar Kepala" value={item.lingkar_kepala + ' cm'} />
                            <MYList label="Lingkar Lengan" value={item.lingkar_lengan + ' cm'} />
                            <MYList label="Lingkar Dada" value={item.lingkar_dada + ' cm'} />
                            <View style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Cek', item)} style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                }}>
                                    <Icon type='ionicon' color={colors.primary} size={25} name='create-outline' />
                                </TouchableOpacity>
                            </View>
                        </View>}
                    </View>


                    <View style={{
                        marginTop: 10,
                    }}>
                        <TouchableOpacity onPress={() => {
                            setOpen({
                                ...open,
                                [4]: !open[4]
                            })
                        }} style={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            zIndex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 20
                            }}>RIWAYAT IMUNISASI</Text>
                        </TouchableOpacity>
                        {open[4] && <View style={{
                            backgroundColor: '#EAEFF0',
                            padding: 20,
                            marginTop: -20,
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,

                        }}>
                            <MyGap jarak={20} />

                            <MYList label="Tanggal" value={item.tanggal_vaksin} />
                            <MYList label="Nama Vaksin" value={item.nama_vaksin} />


                            <View style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Vaksin', item)} style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                }}>
                                    <Icon type='ionicon' color={colors.primary} size={25} name='create-outline' />
                                </TouchableOpacity>
                            </View>
                        </View>}
                    </View>

                    <View style={{
                        marginTop: 10,
                    }}>
                        <TouchableOpacity onPress={() => {
                            setOpen({
                                ...open,
                                [5]: !open[5]
                            })
                        }} style={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            zIndex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 20
                            }}>PEMANTAUAN KMS</Text>
                        </TouchableOpacity>
                        {open[5] && <View style={{
                            backgroundColor: '#EAEFF0',
                            padding: 20,
                            marginTop: -20,
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,

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


                        </View>}
                    </View>

                </ScrollView>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})