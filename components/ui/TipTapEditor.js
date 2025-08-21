import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Undo, 
  Redo, 
  Image as ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Highlighter
} from 'lucide-react'

const TipTapEditor = ({ 
  content = '', 
  onChange, 
  placeholder = 'Escribe aquí...',
  className = '',
  readOnly = false 
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showColorPicker && !event.target.closest('.color-picker-container')) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Highlight,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editable: !readOnly,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML())
      }
    },
  })

  if (!editor || !isMounted) {
    return (
      <div className={`tiptap-editor ${className}`}>
        <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
          <div className="text-gray-500">Cargando editor...</div>
        </div>
      </div>
    )
  }

  const addImage = () => {
    const url = window.prompt('URL de la imagen:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL del enlace:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const fontSizeOptions = [
    { label: 'Pequeño', value: '12px' },
    { label: 'Normal', value: '14px' },
    { label: 'Mediano', value: '16px' },
    { label: 'Grande', value: '18px' },
    { label: 'Muy Grande', value: '20px' },
    { label: 'Título', value: '24px' },
    { label: 'Subtítulo', value: '30px' },
  ]

  const colorOptions = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
    '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
    '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
  ]

  const handleFontSizeChange = (size) => {
    if (size) {
      // Usar document.execCommand como fallback
      document.execCommand('fontSize', false, '7')
      const selection = window.getSelection()
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const span = document.createElement('span')
        span.style.fontSize = size
        range.surroundContents(span)
      }
    }
  }

  const handleColorChange = (color) => {
    // Usar document.execCommand como fallback
    document.execCommand('foreColor', false, color)
  }

  return (
    <div className={`tiptap-editor ${className}`}>
      {/* Toolbar */}
      {!readOnly && (
        <div className="bg-white border border-gray-200 rounded-t-lg p-2 flex flex-wrap gap-1 items-center">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Negrita"
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Cursiva"
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Subrayado"
            >
              <UnderlineIcon size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('strike') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Tachado"
            >
              <Strikethrough size={16} />
            </button>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <select
              onChange={(e) => handleFontSizeChange(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
              title="Tamaño de texto"
            >
              <option value="">Tamaño</option>
              {fontSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Text Alignment */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Alinear izquierda"
            >
              <AlignLeft size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Centrar"
            >
              <AlignCenter size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Alinear derecha"
            >
              <AlignRight size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Justificar"
            >
              <AlignJustify size={16} />
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Lista con viñetas"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Lista numerada"
            >
              <ListOrdered size={16} />
            </button>
          </div>

          {/* Quote and Code */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Cita"
            >
              <Quote size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('codeBlock') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Bloque de código"
            >
              <Code size={16} />
            </button>
          </div>

          {/* Media */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <button
              onClick={addImage}
              className="p-2 rounded hover:bg-gray-100 text-gray-600"
              title="Insertar imagen"
            >
              <ImageIcon size={16} />
            </button>
            <button
              onClick={setLink}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Insertar enlace"
            >
              <LinkIcon size={16} />
            </button>
          </div>

          {/* Colors */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <div className="relative color-picker-container">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className={`p-2 rounded hover:bg-gray-100 ${showColorPicker ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                title="Color de texto"
              >
                <Palette size={16} />
              </button>
              {showColorPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg p-2 shadow-lg z-10">
                  <div className="grid grid-cols-10 gap-1">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          handleColorChange(color)
                          setShowColorPicker(false)
                        }}
                        className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('highlight') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              title="Resaltar"
            >
              <Highlighter size={16} />
            </button>
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-2 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Deshacer"
            >
              <Undo size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-2 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Rehacer"
            >
              <Redo size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="bg-white border border-gray-200 rounded-b-lg">
        <EditorContent 
          editor={editor} 
          className={`prose max-w-none p-4 min-h-[200px] focus:outline-none ${readOnly ? 'bg-gray-50' : ''}`}
          style={{
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
            '--tw-prose-links': 'inherit',
            '--tw-prose-bold': 'inherit',
            '--tw-prose-counters': 'inherit',
            '--tw-prose-bullets': 'inherit',
            '--tw-prose-hr': 'inherit',
            '--tw-prose-quotes': 'inherit',
            '--tw-prose-quote-borders': 'inherit',
            '--tw-prose-captions': 'inherit',
            '--tw-prose-code': 'inherit',
            '--tw-prose-pre-code': 'inherit',
            '--tw-prose-pre-bg': 'inherit',
            '--tw-prose-th-borders': 'inherit',
            '--tw-prose-td-borders': 'inherit',
          }}
        />
      </div>
    </div>
  )
}

export default TipTapEditor
