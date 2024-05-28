import { Editor } from "@tiptap/react";
import { useCallback, type ReactNode } from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaImage,
  FaItalic,
  FaLink,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import { GoHorizontalRule } from "react-icons/go";
import {
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { TbBlockquote } from "react-icons/tb";
import styles from "./EditorButtons.module.scss";

interface Props {
  editor: Editor | null;
  setLink: () => void;
}

const EditorButtons = ({ editor, setLink }: Props): ReactNode => {
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editorButtons}>
      <button onClick={addImage} type="button">
        <FaImage />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? styles.isActiveButton : ""}
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? styles.isActiveButton : ""}
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? styles.isActiveButton : ""}
      >
        <FaStrikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? styles.isActiveButton : ""}
      >
        <FaUnderline />
      </button>
      {/* Code */}
      {/* <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? styles.isActiveButton : ""}
      >
        <FaCode />
      </button> */}
      {/* Clear all */}
      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        Clear
      </button> */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? styles.isActiveButton : ""
        }
      >
        <LuHeading2 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? styles.isActiveButton : ""
        }
      >
        <LuHeading3 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 }) ? styles.isActiveButton : ""
        }
      >
        <LuHeading4 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 }) ? styles.isActiveButton : ""
        }
      >
        <LuHeading5 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 }) ? styles.isActiveButton : ""
        }
      >
        <LuHeading6 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? styles.isActiveButton : ""}
      >
        <MdFormatListBulleted />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? styles.isActiveButton : ""}
      >
        <MdFormatListNumbered />
      </button>
      {/* Code block */}
      {/* <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? styles.isActiveButton : ""}
      >
        code block
      </button> */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? styles.isActiveButton : ""}
      >
        <TbBlockquote />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={editor.isActive("blockquote") ? styles.isActiveButton : ""}
      >
        <GoHorizontalRule />
      </button>
      {/* Enter */}
      {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button> */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaUndo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaRedo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        disabled={!editor.can().chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" }) ? styles.isActiveButton : ""
        }
      >
        <FaAlignLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        disabled={!editor.can().chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? styles.isActiveButton : ""
        }
      >
        <FaAlignCenter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        disabled={!editor.can().chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" }) ? styles.isActiveButton : ""
        }
      >
        <FaAlignRight />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        disabled={!editor.can().chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive({ textAlign: "justify" }) ? styles.isActiveButton : ""
        }
      >
        <FaAlignJustify />
      </button>
      <button
        type="button"
        onClick={setLink}
        className={editor.isActive("link") ? styles.isActiveButton : ""}
      >
        <FaLink />
      </button>
    </div>
  );
};

export default EditorButtons;
