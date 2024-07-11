import React, { useState } from 'react'
import theme, { Box, Text, Theme } from '../../utils/theme'
import SafeAreaWraper from '../../src/shared/safe-area-wrapper'
import NavigateBack from '../../src/shared/navigate-back'
import { Pressable, TextInput } from 'react-native'
import { useTheme } from '@shopify/restyle'
import { ICategory, ICategoryRequest, IColor, IIcon } from '../../types'
import { getColors, getIcons } from '../../utils/heplers'
import Button from '../../src/shared/button'
import useSWR, { useSWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'
import axiosInstance, { BASE_URL } from '../../service/config'
import { RouteProp, useRoute } from '@react-navigation/native'
import { CategoriesStackParamList } from '../../navigation/types'

const COLORS = getColors()
const ICONS = getIcons()

const DEFAULT_COLOR = COLORS[0]
const DEFAULT_ICON = ICONS[0]

const CreateCategoryRequest = async (
    url: string,
    { arg }: { arg: ICategoryRequest }
) => {
    try {
        await axiosInstance.post(url, {
            ...arg,
        })
    } catch (error) {
        console.log("error in createCategoryRequest", error)
        throw error
    }
}

const UpdateCategoryRequest = async (
    url: string,
    { arg }: { arg: ICategoryRequest }
) => {
    try {
        await axiosInstance.put(url, {
            ...arg,
        })
    } catch (error) {
        console.log("error in createCategoryRequest", error)
        throw error
    }
}

type CreateCategoryRouteTypes = RouteProp<
    CategoriesStackParamList,
    "CreateCategory"
>

function CreateCategoryScreen() {
    const theme = useTheme<Theme>()
    const route = useRoute<CreateCategoryRouteTypes>();

    const { trigger, isMutating } = useSWRMutation(
        "categories/create",
        CreateCategoryRequest
    )

    const { trigger: updateTrigger } = useSWRMutation(
        "categories/update",
        UpdateCategoryRequest
    )

    const { mutate } = useSWRConfig()

    const [newCategory, setNewCategory] = useState<
        Omit<ICategory, "_id" | "user" | "isEditable">
    >({
        name: route.params.category?.name ?? "",
        color: route.params.category?.color ?? DEFAULT_COLOR,
        icon: route.params.category?.icon ?? DEFAULT_ICON,
    })

    const CreateNewCategory = async () => {
        try {
            if (route.params.category) {
                const updateCategoryItem = {
                    ...route.params.category,
                    ...newCategory,
                }
                await updateTrigger({
                    ...updateCategoryItem,
                })
            } else {
                await trigger({
                    ...newCategory,
                })
            }
            await mutate(BASE_URL + "categories")
        } catch (error) {
            console.log("error in CreateNewCategroy", error)
            throw (error)
        }
    }

    const updateColor = (color: IColor) => {
        setNewCategory((prev) => {
            return {
                ...prev,
                color
            }
        })
    }
    const updateIcon = (icon: IIcon) => {
        setNewCategory((prev) => {
            return {
                ...prev,
                icon
            }
        })
    }

    return (
        <SafeAreaWraper>
            <Box flex={1} mx='4'>
                <Box height={16} />
                <Box flexDirection='row' justifyContent='space-between' alignItems='center'>
                    <NavigateBack />
                </Box>
                <Box height={16} />
                <Box bg="gray250" borderRadius="rounded-2xl">
                    <TextInput
                        style={{
                            fontSize: 20,
                            lineHeight: 26,
                            padding: 16
                        }}
                        value={newCategory.name}
                        maxLength={36}
                        placeholder='Create new List'
                        placeholderTextColor={theme.colors.gray5}
                        onChangeText={(text) => {
                            setNewCategory((prev) => {
                                return {
                                    ...prev,
                                    name: text
                                }
                            })
                        }} />
                </Box>
                <Box height={24} />
                <Box bg="gray250" p='4' borderRadius="rounded-2xl">
                    <Box
                        bg="white"
                        width={64}
                        p="2"
                        mb='4'
                        borderRadius="rounded-2xl"
                        alignItems="center"
                    >
                        <Text
                            variant="textXs"
                            fontWeight="600"
                            color={newCategory.color.name as any}>Colors</Text>
                    </Box>
                    <Box flexDirection="row" justifyContent="space-evenly">
                        {
                            COLORS.map(_color => {
                                return (
                                    <Pressable
                                        key={_color.id}
                                        onPress={() => {
                                            updateColor(_color)
                                        }}
                                    >
                                        <Box style={{
                                            backgroundColor: _color.code
                                        }}
                                            width={24}
                                            height={24}
                                            borderRadius="rounded-2xl"
                                        ></Box>
                                    </Pressable>
                                )
                            })}
                    </Box>
                </Box>
                <Box height={24} />
                <Box bg="gray250" p='4' borderRadius="rounded-2xl">
                    <Box
                        bg="white"
                        width={80}
                        p="2"
                        mb='4'
                        borderRadius="rounded-2xl"
                        alignItems="center"
                    >
                        <Text
                            variant="textBase"
                            fontWeight="600"
                            color={newCategory.color.name as any}>{newCategory.icon.symbol}</Text>
                    </Box>
                    <Box flexDirection="row" justifyContent="space-evenly">
                        {
                            ICONS.map(icon => {
                                return (
                                    <Pressable
                                        key={icon.id}
                                        onPress={() => {
                                            updateIcon(icon)
                                        }}
                                    >
                                        <Box
                                            width={24}
                                            height={24}
                                            borderRadius="rounded-2xl"
                                        ><Text>{icon.symbol}</Text></Box>
                                    </Pressable>
                                )
                            })}
                    </Box>
                </Box>
                <Box position="absolute" bottom={4} left={0} right={0}>
                    <Button label='Create new Category' onPress={CreateNewCategory} />
                </Box>
            </Box>
        </SafeAreaWraper>
    )
}

export default CreateCategoryScreen