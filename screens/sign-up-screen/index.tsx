import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../src/navigation/types'
import SafeAreaWraper from '../../src/shared/safe-area-wrapper'

const SignUpScreen = () => {
    const navigtaion = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignInScreen = () => {
        navigtaion.navigate("SignIn")
    }


    return (
        <SafeAreaWraper>
            <View>
                <Text>sign up screeen</Text>
                <Button title='Navigation to sign in' onPress={navigateToSignInScreen} />
            </View>
        </SafeAreaWraper>

    )
}

export default SignUpScreen

