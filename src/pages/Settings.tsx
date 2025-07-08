import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Moon,
  Sun,
  Smartphone,
  Wifi,
  Database,
  Info,
  Mail,
  Phone,
  ExternalLink,
  MessageCircle,
  Home
} from 'lucide-react';
import { useHomeStore } from '../store/useHomeStore';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { 
    isDarkMode, 
    userName, 
    notifications,
    setUserName,
    toggleDarkMode,
    toggleNotifications
  } = useHomeStore();

  const navigate = useNavigate();
  const [tempUserName, setTempUserName] = useState('');
  const [showSaveButton, setShowSaveButton] = useState(false);

  // Initialize tempUserName when component mounts or userName changes
  useEffect(() => {
    setTempUserName(userName);
  }, [userName]);

  // Simple save function
  const handleSaveUserName = useCallback(() => {
    if (tempUserName.trim()) {
      setUserName(tempUserName.trim());
      setShowSaveButton(false);
    }
  }, [tempUserName, setUserName]);

  // Memoized components to prevent re-renders
  const SettingCard = useMemo(() => ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
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
      {children}
    </div>
  ), [isDarkMode]);

  const Toggle = useMemo(() => ({ enabled, onChange, label, description }: { 
    enabled: boolean; 
    onChange: () => void; 
    label: string; 
    description: string 
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </h4>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>
      <button
        onClick={onChange}
        className={`ml-4 relative w-14 h-8 rounded-full transition-all duration-300 ${
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
  ), [isDarkMode]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Configuración
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Personaliza tu experiencia con NexusIA
        </p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-6">
        {/* User Profile */}
        <SettingCard title="Perfil de Usuario" icon={User}>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Nombre de usuario
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={tempUserName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTempUserName(value);
                    setShowSaveButton(value !== userName && value.trim() !== '');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && showSaveButton) {
                      if (tempUserName.trim()) {
                        setUserName(tempUserName.trim());
                        setShowSaveButton(false);
                      }
                    }
                  }}
                  autoComplete="off"
                  spellCheck={false}
                  className={`flex-1 px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Ingresa tu nombre"
                  maxLength={50}
                />
                {showSaveButton && (
                  <button
                    onClick={handleSaveUserName}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span className="hidden sm:inline">Guardar</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Este nombre aparecerá en los saludos y mensajes personalizados de NexusIA. 
                Puedes usar letras, números y espacios.
              </p>
            </div>
          </div>
        </SettingCard>

        {/* Appearance */}
        <SettingCard title="Apariencia" icon={Palette}>
          <div className="space-y-6">
            <Toggle
              enabled={isDarkMode}
              onChange={toggleDarkMode}
              label="Modo Oscuro"
              description="Activa el tema oscuro para una experiencia más cómoda en entornos con poca luz"
            />
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className={`font-medium mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Vista previa del tema
              </h4>
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  !isDarkMode 
                    ? 'border-blue-500 bg-white' 
                    : 'border-gray-300 bg-white'
                }`}>
                  <Sun className="h-6 w-6 text-gray-800" />
                  <p className="text-sm text-gray-600 mt-1">Claro</p>
                </div>
                <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'border-blue-500 bg-gray-800' 
                    : 'border-gray-300 bg-gray-800'
                }`}>
                  <Moon className="h-6 w-6 text-white" />
                  <p className="text-sm text-gray-300 mt-1">Oscuro</p>
                </div>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Notifications */}
        <SettingCard title="Notificaciones" icon={Bell}>
          <div className="space-y-6">
            <Toggle
              enabled={notifications}
              onChange={toggleNotifications}
              label="Notificaciones del sistema"
              description="Recibe alertas sobre el estado de tu hogar y sugerencias de NexusIA"
            />
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className={`font-medium mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Tipos de notificaciones
              </h4>
              <div className="space-y-3">
                <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <Shield className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className={`font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Alertas de seguridad
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Notificaciones importantes sobre la seguridad del hogar
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <Bell className="h-5 w-5 text-green-500" />
                  <div>
                    <p className={`font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Recordatorios
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Recordatorios personalizados y tareas pendientes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Device Settings */}
        <SettingCard title="Configuración de Dispositivos" icon={Smartphone}>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Wifi className="h-5 w-5 text-green-500" />
                  <span className={`font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Estado de conexión
                  </span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full text-sm">
                  Conectado
                </span>
              </div>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Todos los dispositivos están conectados y funcionando correctamente.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg text-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Dispositivos activos
                </p>
                <p className={`text-2xl font-bold text-blue-500`}>
                  8
                </p>
              </div>
              
              <div className={`p-4 rounded-lg text-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Tiempo de respuesta
                </p>
                <p className={`text-2xl font-bold text-green-500`}>
                  12ms
                </p>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Data & Privacy */}
        <SettingCard title="Datos y Privacidad" icon={Database}>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className={`font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Almacenamiento local
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Tus configuraciones y preferencias se guardan localmente en tu dispositivo para una experiencia más rápida.
              </p>
            </div>

            <div className="flex space-x-3">
              <button className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}>
                Exportar datos
              </button>
              <button className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200">
                Limpiar datos
              </button>
            </div>
          </div>
        </SettingCard>

        {/* System Info */}
        <SettingCard title="Información del Sistema" icon={Info}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Versión de NexusIA
                </p>
                <p className={`text-lg font-bold ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  v1.0.0
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Estado del sistema
                </p>
                <p className="text-lg font-bold text-green-500">
                  Activo
                </p>
              </div>

              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Última actualización
                </p>
                <p className={`text-lg font-bold ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Hoy
                </p>
              </div>

              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Tiempo activo
                </p>
                <p className={`text-lg font-bold ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  24/7
                </p>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                NexusIA está funcionando correctamente. Todos los sistemas están operativos y listos para ayudarte con el control de tu hogar inteligente. Para soporte técnico o reportar problemas, visita el Centro de Ayuda.
              </p>
            </div>
          </div>
        </SettingCard>

        {/* Contact and Support */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Support */}
          <SettingCard title="¿Necesitas más ayuda?" icon={MessageCircle}>
            <div className="text-center space-y-4">
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Si no encuentras la respuesta que buscas, NexusIA está aquí para ayudarte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/chat')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <MessageCircle className="h-5 w-5 inline mr-2" />
                  Chatear con NexusIA
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:border-gray-500' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <Home className="h-5 w-5 inline mr-2" />
                  Volver al Inicio
                </button>
              </div>
            </div>
          </SettingCard>

          {/* Contact Company */}
          <SettingCard title="Contactar con Nosotros" icon={Mail}>
            <div className="space-y-4">
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                ¿Tienes sugerencias, reportes de errores o necesitas soporte técnico? Contáctanos directamente.
              </p>
              
              <div className="space-y-3">
                <a 
                  href="mailto:soporte@nexusia.com"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email de Soporte</p>
                    <p className="text-sm text-gray-500">soporte@nexusia.com</p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>

                <a 
                  href="tel:+1234567890"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Teléfono de Soporte</p>
                    <p className="text-sm text-gray-500">+1 (234) 567-890</p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>

                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <strong>Horario de atención:</strong><br />
                    Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                    Sábados: 10:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </SettingCard>
        </div>
      </div>
    </div>
  );
};

export default Settings;