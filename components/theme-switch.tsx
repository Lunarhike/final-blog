"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { IconJarLogoIcon } from "@radix-ui/react-icons";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className="w-8 h-8 rounded-full flex items-center justify-center relative"
      onClick={(e) => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <IconJarLogoIcon className="w-4 h-4" />
    </Button>
  );
};

export default ThemeSwitch;
