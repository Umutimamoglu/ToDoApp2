import React from 'react';
import { Box, Text } from '../../utils/theme';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native'; // react-native'den Image bileşenini kullanın
import Button from '../../src/shared/button';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '../../navigation/types';

const TODOAPP_IMAGE =
    "https://res.cloudinary.com/dooxt2sgsdooxt2sgs23233/image/upload/v1676809769/youtube/2023/february/blossom/icon_fb36u3.png"

const WelcomeScreen = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>()
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp")
    }


    return (
        <SafeAreaWrapper>
            <LinearGradient
                colors={[
                    "#ffffff",
                    "#fef8ff",
                    "#fcecff",
                    "#f8daff",
                    "#fae2ff",
                    "#fef9ff",
                    "#ffffff"
                ]}
                style={{ flex: 1 }}
            >
                <Box flex={1} justifyContent='center'>
                    <Box alignItems='center' mb='3.5'>
                        <Image
                            source={{ uri: TODOAPP_IMAGE }}
                            style={{ width: 120, height: 120 }} // style kullanarak genişlik ve yükseklik belirleyin
                        />
                    </Box>
                    <Text textAlign='center' variant="textXl" fontWeight="700">
                        daha aktif olmak ister misin.
                    </Text>
                    <Box my='3.5' mx='10'>
                        <Button
                            label='Yolculugunu baslat'
                            onPress={navigateToSignUpScreen}
                        />
                    </Box>
                    <Text textAlign='center'>
                        26.343 kişi bugun kayıt yaptırdı
                    </Text>
                </Box>

            </LinearGradient>
        </SafeAreaWrapper>
    );
}

export default WelcomeScreen;