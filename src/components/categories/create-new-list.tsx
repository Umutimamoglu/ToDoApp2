

import { Pressable, View } from 'react-native'
import React from 'react'
import { Box, Theme, Text } from '../../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { CategoriesNavigationType } from '../../../navigation/types'
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@shopify/restyle'




const CreateNewList = () => {

    const navigation = useNavigation<CategoriesNavigationType>()
    const theme = useTheme<Theme>()

    const navigateToCreateCategory = () => {
        navigation.navigate("CreateCategory", {})
    }

    return (
        <Pressable onPress={navigateToCreateCategory}>
            <Box alignItems='center' p='4' bg="lightGray" borderRadius="rounded-5xl" flexDirection="row">
                <Feather name='plus' size={24} color={theme.colors.gray500} />
                <Text variant="textXl" fontWeight="600" color="gray650" ml='3'>
                    CreateNewList
                </Text>
            </Box>
        </Pressable>
    )
}

export default CreateNewList

