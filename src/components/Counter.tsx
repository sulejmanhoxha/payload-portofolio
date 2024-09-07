"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="flex items-center gap-3">
      <button onClick={decrement}>
        <MinusIcon />
      </button>
      <p>Current vote: {count}</p>
      <button onClick={increment}>
        <PlusIcon />
      </button>
    </div>
  );
}
