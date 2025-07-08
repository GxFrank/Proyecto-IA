import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HomeState {
  // User preferences
  userName: string;
  isDarkMode: boolean;
  notifications: boolean;
  
  // Home devices state
  lights: {
    living: boolean;
    kitchen: boolean;
    bedroom: boolean;
    bathroom: boolean;
    all: boolean;
  };
  
  temperature: {
    current: number;
    target: number;
    airConditioningOn: boolean;
  };
  
  security: {
    armed: boolean;
    doorOpen: boolean;
    motionDetected: boolean;
  };
  
  energy: {
    consumed: number;
    efficiency: string;
  };
  
  devices: {
    connected: number;
    tv: boolean;
    speakers: boolean;
    smart_plugs: boolean;
  };
  
  modes: {
    nightMode: boolean;
    awayMode: boolean;
  };
  
  // Chat state
  chatHistory: { sender: 'user' | 'nexus'; message: string; timestamp: Date }[];
  lastNotification: string;
  
  // Actions
  setUserName: (name: string) => void;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
  
  // Device controls
  toggleLight: (room: string) => void;
  toggleAllLights: () => void;
  setTemperature: (temp: number) => void;
  toggleAirConditioning: () => void;
  toggleSecurity: () => void;
  toggleNightMode: () => void;
  toggleDevice: (device: string) => void;
  turnOffAllDevices: () => void;
  turnOnAllDevices: () => void;
  
  // Chat
  addChatMessage: (sender: 'user' | 'nexus', message: string) => void;
  setLastNotification: (message: string) => void;
  
  // Process commands
  processCommand: (command: string) => string;
}

export const useHomeStore = create<HomeState>()(
  persist(
    (set, get) => ({
      // Initial state
      userName: 'Usuario',
      isDarkMode: false,
      notifications: true,
      
      lights: {
        living: true,
        kitchen: false,
        bedroom: false,
        bathroom: false,
        all: false,
      },
      
      temperature: {
        current: 23,
        target: 21,
        airConditioningOn: true,
      },
      
      security: {
        armed: false,
        doorOpen: true, // Inicialmente abierta
        motionDetected: false,
      },
      
      energy: {
        consumed: 12.4,
        efficiency: 'Eficiente',
      },
      
      devices: {
        connected: 8,
        tv: true,
        speakers: false,
        smart_plugs: true,
      },
      
      modes: {
        nightMode: false,
        awayMode: false,
      },
      
      chatHistory: [],
      lastNotification: 'Sistema funcionando correctamente',
      
      // Actions
      setUserName: (name) => set({ userName: name }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
      
      // Device controls
      toggleLight: (room) => set((state) => ({
        lights: {
          ...state.lights,
          [room]: !state.lights[room as keyof typeof state.lights],
        },
      })),
      
      toggleAllLights: () => set((state) => {
        const newAllState = !state.lights.all;
        return {
          lights: {
            living: newAllState,
            kitchen: newAllState,
            bedroom: newAllState,
            bathroom: newAllState,
            all: newAllState,
          },
        };
      }),
      
      setTemperature: (temp) => set((state) => ({
        temperature: { ...state.temperature, target: temp },
      })),
      
      toggleAirConditioning: () => set((state) => ({
        temperature: {
          ...state.temperature,
          airConditioningOn: !state.temperature.airConditioningOn,
        },
      })),
      
      toggleSecurity: () => set((state) => {
        const newArmedState = !state.security.armed;
        return {
          security: { 
            ...state.security, 
            armed: newArmedState,
            doorOpen: newArmedState ? false : true // Cuando se activa seguridad, las puertas se cierran
          },
        };
      }),
      
      toggleNightMode: () => set((state) => {
        const nightMode = !state.modes.nightMode;
        return {
          modes: { ...state.modes, nightMode },
          lights: nightMode ? {
            living: false,
            kitchen: false,
            bedroom: true,
            bathroom: false,
            all: false,
          } : state.lights,
        };
      }),

      toggleDevice: (device) => set((state) => ({
        devices: {
          ...state.devices,
          [device]: !state.devices[device as keyof typeof state.devices],
        },
      })),

      turnOffAllDevices: () => set((state) => ({
        lights: {
          living: false,
          kitchen: false,
          bedroom: false,
          bathroom: false,
          all: false,
        },
        devices: {
          ...state.devices,
          tv: false,
          speakers: false,
        },
        temperature: {
          ...state.temperature,
          airConditioningOn: false,
        },
      })),

      turnOnAllDevices: () => set((state) => ({
        lights: {
          living: true,
          kitchen: true,
          bedroom: true,
          bathroom: true,
          all: true,
        },
        devices: {
          ...state.devices,
          tv: true,
          speakers: true,
        },
        temperature: {
          ...state.temperature,
          airConditioningOn: true,
        },
      })),
      
      // Chat
      addChatMessage: (sender, message) => set((state) => ({
        chatHistory: [...state.chatHistory, { sender, message, timestamp: new Date() }],
      })),
      
      setLastNotification: (message) => set({ lastNotification: message }),
      
      // Process commands
      processCommand: (command) => {
        const state = get();
        const lowerCommand = command.toLowerCase();
        
        // Light commands
        if (lowerCommand.includes('enciende') || lowerCommand.includes('prende')) {
          if (lowerCommand.includes('todas') || lowerCommand.includes('luces')) {
            state.toggleAllLights();
            return 'He encendido todas las luces del hogar. ✨';
          }
        }
        
        if (lowerCommand.includes('apaga')) {
          if (lowerCommand.includes('todas') || lowerCommand.includes('luces')) {
            state.toggleAllLights();
            return 'Todas las luces han sido apagadas. 🌙';
          }
        }
        
        // Temperature commands
        if (lowerCommand.includes('temperatura') && lowerCommand.includes('21')) {
          state.setTemperature(21);
          return 'He ajustado la temperatura a 21°C. ❄️';
        }
        
        // Security commands
        if (lowerCommand.includes('seguridad') || lowerCommand.includes('alarma')) {
          if (lowerCommand.includes('activa')) {
            set((state) => ({ 
              security: { 
                ...state.security, 
                armed: true,
                doorOpen: false 
              } 
            }));
            return 'He activado el sistema de seguridad completo. 🛡️';
          }
        }
        
        // Night mode commands
        if (lowerCommand.includes('modo noche')) {
          state.toggleNightMode();
          return state.modes.nightMode ? 
            'Modo noche activado: luces tenues, seguridad elevada. 🌙' :
            'Modo noche desactivado. Buenos días. ☀️';
        }
        
        // Default responses
        return 'Entiendo tu solicitud. ¿Hay algo específico que quieras controlar en tu hogar? 🏠';
      },
    }),
    {
      name: 'nexus-home-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str, (key, value) => {
            // Convert timestamp strings back to Date objects
            if (key === 'timestamp' && typeof value === 'string') {
              return new Date(value);
            }
            return value;
          });
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);