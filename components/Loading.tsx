import { View, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import React from 'react'

export default function Loading(props:React.JSX.IntrinsicAttributes&React.JSX.IntrinsicClassAttributes<ActivityIndicator>&Readonly<ActivityIndicatorProps>) {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator {...props}/>
    </View>
  )
}