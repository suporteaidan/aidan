import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { chatMessages } from '@/data/mockScreens';
import { colors, radius } from '@/theme/colors';

export default function AssistantScreen() {
  return (
    <Screen scroll={false} style={styles.screen}>
      <Header
        eyebrow="Assistente"
        title="Aidan"
        description="Conversa simulada para demonstrar a experiência sem backend."
      />

      <View style={styles.chatList}>
        {chatMessages.map((message) => {
          const isUser = message.from === 'user';

          return (
            <View key={message.id} style={[styles.messageRow, isUser && styles.messageRowUser]}>
              <View style={[styles.bubble, isUser ? styles.userBubble : styles.aidanBubble]}>
                <Text style={[styles.messageText, isUser && styles.userMessageText]}>{message.text}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.composer}>
        <TextInput
          editable={false}
          value="Digite uma mensagem..."
          style={styles.input}
        />
        <View style={styles.sendButton}>
          <Ionicons name="send" size={18} color={colors.surface} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 16,
    paddingBottom: 16
  },
  chatList: {
    flex: 1,
    gap: 12
  },
  messageRow: {
    flexDirection: 'row'
  },
  messageRowUser: {
    justifyContent: 'flex-end'
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  aidanBubble: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1
  },
  userBubble: {
    backgroundColor: colors.primary
  },
  messageText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  userMessageText: {
    color: colors.surface
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: 8
  },
  input: {
    flex: 1,
    color: colors.muted,
    fontSize: 15,
    paddingHorizontal: 12
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  }
});
