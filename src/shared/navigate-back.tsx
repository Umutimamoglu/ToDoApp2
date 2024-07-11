
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import { Box } from '../../utils/theme'
import { Ionicons } from '@expo/vector-icons';


const NavigateBack = () => {

    const navigation = useNavigation()
    const navigateBack = () => {
        navigation.goBack()
    }

    return (
        <Pressable onPress={navigateBack}>
            <Box bg="gray100" p="3" borderRadius="rounded-7xl">
                <Ionicons name="chevron-back" size={24} color="black" />
            </Box>
        </Pressable>
    )
}

export default NavigateBack
