
import React, { useState } from 'react'
import theme, { Box, Text } from '../../utils/theme'
import SafeAreaWraper from '../../src/shared/safe-area-wrapper'
import NavigateBack from '@/shared/navigate-back'
import { FlatList, Pressable } from 'react-native'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { HomeStackParamlist } from 'navigation/types'
import useSWR, { mutate, useSWRConfig } from 'swr'
import { ICategory, ITask } from 'types'
import axiosInstance, { fetcher } from 'service/config'
import Loader from '@/shared/loader'
import { TextInput } from 'react-native'
import { format, isToday } from 'date-fns'
import { Calendar } from 'react-native-calendars'
import useSWRMutation from 'swr/mutation'


const iconSize: 24 | 32 | 48 | 64 | 96 | 128 = 24;
export const today = new Date()
export const consttodayISODate = new Date()
type EditTaskRouteType = RouteProp<HomeStackParamlist, "EditTask">

const updateTaskRequest = async (url: string, { arg }: { arg: ITask }) => {
    try {
        await axiosInstance.put(url + "/" + arg._id, {
            ...arg,
        })
    } catch (error) {

    }
}
const navigation = useNavigation()


const EditTaskScreen = () => {




    const route = useRoute<EditTaskRouteType>()
    const { trigger } = useSWRMutation("tasks/edit", updateTaskRequest)

    const { task } = route.params

    const [updatedTask, setUpdatedTask] = useState(task)


    const { mutate } = useSWRConfig()
    const [isSelectingCategory, setIsSelectingCategory] = useState<boolean>(false)
    const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false)

    const { data: categories, isLoading } = useSWR<ICategory[]>(
        "categories",
        fetcher
    )

    const updateTask = async () => {
        try {
            if (updateTask.name.length.toString().trim().length > 0) {
                await trigger({ ...updatedTask })
                await mutate("tasks/")
                navigation.goBack()
            }
        } catch (error) {
            console.log("error in UpdateTask", error)
            throw (error)
        }
    }



    if (isLoading || !categories) {
        return <Loader />
    }

    const selectedCategory = categories?.find(
        (_category) => _category._id == updatedTask.categoryId
    )


    return (
        <SafeAreaWraper>
            <Box flex={1} mx='4'>
                <Box
                    flexDirection='row'
                    alignItems='center'
                    justifyContent="space-between"

                >
                    <NavigateBack />
                    <Pressable>
                        <FontAwesomeIcon icon={faTrashCan} size={iconSize} color={theme.colors.rose500} />
                    </Pressable>
                </Box>
            </Box>
            <Box height={20} >

                <Box bg="lightGray" px="4" py="3.5" borderRadius="rounded-5xl" flexDirection='row' position='relative'>
                    <TextInput
                        placeholder="Create New Task"
                        style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            fontSize: 16,
                            width: '50%',
                        }}
                        maxLength={36}
                        textAlignVertical="center"
                        value={updatedTask.name}
                        onChange={(event) => {
                            const text = event.nativeEvent.text;
                            setUpdatedTask((prev) => ({
                                ...prev,
                                name: text
                            }));
                        }}
                        onSubmitEditing={updateTask}
                    />

                    <Box flexDirection='row' alignItems='center'>
                        <Pressable
                            onPress={() => {
                                setIsSelectingDate((prev) => !prev)
                            }}
                        >
                            <Box flexDirection="row" alignContent="center" bg="white" p='2' borderRadius="rounded-xl">
                                <Text>
                                    {isToday(new Date(updatedTask.date))
                                        ? "Today"
                                        : format(new Date(updatedTask.date), "MMM dd")
                                    }
                                </Text>
                            </Box>
                        </Pressable>
                        <Box width={12} />
                        <Pressable
                            onPress={() => {
                                setIsSelectingCategory((prev) => !prev)
                            }}
                        >
                            <Box bg="white" flexDirection="row" alignItems='center' p="2" borderRadius="rounded-xl">
                                <Box width={12} height={12} borderRadius="rounded" borderWidth={2} mr="2" style={{
                                    borderColor: selectedCategory?.color.code
                                }}
                                ></Box>
                                <Text style={{
                                    color: selectedCategory?.color.code
                                }}>
                                    {selectedCategory?.name}
                                </Text>
                            </Box>
                        </Pressable>

                    </Box>
                    {isSelectingCategory && (
                        <Box position="absolute" right={40} bottom={-120}>
                            <FlatList
                                data={categories}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Pressable
                                            onPress={() => {
                                                setUpdatedTask((prev) => {
                                                    return {
                                                        ...prev,
                                                        categoryId: item._id
                                                    }
                                                })
                                                setIsSelectingCategory(false)
                                            }}
                                        >
                                            <Box
                                                bg="gray250"

                                                p="2"
                                                borderTopStartRadius={index == 0 ? "rounded-3xl" : "none"}
                                                borderTopEndRadius={index == 0 ? "rounded-3xl" : "none"}
                                                borderBottomStartRadius={
                                                    categories?.length - 1 == index ? "rounded-2xl" : "none"
                                                }
                                                borderBottomEndRadius={
                                                    categories?.length - 1 == index ? "rounded-2xl" : "none"
                                                }
                                            >
                                                <Box flexDirection='row'>
                                                    <Text>{item.icon.symbol}</Text>
                                                    <Text
                                                        ml="2"
                                                        fontWeight={
                                                            updatedTask.categoryId == item._id ? "700" : "400"
                                                        }
                                                    >{item.name}</Text>

                                                </Box>
                                            </Box>
                                        </Pressable>
                                    )
                                }}
                            />
                        </Box>
                    )}

                </Box>
                {isSelectingDate && (
                    <Box>
                        <Calendar
                            minDate={format(today, "Y-MM-dd")}
                            onDayPress={(day: any) => {
                                setIsSelectingDate(false)
                                const selectedDate = new Date(day.dateString).toISOString()
                                setUpdatedTask((prev) => {
                                    return {
                                        ...prev,
                                        date: selectedDate
                                    }
                                })
                            }}
                        />
                    </Box >
                )}
            </Box >
        </SafeAreaWraper>

    )
}

export default EditTaskScreen

