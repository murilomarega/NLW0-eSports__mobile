import { GameController } from 'phosphor-react-native';
import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DiscordModal } from '../DiscordModal';
import { DuoInfo } from '../DuiInfo';
import { styles } from './styles';

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDay: Array<string>;
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
}

export function DuoCard({ data }: Props) {
  const [loadingDiscord, setLoadingDiscord] = useState<boolean>(false);
  const [discordId, setDiscordId] = useState<string>('');

  async function getDiscordUser() {
    setLoadingDiscord(true);
    fetch(`http://192.168.3.4:3333/ads/${data.id}/discord`)
      .then((response) => response.json())
      .then((data) => {
        setDiscordId(data.discord);
        setLoadingDiscord(false);
      });
  }

  return (
    <View style={styles.container}>
      <DuoInfo label="nome" value={data.name} />
      <DuoInfo
        label="Tempo de jogo"
        value={`${data.yearsPlaying} ano${data.yearsPlaying > 1 ? 's' : ''}`}
      />

      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDay.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Chamada de aúdio"
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={getDiscordUser}
        disabled={loadingDiscord}
      >
        {loadingDiscord ? (
          <ActivityIndicator color={THEME.COLORS.TEXT} />
        ) : (
          <>
            <GameController color={THEME.COLORS.TEXT} size={20} />
            <Text style={styles.buttonTitle}>Conectar</Text>
          </>
        )}
      </TouchableOpacity>

      <DiscordModal
        visible={discordId !== ''}
        discord={discordId}
        onClose={() => setDiscordId('')}
      />
    </View>
  );
}
