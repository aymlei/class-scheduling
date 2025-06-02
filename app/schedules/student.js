import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Platform
} from 'react-native';

export default function Student() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Student schedule data
  const studentScheduleData = [
    {
      id: 1,
      schedule: '7:00 AM - 10:00 AM M',
      subject: 'Math',
      modality: 'Onsite',
      teacher: 'Aguirre, Princess Sofia F.',
    },
    {
      id: 2,
      schedule: '10:00 AM - 10:45 AM M',
      subject: 'Filipino',
      modality: 'Onsite',
      teacher: 'San Esteban, Annemony Q.',
    },
    {
      id: 3,
      schedule: '10:45 AM - 1:45 PM W',
      subject: 'Science',
      modality: 'Online',
      teacher: 'Carcullo, Andrei',
    },
    {
      id: 4,
      schedule: '7:00 AM - 10:00 AM Th',
      subject: 'English',
      modality: 'Onsite',
      teacher: 'Tadeo, Angel Marie M.',
    },
  ];

  // Filter and search logic using useMemo for performance
  const filteredScheduleData = useMemo(() => {
    let filtered = studentScheduleData;

    // Apply time filter (AM/PM)
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(item => {
        const scheduleTime = item.schedule.toLowerCase();
        if (selectedFilter === 'AM') {
          // Check if the schedule starts with AM (before the first dash)
          const startTime = scheduleTime.split(' - ')[0];
          return startTime.includes('am');
        } else if (selectedFilter === 'PM') {
          // Check if the schedule starts with PM (before the first dash)
          const startTime = scheduleTime.split(' - ')[0];
          return startTime.includes('pm');
        }
        return true;
      });
    }

    // Apply search filter
    if (searchText.trim() !== '') {
      const searchLower = searchText.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.subject.toLowerCase().includes(searchLower) ||
        item.teacher.toLowerCase().includes(searchLower) ||
        item.modality.toLowerCase().includes(searchLower) ||
        item.schedule.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [studentScheduleData, selectedFilter, searchText]);

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const filterOptions = ['All', 'AM', 'PM'];

  const handleFilterSelect = (option) => {
    setSelectedFilter(option);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Weekly Schedule Section */}
        <View style={styles.weeklyScheduleContainer}>
          <Text style={styles.sectionTitle}>WEEKLY SCHEDULE</Text>
          <Text style={styles.sectionSubtitle}>SECTION ABM - A</Text>
          <View style={styles.weeklyGrid}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>
                <View style={styles.dayContent}>
                  {/* Empty schedule content - can be populated with actual schedule data */}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Search and Filter Section */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={handleSearchChange}
              placeholderTextColor="#999"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.filterContainer}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterButton}
                onPress={() => handleFilterSelect(option)}
              >
                <View style={[
                  styles.radioButton,
                  selectedFilter === option && styles.selectedRadio
                ]} />
                <Text style={[
                  styles.filterText,
                  selectedFilter === option && styles.selectedFilterText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Results Summary */}
        {/* <View style={styles.resultsSummary}>
          <Text style={styles.resultsText}>
            Showing {filteredScheduleData.length} of {studentScheduleData.length} schedules
            {selectedFilter !== 'All' && ` (${selectedFilter} only)`}
            {searchText.trim() !== '' && ` matching "${searchText}"`}
          </Text>
        </View> */}

        {/* Student Schedule Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Schedule</Text>
            <Text style={styles.headerText}>Subject</Text>
            <Text style={styles.headerText}>Modality</Text>
            <Text style={styles.headerText}>Teacher</Text>
          </View>
          
          {filteredScheduleData.length > 0 ? (
            filteredScheduleData.map((item, index) => (
              <View
                key={item.id} 
                style={[
                  styles.tableRow, 
                  index % 2 === 0 && styles.evenRow,
                  index === filteredScheduleData.length - 1 && styles.lastRow
                ]}
              >
                <Text style={styles.cellText}>{item.schedule}</Text>
                <Text style={styles.cellText}>{item.subject}</Text>
                <Text style={styles.cellText}>{item.modality}</Text>
                <Text style={styles.cellText}>{item.teacher}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No schedules found matching your criteria
              </Text>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => {
                  setSearchText('');
                  setSelectedFilter('All');
                }}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Footer Section */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Lucman, Princess Lei V.</Text>
          <Text style={styles.footerSubText}>ABM A - Adviser</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  
  // Weekly Schedule Styles
  weeklyScheduleContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 10,
    marginTop: -10,
    textAlign: 'center',
  },
  weeklyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayContainer: {
    width: '31%',
    marginBottom: 12,
  },
  dayHeader: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  dayText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  dayContent: {
    backgroundColor: 'white',
    height: 100,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#e0e0e0',
  },
  
  // Search and Filter Styles
  searchFilterContainer: {
    marginBottom: 15,
    marginTop: -10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flex: 1,
    marginRight: 15,
    minHeight: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 5,
    marginLeft: 5,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    paddingVertical: 5,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 6,
  },
  selectedRadio: {
    borderColor: '#e74c3c',
    backgroundColor: '#e74c3c',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  selectedFilterText: {
    color: '#e74c3c',
    fontWeight: '600',
  },

  // Results Summary
  resultsSummary: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  
  // Table Styles
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 5,
    marginBottom: 0,
  },
  headerText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'transparent',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  evenRow: {
    backgroundColor: '#f8f9fa',
  },
  cellText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  // No Results Styles
  noResultsContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Footer Styles
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 50,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 1,
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 12,
    color: '#666',
  },
});