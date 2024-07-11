import React from 'react';
import { Box, Text } from '../../utils/theme';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import useSWR from 'swr';
import { fetcher } from '../../service/config';
import Loader from '../../src/shared/loader';
import { FlatList } from 'react-native';
import { ICategory } from '../../types';
import Category from '../../src/components/categories/category';
import CreateNewList from '../../src/components/categories/create-new-list';

const CategoriesScreen = () => {
    const { data, isLoading, error } = useSWR("categories", fetcher);

    if (isLoading) {
        return <Loader />;
    }

    const renderItem = ({ item }: { item: ICategory }) => {
        return <Category category={item} />;
    };

    return (
        <SafeAreaWraper>
            <Box flex={1} px='4'>
                <Text variant="textXl">
                    Categories Screen
                </Text>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <Box height={14} />}
                    keyExtractor={(item) => item._id}
                />
                <CreateNewList />
            </Box>
        </SafeAreaWraper>
    );
};

export default CategoriesScreen;