import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import { styles } from './styles';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';

interface DiscordModalProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DiscordModal({ discord, onClose, ...rest }: DiscordModalProps) {
  const [isCopping, setIsCopping] = useState<boolean>(false);

  async function handleCopyDiscord() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    ToastAndroid.show('Discord copiado!', 1500);
    setIsCopping(false);
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
              onPress={onClose}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            title="Let's play"
            subtitle="Agora é só começar a jogar"
            style={{ alignItems: 'center', marginTop: 24 }}
          />
          <Text style={styles.label}>Adicione ao discord</Text>

          <TouchableOpacity
            style={styles.discordWrapper}
            onPress={handleCopyDiscord}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
