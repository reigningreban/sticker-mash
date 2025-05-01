import React, { PropsWithChildren } from 'react'
import { Modal, ModalBaseProps, StyleSheet, View, Text } from 'react-native'
import { IconButton } from './IconButton'
import { colors, commonStyles } from '@/styles/common-styles'

export interface ModalProps extends PropsWithChildren, ModalBaseProps {
  isVisible: boolean
  onClose: () => void
  title: string
}

function ModalWrapper({
  children,
  transparent = true,
  onClose,
  isVisible,
  title,
}: ModalProps) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={transparent}
        visible={isVisible}
      >
        <View style={styles.container}>
          <View style={styles.titleBar}>
            <View style={[commonStyles.container, styles.titleContainer]}>
              <Text style={styles.titleText}>{title}</Text>
              <IconButton icon="close" iconSize={22} onPress={onClose} />
            </View>
          </View>
          <View style={commonStyles.container}>{children}</View>
        </View>
      </Modal>
    </View>
  )
}

export { ModalWrapper as Modal }

const styles = StyleSheet.create({
  modal: { margin: 0 },
  container: {
    height: '25%',
    width: '100%',
    backgroundColor: colors.secondary,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  titleBar: {
    backgroundColor: colors.tertiary,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
  },
  titleText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
})
