import Loader from '@/shared/loader'
import { format, isToday } from 'date-fns'
import React, { useState } from 'react'
import { FlatList, Pressable, TextInput } from 'react-native'
import { Calendar } from 'react-native-calendars'
import axiosInstance, { fetcher } from 'service/config'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { ICategory, ITaskRequest } from 'types'
import { Box, Text } from 'utils/theme'

type TasksActionsProp = {
    categoryId: string
}

const todayISODate = new Date("2024-04-12").toISOString()


const createTaskRequest = async (
    url: string,
    { arg }: { arg: ITaskRequest }
) => {
    try {
        await axiosInstance.post(url, {
            ...arg,
        })
    } catch (error) {
        console.log("error in createTaskRequest")
        throw error
    }
}

const TasksActions = ({ categoryId }: TasksActionsProp) => {
    const [newTask, setNewTasks] = useState<ITaskRequest>({
        categoryId: categoryId,
        date: todayISODate,
        isCompleted: false,
        name: "",
    })

    const { data, trigger } = useSWRMutation("tasks/create", createTaskRequest)

    const [isSelectingCategory, setIsSelectingCategory] = useState<boolean>(false)
    const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false)

    const today = new Date()

    const { data: categories, isLoading } = useSWR<ICategory[]>(
        "categories",
        fetcher
    )

    if (isLoading || !categories) {
        return <Loader />
    }

    const selectedCategory = categories?.find(
        (_category) => _category._id == newTask.categoryId
    )


    const onCreateTask = async () => {
        try {

            if (newTask.name.length.toString().trim().length > 0) {


                trigger({
                    ...newTask,
                })
                setNewTasks({
                    categoryId: newTask.categoryId,
                    isCompleted: false,
                    date: todayISODate,
                    name: "",

                })
            }


        } catch (error) {
            console.log("error in oncreateTask", error)
            throw error
        }
    };


    return (
        <Box>
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
                    value={newTask.name}
                    onChange={(event) => {
                        const text = event.nativeEvent.text;
                        setNewTasks((prev) => ({
                            ...prev,
                            name: text
                        }));
                    }}
                    onSubmitEditing={onCreateTask}
                />

                <Box flexDirection='row' alignItems='center'>
                    <Pressable
                        onPress={() => {
                            setIsSelectingDate((prev) => !prev)
                        }}
                    >
                        <Box flexDirection="row" alignContent="center" bg="white" p='2' borderRadius="rounded-xl">
                            <Text>
                                {isToday(new Date(newTask.date))
                                    ? "Today"
                                    : format(new Date(newTask.date), "MMM dd")
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
                                            setNewTasks((prev) => {
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
                                                        newTask.categoryId == item._id ? "700" : "400"
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
                            setNewTasks((prev) => {
                                return {
                                    ...prev,
                                    date: selectedDate
                                }
                            })
                        }}
                    />
                </Box >
            )}
        </Box>
    )
}

export default TasksActions