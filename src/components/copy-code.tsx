"use client";
import { CopyIcon } from "lucide-react";
import { highlight } from "sugar-high";

function CopyButton({ code }: { code: string }) {
  return (
    <span
      className="absolute right-0.5 top-0.5 text-primary hover:scale-105 focus:scale-90"
      onClick={() => {
        navigator.clipboard.writeText(code);
      }}
    >
      <CopyIcon size={20} />
    </span>
  );
}

export function Code({ children, ...props }: any) {
  let codeHTML = highlight(children);
  return (
    <span className="relative">
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props}></code>

      <CopyButton code={children} />
    </span>
  );
}
