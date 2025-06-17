import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, X, Clock } from 'lucide-react-native';

interface Jutsu {
  id: string;
  name: string;
  description: string;
  effect: string;
  cooldownHours: number;
  lastUsed?: Date;
  unlocked: boolean;
}

interface JutsuActivationProps {
  jutsu: Jutsu;
  onActivate: (jutsuId: string) => void;
  disabled?: boolean;
}

export function JutsuActivation({ jutsu, onActivate, disabled = false }: JutsuActivationProps) {
  const [showModal, setShowModal] = useState(false);
  const [activationAnim] = useState(new Animated.Value(0));

  const isOnCooldown = () => {
    if (!jutsu.lastUsed) return false;
    const now = new Date();
    const cooldownEnd = new Date(jutsu.lastUsed.getTime() + jutsu.cooldownHours * 60 * 60 * 1000);
    return now < cooldownEnd;
  };

  const getCooldownTimeLeft = () => {
    if (!jutsu.lastUsed) return '';
    const now = new Date();
    const cooldownEnd = new Date(jutsu.lastUsed.getTime() + jutsu.cooldownHours * 60 * 60 * 1000);
    const timeLeft = cooldownEnd.getTime() - now.getTime();
    
    if (timeLeft <= 0) return '';
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleActivate = () => {
    if (disabled || isOnCooldown() || !jutsu.unlocked) return;

    // Activation animation
    Animated.sequence([
      Animated.timing(activationAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(activationAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    onActivate(jutsu.id);
    setShowModal(false);
  };

  const getJutsuIcon = (jutsuName: string) => {
    // Return different emojis based on jutsu type
    if (jutsuName.includes('Shadow Clone')) return '👥';
    if (jutsuName.includes('Rasengan')) return '🌀';
    if (jutsuName.includes('Hurricane')) return '🌪️';
    if (jutsuName.includes('Mind Transfer')) return '🧠';
    if (jutsuName.includes('Flicker')) return '⚡';
    return '⚡';
  };

  const canActivate = jutsu.unlocked && !isOnCooldown() && !disabled;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.jutsuCard,
          !jutsu.unlocked && styles.lockedCard,
          isOnCooldown() && styles.cooldownCard,
        ]}
        onPress={() => setShowModal(true)}
        disabled={!jutsu.unlocked}
      >
        <Animated.View
          style={[
            styles.cardContent,
            {
              transform: [{
                scale: activationAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1],
                }),
              }],
            },
          ]}
        >
          <View style={styles.jutsuHeader}>
            <Text style={styles.jutsuIcon}>{getJutsuIcon(jutsu.name)}</Text>
            <View style={styles.jutsuInfo}>
              <Text style={[styles.jutsuName, !jutsu.unlocked && styles.lockedText]}>
                {jutsu.name}
              </Text>
              {isOnCooldown() && (
                <View style={styles.cooldownInfo}>
                  <Clock size={12} color="#F39C12" />
                  <Text style={styles.cooldownText}>{getCooldownTimeLeft()}</Text>
                </View>
              )}
            </View>
            {jutsu.unlocked && (
              <Zap size={20} color={canActivate ? "#F1C40F" : "#7F8C8D"} />
            )}
          </View>
          
          <Text style={[styles.jutsuDescription, !jutsu.unlocked && styles.lockedText]}>
            {jutsu.description}
          </Text>
          
          {!jutsu.unlocked && (
            <Text style={styles.unlockRequirement}>
              Unlock by increasing your stats
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.modalIcon}>{getJutsuIcon(jutsu.name)}</Text>
            <Text style={styles.modalTitle}>{jutsu.name}</Text>
            <Text style={styles.modalDescription}>{jutsu.description}</Text>
            
            <View style={styles.effectContainer}>
              <Text style={styles.effectLabel}>Effect:</Text>
              <Text style={styles.effectText}>{jutsu.effect}</Text>
            </View>

            <View style={styles.cooldownContainer}>
              <Text style={styles.cooldownLabel}>Cooldown: {jutsu.cooldownHours} hours</Text>
            </View>

            {canActivate ? (
              <TouchableOpacity
                style={styles.activateButton}
                onPress={handleActivate}
              >
                <LinearGradient
                  colors={['#F1C40F', '#E67E22']}
                  style={styles.activateGradient}
                >
                  <Zap size={20} color="#FFFFFF" />
                  <Text style={styles.activateText}>Activate Jutsu</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={styles.disabledButton}>
                <Text style={styles.disabledText}>
                  {!jutsu.unlocked ? 'Jutsu Locked' : 
                   isOnCooldown() ? `Cooldown: ${getCooldownTimeLeft()}` : 
                   'Cannot Activate'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  jutsuCard: {
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1C40F',
  },
  lockedCard: {
    backgroundColor: '#2C3E50',
    borderColor: '#4A5568',
    opacity: 0.6,
  },
  cooldownCard: {
    borderColor: '#F39C12',
  },
  cardContent: {
    flex: 1,
  },
  jutsuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  jutsuIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  jutsuInfo: {
    flex: 1,
  },
  jutsuName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#F1C40F',
    marginBottom: 2,
  },
  lockedText: {
    color: '#7F8C8D',
  },
  cooldownInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cooldownText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#F39C12',
    marginLeft: 4,
  },
  jutsuDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  unlockRequirement: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#34495E',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#F1C40F',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  effectContainer: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginBottom: 16,
  },
  effectLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#F1C40F',
    marginBottom: 4,
  },
  effectText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  cooldownContainer: {
    marginBottom: 20,
  },
  cooldownLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  activateButton: {
    width: '100%',
  },
  activateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  activateText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  disabledText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
  },
});