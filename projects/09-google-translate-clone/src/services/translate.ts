import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'

import { SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language } from '../types.d'

const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY

const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

export async function translate({
  fromLanguage,
  text,
  toLanguage,
}: {
  fromLanguage: FromLanguage,
  text: string,
  toLanguage: Language,
}) {
  if (fromLanguage === toLanguage) return text

  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by`{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      /* Esto es un ejemplo de lo que escribe el usuario para que la AI pueda
      saber con ejemplos que es lo que debe responder: */
      content: `Hola mundo {{Español}} [[English]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      /* Este es un ejemplo de lo que la AI debe responder en base al ejemplo anterior de lo que
      escribe el usuario: */
      content: 'Hello world',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      /* Podemos seguir dandole ejemplos a la AI para que se entrene mejor: */
      content: `How are you? {{auto}} [[Deutsch]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir?',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Bon dia, com estas? {{auto}} [[Español]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Buenos días, ¿cómo estás?',
    },
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: 'user',
        content: `${text} {{${fromCode}}} [[${toCode}]]`,
      }
    ]
  })

  return completion.data.choices[0]?.message?.content
}