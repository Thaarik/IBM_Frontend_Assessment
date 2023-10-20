"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {BsLightbulbFill} from "react-icons/bs"
import {MdDarkMode} from "react-icons/md"

// This component is used to switch light and dark theme
export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      className={`w-fit absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 ease-linear bg-[#212933] dark:bg-slate-200`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <MdDarkMode className="text-slate-50 text-3xl"/> : <BsLightbulbFill className='text-yellow-500 text-3xl'/>}
    </button>
  );
};