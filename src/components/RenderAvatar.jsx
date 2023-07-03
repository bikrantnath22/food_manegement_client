import React, { useState, useEffect } from "react";

export default function RenderAvatar({ user }) {
  console.log(user);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!user.avatar) {
      return;
    }
    if (user.avatar?.download_url) {
      setUrl(user.avatar.download_url);
    }
    if (user?.avatar?.name ) {
      setUrl(URL.createObjectURL(user.avatar));
    }
  }, [user]);
  return (
    <>
      {user && (
        <img
          className="h-36 w-36 rounded-full m-auto"
          src={url ? url : "https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1"}
          alt="avatar"
        />
      )}
    </>
  );
}
