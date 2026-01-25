"use client";

import { useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { Node, mergeAttributes } from "@tiptap/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string }) => ReturnType;
    };
  }
}

const Video = Node.create({
  name: "video",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },
  parseHTML() {
    return [{ tag: "video[src]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["video", mergeAttributes({ controls: true }, HTMLAttributes)];
  },
  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { src: options.src },
          }),
    };
  },
});

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function WysiwygEditor({ value, onChange, placeholder }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [modalType, setModalType] = useState<"link" | "image" | "youtube" | "video">("link");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image,
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
      Video,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const toolbar = useMemo(
    () => [
      {
        label: "Bold",
        action: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        action: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "H2",
        action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        label: "Bullets",
        action: () => editor?.chain().focus().toggleBulletList().run(),
      },
      {
        label: "Numbered",
        action: () => editor?.chain().focus().toggleOrderedList().run(),
      },
      {
        label: "Link",
        action: () => {
          setModalType("link");
          setModalLabel("Paste link URL");
          setModalValue("");
          setModalOpen(true);
        },
      },
      {
        label: "Image",
        action: () => {
          setModalType("image");
          setModalLabel("Paste image URL");
          setModalValue("");
          setModalOpen(true);
        },
      },
      {
        label: "YouTube",
        action: () => {
          setModalType("youtube");
          setModalLabel("Paste YouTube URL");
          setModalValue("");
          setModalOpen(true);
        },
      },
      {
        label: "Video",
        action: () => {
          setModalType("video");
          setModalLabel("Paste video URL (.mp4)");
          setModalValue("");
          setModalOpen(true);
        },
      },
    ],
    [editor]
  );

  const handleInsert = () => {
    if (!modalValue) {
      setModalOpen(false);
      return;
    }
    if (modalType === "link") {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: modalValue }).run();
    } else if (modalType === "image") {
      editor?.chain().focus().setImage({ src: modalValue }).run();
    } else if (modalType === "youtube") {
      editor?.commands.setYoutubeVideo({ src: modalValue });
    } else if (modalType === "video") {
      editor?.commands.setVideo({ src: modalValue });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {toolbar.map((item) => (
          <Button key={item.label} type="button" size="sm" variant="outline" onClick={item.action}>
            {item.label}
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} />
      {placeholder ? <p className="text-xs text-muted-foreground">{placeholder}</p> : null}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalLabel}</DialogTitle>
            <DialogDescription>Paste a URL to insert into the content.</DialogDescription>
          </DialogHeader>
          <Input
            value={modalValue}
            onChange={(e) => setModalValue(e.target.value)}
            placeholder="https://..."
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleInsert}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
