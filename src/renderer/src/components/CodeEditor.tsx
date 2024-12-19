// CodeEditorWindow.js
// import '../lib/loadMonaco'
import React, { useRef, useState } from 'react'
// import Editor, { OnMount } from '@monaco-editor/react'
import { Center, Loader } from '@mantine/core'
import { AutoTypings, LocalStorageCache } from 'monaco-editor-auto-typings'

interface CodeEditorWindowProps {
  onChange: (type: 'code', value: string) => void
  code: string
  language: string
  theme: string
  beforeMount?: (monaco: Monaco) => void
}
type Monaco = typeof import('monaco-editor')
type CodeEditor = Parameters<OnMount>[0]

// extra libraries
var libSource = [
  `declare type Song = {
    /**
     * The song's id in the Peepo Sing's Database.
     */
    id: number
    title: string
    artist: string
    album?: string
    thumbnail?: string
    duration: number
    path: string
    in: number
    out: number
    muid?: string
    mood: Mood[]
  }`,
  `declare type Mood = {
    id: number
    name: string
    color: string
    icon: string
  }`,
].join('\n')
var libUri = 'ts:filename/PeepoSings.d.ts'
export default function CodeEditorWindow({ onChange, language, code, theme }: CodeEditorWindowProps) {
  const [value, setValue] = useState(code || '')
  const monacoRef = useRef<CodeEditor>(null!)

  function handleEditorWillMount(monaco: Monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    if (!monaco) return
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ES2015,
      lib: ['es2015', 'dom'],
    })
    monaco.languages.typescript.typescriptDefaults.addExtraLib(libSource, libUri)
    if (!monaco.editor.getModel(monaco.Uri.parse(libUri))) monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri))
  }

  async function handleEditorDidMount(editor: CodeEditor, monaco: Monaco) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor
    if (editor.getModel().getLanguageId() === 'typescript') {
      const autoTypings = await AutoTypings.create(editor, {
        sourceCache: new LocalStorageCache(), // Cache loaded sources in localStorage. May be omitted
        // Other options...
        monaco,
      })
    }
  }

  const handleEditorChange = (value: string) => {
    setValue(value)
    onChange('code', value)
  }

  return (
    <Editor
      loading={
        <Center className="w-full h-full">
          <Loader color="green" />
        </Center>
      }
      language={language || 'typescript'}
      value={value}
      theme={theme}
      wrapperProps={{ style: { minHeight: '57vh', height: '100%' } }}
      onChange={handleEditorChange}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      overrideServices={{}}
      options={{
        'semanticHighlighting.enabled': true,
        acceptSuggestionOnEnter: 'smart',
        autoIndent: 'advanced',
        formatOnPaste: true,
        formatOnType: true,
        cursorSmoothCaretAnimation: true,
        fontFamily: '"Fira Code NF", JetBrains Mono',
        fontLigatures: true,
        experimental: {
          stickyScroll: {
            enabled: true,
          },
        },
      }}
    />
  )
}
