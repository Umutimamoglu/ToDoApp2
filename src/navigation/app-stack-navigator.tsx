import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./types";
import WelcomeScreen from "../../screens/welcome-screen";
import BottomTabNavigator from "./bottom-tab-navigtor";


const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}

            />
        </Stack.Navigator>
    )
}

export default AppStackNavigator