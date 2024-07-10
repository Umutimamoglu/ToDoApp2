
import React, { Children, ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type SafeAreaWraperProps = {
    children: ReactNode
}

const SafeAreaWraper = ({ children }: SafeAreaWraperProps) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            {children}
        </SafeAreaView>
    )
}

export default SafeAreaWraper

