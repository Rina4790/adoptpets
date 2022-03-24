import { createContext, ReactNode, useEffect, useState } from "react";

const darkTheme = {
  text: "#FFFFFF",
  grayText: "#FFFFFF",
  timeText: "#FFFFFF",
	colorOfButton: "linear-gradient(275.76deg, #7158E2 44.33%, #CD84F1 98.56%)",
	borderOfButton: "1px solid #7158E2",
	colorOfButtonHover: "#7158E2",
	colorOfTextInput: "#7158E2",
  background: "linear-gradient(122.5deg, #C0A197 0%, #243B55 102.64%)",
  filter: "brightness(0) invert(1)",
};

const lightTheme = {
  text: "#4F4F4F",
  grayText: "#979797",
  timeText: "#016EFC",
  colorOfButton: "conic-gradient(from -3.29deg at 100% -13%, #FFA502 0deg, #FF6348 360deg)",
	borderOfButton: "1px solid #FF6348",
	colorOfButtonHover: "#FF7F50",
	colorOfTextInput: "#FF7F50",
	background: "linear-gradient(45deg, rgb(247, 237, 155), rgb(240, 180, 99))",
  filter: "none",
};

export const ThemeContext = createContext({
  isDark: false,
  changeIsDark: () => {},
  theme: lightTheme,
});

interface IProps {
  children: ReactNode;
}

export const ThemeProdiver = ({ children }: IProps) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark") === "true"
  );

  const changeIsDark = () => {
    setIsDark((isDark) => !isDark);
  };

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{ isDark, changeIsDark, theme: isDark ? darkTheme : lightTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};