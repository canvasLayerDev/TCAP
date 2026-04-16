import { useState } from "react";
import Chat_boat from "./Chat_boat";
import Chat_boat2 from "./Chat_boat2";

export default function Chat_main() {
  const [open, setOpen] = useState(false);

  return (
    <>

      {/* <Chat_boat onOpen={() => setOpen(true)} /> */}
{/* <Chat_boat onOpen={() => setOpen(true)} popupOpen={open} /> */}
    <Chat_boat onOpen={() => setOpen(!open)} popupOpen={open} />
      <Chat_boat2 open={open} setOpen={setOpen} />
    </>
  );
}
