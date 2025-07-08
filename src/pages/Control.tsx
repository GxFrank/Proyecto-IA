import { 
  Lightbulb, 
  Thermometer, 
  Shield, 
  Moon, 
  Tv, 
  Volume2,
  Wifi,
  Power
} from 'lucide-react';
import { useHomeStore } from '../store/useHomeStore';

const Control = () => {
  const { 
    isDarkMode, 
    lights, 
    temperature, 
    security, 
    modes,
    devices,
    toggleLight,
    toggleAllLights,
    setTemperature,
    toggleAirConditioning,
    toggleSecurity,
    toggleNightMode,
    toggleDevice,
    turnOffAllDevices,
    turnOnAllDevices
  } = useHomeStore();

  const roomNames = {
    living: 'Sala',
    kitchen: 'Cocina',
    bedroom: 'Dormitorio',
    bathroom: 'Baño',
  };

  const ToggleSwitch = ({ enabled, onChange, label }: { enabled: boolean; onChange: () => void; label: string }) => (
    <div className="flex items-center justify-between">
      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </span>
      <button
        onClick={onChange}
        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
          enabled 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
            : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  const ControlCard = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <div className={`p-6 rounded-xl shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className={`text-xl font-semibold ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          {title}
        </h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Control de Dispositivos
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Controla todos los dispositivos de tu hogar desde aquí
        </p>
      </div>

      {/* Control Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lights Control */}
        <ControlCard title="Iluminación" icon={Lightbulb}>
          <ToggleSwitch
            enabled={lights.all}
            onChange={toggleAllLights}
            label="Todas las luces"
          />
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {Object.entries(roomNames).map(([room, name]) => (
              <div key={room} className="mb-3">
                <ToggleSwitch
                  enabled={lights[room as keyof typeof lights] as boolean}
                  onChange={() => toggleLight(room)}
                  label={name}
                />
              </div>
            ))}
          </div>
        </ControlCard>

        {/* Temperature Control */}
        <ControlCard title="Clima" icon={Thermometer}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Temperatura actual
              </span>
              <span className="text-2xl font-bold text-blue-500">
                {temperature.current}°C
              </span>
            </div>
            
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Temperatura objetivo
              </label>
              <input
                type="range"
                min="16"
                max="30"
                value={temperature.target}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>16°C</span>
                <span className="font-bold text-blue-500">{temperature.target}°C</span>
                <span>30°C</span>
              </div>
            </div>
            
            <ToggleSwitch
              enabled={temperature.airConditioningOn}
              onChange={toggleAirConditioning}
              label="Aire acondicionado"
            />
          </div>
        </ControlCard>

        {/* Security Control */}
        <ControlCard title="Seguridad" icon={Shield}>
          <ToggleSwitch
            enabled={security.armed}
            onChange={toggleSecurity}
            label="Sistema de seguridad"
          />
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Estado de puertas
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                security.doorOpen 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                {security.doorOpen ? 'Cerrada ' : 'Asegurada'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Detección de movimiento
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                security.motionDetected 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
              }`}>
                {security.motionDetected ? 'Detectado' : 'Sin actividad'}
              </span>
            </div>
          </div>
        </ControlCard>

        {/* Devices Control */}
        <ControlCard title="Dispositivos" icon={Wifi}>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => toggleDevice('tv')}
              className={`p-4 rounded-lg transition-all duration-300 ${
                devices.tv 
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' 
                  : 'bg-gray-50 dark:bg-gray-900/20 border-2 border-gray-300 dark:border-gray-600'
              }`}
            >
              <Tv className={`h-6 w-6 mx-auto mb-2 ${
                devices.tv ? 'text-green-500' : 'text-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                TV
              </span>
            </button>
            
            <button 
              onClick={() => toggleDevice('speakers')}
              className={`p-4 rounded-lg transition-all duration-300 ${
                devices.speakers 
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' 
                  : 'bg-gray-50 dark:bg-gray-900/20 border-2 border-gray-300 dark:border-gray-600'
              }`}
            >
              <Volume2 className={`h-6 w-6 mx-auto mb-2 ${
                devices.speakers ? 'text-green-500' : 'text-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Altavoces
              </span>
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Dispositivos conectados
              </span>
              <span className="text-2xl font-bold text-blue-500">
                {devices.connected}
              </span>
            </div>
          </div>
        </ControlCard>
      </div>

      {/* Special Modes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ControlCard title="Modos Especiales" icon={Moon}>
          <ToggleSwitch
            enabled={modes.nightMode}
            onChange={toggleNightMode}
            label="Modo Noche"
          />
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {modes.nightMode 
                ? 'Modo noche activado: luces tenues, seguridad elevada' 
                : 'Activa el modo noche para optimizar el hogar para descansar'
              }
            </p>
          </div>
        </ControlCard>

        <ControlCard title="Acciones Rápidas" icon={Power}>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={turnOffAllDevices}
              className="p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Power className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm">Apagar Todo</span>
            </button>
            <button 
              onClick={turnOnAllDevices}
              className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Lightbulb className="h-5 w-5 m x-auto mb-1" />
              <span className="text-sm">Encender Todo</span>
            </button>
          </div>
        </ControlCard>
      </div>
    </div>
  );
};

export default Control;