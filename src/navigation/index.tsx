import { NavigationContainer } from "@react-navigation/native"
import AuthStackNavigator from "./auth-stack-navigator"


const Navigation = () => {
    const user = true
    return <NavigationContainer>

        <AuthStackNavigator />
    </NavigationContainer>
}

export default Navigation