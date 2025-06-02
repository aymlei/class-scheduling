import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput
} from 'react-native';

export default function Faculty() {
  const [selectedGradeLevel, setSelectedGradeLevel] = useState('All');
  const [selectedStrand, setSelectedStrand] = useState('All');
  const [gradeLevelDropdownOpen, setGradeLevelDropdownOpen] = useState(false);
  const [strandDropdownOpen, setStrandDropdownOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  
  // Search and filter states for detailed schedule view
  const [searchText, setSearchText] = useState('');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('All');

  // Faculty section schedule data with adviser information
  const sectionScheduleData = [
    {
      id: 1,
      section: 'ABM-A (GRADE 11)',
      subject: 'General Mathematics',
      adviser: 'Lucman, Princess Lei V.',
    },
    {
      id: 2,
      section: 'STEM-K (GRADE 12)',
      subject: 'Science',
      adviser: 'Aguirre, Princess Sofia F.',
    },
    {
      id: 3,
      section: 'HUMMS-D (GRADE 11)',
      subject: 'English',
      adviser: 'Pornillos, Kyle Josh B.',
    },
  ];

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const gradeLevelOptions = ['All', '11', '12'];
  const strandOptions = ['All', 'ABM', 'STEM', 'GAS', 'TVL', 'HUMMS'];
  const timeFilterOptions = ['All', 'AM', 'PM'];

  // Helper function to extract start time and determine AM/PM
  const getStartTimeCategory = (timeString) => {
    // Extract the start time from strings like "7:00 AM - 10:00 AM M" or "10:45 AM - 1:45 PM W"
    const timeMatch = timeString.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
    if (timeMatch) {
      const startTime = timeMatch[1].trim().toLowerCase();
      return startTime.includes('am') ? 'AM' : 'PM';
    }
    return null;
  };

  // Filter main section list based on dropdowns
  const filteredSectionData = useMemo(() => {
    let filtered = sectionScheduleData;

    // Filter by grade level
    if (selectedGradeLevel !== 'All') {
      filtered = filtered.filter(item => 
        item.section.includes(`GRADE ${selectedGradeLevel}`)
      );
    }

    // Filter by strand
    if (selectedStrand !== 'All') {
      filtered = filtered.filter(item => 
        item.section.toUpperCase().includes(selectedStrand.toUpperCase())
      );
    }

    return filtered;
  }, [sectionScheduleData, selectedGradeLevel, selectedStrand]);

  // Filter detailed schedule based on search and time filter
  const filteredScheduleData = useMemo(() => {
    if (!selectedSection || !selectedSection.schedule) return [];

    let filtered = selectedSection.schedule;

    // Apply time filter (AM/PM) based on start time
    if (selectedTimeFilter !== 'All') {
      filtered = filtered.filter(item => {
        const startTimeCategory = getStartTimeCategory(item.time);
        return startTimeCategory === selectedTimeFilter;
      });
    }

    // Apply search filter
    if (searchText.trim() !== '') {
      const searchLower = searchText.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.subject.toLowerCase().includes(searchLower) ||
        item.modality.toLowerCase().includes(searchLower) ||
        item.time.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [selectedSection, selectedTimeFilter, searchText]);

  const handleSchedulePress = (item) => {
    // Create section data structure that matches what facultySchedule expects
    const sectionData = {
      sectionCode: item.section,
      grade: item.section.includes('GRADE 11') ? 'Grade 11' : 'Grade 12',
      classType: item.section.split('-')[0], // ABM, STEM, HUMMS, etc.
      schedule: [
        // Sample schedule data with mixed AM/PM times
        { time: '7:00 AM - 10:00 AM M', subject: 'Mathematics', modality: 'Onsite' },
        { time: '10:00 AM - 1:00 PM M', subject: 'English', modality: 'Online' },
        { time: '10:45 AM - 1:45 PM W', subject: 'Science', modality: 'Onsite' },
        { time: '11:30 AM - 2:30 PM Th', subject: 'History', modality: 'Online' },
        { time: '10:45 AM - 1:45 PM S', subject: 'Physical Education', modality: 'Onsite' },
        { time: '2:00 PM - 5:00 PM F', subject: 'Art', modality: 'Online' },
        { time: '1:00 PM - 4:00 PM T', subject: 'Filipino', modality: 'Onsite' },
      ],
      adviser: item.adviser, // Use the adviser from the selected item
      adviserTitle: 'Class Adviser'
    };
    setSelectedSection(sectionData);
    // Reset search and filters when opening new section
    setSearchText('');
    setSelectedTimeFilter('All');
  };

  const handleBackToFaculty = () => {
    setSelectedSection(null);
    setSearchText('');
    setSelectedTimeFilter('All');
  };

  const handleGradeLevelSelect = (option) => {
    setSelectedGradeLevel(option);
    setGradeLevelDropdownOpen(false);
  };

  const handleStrandSelect = (option) => {
    setSelectedStrand(option);
    setStrandDropdownOpen(false);
  };

  const handleTimeFilterSelect = (option) => {
    setSelectedTimeFilter(option);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const closeAllDropdowns = () => {
    setGradeLevelDropdownOpen(false);
    setStrandDropdownOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Weekly Schedule Section - Always visible */}
        <View style={styles.weeklyScheduleContainer}>
          <Text style={styles.sectionTitle}>WEEKLY SCHEDULE</Text>
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

        {/* Red Header Section (copied from Admin.js) */}
        {selectedSection && (
          <View style={styles.selectedHeader}>
            <Text style={styles.selectedHeaderText}>
              {selectedSection.sectionCode.split('(')[0].trim()}
            </Text>
            <Text style={styles.selectedSubText}>
              {selectedSection.grade} | {selectedSection.classType}
            </Text>
          </View>
        )}

        {/* Conditional rendering based on selected section */}
        {selectedSection ? (
          // Show detailed schedule for selected section
          <View style={styles.detailedScheduleContent}>
            {/* Search and Filter Section with conditional spacing */}
            <View style={[
              styles.searchFilterContainer,
              selectedSection && styles.searchFilterContainerWithHeader
            ]}>
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
                {timeFilterOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.filterButton}
                    onPress={() => handleTimeFilterSelect(option)}
                  >
                    <View style={[
                      styles.radioButton,
                      selectedTimeFilter === option && styles.selectedRadio
                    ]} />
                    <Text style={[
                      styles.filterText,
                      selectedTimeFilter === option && styles.selectedFilterText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Schedule Table */}
            <View style={styles.scheduleTable}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <View style={styles.tableHeaderCell}>
                  <Text style={styles.tableHeaderText}>Schedule</Text>
                </View>
                <View style={styles.tableHeaderCell}>
                  <Text style={styles.tableHeaderText}>Subject</Text>
                </View>
                <View style={styles.tableHeaderCell}>
                  <Text style={styles.tableHeaderText}>Modality</Text>
                </View>
              </View>

              {/* Table Rows */}
              {filteredScheduleData.length > 0 ? (
                filteredScheduleData.map((item, index) => (
                  <View key={index} style={[
                    styles.tableRow,
                    index === filteredScheduleData.length - 1 && styles.lastRow
                  ]}>
                    <View style={styles.tableCell}>
                      <Text style={styles.tableCellText}>{item.time}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.tableCellText}>{item.subject}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={[
                        styles.tableCellText,
                        item.modality === 'Online' ? styles.onlineText : styles.onsiteText
                      ]}>
                        {item.modality}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>
                    No classes found matching your criteria
                  </Text>
                  <TouchableOpacity 
                    style={styles.resetButton}
                    onPress={() => {
                      setSearchText('');
                      setSelectedTimeFilter('All');
                    }}
                  >
                    <Text style={styles.resetButtonText}>Reset Filters</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Adviser Information */}
            <View style={styles.adviserContainer}>
              <Text style={styles.adviserName}>{selectedSection.adviser}</Text>
              <Text style={styles.adviserTitle}>{selectedSection.adviserTitle}</Text>
            </View>

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleBackToFaculty}>
              <Text style={styles.backButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Show main faculty view with dropdowns and section list
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={closeAllDropdowns}
            style={styles.mainContent}
          >
            {/* Dropdown Filter Section */}
            <View style={styles.dropdownFilterContainer}>
              {/* Grade Level Dropdown */}
              <View style={styles.dropdownInlineWrapper}>
                <Text style={styles.dropdownInlineTitle}>Grade Level:</Text>
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={[
                      styles.dropdownInline,
                      gradeLevelDropdownOpen && styles.dropdownOpen
                    ]}
                    onPress={() => {
                      setGradeLevelDropdownOpen(!gradeLevelDropdownOpen);
                      setStrandDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownValue}>{selectedGradeLevel}</Text>
                    <Text style={[
                      styles.dropdownArrow,
                      gradeLevelDropdownOpen && styles.dropdownArrowOpen
                    ]}>▼</Text>
                  </TouchableOpacity>
                  
                  {gradeLevelDropdownOpen && (
                    <View style={styles.dropdownOptions}>
                      {gradeLevelOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.dropdownOption,
                            selectedGradeLevel === option && styles.selectedDropdownOption
                          ]}
                          onPress={() => handleGradeLevelSelect(option)}
                        >
                          <Text style={[
                            styles.dropdownOptionText,
                            selectedGradeLevel === option && styles.selectedDropdownOptionText
                          ]}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
              
              {/* Strand Dropdown */}
              <View style={styles.dropdownInlineWrapper}>
                <Text style={styles.dropdownInlineTitle}>Strand:</Text>
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={[
                      styles.dropdownInline,
                      strandDropdownOpen && styles.dropdownOpen
                    ]}
                    onPress={() => {
                      setStrandDropdownOpen(!strandDropdownOpen);
                      setGradeLevelDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownValue}>{selectedStrand}</Text>
                    <Text style={[
                      styles.dropdownArrow,
                      strandDropdownOpen && styles.dropdownArrowOpen
                    ]}>▼</Text>
                  </TouchableOpacity>
                  
                  {strandDropdownOpen && (
                    <View style={styles.dropdownOptions}>
                      {strandOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.dropdownOption,
                            selectedStrand === option && styles.selectedDropdownOption
                          ]}
                          onPress={() => handleStrandSelect(option)}
                        >
                          <Text style={[
                            styles.dropdownOptionText,
                            selectedStrand === option && styles.selectedDropdownOptionText
                          ]}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Section Schedules */}
            <View style={styles.classSchedulesContainer}>
              <Text style={styles.sectionTitle}>SECTION SCHEDULE</Text>
              <View style={styles.redLine} />
              
              {/* Additional container for schedule items */}
              <View style={styles.scheduleItemsContainer}>
                {filteredSectionData.length > 0 ? (
                  filteredSectionData.map((item) => (
                    <TouchableOpacity 
                      key={item.id} 
                      style={styles.scheduleItem}
                      onPress={() => handleSchedulePress(item)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.scheduleRedBar} />
                      <View style={styles.scheduleContent}>
                        <Text style={styles.sectionMainText}>{item.section}</Text>
                        <Text style={styles.subjectSmallText}>{item.subject}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.noSectionsContainer}>
                    <Text style={styles.noSectionsText}>
                      No sections found matching the selected filters
                    </Text>
                    <TouchableOpacity 
                      style={styles.resetMainButton}
                      onPress={() => {
                        setSelectedGradeLevel('All');
                        setSelectedStrand('All');
                      }}
                    >
                      <Text style={styles.resetMainButtonText}>Reset Filters</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
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
  mainContent: {
    flex: 1,
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

  // Selected Header Styles (copied from Admin.js)
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
  
  // Dropdown Filter Styles
  dropdownFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 5,
    zIndex: 1000,
    gap: 15,
  },
  dropdownInlineWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownInlineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
    minWidth: 80,
  },
  dropdownContainer: {
    position: 'relative',
    flex: 1,
  },
  dropdownInline: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: '#ccc',
  },
  dropdownValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
    transform: [{ rotate: '0deg' }],
  },
  dropdownArrowOpen: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#e0e0e0',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1001,
  },
  dropdownOption: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedDropdownOption: {
    backgroundColor: '#f8f8f8',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedDropdownOptionText: {
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  
  // Faculty Schedule Styles
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
  scheduleContent: {
    flex: 1,
    paddingLeft: 16,
  },
  redLine: {
    height: 2,
    backgroundColor: '#e74c3c',
    marginBottom: 15,
    width: 300,
    alignSelf: 'center',
    borderRadius: 1,
  },
  sectionMainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subjectSmallText: {
    fontSize: 14,
    color: '#666',
  },

  // No Sections State
  noSectionsContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  noSectionsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  resetMainButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetMainButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Detailed Schedule Styles
  detailedScheduleContent: {
    flex: 1,
  },
  
  // Search and Filter Styles with conditional spacing (copied from Admin.js)
  searchFilterContainer: {
    marginBottom: 25,
    marginTop: -10, // Default spacing
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  // New style for when selectedHeader is present (copied from Admin.js)
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
  
  // Schedule Table
  scheduleTable: {
    backgroundColor: 'white',
    borderRadius: 12,
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
    paddingVertical: 15,
  },
  tableHeaderCell: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tableHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tableCellText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
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

  // Adviser Information
  adviserContainer: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  adviserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  adviserTitle: {
    fontSize: 12,
    color: '#666',
  },

  // Back Button
  backButton: {
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
    marginBottom: 50,
  },
  backButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});