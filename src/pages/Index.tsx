
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Camera, ArrowRight, Badge, Layout, Image as ImageIcon, Mail, Phone, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ContactForm } from "@/components/ContactForm";

const Index = () => {
  const handleBookingClick = () => {
    toast({
      title: "預約成功！",
      description: "我們將會與您聯絡確認預約詳情",
    });
  };

  // Animation state for scroll-triggered animations
  const [animatedSections, setAnimatedSections] = useState<Record<string, boolean>>({
    hero: true,
    services: false,
    gallery: false,
    pricing: false,
    testimonials: false,
    contact: false,
  });

  // Refs for sections
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({
    services: null,
    gallery: null,
    pricing: null,
    testimonials: null,
    contact: null,
  });

  // Parallax effect for hero section
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScrollPosition = () => {
    setScrollPosition(window.scrollY);
  };

  // Set up scroll event listener for parallax
  useEffect(() => {
    window.addEventListener('scroll', updateScrollPosition);
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            setAnimatedSections(prev => ({ ...prev, [sectionId]: true }));
          }
        }
      });
    }, observerOptions);
    
    // Observe all sections
    Object.keys(sectionsRef.current).forEach(key => {
      const element = sectionsRef.current[key];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2">
            <img 
              src="/images/logo.png" 
              alt="Memory Lab Logo" 
              className="h-12 w-12"
            />
            <span className="font-semibold text-xl text-secondary">Memory Lab</span>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="#gallery">
                  <NavigationMenuLink className={navigationMenuTriggerStyle() + " transition-all duration-300 hover:text-primary"}>
                    作品展示
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#services">
                  <NavigationMenuLink className={navigationMenuTriggerStyle() + " transition-all duration-300 hover:text-primary"}>
                    服務方案
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#pricing">
                  <NavigationMenuLink className={navigationMenuTriggerStyle() + " transition-all duration-300 hover:text-primary"}>
                    價格與優惠
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle() + " transition-all duration-300 hover:text-primary"}>
                    預約聯絡
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Enhanced Hero Section with Parallax */}
      <section className="relative hero-gradient text-white pt-24 pb-32 overflow-hidden">
        {/* Parallax decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" 
            style={{ transform: `translateY(${scrollPosition * 0.2}px)` }}
          />
          <div 
            className="absolute -bottom-32 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" 
            style={{ transform: `translateY(${-scrollPosition * 0.1}px)` }}
          />
        </div>
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex flex-col items-start text-left space-y-8 md:w-1/2">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/30 backdrop-blur-md animate-fade-in">
                <Camera className="h-10 w-10 text-primary" />
              </div>
              
              <h1 className="hero-heading text-4xl md:text-6xl font-bold tracking-tight md:max-w-3xl leading-tight animate-fade-in-delay-200">
                職涯形象，從一張<span className="text-primary relative">好照片<br/>
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/50"></span>
                </span>開始
              </h1>
              
              <p className="text-xl text-gray-100 max-w-2xl leading-relaxed animate-fade-in-delay-400">
                專業形象照不是奢侈，是職涯的必要投資。讓你在履歷堆中脫穎而出。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-400">
                <Button size="lg" className="px-8 gap-2 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                  立即預約 <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 border-primary text-primary hover:bg-primary/10 transition-all duration-300" asChild>
                  <a href="#gallery">瀏覽作品</a>
                </Button>
              </div>
            </div>
            
            {/* <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
              <div 
                className="relative w-80 h-80 md:w-[20rem] md:h-[30rem] animate-scale"
                style={{ transform: `translateY(${-scrollPosition * 0.05}px)` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
                <img 
                  src="/images/man.png" 
                  alt="Memory Lab Logo" 
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div> */}
          </div>
        </div>
        
        {/* Decorative curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Gallery Section */}
      <section 
        id="gallery" 
        ref={el => sectionsRef.current.gallery = el}
        className={`py-24 bg-white ${animatedSections.gallery ? "animate-fade-in" : "opacity-0"}`}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              <ImageIcon className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 relative">
              精選<span className="text-primary">作品集</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mt-4">
              精選攝影作品，展現不同方案的風格與效果
            </p>
          </div>

          <PhotoGallery />
        </div>
      </section>

      {/* Services Section with Enhanced Design */}
      <section 
        id="services" 
        ref={el => sectionsRef.current.services = el}
        className={`py-24 relative overflow-hidden ${animatedSections.services ? "animate-fade-in" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="absolute top-0 inset-x-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-full mb-4">
              <Camera className="h-10 w-10 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 relative">
              服務<span className="text-secondary">方案</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-secondary rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mt-4">
              從求職寫真到專業形象照，為你的職涯加分
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Service 1 */}
            <div className="service-card relative hover-lift">
              <Card className="border-t-4 border-t-primary/50 h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                <CardHeader className="text-center pt-8">
                  <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">寫真方案</CardTitle>
                  <CardDescription>15分鐘拍攝，適合快速更新個人照片</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">拍攝時間</span>
                    <span>15 分鐘</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">成品內容</span>
                    <span>3個場景精修照各1張</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">日期</span>
                    <span>5/24</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>方案價格</span>
                    <span>NT$1,000</span>
                  </div>
                  <Button className="w-full mt-4" onClick={handleBookingClick}>預約此方案</Button>
                </CardContent>
              </Card>
            </div>

            {/* Service 2 */}
            <div className="service-card relative hover-lift">
              <Card className="border-primary h-full">
                <div className="bg-primary text-primary-foreground py-1.5 text-center text-sm font-medium">
                  最熱門方案
                </div>
                <div className="absolute top-[30px] left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></div>
                <CardHeader className="text-center pt-8">
                  <div className="mx-auto bg-secondary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                    <Badge className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">形象照方案</CardTitle>
                  <CardDescription>專業形象照，為履歷加分</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">拍攝時間</span>
                    <span>20 分鐘</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">成品內容</span>
                    <span>精修照2張</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">日期</span>
                    <span>6/6</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 text-sm">
                    <span className="font-medium">選配</span>
                    <span>化妝(30分鐘，+$500)</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>方案價格</span>
                    <span>NT$2,000</span>
                  </div>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90" onClick={handleBookingClick}>預約此方案</Button>
                </CardContent>
              </Card>
            </div>

            {/* Service 3 */}
            <div className="service-card relative hover-lift">
              <Card className="border-t-4 border-t-secondary/50 h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/50 to-transparent"></div>
                <CardHeader className="text-center pt-8">
                  <div className="mx-auto bg-secondary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">職涯諮詢</CardTitle>
                  <CardDescription>北科學長姐團隊專業指導</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">諮詢時間</span>
                    <span>20 分鐘</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">服務地點</span>
                    <span>北科大</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">日期</span>
                    <span>6/6</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>方案價格</span>
                    <span>NT$600</span>
                  </div>
                  <Button className="w-full mt-4" onClick={handleBookingClick}>預約此方案</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Section with Enhanced Design */}
      <section 
        id="pricing" 
        ref={el => sectionsRef.current.pricing = el}
        className={`py-24 bg-white ${animatedSections.pricing ? "animate-fade-in" : "opacity-0"}`}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              <Star className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 relative">
              優惠<span className="text-primary">方案</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mt-4">
              各種折扣組合，為你的預算著想
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Promo 1 */}
            <Card className="hover-lift transition-all duration-500 border-l-4 border-l-primary overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 transform group-hover:bg-primary/10 transition-all duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Badge className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>社群互動折扣</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  貼文案讚+追蹤+分享，對應方案折50元
                </p>
              </CardContent>
            </Card>

            {/* Promo 2 */}
            <Card className="hover-lift transition-all duration-500 border-l-4 border-l-secondary overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 -translate-x-1/2 transform group-hover:bg-secondary/10 transition-all duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Layout className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>形象照加購優惠</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  有拍形象照，職涯諮詢優惠價450元
                </p>
              </CardContent>
            </Card>

            {/* Promo 3 */}
            <Card className="hover-lift transition-all duration-500 border-l-4 border-l-primary overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 transform group-hover:bg-primary/10 transition-all duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>套組優惠</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  寫真+形象照套組優惠價2800元（原價3000元）
                </p>
              </CardContent>
            </Card>

            {/* Promo 4 */}
            <Card className="hover-lift transition-all duration-500 border-l-4 border-l-secondary overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 -translate-x-1/2 transform group-hover:bg-secondary/10 transition-all duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Badge className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>推薦優惠</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  使用推薦碼，任一方案折50元
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section with Enhanced Design */}
      <section 
        id="testimonials"
        ref={el => sectionsRef.current.testimonials = el}
        className={`py-24 relative overflow-hidden ${animatedSections.testimonials ? "animate-fade-in" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-full mb-4">
              <Star className="h-10 w-10 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 relative">
              專家<span className="text-secondary">觀點</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-secondary rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mt-4">
              專業團隊為你打造最適合職場的形象
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white hover-lift relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 text-5xl font-serif text-primary/20">"</div>
              <CardContent className="pt-10">
                <p className="italic text-gray-600 mb-6 relative z-10">
                  "面試官平均只花30秒看一份履歷，而第一眼看到的，往往就是「你的照片」。不專業的照片，可能讓你直接被刷掉，但一張好的形象照，能讓你在履歷堆中脫穎而出。"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-secondary font-bold">VP</span>
                  </div>
                  <div>
                    <p className="font-medium text-lg">職涯顧問</p>
                    <p className="text-sm text-gray-500">北科學長姐團隊</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white hover-lift relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 text-5xl font-serif text-primary/20">"</div>
              <CardContent className="pt-10">
                <p className="italic text-gray-600 mb-6 relative z-10">
                  "從大學生到社會新鮮人，你需要一張真正為「求職」而生的照片。專業形象照不是奢侈，是職涯的必要投資。"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">PS</span>
                  </div>
                  <div>
                    <p className="font-medium text-lg">攝影師</p>
                    <p className="text-sm text-gray-500">有點閒｜影像工作室</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Decorative wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,192C384,213,480,235,576,224C672,213,768,171,864,165.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Team Section with Enhanced Design */}
      <section className="py-24 bg-white relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 relative">
              專業<span className="text-primary">團隊</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mt-4">
              合作夥伴介紹
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-lift group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Camera className="h-5 w-5 text-primary" />
                  </div>
                  有點閒｜影像工作室
                </CardTitle>
                <CardDescription>攝影師團隊</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">📷</span>
                    <span>商業形象照 / 畢業照 / 商品攝影 / 主題寫真</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">📽️</span>
                    <span>形象影片·活動紀錄·廣告宣傳</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">🖤</span>
                    <span>不正經攝影團隊 x 不設限的風格實驗室</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">📍</span>
                    <span>台北.桃園</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✉️</span>
                    <span>sunyeeray@gmail.com</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-secondary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  北科學長姐團隊
                </CardTitle>
                <CardDescription>職涯諮詢團隊</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">🎓</span>
                    <span>大學實習版｜職涯探索X求職分享</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">📝</span>
                    <span>實習資訊｜職涯諮詢｜履歷撰寫</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">💼</span>
                    <span>LinkedIn 經營 ｜模擬面試</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">#</span>
                    <span>#實習 #找工作 #NTUT</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section with Enhanced Design */}
      <section 
        id="contact" 
        ref={el => sectionsRef.current.contact = el}
        className={`py-24 relative overflow-hidden ${animatedSections.contact ? "animate-fade-in" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-full mb-4">
              <Mail className="h-10 w-10 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 relative">
              立即<span className="text-secondary">預約</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-secondary rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mt-4">
              填寫表單預約您喜歡的方案，或透過社群媒體聯繫我們
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-xl contact-form hover-lift">
              <h3 className="text-2xl font-bold mb-8 pb-4 border-b">聯絡方式</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">電子郵件</p>
                    <p className="text-gray-600 mt-1">contact@memorylab.vip</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">電話</p>
                    <p className="text-gray-600 mt-1">0902-258-817</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Badge className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">社群媒體</p>
                    <p className="text-gray-600 mt-1">Instagram: @memorylab.vip</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t">
                <h4 className="font-semibold text-lg mb-3">拍攝地點</h4>
                <p className="text-gray-600">
                  台北市大安區忠孝東路三段1號<br />
                  北科大設計館
                </p>
              </div>
            </div>
            
            {/* Contact Form with enhanced styling */}
            <div className="hover-lift">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-secondary text-white pt-16 pb-8 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        <div className="container px-4 md:px-6 mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-1.5 rounded-lg">
                  <img 
                    src="/images/logo.png" 
                    alt="Memory Lab Logo" 
                    className="h-10 w-10"
                  />
                </div>
                <span className="font-semibold text-2xl">Memory Lab</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                專業形象照拍攝，為你的職涯鋪路。我們致力於提供高品質的攝影服務，讓你在求職市場中脫穎而出。
              </p>
              
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-white hover:text-primary transition-colors">
                  <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </a>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-6">服務地點</h3>
              <p className="text-gray-300 leading-relaxed">
                北科大設計館<br />
                地址：台北市大安區忠孝東路三段1號<br />
                營業時間：週一至週五 10:00-18:00
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-6">聯絡我們</h3>
              <p className="text-gray-300 leading-relaxed">
                網站：memorylab.vip<br />
                Instagram: @memorylab.vip<br />
                Email: contact@memorylab.vip<br />
                電話：0902-258-817
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-300">
            <p>© {new Date().getFullYear()} Memory Lab. All rights reserved.</p>
            <p className="mt-2 text-sm">精緻形象照，為你的履歷加分</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
