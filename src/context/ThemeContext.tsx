import { createContext, ReactNode, useEffect, useState } from "react";

const darkTheme = {
	text: "#FFFFFF",
	blackWhiteText: "#FFFFFF",
  grayText: "#FFFFFF",
  timeText: "#3c3b4c",
  colorOfButton: "#E3CEC8", 
  borderOfButton: "1px solid #7158E2",
  colorOfButtonHover: "#7158E2",
  colorOfTextInput: "#7158E2",
  background: "linear-gradient(270deg, #615554 0%, #BE9F96 100%, #BE9F96 100%, #7C6862 100%)",
	filter: "brightness(0) invert(1)",
	searchBackground: "rgba(63, 63, 63, 0.5)",
	postBackground: "rgba(104, 100, 98, 0.7)" 
};

const lightTheme = {
	text: "#383535",
	blackWhiteText: "#000000",
  grayText: "#444444",
  timeText: "#b63b0eb0",
  colorOfButton:
    "#80766E",
  borderOfButton: "1px solid #FF6348",
  colorOfButtonHover: "#FF7F50",
  colorOfTextInput: "#FF7F50",
  background: "linear-gradient(270deg, #F0B564 0%, #F4D382 100%)",
	filter: "none",
	searchBackground: "rgba(241, 241, 241, 0.5)",
	postBackground: "rgba(241, 241, 241, 0.6)"
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
