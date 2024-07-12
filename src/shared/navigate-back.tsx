
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import { Box } from '../../utils/theme'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';

const iconSize: 24 | 32 | 48 | 64 | 96 | 128 = 24;

const NavigateBack = () => {

    const navigation = useNavigation()
    const navigateBack = () => {
        navigation.goBack()
    }

    return (
        <Pressable onPress={navigateBack}>
            <Box bg="gray100" p="3" borderRadius="rounded-7xl">
                <FontAwesomeIcon icon={faBackwardStep} size={iconSize} color="brown" />
            </Box>
        </Pressable>
    )
}

export default NavigateBack
