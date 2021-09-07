import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { Something, useStores } from "../../models"
import { color, spacing } from "../../theme"
import { FlatList } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const HEADER_CONTAINER: ViewStyle = {
  marginTop: spacing.huge,
  marginBottom: spacing.medium,
}

const SOMETHING_LIST: ViewStyle = {
  marginBottom: spacing.large,
}

const SOMETHING_WRAPPER: ViewStyle = {
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  paddingVertical: spacing.large,
}

const SOMETHING: TextStyle = {
  fontWeight: "bold",
  fontSize: 16,
  marginVertical: spacing.medium,
}

export const SomethingScreen = observer(function SomethingScreen() {
  const [refreshing, setRefreshing] = useState(false)
  // Pull in one of our MST stores
  const { somethingStore } = useStores()
  const { somethings } = somethingStore

  useEffect(() => {
    fetchSomething()
  }, [])

  const fetchSomething = () => {
    setRefreshing(true)
    somethingStore.loadSomething()
    setRefreshing(false)
  }

  const renderSomething = ({ item }) => {
    const i: Something = item
    return (
      <View style={SOMETHING_WRAPPER}>
        <Text style={SOMETHING} text={i.name} />
      </View>
    )
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={HEADER_CONTAINER}>
        <Text preset="header" tx="somethingScreen.header" />
      </View>
      <FlatList
        style={SOMETHING_LIST}
        data={somethings}
        renderItem={renderSomething}
        extraData={{ extraDataForMobX: somethings.length > 0 ? somethings[0].id : "" }}
        onRefresh={fetchSomething}
        refreshing={refreshing}
      />
    </Screen>
  )
})
