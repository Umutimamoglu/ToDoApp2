import { ActivityIndicator } from "react-native"
import SafeAreaWraper from "./safe-area-wrapper"
import { Box } from "../../utils/theme"


const Loader = () => {
    return (
        <SafeAreaWraper>
            <Box flex={1} alignItems="center" justifyContent="center">
                <ActivityIndicator />
            </Box>
        </SafeAreaWraper>
    )
}

export default Loader