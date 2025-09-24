import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currency: 'USD',
    promoCode: 'CLV3000'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Таймер обратного отсчета
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 17 });
  
  // Звуковые уведомления для выигрышей
  useEffect(() => {
    const playWinSound = () => {
      // Создаем простой звук монетки через Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    };
    
    // Вибрация на мобильных устройствах
    const playVibration = () => {
      if ('vibrate' in navigator) {
        // Паттерн вибрации: короткая-пауза-короткая (имитация монеток)
        navigator.vibrate([100, 50, 100]);
      }
    };

    // Воспроизводим звук и вибрацию каждые 5 секунд (имитируя новые выигрыши)
    const winSoundTimer = setInterval(() => {
      try {
        playWinSound();
        playVibration();
      } catch (error) {
        console.log('Audio/Vibration not supported');
      }
    }, 5000);
    
    return () => clearInterval(winSoundTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Перезапускаем таймер
          hours = 2;
          minutes = 45;
          seconds = 17;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Эффект конфетти
  const createConfetti = () => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100vw';
    confettiContainer.style.height = '100vh';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.style.position = 'absolute';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = confetti.style.width;
      confetti.style.backgroundColor = color;
      confetti.style.borderRadius = '50%';
      confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      confettiContainer.appendChild(confetti);
    }

    // Убираем конфетти через 5 секунд
    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 5000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Запускаем конфетти
    createConfetti();
    
    setTimeout(() => {
      window.open('https://infowawada.com/?promo=0e4cb864-e734-44ef-9820-29068cfbffac&target=register', '_blank');
      setIsSubmitted(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Падающие монеты в фоне */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute">
            {/* Основная монета */}
            <div
              className="absolute animate-[coin-fall_6s_linear_infinite] text-gaming-gold opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                fontSize: `${Math.random() * 20 + 20}px`
              }}
            >
              💰
            </div>
            
            {/* Искры вокруг монеты */}
            {[...Array(6)].map((_, sparkIndex) => (
              <div
                key={`spark-${i}-${sparkIndex}`}
                className="absolute animate-[spark-burst_6s_linear_infinite] text-gaming-gold-bright opacity-60"
                style={{
                  left: `calc(${Math.random() * 100}% + ${Math.random() * 40 - 20}px)`,
                  animationDelay: `${Math.random() * 6}s`,
                  fontSize: '8px',
                  transform: `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`
                }}
              >
                ✨
              </div>
            ))}
          </div>
        ))}
        
        {/* Дополнительные падающие элементы */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`gem-${i}`}
            className="absolute animate-[coin-fall_8s_linear_infinite] text-gaming-neon-pink opacity-25"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              fontSize: `${Math.random() * 15 + 15}px`
            }}
          >
            💎
          </div>
        ))}
      </div>
      
      {/* Floating Gaming Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-gradient-to-r from-gaming-neon-pink to-gaming-neon-cyan rounded-full opacity-20" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-gaming-gold rounded-full opacity-30" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-20 h-20 bg-gaming-red rounded-lg opacity-25 rotate-45" />
        </div>
        <div className="absolute top-1/3 right-10 animate-float" style={{ animationDelay: '0.5s' }}>
          <Icon name="Gem" size={48} className="text-gaming-neon-pink opacity-30" />
        </div>
        <div className="absolute bottom-40 right-40 animate-float" style={{ animationDelay: '1.5s' }}>
          <Icon name="Coins" size={40} className="text-gaming-gold opacity-40" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-4 md:p-6">
        <div className="text-xl md:text-2xl font-bold text-primary animate-pulse-neon">
          VAVADA
          <span className="text-xs md:text-sm text-muted-foreground ml-2">Casino</span>
        </div>
        <div className="flex gap-2 md:gap-4">
          <Icon name="Phone" size={20} className="text-gaming-gold md:w-6 md:h-6" />
          <Icon name="MessageCircle" size={20} className="text-gaming-neon-cyan md:w-6 md:h-6" />
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 md:px-6 md:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
          
          {/* Left Side - Characters */}
          <div className="relative flex justify-center items-center order-1 lg:order-1">
            <div className="relative">
              
              {/* Декоративные элементы вокруг девушки */}
              <div className="absolute -top-8 -left-8 animate-spin-slow">
                <Icon name="Coins" size={40} className="text-gaming-gold opacity-80 animate-pulse" />
              </div>
              <div className="absolute -top-6 left-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <span className="text-2xl">💎</span>
              </div>
              <div className="absolute top-10 -left-12 animate-float" style={{ animationDelay: '1s' }}>
                <Icon name="Gem" size={36} className="text-gaming-neon-pink opacity-70" />
              </div>
              <div className="absolute top-32 -right-10 animate-spin-slow" style={{ animationDelay: '2s' }}>
                <span className="text-3xl animate-pulse">🎰</span>
              </div>
              <div className="absolute bottom-20 -left-10 animate-bounce" style={{ animationDelay: '1.5s' }}>
                <span className="text-2xl">💸</span>
              </div>
              <div className="absolute bottom-10 left-16 animate-float" style={{ animationDelay: '0.8s' }}>
                <Icon name="Sparkles" size={32} className="text-gaming-gold-bright opacity-80 animate-pulse" />
              </div>
              <div className="absolute -bottom-8 -right-8 animate-spin-slow" style={{ animationDelay: '3s' }}>
                <Icon name="Trophy" size={38} className="text-gaming-gold animate-glow" />
              </div>
              <div className="absolute bottom-32 right-20 animate-bounce" style={{ animationDelay: '2.5s' }}>
                <span className="text-2xl">🍀</span>
              </div>
              
              {/* Основное изображение */}
              <img 
                src="/img/9f7ab38c-817b-4c3a-9ced-045ca7d31a0a.jpg" 
                alt="Casino Dealer" 
                className="w-48 h-72 md:w-64 md:h-96 object-cover rounded-2xl animate-glow relative z-10"
              />
              
              {/* Корона */}
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 animate-float z-20">
                <Icon name="Crown" size={32} className="text-gaming-gold md:w-12 md:h-12" />
              </div>
              
              {/* Speech Bubble */}
              <div className="absolute -top-16 -right-16 md:-top-20 md:-right-20 bg-white text-black px-3 py-2 md:px-4 md:py-3 rounded-2xl rounded-bl-none shadow-xl animate-pulse border-2 border-gaming-gold max-w-xs z-20">
                <p className="text-xs md:text-sm font-bold text-center">
                  Твой шанс на миллион! 💰
                </p>
                <div className="absolute bottom-0 left-3 md:left-4 w-0 h-0 border-l-6 md:border-l-8 border-l-transparent border-r-6 md:border-r-8 border-r-transparent border-t-6 md:border-t-8 border-t-white"></div>
              </div>
              
              {/* Дополнительные эффекты */}
              <div className="absolute top-4 right-4 animate-ping">
                <div className="w-4 h-4 bg-gaming-gold rounded-full opacity-75"></div>
              </div>
              <div className="absolute bottom-4 left-4 animate-ping" style={{ animationDelay: '1s' }}>
                <div className="w-3 h-3 bg-gaming-neon-cyan rounded-full opacity-60"></div>
              </div>
              
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-2 w-full">
            {/* Bonus Banner */}
            <div className="text-center mb-4 md:mb-8">
              <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2 tracking-wider">
                В ДЕНЬ ДЕПОЗИТА
              </h1>
              <div className="relative">
                <Card className="bg-gradient-to-r from-primary to-gaming-red-bright p-4 md:p-6 border-2 border-gaming-gold animate-glow">
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-1 md:gap-2 mb-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-2 h-2 md:w-3 md:h-3 bg-gaming-gold-bright rounded-full animate-pulse" />
                      ))}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gaming-gold-bright tracking-widest mb-2">
                      БОНУС <span className="text-2xl md:text-4xl">ДО</span> 1000$
                    </h2>
                    
                    {/* Акция с бесплатными вращениями */}
                    <div className="bg-gaming-red-bright text-white px-3 py-2 rounded-lg mb-3 animate-pulse border-2 border-white">
                      <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold">
                        <span>🎰</span>
                        <span>+ 100 БЕСПЛАТНЫХ ВРАЩЕНИЙ</span>
                        <span>🎰</span>
                      </div>
                    </div>
                    
                    {/* Анимированный призыв */}
                    <div className="relative">
                      <div className="animate-bounce">
                        <button 
                          onClick={() => {
                            const bonusButton = document.getElementById('bonus-button');
                            if (bonusButton) {
                              bonusButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }}
                          className="bg-gaming-gold-bright text-black px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-lg animate-pulse hover:scale-110 transition-transform cursor-pointer"
                        >
                          👆 ЗАБРАТЬ БОНУС СЕЙЧАС! 👆
                        </button>
                      </div>
                      
                      {/* Стрелки указывающие на форму */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce delay-300">
                        <div className="text-gaming-gold-bright text-2xl animate-pulse">
                          ↓
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Registration Form */}
            <Card className="bg-card border-border p-4 md:p-6">
              <div id="bonus-form" className="space-y-4 md:space-y-6 text-center">
                
                {/* Мотивационный блок */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-gaming-gold-bright mb-4 animate-pulse">
                      🎯 ТВОЙ ШАНС НА УДАЧУ! 🎯
                    </h3>
                    <div className="space-y-3 text-foreground">
                      <div className="flex items-center justify-center gap-3 text-lg md:text-xl">
                        <span>💰</span>
                        <span className="font-semibold">До 1000$ бонус на первый депозит</span>
                        <span>💰</span>
                      </div>
                      <div className="flex items-center justify-center gap-3 text-lg md:text-xl">
                        <span>🎰</span>
                        <span className="font-semibold">100 бесплатных вращений</span>
                        <span>🎰</span>
                      </div>
                      <div className="flex items-center justify-center gap-3 text-lg md:text-xl">
                        <span>⚡</span>
                        <span className="font-semibold">Мгновенная регистрация</span>
                        <span>⚡</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Призыв к действию */}
                  <div className="bg-gradient-to-r from-gaming-red-bright to-primary p-4 rounded-xl border-2 border-gaming-gold animate-glow">
                    <p className="text-white font-bold text-lg md:text-xl mb-2">
                      🔥 ОГРАНИЧЕННОЕ ВРЕМЯ! 🔥
                    </p>
                    <p className="text-gaming-gold-bright font-semibold text-base md:text-lg">
                      Не упусти свой шанс стать миллионером!<br/>
                      Жми кнопку и начинай выигрывать прямо сейчас!
                    </p>
                  </div>
                  
                  {/* Таймер обратного отсчета */}
                  <div className="bg-gradient-to-r from-gaming-red-bright to-gaming-red p-4 rounded-xl border-2 border-gaming-gold-bright animate-glow">
                    <div className="text-center">
                      <p className="text-white font-bold text-base md:text-lg mb-2">
                        ⏰ ДО КОНЦА АКЦИИ ОСТАЛОСЬ: ⏰
                      </p>
                      <div className="flex justify-center items-center gap-2 text-gaming-gold-bright">
                        <div className="bg-black/50 px-3 py-2 rounded-lg border border-gaming-gold">
                          <span className="text-xl md:text-2xl font-black animate-pulse">
                            {String(timeLeft.hours).padStart(2, '0')}
                          </span>
                          <div className="text-xs">ЧАСОВ</div>
                        </div>
                        <span className="text-xl font-bold animate-pulse">:</span>
                        <div className="bg-black/50 px-3 py-2 rounded-lg border border-gaming-gold">
                          <span className="text-xl md:text-2xl font-black animate-pulse">
                            {String(timeLeft.minutes).padStart(2, '0')}
                          </span>
                          <div className="text-xs">МИНУТ</div>
                        </div>
                        <span className="text-xl font-bold animate-pulse">:</span>
                        <div className="bg-black/50 px-3 py-2 rounded-lg border border-gaming-gold">
                          <span className="text-xl md:text-2xl font-black animate-pulse text-gaming-red-bright">
                            {String(timeLeft.seconds).padStart(2, '0')}
                          </span>
                          <div className="text-xs">СЕКУНД</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Счетчик посетителей и успехи */}
                  <div className="space-y-3">
                    <div className="bg-gaming-dark-card border border-gaming-gold rounded-lg p-3 animate-pulse">
                      <div className="flex items-center justify-center gap-2 text-gaming-gold-bright">
                        <span className="animate-bounce">👥</span>
                        <span className="font-bold text-sm md:text-base">
                          Сегодня зарегистрировались уже <span className="text-gaming-gold-bright text-lg font-black animate-pulse">147</span> человек!
                        </span>
                        <span className="animate-bounce delay-300">🔥</span>
                      </div>
                    </div>
                    
                    {/* Истории успеха */}
                    <div className="bg-gradient-to-r from-gaming-gold to-gaming-gold-bright text-black p-3 rounded-lg animate-glow">
                      <div className="text-center">
                        <div className="font-black text-sm md:text-base mb-1">
                          🏆 ИЗ НИХ УЖЕ 5 ЧЕЛОВЕК ВЫИГРАЛИ БОЛЕЕ 500,000₽! 🏆
                        </div>
                        <div className="text-xs md:text-sm font-bold opacity-90">
                          Последний выигрыш: 847,230₽ — 23 минуты назад 💸
                        </div>
                      </div>
                    </div>
                    
                    {/* Живая лента выигрышей */}
                    <div className="bg-black/80 border border-gaming-gold rounded-lg p-2 overflow-hidden">
                      <div className="text-gaming-gold-bright text-xs font-bold mb-1 text-center">
                        🔴 ПРЯМО СЕЙЧАС ВЫИГРЫВАЮТ:
                      </div>
                      <div className="relative h-16 overflow-hidden">
                        <div className="absolute w-full animate-[slide_10s_linear_infinite]">
                          <div className="space-y-1 text-xs text-white">
                            <div>👤 Анна К. — выиграла 67,500₽ в Book of Dead</div>
                            <div>👤 Максим Р. — выиграл 234,890₽ в Sweet Bonanza</div>
                            <div>👤 Елена М. — выиграла 45,600₽ в Gates of Olympus</div>
                            <div>👤 Дмитрий П. — выиграл 156,340₽ в Crazy Time</div>
                            <div>👤 Светлана Б. — выиграла 89,750₽ в Razor Shark</div>
                            <div>👤 Алексей К. — выиграл 312,450₽ в Mega Moolah</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  id="bonus-button"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-gaming-gold to-gaming-gold-bright text-black font-black text-base md:text-lg py-4 md:py-6 hover:scale-105 transition-transform animate-glow animate-pulse"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle" size={20} />
                      ЗАЯВКА ОТПРАВЛЕНА!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>💰</span>
                      ЗАБРАТЬ БОНУС
                      <span>💸</span>
                    </div>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  *Условия и Положения
                </p>
              </div>
            </Card>



            {/* Bottom Links */}
            <div className="text-center text-gaming-gold-bright font-semibold text-xs md:text-sm px-2">
              СПОРТ | ЛАЙВ КАЗИНО | СЛОТЫ И ИГРЫ | ВИРТУАЛЬНЫЕ ИГРЫ
            </div>
          </div>
        </div>


      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 text-6xl animate-float">💎</div>
        <div className="absolute top-1/2 right-1/3 text-5xl animate-float" style={{ animationDelay: '2s' }}>🎰</div>
        <div className="absolute bottom-1/4 left-1/3 text-4xl animate-float" style={{ animationDelay: '1s' }}>🃏</div>
        <div className="absolute top-3/4 right-1/4 text-5xl animate-float" style={{ animationDelay: '3s' }}>🎲</div>
        
        {/* Money Bills */}
        <div className="absolute top-10 left-1/2 text-3xl animate-float text-gaming-gold" style={{ animationDelay: '0.5s' }}>💵</div>
        <div className="absolute top-32 right-10 text-4xl animate-float text-gaming-gold" style={{ animationDelay: '1.5s' }}>💰</div>
        <div className="absolute bottom-20 left-10 text-3xl animate-float text-gaming-gold" style={{ animationDelay: '2.5s' }}>💴</div>
        <div className="absolute top-1/3 left-10 text-2xl animate-float text-gaming-gold" style={{ animationDelay: '0.8s' }}>💷</div>
        <div className="absolute bottom-1/3 right-20 text-3xl animate-float text-gaming-gold" style={{ animationDelay: '1.8s' }}>💶</div>
        <div className="absolute top-2/3 left-1/3 text-2xl animate-float text-gaming-gold" style={{ animationDelay: '3.2s' }}>💵</div>
        <div className="absolute bottom-40 right-1/3 text-4xl animate-float text-gaming-gold" style={{ animationDelay: '2.2s' }}>💰</div>
        <div className="absolute top-20 left-1/4 text-2xl animate-float text-gaming-gold" style={{ animationDelay: '1.2s' }}>💴</div>
      </div>
    </div>
  );
}