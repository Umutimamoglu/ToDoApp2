import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../src/navigation/types'
import SafeAreaWraper from '../../src/shared/safe-area-wrapper'

const SignInScreen = () => {
    const navigtaion = useNavigation<AuthScreenNavigationType<"SignIn">>()
    const navigateToSignUpScreen = () => {
        navigtaion.navigate("SignUp")
    }


    return (
        <SafeAreaWraper>
            <View>
                <Text>sign in screeen</Text>
                <Button title='Navigation to sign up' onPress={navigateToSignUpScreen} />
            </View>
        </SafeAreaWraper>

    )
}

export default SignInScreen

