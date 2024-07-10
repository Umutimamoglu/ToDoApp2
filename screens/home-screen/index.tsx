
import React from 'react'
import { Box, Text } from '../../utils/theme'
import SafeAreaWraper from '../../src/shared/safe-area-wrapper'
import useSWR from 'swr'
import { fetcher } from '../../service/config'


const HomeScreen = () => {
    const { data, isLoading } = useSWR("categories", fetcher)
    console.log("data", JSON.stringify(data, null, 2))
    return (
        <SafeAreaWraper>
            <Box>
                <Text> Home </Text>
            </Box>
        </SafeAreaWraper>

    )
}

export default HomeScreen

