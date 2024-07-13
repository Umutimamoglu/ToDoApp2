import { ITask } from "types"
import { Box, Text } from "utils/theme"
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Pressable } from "react-native";
import useSWRMutation from "swr/mutation";
import axiosInstance, { fetcher } from "service/config";


const iconSize: 24 | 32 | 48 | 64 | 96 | 128 = 24;

type TaskProps = {
    task: ITask
}
interface ITaskStatusRequest {
    id: string
    isComplated: Boolean
}

const toogleTaskStatusRequest = async (
    url: string,
    { arg }: { arg: ITaskStatusRequest }
) => {
    try {
        await axiosInstance.put(url + "/" + arg.id, {
            ...arg,
        })
    } catch (error) {
        console.log("error in togleRequest", error)
        throw error
    }
}




const Task = ({ task }: TaskProps) => {

    const { trigger } = useSWRMutation("tasks/update", toogleTaskStatusRequest)

    const toggleTaskStatus = async () => {
        try {
            const _updateTask = {
                id: task._id,
                isComplated: !task.isCompleted
            }
            await trigger(_updateTask)
        } catch (error) {
            console.log("error in toggleTaskStatus", error)
            throw error
        }
    }

    return (
        <Pressable onPress={toggleTaskStatus}>
            <Box p="4" bg="lightGray" borderRadius="rounded-5xl" flexDirection="row">
                <Box flexDirection="row" alignItems="center">
                    <Box
                        height={25}
                        width={26}
                        bg={task.isCompleted ? "gray9" : "gray300"} borderRadius="rounded-xl"
                        alignItems="center"
                        justifyContent="center" >
                        <FontAwesomeIcon icon={faCheck} size={iconSize} color="white" />
                    </Box>
                    <Text ml="3" variant="textXl">{task.name}
                    </Text>
                </Box>
                <Box></Box>
            </Box>
        </Pressable>
    )
}

export default Task