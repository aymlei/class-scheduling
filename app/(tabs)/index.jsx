import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, router } from 'expo-router';

export default function App() {
  const handlePress = (option) => {
    console.log(`${option} pressed`);
    
    if (option === 'Admin') {
      router.push('/schedules/admin');
    } else if (option === 'Faculty Schedule') {
      router.push('/schedules/faculty');
    } else if (option === 'Student Schedule') {
      router.push('/schedules/student');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.backButton}>‹</Text>
        <Text style={styles.headerTitle}>Class Schedule</Text>
        <View style={styles.headerIcons}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <Text style={styles.menuIcon}>☰</Text>
        </View>
      </View> */}

      {/* Content */}
      <View style={styles.content}>
        {/* Greeting */}
        <Text style={styles.greeting}>Hello, what brings you here?</Text>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handlePress('Admin')}
          >
            <View style={styles.redBar} />
            <Text style={styles.menuText}>Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handlePress('Faculty Schedule')}
          >
            <View style={styles.redBar} />
            <Text style={styles.menuText}>Faculty Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handlePress('Student Schedule')}
          >
            <View style={styles.redBar} />
            <Text style={styles.menuText}>Student Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </>
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
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 18,
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  greeting: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    fontWeight: '500',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  marginBottom: 15,
  borderRadius: 8,
  paddingVertical: 20,
  paddingHorizontal: 24,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
  height: 70, // Fixed height for consistency
},
redBar: {
  width: 4,
  height: 70, // Match the menuItem height
  backgroundColor: '#e74c3c',
  marginRight: 20,
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  position: 'absolute',
  left: 0,
  top: 0,
},
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});