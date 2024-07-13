
import React from 'react'
import { Box, Text } from '../../utils/theme'
import SafeAreaWraper from '../../src/shared/safe-area-wrapper'
import { CategoriesStackParamList } from 'navigation/types'
import { RouteProp, useRoute } from '@react-navigation/native'
import useSWR from 'swr'
import { fetcher } from 'service/config'
import { ICategory, ITask } from 'types'
import Loader from '@/shared/loader'
import NavigateBack from '@/shared/navigate-back'
import TasksActions from '@/components/tasks/tasks-actions'
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper'
import { FlatList } from 'react-native'
import Task from '@/components/tasks/tasks'



type CategoryScreenRouteProp = RouteProp<CategoriesStackParamList, "Category">;

const CategoryScreen = () => {
    const route = useRoute<CategoryScreenRouteProp>();

    const { id } = route.params;

    const { data: category, isLoading: isLoadingCategory } = useSWR<ICategory>(
        `categories/${id}`,
        fetcher
    );

    console.log('category', JSON.stringify(category, null, 2));

    const {
        data: tasks,
        isLoading: isLoadingTasks,
        mutate: mutateTasks,
    } = useSWR<ITask[]>(`tasks/tasks-by-categories/${id}`, fetcher, {
        refreshInterval: 1000,
    });

    if (isLoadingTasks || isLoadingCategory || !category || !tasks) {
        return <Loader />;
    }

    return (
        <SafeAreaWrapper>
            <Box flex={1} mx="4">
                <Box width={40}>
                    <NavigateBack />
                </Box>
                <Box height={16} />
                <Box flexDirection="row">
                    <Text variant="textXl" fontWeight="700">
                        {category.icon?.symbol ?? 'No icon'}
                    </Text>
                    <Text
                        variant="textXl"
                        fontWeight="700"
                        ml="3"
                        style={{
                            color: category.color.code,
                        }}

                    >
                        {category.name}
                    </Text>
                </Box>
                <Box height={16} />
                <TasksActions categoryId={id} />
                <Box height={16} />
                <FlatList
                    data={tasks}
                    renderItem={({ item, index }) => {
                        return <Task task={item} />
                    }}
                    ItemSeparatorComponent={() => <Box height={14} />}
                />



            </Box>
        </SafeAreaWrapper >
    )
}

export default CategoryScreen;