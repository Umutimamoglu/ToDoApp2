
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { AuthStackParamList } from "./types"
import WelcomeScreen from "../../screens/welcome-screen"

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
            />
            <Stack.Screen
                name="SignIn"
                component={WelcomeScreen}
            />
            <Stack.Screen
                name="SignUp"
                component={WelcomeScreen}
            />

        </Stack.Navigator>
    )
}

export default AuthStackNavigator