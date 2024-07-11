
import React from 'react'
import { Box, Text } from '../../../utils/theme'
import { ICategory } from '../../../types'
import { Entypo } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CategoriesNavigationType } from '../../../navigation/types';


type CategoryProps = {
    category: ICategory
}


const Category = ({ category }: CategoryProps) => {
    const navigation = useNavigation<CategoriesNavigationType>()
    const navigateToCreateCategroy = () => {
        navigation.navigate("CreateCategory", {
            category: category, // category nesnesini parametre olarak geçiyoruz
        })
    }

    return (

        <Box bg="lightGray" p='4' borderRadius="rounded-5xl" >
            <Box >
                <Box flexDirection='row'>

                    <Text variant="textBase" fontWeight="600" mr="3">
                        {category.icon.symbol}
                    </Text>
                    <Text variant="textBase" fontWeight="600" >
                        {category.name}
                    </Text>
                </Box>
                <Pressable onPress={navigateToCreateCategroy}>
                    <Entypo />
                </Pressable>

            </Box>

        </Box>
    )
}

export default Category
