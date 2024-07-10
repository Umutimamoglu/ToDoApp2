

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import HomeScreen from "../../screens/home-screen"
import { CategoriesStackParamList, HomeStackParamlist } from "./types"
import CategoriesScreen from "../../screens/categories_screen"
import CategoryScreen from "../../screens/category-screen"


const Stack = createNativeStackNavigator<CategoriesStackParamList>()

const CategoriesStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{
                    headerShown: false,
                }}
            />



        </Stack.Navigator>
    )
}

export default CategoriesStackNavigator