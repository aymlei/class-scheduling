import { Stack, router } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';

export default function RootLayout() {
  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/index');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar Configuration */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Global Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButtonContainer}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Class Schedule</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Stack */}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="(tabs)/index" 
          options={{ 
            headerShown: false,
            title: 'Home'
          }} 
        />
        <Stack.Screen 
          name="schedules/admin" 
          options={{ 
            headerShown: false,
            title: 'Admin'
          }} 
        />
        <Stack.Screen 
          name="schedules/faculty" 
          options={{ 
            headerShown: false,
            title: 'Faculty Schedule'
          }} 
        />
        <Stack.Screen 
          name="schedules/student" 
          options={{ 
            headerShown: false,
            title: 'Student Schedule'
          }} 
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButtonContainer: {
    padding: 5,
    borderRadius: 20,
  },
  backButton: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'left',
    marginHorizontal: 20,
    marginTop: 8,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
  },
  notificationIcon: {
    fontSize: 18,
    color: '#333',
  },
  menuIcon: {
    fontSize: 18,
    color: '#333',
  },
});