// src/components/ui/color-mode.tsx (o la ruta donde lo tengas)
"use client"; // Mantenlo por si acaso, no daña en Vite

import {
  ColorModeScript, // Importa esto para la persistencia del tema
  IconButton,
  Text,
  useColorMode, // Este hook te da el modo de color actual y la función para cambiarlo
  type TextProps,
} from "@chakra-ui/react";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

// 1. ELIMINAMOS next-themes Y ClientOnly

export interface ColorModeProviderProps {
  // Ahora solo toma children, ya que el resto lo maneja Chakra
  children: React.ReactNode;
  initialColorMode?: 'light' | 'dark'; // Puedes pasar un modo inicial si lo deseas
}

// Este componente ahora es solo un wrapper que renderiza el ColorModeScript
// ColorModeScript debe ir en el nivel más alto de tu aplicación (como en main.tsx)
// para funcionar correctamente y prevenir el "flash" de contenido sin estilo.
// Si lo pones aquí, asegúrate de que se renderice una sola vez y lo más arriba posible.
export function ColorModeProvider({ children, initialColorMode }: ColorModeProviderProps) {
  return (
    <>
      {/* ColorModeScript es crucial para establecer el modo de color antes que el resto de la UI */}
      <ColorModeScript initialColorMode={initialColorMode || 'dark'} />
      {children}
    </>
  );
}

// Los hooks y componentes siguientes ya usan useColorMode de Chakra UI.
// No necesitas redefinir useColorMode si usas el de Chakra.
// Sin embargo, si quieres mantener tu API personalizada, puedes hacerlo así:

export type ColorMode = "light" | "dark";

// **OPCIONAL**: Si quieres usar el `useColorMode` de Chakra directamente, esto puede ser simplificado.
// Pero si quieres mantener tu interfaz `UseColorModeReturn`, puedes envolverlo.
// export function useColorMode(): UseColorModeReturn {
//   const { colorMode, toggleColorMode, setColorMode } = _useColorMode(); // Renombra para evitar conflicto
//   return {
//     colorMode: colorMode as ColorMode,
//     setColorMode: setColorMode as (colorMode: ColorMode) => void,
//     toggleColorMode,
//   };
// }

// Ya estás usando useColorModeValue de Chakra, lo cual es correcto.
// export function useColorModeValue<T>(light: T, dark: T) {
//   const { colorMode } = useColorMode(); // Asumiendo que usas tu useColorMode o el de Chakra
//   return colorMode === "dark" ? dark : light;
// }

export function ColorModeIcon() {
  const { colorMode } = useColorMode(); // Usa el de Chakra
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}


export const ColorModeButton = React.forwardRef<
  HTMLButtonElement
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode(); // Usa el de Chakra
  return (
    // 2. ELIMINAMOS ClientOnly y su fallback de aquí
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      {...props}
      // Considera si necesitas este 'css' o puedes usar props directamente
      css={{
        _icon: {
          width: "5",
          height: "5",
        },
      }}
    >
      <ColorModeIcon />
    </IconButton>
  );
});

// Estos componentes LightMode/DarkMode parecen ser para Next.js y su manejo de temas.
// Si no necesitas "clasificar" secciones de la UI con estos modos específicos,
// y solo quieres que la UI reaccione al modo global, podrías eliminarlos.
// Si los necesitas, su implementación actual no parece depender de ClientOnly.
export const LightMode = React.forwardRef<HTMLSpanElement, TextProps>( // Puedes poner SpanProps si necesitas tipar props
  function LightMode(props, ref) {
    return (
      <Text as="span"
        color="fg"
        display="contents"
        className="chakra-theme light" // Esta clase y esquema de color se usan con next-themes
        // colorPalette="gray" // Posiblemente no necesario si se gestiona a nivel global
        // colorScheme="light"
        ref={ref}
        {...props}
      />
    );
  },
);

export const DarkMode = React.forwardRef<HTMLSpanElement, TextProps>( // Puedes poner SpanProps si necesitas tipar props
  function DarkMode(props, ref) {
    return (
      <Text as="span"
        color="fg"
        display="contents"
        className="chakra-theme dark" // Esta clase y esquema de color se usan con next-themes
        // colorPalette="gray"
        // colorScheme="dark"
        ref={ref}
        {...props}
      />
    );
  },
);