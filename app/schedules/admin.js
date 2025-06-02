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

export default function Admin() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  
  // New state variables for schedule details filtering
  const [detailSearchText, setDetailSearchText] = useState('');
  const [selectedModalityFilter, setSelectedModalityFilter] = useState('All');

  const scheduleData = [
    {
      id: 1,
      subject: 'ABM-A (GRADE 11)',
      adviser: 'Lucman, Princess Lei V.',
      room: 'AMS 203',
      className: 'AM Class',
      schedules: [
        { time: '7:00 AM - 10:00 AM M', subject: 'Math', modality: 'Onsite' },
        { time: '10:00 AM - 10:45 AM M', subject: 'Filipino', modality: 'Onsite' },
        { time: '10:45 AM - 3:45 PM W', subject: 'Science', modality: 'Online' },
        { time: '7:00 AM - 10:00 AM TH', subject: 'English', modality: 'Onsite' },
      ]
    },
    {
      id: 2,
      subject: 'STEM-K (GRADE 12)',
      adviser: 'Aguirre, Princess Sofia F.',
      room: 'AMS 301',
      className: 'PM Class',
      schedules: [
        { time: '1:00 PM - 4:00 PM M', subject: 'Chemistry', modality: 'Onsite' },
        { time: '4:00 PM - 5:00 PM M', subject: 'Physics', modality: 'Online' },
        { time: '1:00 PM - 4:00 PM T', subject: 'Calculus', modality: 'Onsite' },
        { time: '2:00 PM - 5:00 PM F', subject: 'Biology', modality: 'Onsite' },
      ]
    },
    {
      id: 3,
      subject: 'HUMMS-D (GRADE 11)',
      adviser: 'Pornillos, Kyle Josh B.',
      room: 'AMS 201',
      className: 'AM Class',
      schedules: [
        { time: '8:00 AM - 11:00 AM M', subject: 'History', modality: 'Onsite' },
        { time: '11:00 AM - 12:00 PM M', subject: 'Literature', modality: 'Online' },
        { time: '8:00 AM - 11:00 AM W', subject: 'Philosophy', modality: 'Onsite' },
        { time: '9:00 AM - 12:00 PM F', subject: 'Psychology', modality: 'Onsite' },
      ]
    },
    {
      id: 4,
      subject: 'GAS-B (GRADE 11)',
      adviser: 'Reapor, Adrian Joshua M.',
      room: 'AMS 102',
      className: 'PM Class',
      schedules: [
        { time: '1:30 PM - 4:30 PM T', subject: 'Research', modality: 'Online' },
        { time: '2:00 PM - 5:00 PM TH', subject: 'Statistics', modality: 'Onsite' },
        { time: '1:00 PM - 3:00 PM F', subject: 'Economics', modality: 'Onsite' },
      ]
    },
    {
      id: 5,
      subject: 'ABM-M (GRADE 12)',
      adviser: 'Tadeo, Angel Marie',
      room: 'AMS 304',
      className: 'AM Class',
      schedules: [
        { time: '7:30 AM - 10:30 AM M', subject: 'Accounting', modality: 'Onsite' },
        { time: '10:30 AM - 12:00 PM M', subject: 'Business Math', modality: 'Online' },
        { time: '8:00 AM - 11:00 AM W', subject: 'Marketing', modality: 'Onsite' },
        { time: '7:00 AM - 10:00 AM F', subject: 'Entrepreneurship', modality: 'Onsite' },
      ]
    },
  ];

  // Filter and search logic using useMemo for performance
  const filteredScheduleData = useMemo(() => {
    let filtered = scheduleData;

    // Apply time filter (AM/PM) based on className
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(item => {
        const className = item.className.toLowerCase();
        if (selectedFilter === 'AM') {
          return className.includes('am');
        } else if (selectedFilter === 'PM') {
          return className.includes('pm');
        }
        return true;
      });
    }

    // Apply search filter
    if (searchText.trim() !== '') {
      const searchLower = searchText.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.subject.toLowerCase().includes(searchLower) ||
        item.adviser.toLowerCase().includes(searchLower) ||
        item.room.toLowerCase().includes(searchLower) ||
        item.className.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [scheduleData, selectedFilter, searchText]);

  // New useMemo for filtering schedule details
  const filteredScheduleDetails = useMemo(() => {
    if (!selectedSchedule) return [];
    
    let filtered = selectedSchedule.schedules;

    // Apply modality filter
    if (selectedModalityFilter !== 'All') {
      filtered = filtered.filter(schedule => 
        schedule.modality.toLowerCase() === selectedModalityFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (detailSearchText.trim() !== '') {
      const searchLower = detailSearchText.toLowerCase().trim();
      filtered = filtered.filter(schedule => 
        schedule.subject.toLowerCase().includes(searchLower) ||
        schedule.time.toLowerCase().includes(searchLower) ||
        schedule.modality.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [selectedSchedule, selectedModalityFilter, detailSearchText]);

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const filterOptions = ['All', 'AM', 'PM'];
  const modalityOptions = ['All', 'Online', 'Onsite'];

  const handleSchedulePress = (item) => {
    setSelectedSchedule(item);
    console.log(`Selected schedule: ${item.subject}`);
  };

  const handleFilterSelect = (option) => {
    setSelectedFilter(option);
  };

  const handleModalityFilterSelect = (option) => {
    setSelectedModalityFilter(option);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleDetailSearchChange = (text) => {
    setDetailSearchText(text);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const clearDetailSearch = () => {
    setDetailSearchText('');
  };

  const handleCloseSchedule = () => {
    setSelectedSchedule(null);
    // Reset detail filters when closing
    setDetailSearchText('');
    setSelectedModalityFilter('All');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Weekly Schedule Section */}
        <View style={styles.weeklyScheduleContainer}>
          <Text style={styles.sectionTitle}>WEEKLY SCHEDULE</Text>
          <View style={styles.weeklyGrid}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>
                <View style={styles.dayContent}>
                  {/* Empty schedule content */}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Red Header Section (like in the image) */}
        {selectedSchedule && (
          <View style={styles.selectedHeader}>
            <Text style={styles.selectedHeaderText}>
              {selectedSchedule.subject.split('(')[0].trim()}
            </Text>
            <Text style={styles.selectedSubText}>
              {selectedSchedule.room} | {selectedSchedule.className}
            </Text>
          </View>
        )}

        {/* Dynamic Search and Filter Section with conditional spacing */}
        <View style={[
          styles.searchFilterContainer,
          selectedSchedule && styles.searchFilterContainerWithHeader
        ]}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder={selectedSchedule ? "Search" : "Search"}
              value={selectedSchedule ? detailSearchText : searchText}
              onChangeText={selectedSchedule ? handleDetailSearchChange : handleSearchChange}
              placeholderTextColor="#999"
            />
            {(selectedSchedule ? detailSearchText.length > 0 : searchText.length > 0) && (
              <TouchableOpacity 
                onPress={selectedSchedule ? clearDetailSearch : clearSearch} 
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.filterContainer}>
            {(selectedSchedule ? modalityOptions : filterOptions).map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterButton}
                onPress={() => selectedSchedule ? handleModalityFilterSelect(option) : handleFilterSelect(option)}
              >
                <View style={[
                  styles.radioButton,
                  (selectedSchedule ? selectedModalityFilter : selectedFilter) === option && styles.selectedRadio
                ]} />
                <Text style={[
                  styles.filterText,
                  (selectedSchedule ? selectedModalityFilter : selectedFilter) === option && styles.selectedFilterText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Conditional rendering: Class Schedules OR Schedule Details */}
        {!selectedSchedule ? (
          // Class Schedules Section
          <View style={styles.classSchedulesContainer}>
            <Text style={styles.sectionTitle}>CLASS SCHEDULES</Text>
            <View style={styles.redLine} />
            
            {/* Additional container for schedule items */}
            <View style={styles.scheduleItemsContainer}>
              {filteredScheduleData.length > 0 ? (
                filteredScheduleData.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.scheduleItem}
                    onPress={() => handleSchedulePress(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.scheduleRedBar} />
                    <View style={styles.scheduleContent}>
                      <Text style={styles.subjectText}>{item.subject}</Text>
                      <Text style={styles.adviserText}>Adviser: {item.adviser}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>
                    No class schedules found matching your criteria
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
          </View>
        ) : (
          // Schedule Details Section (replaces Class Schedules)
          <View style={styles.scheduleDetailsWrapper}>
            {/* Schedule Table */}
            <View style={styles.scheduleDetailsContainer}>
              <View style={styles.scheduleTableHeader}>
                <Text style={styles.tableHeaderText}>Schedule</Text>
                <Text style={styles.tableHeaderText}>Subject</Text>
                <Text style={styles.tableHeaderText}>Modality</Text>
              </View>
              
              {filteredScheduleDetails.length > 0 ? (
                filteredScheduleDetails.map((schedule, index) => (
                  <View key={index} style={styles.scheduleRow}>
                    <Text style={styles.scheduleTimeText}>{schedule.time}</Text>
                    <Text style={styles.scheduleSubjectText}>{schedule.subject}</Text>
                    <Text style={styles.scheduleModalityText}>{schedule.modality}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>
                    No schedule details found matching your criteria
                  </Text>
                  <TouchableOpacity 
                    style={styles.resetButton}
                    onPress={() => {
                      setDetailSearchText('');
                      setSelectedModalityFilter('All');
                    }}
                  >
                    <Text style={styles.resetButtonText}>Reset Filters</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Adviser Section - Now Outside the Table */}
            <View style={styles.adviserSection}>
              <View style={styles.adviserInfoContainer}>
                <Text style={styles.adviserLabel}>
                  {selectedSchedule.adviser}
                </Text>
                <Text style={styles.adviserRole}>
                  {selectedSchedule.subject.split('(')[0].trim()} - Adviser
                </Text>
              </View>
            </View>

            {/* Close Button at Bottom */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseSchedule}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
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
    marginBottom: 15,
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

  // Selected Header Styles (Red banner like in image)
  selectedHeader: {
    backgroundColor: '#e74c3c',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 0, // Remove bottom margin to control spacing with next element
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  selectedHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedSubText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    opacity: 0.9,
  },
  
  // Search and Filter Styles with conditional spacing
  searchFilterContainer: {
    marginBottom: 25,
    marginTop: -10, // Default spacing
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  // New style for when selectedHeader is present
  searchFilterContainerWithHeader: {
    marginTop: 20, // Increased spacing when red header is present
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
  
  // Class Schedules Styles
  classSchedulesContainer: {
    marginBottom: 30,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
  },
  scheduleItemsContainer: {
    borderRadius: 12,
    padding: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  selectedScheduleItem: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  scheduleRedBar: {
    width: 4,
    backgroundColor: '#666',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  selectedRedBar: {
    backgroundColor: '#e74c3c',
  },
  scheduleContent: {
    flex: 1,
    paddingLeft: 16,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  adviserText: {
    fontSize: 14,
    color: '#666',
  },
  redLine: {
    height: 2,
    backgroundColor: '#e74c3c',
    marginBottom: 15,
    width: 300,
    alignSelf: 'center',
    borderRadius: 1,
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

  // Schedule Details Table Styles
  scheduleDetailsWrapper: {
    marginBottom: 30,
  },
  scheduleDetailsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scheduleTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d63031',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  scheduleRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scheduleTimeText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  scheduleSubjectText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  scheduleModalityText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  
  // Enhanced Adviser Section Styles - Now Outside Table
  adviserSection: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 5,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 1,
  },
  adviserInfoContainer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  adviserLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  adviserRole: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});