import { 
  Shield, 
  Lightbulb, 
  Thermometer, 
  Zap, 
  Wifi, 
  Moon,
  ShieldCheck,
  Activity,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useHomeStore } from '../store/useHomeStore';

const Home = () => {
  const { 
    userName, 
    isDarkMode, 
    lights, 
    temperature, 
    security, 
    energy, 
    devices, 
    modes,
    lastNotification 
  } = useHomeStore();

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const lightsOn = Object.values(lights).filter(Boolean).length;
  const totalLights = Object.keys(lights).length - 1; // excluding 'all'

  const cards = [
    {
      title: 'Seguridad',
      value: security.armed ? 'Activada' : 'Desactivada',
      icon: security.armed ? ShieldCheck : Shield,
      color: security.armed ? 'text-green-500' : 'text-yellow-500',
      bgColor: security.armed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Luces',
      value: `${lightsOn}/${totalLights} encendidas`,
      icon: Lightbulb,
      color: lightsOn > 0 ? 'text-yellow-500' : 'text-gray-500',
      bgColor: lightsOn > 0 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gray-50 dark:bg-gray-900/20',
    },
    {
      title: 'Temperatura',
      value: `${temperature.current}°C`,
      icon: Thermometer,
      color: temperature.airConditioningOn ? 'text-blue-500' : 'text-orange-500',
      bgColor: temperature.airConditioningOn ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Energía',
      value: `${energy.consumed} kWh`,
      icon: Zap,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Dispositivos',
      value: `${devices.connected} conectados`,
      icon: Wifi,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Modo Noche',
      value: modes.nightMode ? 'Activado' : 'Desactivado',
      icon: Moon,
      color: modes.nightMode ? 'text-purple-500' : 'text-gray-500',
      bgColor: modes.nightMode ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-900/20',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className={`p-8 rounded-2xl shadow-lg ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
          : 'bg-gradient-to-r from-blue-50 to-purple-50'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getTimeGreeting()}, {userName}
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Tu hogar inteligente está optimizado y funcionando a 
              la perfección para brindarte máxima comodidad.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Activity className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {card.title}
            </h3>
            <p className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Suggestions and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contextual Suggestions */}
        <div className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Sugerencias
          </h3>
          <div className="space-y-3">
            {modes.nightMode ? (
              <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Moon className="h-5 w-5 text-purple-500" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Modo noche activado. ¿Deseas programar el despertar?
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Lightbulb className="h-5 w-5 text-blue-500" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Es hora de la cena. ¿Enciendo las luces del comedor?
                </span>
              </div>
            )}
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Zap className="h-5 w-5 text-green-500" />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Excelente eficiencia energética hoy. ¡Sigue así!
              </span>
            </div>
          </div>
        </div>

        {/* Last Notification */}
        <div className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Última Notificación
          </h3>
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className={`font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {lastNotification}
              </p>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Hace 5 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;