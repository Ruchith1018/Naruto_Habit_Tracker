import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, X } from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  arrowDirection?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  instructor?: {
    name: string;
    emoji: string;
  };
}

interface TutorialOverlayProps {
  visible: boolean;
  currentStep: TutorialStep;
  onNext: () => void;
  onSkip: () => void;
  onClose: () => void;
  totalSteps: number;
  currentStepIndex: number;
}

export function TutorialOverlay({
  visible,
  currentStep,
  onNext,
  onSkip,
  onClose,
  totalSteps,
  currentStepIndex
}: TutorialOverlayProps) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Bouncing arrow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Pulsing highlight animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Sparkle animation for extra magic
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible, bounceAnim, pulseAnim, fadeAnim, sparkleAnim]);

  if (!visible || !currentStep) return null;

  const getArrowStyle = () => {
    if (!currentStep.targetElement || !currentStep.arrowDirection) return {};

    const { x, y, width, height } = currentStep.targetElement;
    const arrowSize = 40;
    
    let arrowX = x + width / 2 - arrowSize / 2;
    let arrowY = y + height / 2 - arrowSize / 2;
    let rotation = '0deg';

    switch (currentStep.arrowDirection) {
      case 'top':
        arrowY = y - arrowSize - 10;
        rotation = '180deg';
        break;
      case 'bottom':
        arrowY = y + height + 10;
        rotation = '0deg';
        break;
      case 'left':
        arrowX = x - arrowSize - 10;
        rotation = '90deg';
        break;
      case 'right':
        arrowX = x + width + 10;
        rotation = '-90deg';
        break;
      case 'top-right':
        arrowX = x + width + 10;
        arrowY = y - arrowSize - 10;
        rotation = '-135deg';
        break;
      case 'bottom-right':
        arrowX = x + width + 10;
        arrowY = y + height + 10;
        rotation = '-45deg';
        break;
    }

    return {
      position: 'absolute' as const,
      left: arrowX,
      top: arrowY,
      transform: [
        { translateY: bounceAnim },
        { rotate: rotation }
      ],
    };
  };

  const getHighlightStyle = () => {
    if (!currentStep.targetElement) return { display: 'none' };

    const { x, y, width, height } = currentStep.targetElement;
    
    return {
      position: 'absolute' as const,
      left: x - 4,
      top: y - 4,
      width: width + 8,
      height: height + 8,
      borderRadius: 12,
      borderWidth: 3,
      borderColor: '#FF6B35',
      transform: [{ scale: pulseAnim }],
    };
  };

  const getSpeechBubblePosition = () => {
    if (!currentStep.targetElement) {
      return {
        bottom: 120,
        left: 20,
        right: 20,
      };
    }

    const { y, height } = currentStep.targetElement;
    const bubbleHeight = 200;
    
    if (y > screenHeight / 2) {
      // Target is in bottom half, show bubble above
      return {
        top: Math.max(60, y - bubbleHeight - 20),
        left: 20,
        right: 20,
      };
    } else {
      // Target is in top half, show bubble below
      return {
        top: y + height + 80,
        left: 20,
        right: 20,
      };
    }
  };

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      {/* Dark overlay with cutout for highlighted element */}
      <View style={styles.darkOverlay} />
      
      {/* Spotlight highlight */}
      {currentStep.targetElement && (
        <Animated.View style={[styles.spotlight, getHighlightStyle()]}>
          {/* Sparkle effects around the highlight */}
          <Animated.View style={[
            styles.sparkle,
            styles.sparkle1,
            { opacity: sparkleAnim }
          ]}>
            <Text style={styles.sparkleText}>✨</Text>
          </Animated.View>
          <Animated.View style={[
            styles.sparkle,
            styles.sparkle2,
            { opacity: sparkleAnim }
          ]}>
            <Text style={styles.sparkleText}>✨</Text>
          </Animated.View>
          <Animated.View style={[
            styles.sparkle,
            styles.sparkle3,
            { opacity: sparkleAnim }
          ]}>
            <Text style={styles.sparkleText}>✨</Text>
          </Animated.View>
        </Animated.View>
      )}

      {/* Bouncing arrow pointer */}
      {currentStep.targetElement && currentStep.arrowDirection && (
        <Animated.View style={getArrowStyle()}>
          <View style={styles.arrow}>
            <Text style={styles.arrowText}>↓</Text>
          </View>
        </Animated.View>
      )}

      {/* Speech bubble with instructor */}
      <View style={[styles.speechBubble, getSpeechBubblePosition()]}>
        {currentStep.instructor && (
          <View style={styles.instructorSection}>
            <Text style={styles.instructorEmoji}>{currentStep.instructor.emoji}</Text>
            <Text style={styles.instructorName}>{currentStep.instructor.name}</Text>
          </View>
        )}
        
        <Text style={styles.tutorialTitle}>{currentStep.title}</Text>
        <Text style={styles.tutorialDescription}>{currentStep.description}</Text>
        
        <View style={styles.progressIndicator}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStepIndex && styles.activeDot,
                index < currentStepIndex && styles.completedDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipText}>Skip Tutorial</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <LinearGradient
              colors={['#FF6B35', '#E55A2B']}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {currentStepIndex === totalSteps - 1 ? 'Finish' : 'Continue'}
              </Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  spotlight: {
    backgroundColor: 'transparent',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  sparkle: {
    position: 'absolute',
  },
  sparkle1: {
    top: -10,
    right: -10,
  },
  sparkle2: {
    bottom: -10,
    left: -10,
  },
  sparkle3: {
    top: '50%',
    right: -15,
  },
  sparkleText: {
    fontSize: 16,
    color: '#F1C40F',
  },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  arrowText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  speechBubble: {
    position: 'absolute',
    backgroundColor: '#34495E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#4A5568',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  instructorSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  instructorEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  instructorName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
  },
  tutorialTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  tutorialDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34495E',
  },
  activeDot: {
    backgroundColor: '#FF6B35',
  },
  completedDot: {
    backgroundColor: '#2ECC71',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
  },
  nextButton: {
    flex: 1,
    marginLeft: 16,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginRight: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});