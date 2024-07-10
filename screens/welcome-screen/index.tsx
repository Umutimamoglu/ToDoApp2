
import React from 'react'
import { Box, Text } from '../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../src/navigation/types'
import { Button } from 'react-native'
import SafeAreaWraper from '../../src/shared/safe-area-wrapper'

const WelcomeScreen = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>()
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn")
    }
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp")
    }

    return (
        <SafeAreaWraper>
            <Box>
                <Text> weolcome screeen</Text>
                <Button title='Navigate to sign in' onPress={navigateToSignInScreen} />
                <Button title='Navigate to sign up' onPress={navigateToSignUpScreen} />
            </Box>
        </SafeAreaWraper>

    )
}

export default WelcomeScreen

