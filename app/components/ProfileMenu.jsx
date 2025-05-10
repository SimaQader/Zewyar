import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
  
const ProfileMenu = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.profileMenuContainer}>
          {/* User Info */}
          <View style={styles.profileMenuHeader}>
            <Image 
              source={require('../assets/user.png')} 
              style={styles.profileMenuImage} 
            />
            <View style={styles.profileMenuInfo}>
              <Text style={styles.profileMenuName}>Your name</Text>
              <Text style={styles.profileMenuEmail}>yourname@gmail.com</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Menu Items */}
          <TouchableOpacity 
            style={styles.menuItem}
            accessibilityLabel="My Profile"
            accessibilityRole="button"
          >
            <Ionicons name="person-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>My Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" style={styles.menuItemIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            accessibilityLabel="Settings"
            accessibilityRole="button"
          >
            <Ionicons name="settings-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" style={styles.menuItemIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
          >
            <Ionicons name="notifications-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Notification</Text>
            <View style={styles.menuItemRightContent}>
              <Text style={styles.allowText}>Allow</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            accessibilityLabel="Log Out"
            accessibilityRole="button"
          >
            <Ionicons name="log-out-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileMenuContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileMenuImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileMenuInfo: {
    marginLeft: 15,
  },
  profileMenuName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileMenuEmail: {
    fontSize: 14,
    color: '#777',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  menuItemIcon: {
    marginLeft: 'auto',
  },
  menuItemRightContent: {
    marginLeft: 'auto',
  },
  allowText: {
    color: '#777',
    fontSize: 14,
  },
});

export default ProfileMenu; 