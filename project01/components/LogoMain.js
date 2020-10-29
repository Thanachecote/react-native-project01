import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import logoTOT from '../assets/images/tot-white.png'

const LogoMain = () => {
    return (
        <View style={styles.myImg}>
            <Image style={styles.myImgTOT} source={logoTOT} width={10} resizeMode={'cover'}/>
        </View>
    )
}

export default LogoMain

const styles = StyleSheet.create({
    myImg: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    myImgTOT: {
        width: 100,
        height: 25
    }
})
