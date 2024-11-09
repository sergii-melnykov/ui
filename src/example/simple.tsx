import { useState } from "react";

export type SimpleProps = {
  title: string;
};

export function Simple({ title }: SimpleProps) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button type="button" onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}
