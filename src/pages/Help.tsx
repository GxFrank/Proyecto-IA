import { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Lightbulb, 
  Shield, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  Book,
  Home,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';
import { useHomeStore } from '../store/useHomeStore';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const { isDarkMode } = useHomeStore();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo enciendo todas las luces de mi hogar?",
      answer: "Puedes encender todas las luces de varias formas: (1) Ve a la sección 'Control' y activa el interruptor 'Todas las luces', (2) En el chat, escribe 'Enciende todas las luces' o 'Prende las luces', (3) Usa comandos por voz si tienes configurado el reconocimiento de voz."
    },
    {
      question: "¿Cómo ajusto la temperatura de mi hogar?",
      answer: "Para ajustar la temperatura: (1) Ve a 'Control' > 'Clima' y usa el deslizador para establecer tu temperatura deseada, (2) En el chat, escribe 'Ajusta la temperatura a X grados', (3) Activa o desactiva el aire acondicionado desde el panel de control."
    },
    {
      question: "¿Cómo activo el sistema de seguridad?",
      answer: "Para activar la seguridad: (1) Ve a 'Control' > 'Seguridad' y activa el interruptor del sistema, (2) En el chat, escribe 'Activa la seguridad' o 'Enciende la alarma', (3) Verifica el estado de puertas y sensores desde el panel de control."
    },
    {
      question: "¿Qué es el modo noche y cómo funciona?",
      answer: "El modo noche optimiza tu hogar para el descanso: (1) Atenúa las luces automáticamente, (2) Aumenta la seguridad, (3) Ajusta la temperatura para un mejor sueño, (4) Silencia notificaciones no esenciales. Actívalo desde 'Control' o diciéndole a NexusIA 'Activa el modo noche'."
    },
    {
      question: "¿Cómo veo el consumo energético de mi hogar?",
      answer: "Para monitorear tu consumo: (1) Ve a 'Inicio' para ver el resumen de energía, (2) Pregunta a NexusIA '¿Cuánto consumo energético hay hoy?', (3) Revisa las estadísticas detalladas en el dashboard principal."
    },
    {
      question: "¿Puedo controlar dispositivos específicos?",
      answer: "Sí, puedes controlar: (1) Luces por habitación (sala, cocina, dormitorio, baño), (2) Electrodomésticos conectados (TV, altavoces, etc.), (3) Sistema de climatización, (4) Dispositivos de seguridad. Usa el panel de control o comandos específicos en el chat."
    }
  ];

  const tips = [
    {
      icon: MessageCircle,
      title: "Usa comandos naturales",
      description: "Habla con NexusIA como si fuera una persona. Puedes decir 'Enciende las luces' o 'Apaga todo' y te entenderá."
    },
    {
      icon: Lightbulb,
      title: "Ahorra energía",
      description: "Activa el modo noche para optimizar el consumo. NexusIA ajustará automáticamente luces y temperatura."
    },
    {
      icon: Shield,
      title: "Mantén la seguridad",
      description: "Revisa regularmente el estado de puertas y sensores. Activa la seguridad cuando salgas de casa."
    },
    {
      icon: Settings,
      title: "Personaliza tu experiencia",
      description: "Configura tu nombre y preferencias en la sección 'Configuración' para una experiencia más personalizada."
    }
  ];

  const guides = [
    {
      title: "Primeros pasos con NexusIA",
      steps: [
        "Configura tu nombre en la sección 'Configuración'",
        "Explora el panel de control para conocer tus dispositivos",
        "Prueba comandos básicos en el chat",
        "Personaliza tus preferencias y notificaciones"
      ]
    },
    {
      title: "Comandos de voz más utilizados",
      steps: [
        "'Enciende/Apaga las luces' - Control general de iluminación",
        "'Ajusta la temperatura a X grados' - Control de clima",
        "'Activa/Desactiva la seguridad' - Sistema de alarma",
        "'Modo noche' - Optimización para descanso"
      ]
    },
    {
      title: "Resolución de problemas",
      steps: [
        "Verifica que todos los dispositivos estén conectados",
        "Reinicia NexusIA si no responde correctamente",
        "Revisa la configuración de notificaciones",
        "Contacta soporte si persisten los problemas"
      ]
    }
  ];

  const HelpCard = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
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
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Centro de Ayuda
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Todo lo que necesitas saber sobre NexusIA
        </p>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-fit mb-4">
              <tip.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {tip.title}
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {tip.description}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <HelpCard title="Preguntas Frecuentes" icon={HelpCircle}>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg transition-all duration-200 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className={`w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200`}
              >
                <span className={`font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openFaq === index && (
                <div className={`p-4 pt-0 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </HelpCard>

      {/* Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <HelpCard key={index} title={guide.title} icon={Book}>
            <ol className="space-y-3">
              {guide.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {stepIndex + 1}
                  </span>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </HelpCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Support */}
        <HelpCard title="¿Necesitas más ayuda?" icon={MessageCircle}>
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
        </HelpCard>

        <HelpCard title="Contactar con Nosotros" icon={Mail}>
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
                  <p className="text-sm text-gray-500">+51 976 351 236</p>
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
        </HelpCard>
      </div>
    </div>
  );
};

export default Help;