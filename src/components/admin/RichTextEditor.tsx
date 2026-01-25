"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const toolbar = [
  { label: "Bold", wrap: "**", wrapEnd: "**" },
  { label: "Italic", wrap: "*", wrapEnd: "*" },
  { label: "Link", wrap: "[text](", wrapEnd: ")" },
  { label: "Image", wrap: "![Alt text](", wrapEnd: ")" },
  { label: "Video", wrap: "[video](", wrapEnd: ")" },
];

export default function RichTextEditor({ label, value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const applyInsert = (prefix: string, suffix: string) => {
    if (!ref.current) return;
    const start = ref.current.selectionStart;
    const end = ref.current.selectionEnd;
    const selected = value.slice(start, end);
    const next = `${value.slice(0, start)}${prefix}${selected || ""}${suffix}${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => {
      if (!ref.current) return;
      const cursor = start + prefix.length + (selected ? selected.length : 0);
      ref.current.focus();
      ref.current.setSelectionRange(cursor, cursor);
    });
  };

  return (
    <div className="space-y-2">
      {label ? <div className="text-sm font-medium">{label}</div> : null}
      <div className="flex flex-wrap gap-2">
        {toolbar.map((item) => (
          <Button
            key={item.label}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => applyInsert(item.wrap, item.wrapEnd)}
          >
            {item.label}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => applyInsert("\n", "")}
        >
          New Line
        </Button>
      </div>
      <Textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
      />
      <div className="text-xs text-muted-foreground">
        Supports markdown-style images and videos: <code>![Alt](url)</code>, <code>[video](url)</code>.
      </div>
    </div>
  );
}
