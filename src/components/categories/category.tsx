


import React from 'react';
import { Pressable, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { CategoriesNavigationType } from '../../../navigation/types';
import { Box, Text } from 'utils/theme';
import { ICategory } from '../../../types';


type CategoryProps = {
    category: ICategory;
};

const iconSize: 24 | 32 | 48 | 64 | 96 | 128 = 24;

const Category = ({ category }: CategoryProps) => {
    const navigation = useNavigation<CategoriesNavigationType>();

    const navigateToCreateCategory = () => {
        navigation.navigate("CreateCategory", {
            category: category,
        });
    };

    const navigateToCategoryScreen = () => {
        navigation.navigate("Category", {
            id: category._id,
        })
    }

    return (

        <Pressable onPress={navigateToCategoryScreen}>
            <Box bg="lightGray" p="4" borderRadius="rounded-5xl">
                <Box
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box flexDirection="row">
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {category.icon.symbol}
                        </Text>
                        <Text variant="textBase" fontWeight="600">
                            {category.name}
                        </Text>
                    </Box>
                    <Pressable onPress={navigateToCreateCategory}>
                        <FontAwesomeIcon icon={faEllipsisV} size={iconSize} color="brown" />
                    </Pressable>
                </Box>
            </Box>
        </Pressable>

    );
};

export default Category;

