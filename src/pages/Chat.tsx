import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { useHomeStore } from '../store/useHomeStore';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [nexusData, setNexusData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    isDarkMode, 
    chatHistory, 
    addChatMessage, 
    processCommand,
    setLastNotification
  } = useHomeStore();

  useEffect(() => {
    // Load NexusIA data
    fetch('/nexusIA-data.json')
      .then(response => response.json())
      .then(data => setNexusData(data))
      .catch(error => console.error('Error loading NexusIA data:', error));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const findBestResponse = (userMessage: string) => {
    if (!nexusData) return 'Disculpa, estoy cargando mi base de conocimientos...';
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Check each category for matching questions
    for (const [category, data] of Object.entries(nexusData)) {
      const categoryData = data as any;
      
      if (categoryData.preguntas) {
        for (const pregunta of categoryData.preguntas) {
          const preguntaLower = pregunta.toLowerCase();
          
          // Check for exact or partial matches
          if (lowerMessage.includes(preguntaLower) || 
              preguntaLower.includes(lowerMessage) ||
              lowerMessage.split(' ').some((word: string) => preguntaLower.includes(word) && word.length > 3)) {
            
            // Return appropriate response based on message content
            if (categoryData.respuestas) {
              const respuestas = categoryData.respuestas;
              
              // Light controls
              if (category === 'luces') {
                if (lowerMessage.includes('encien') || lowerMessage.includes('prend')) {
                  return respuestas.encender || respuestas.encender_salon;
                }
                if (lowerMessage.includes('apag')) {
                  return respuestas.apagar || respuestas.apagar_cocina;
                }
              }
              
              // Temperature controls
              if (category === 'clima') {
                if (lowerMessage.includes('temperatura') && lowerMessage.includes('21')) {
                  return respuestas.ajustar_21;
                }
                if (lowerMessage.includes('temperatura')) {
                  return respuestas.temperatura_actual;
                }
                if (lowerMessage.includes('aire')) {
                  return respuestas.aire_acondicionado;
                }
              }
              
              // Security
              if (category === 'seguridad') {
                if (lowerMessage.includes('activa')) {
                  return respuestas.activar;
                }
                if (lowerMessage.includes('alarma')) {
                  return respuestas.alarma_activada;
                }
              }
              
              // Night mode
              if (category === 'modos') {
                if (lowerMessage.includes('noche')) {
                  return respuestas.activar_noche;
                }
              }
              
              // General responses
              if (category === 'general') {
                if (lowerMessage.includes('hola') || lowerMessage.includes('buenas')) {
                  return respuestas.saludo;
                }
                if (lowerMessage.includes('qué puedes') || lowerMessage.includes('ayuda')) {
                  return respuestas.capacidades;
                }
                if (lowerMessage.includes('gracias')) {
                  return respuestas.gracias;
                }
              }
              
              // Return first available response
              return Object.values(respuestas)[0] as string;
            }
          }
        }
      }
    }
    
    // Default response
    return 'Entiendo tu solicitud. ¿Podrías ser más específico sobre qué quieres controlar en tu hogar? Puedo ayudarte con luces, clima, seguridad, dispositivos y más. 🏠';
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = message.trim();
    setMessage('');
    
    // Add user message
    addChatMessage('user', userMessage);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Process command to update state
    const commandResult = processCommand(userMessage);
    
    // Get appropriate response
    const response = findBestResponse(userMessage);
    
    // Add NexusIA response
    addChatMessage('nexus', response);
    
    // Update last notification if it's a command
    if (commandResult !== 'Entiendo tu solicitud. ¿Hay algo específico que quieras controlar en tu hogar? 🏠') {
      setLastNotification(response);
    }
    
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageBubble = ({ sender, message, timestamp }: { sender: 'user' | 'nexus'; message: string; timestamp: Date }) => (
    <div className={`flex items-start space-x-3 ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      {sender === 'nexus' && (
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
          <Bot className="h-5 w-5 text-white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${sender === 'user' ? 'order-1' : 'order-2'}`}>
        <div className={`p-4 rounded-2xl ${
          sender === 'user' 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : isDarkMode 
              ? 'bg-gray-700 text-gray-200' 
              : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <p className={`text-xs mt-2 ${
          sender === 'user' ? 'text-right' : 'text-left'
        } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {sender === 'user' && (
        <div className={`p-2 rounded-full ${
          isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
        }`}>
          <User className="h-5 w-5 text-gray-500" />
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className={`p-6 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Chat con NexusIA
            </h1>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Tu asistente inteligente para el hogar
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatHistory.length === 0 ? (
          <div className="text-center py-12">
            <Bot className={`h-16 w-16 mx-auto mb-4 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              ¡Hola! Soy NexusIA
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Pregúntame sobre el control de luces, clima, seguridad, dispositivos y más
            </p>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <MessageBubble
              key={index}
              sender={msg.sender}
              message={msg.message}
              timestamp={msg.timestamp}
            />
          ))
        )}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className={`p-4 rounded-2xl ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  NexusIA está escribiendo...
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className={`p-6 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;