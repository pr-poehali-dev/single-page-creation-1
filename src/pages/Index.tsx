import { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
              <img 
                src="/img/9f7ab38c-817b-4c3a-9ced-045ca7d31a0a.jpg" 
                alt="Casino Dealer" 
                className="w-48 h-72 md:w-64 md:h-96 object-cover rounded-2xl animate-glow"
              />
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 animate-float">
                <Icon name="Crown" size={32} className="text-gaming-gold md:w-12 md:h-12" />
              </div>
              
              {/* Speech Bubble */}
              <div className="absolute -top-16 -right-16 md:-top-20 md:-right-20 bg-white text-black px-3 py-2 md:px-4 md:py-3 rounded-2xl rounded-bl-none shadow-xl animate-pulse border-2 border-gaming-gold max-w-xs">
                <p className="text-xs md:text-sm font-bold text-center">
                  Твой шанс на миллион! 💰
                </p>
                <div className="absolute bottom-0 left-3 md:left-4 w-0 h-0 border-l-6 md:border-l-8 border-l-transparent border-r-6 md:border-r-8 border-r-transparent border-t-6 md:border-t-8 border-t-white"></div>
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
                    <h2 className="text-3xl md:text-5xl font-black text-gaming-gold-bright tracking-widest">
                      БОНУС <span className="text-2xl md:text-4xl">ДО</span> 3000$
                    </h2>
                  </div>
                </Card>
              </div>
            </div>

            {/* Registration Form */}
            <Card className="bg-card border-border p-4 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="ИМЯ"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="ФАМИЛИЯ"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                
                <Input
                  type="email"
                  placeholder="ЭЛЕКТРОННАЯ ПОЧТА"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
                
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 bg-input px-3 rounded border border-border">
                    <span className="text-2xl">🇷🇺</span>
                    <span className="text-muted-foreground">+7</span>
                  </div>
                  <Input
                    placeholder="ВАШ НОМЕР ТЕЛЕФОНА"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <p className="text-foreground font-semibold mb-2">ВАЛЮТА</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { code: 'USD', symbol: '$' },
                      { code: 'EUR', symbol: '€' },
                      { code: 'GBP', symbol: '£' },
                      { code: 'CNY', symbol: '¥' }
                    ].map((currency) => (
                      <button
                        key={currency.code}
                        type="button"
                        onClick={() => handleInputChange('currency', currency.code)}
                        className={`p-2 rounded border text-center font-semibold transition-all ${
                          formData.currency === currency.code
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-input text-muted-foreground border-border hover:border-primary'
                        }`}
                      >
                        {currency.symbol} {currency.code}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground font-semibold mb-2">ПРОМОКОД:</p>
                  <div className="flex gap-2">
                    <Input
                      value={formData.promoCode}
                      onChange={(e) => handleInputChange('promoCode', e.target.value)}
                      className="bg-input border-border text-foreground font-bold"
                    />
                    <Badge variant="secondary" className="px-4 py-2 text-gaming-gold-bright bg-gaming-dark-card">
                      CLV3000
                    </Badge>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gaming-gold to-gaming-gold-bright text-black font-black text-base md:text-lg py-4 md:py-6 hover:scale-105 transition-transform animate-glow"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle" size={20} />
                      ЗАЯВКА ОТПРАВЛЕНА!
                    </div>
                  ) : (
                    'ЗАБРАТЬ БОНУС'
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  *Условия и Положения
                </p>
              </form>
            </Card>

            {/* Social Login */}
            <div className="text-center">
              <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">ИЛИ</p>
              <div className="flex justify-center gap-3 md:gap-4">
                {[
                  { name: 'Google', color: 'bg-red-600', icon: 'G' },
                  { name: 'Yandex', color: 'bg-red-500', icon: 'Я' },
                  { name: 'VK', color: 'bg-blue-600', icon: 'VK' },
                  { name: 'Telegram', color: 'bg-blue-400', icon: 'T' }
                ].map((social) => (
                  <button
                    key={social.name}
                    onClick={() => window.open('https://infowawada.com/?promo=0e4cb864-e734-44ef-9820-29068cfbffac&target=register', '_blank')}
                    className={`w-10 h-10 md:w-12 md:h-12 ${social.color} rounded-full text-white hover:scale-110 transition-transform flex items-center justify-center font-bold text-sm md:text-base`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

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