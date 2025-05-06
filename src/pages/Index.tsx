
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Camera, ArrowRight, Badge, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const handleBookingClick = () => {
    toast({
      title: "預約成功！",
      description: "我們將會與您聯絡確認預約詳情",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/80 border-b">
        <div className="container flex items-center justify-between h-16 mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">Memory Lab</span>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="#services">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    服務方案
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#pricing">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    價格與優惠
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    預約聯絡
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-white pt-20 pb-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <Camera className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 md:max-w-3xl">
              職涯形象，從一張<span className="text-primary">好照片</span>開始
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              專業形象照不是奢侈，是職涯的必要投資。讓你在履歷堆中脫穎而出。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8 gap-2" onClick={handleBookingClick}>
                立即預約 <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <a href="#services">了解更多</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">我們的服務方案</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              從求職寫真到專業形象照，為你的職涯加分
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
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

            {/* Service 2 */}
            <Card className="border-primary hover:shadow-lg transition-shadow">
              <div className="bg-primary text-primary-foreground py-1 text-center text-sm font-medium">
                最熱門方案
              </div>
              <CardHeader className="text-center">
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
                <Button className="w-full mt-4" onClick={handleBookingClick}>預約此方案</Button>
              </CardContent>
            </Card>

            {/* Service 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
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
      </section>

      {/* Promotions Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">優惠方案</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              各種折扣組合，為你的預算著想
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Promo 1 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className="h-10 w-10 text-primary" />
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
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Layout className="h-10 w-10 text-primary" />
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
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-10 w-10 text-primary" />
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
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className="h-10 w-10 text-primary" />
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

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">為何選擇我們？</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              專業團隊為你打造最適合職場的形象
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "面試官平均只花30秒看一份履歷，而第一眼看到的，往往就是「你的照片」。不專業的照片，可能讓你直接被刷掉，但一張好的形象照，能讓你在履歷堆中脫穎而出。"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div>
                    <p className="font-medium">職涯顧問</p>
                    <p className="text-sm text-gray-500">北科學長姐團隊</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "從大學生到社會新鮮人，你需要一張真正為「求職」而生的照片。專業形象照不是奢侈，是職涯的必要投資。"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div>
                    <p className="font-medium">攝影師</p>
                    <p className="text-sm text-gray-500">有點閒｜影像工作室</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">專業團隊</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              合作夥伴介紹
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>有點閒｜影像工作室</CardTitle>
                <CardDescription>攝影師團隊</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>📷 商業形象照 / 畢業照 / 商品攝影 / 主題寫真</li>
                  <li>📽️ 形象影片·活動紀錄·廣告宣傳</li>
                  <li>🖤 不正經攝影團隊 x 不設限的風格實驗室</li>
                  <li>📍 台北.桃園</li>
                  <li>✉️ sunyeeray@gmail.com</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>北科學長姐團隊</CardTitle>
                <CardDescription>職涯諮詢團隊</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>大學實習版｜職涯探索X求職分享</li>
                  <li>實習資訊｜職涯諮詢｜履歷撰寫</li>
                  <li>LinkedIn 經營 ｜模擬面試</li>
                  <li>#實習 #找工作 #NTUT</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">立即預約</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              填寫表單或透過社群媒體聯繫我們
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">Instagram</Button>
                    <Button variant="outline" className="w-full">Facebook</Button>
                  </div>
                  <div className="text-center text-gray-500 flex items-center gap-2 justify-center">
                    <span className="h-px bg-gray-300 flex-1"></span>
                    <span>或直接聯絡</span>
                    <span className="h-px bg-gray-300 flex-1"></span>
                  </div>
                  <Button className="w-full" onClick={handleBookingClick}>
                    預約諮詢
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-6 w-6" />
                <span className="font-semibold text-xl">Memory Lab</span>
              </div>
              <p className="text-gray-400">
                專業形象照拍攝，為你的職涯鋪路
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">服務地點</h3>
              <p className="text-gray-400">
                北科大設計館<br />
                地址：台北市大安區忠孝東路三段1號
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">聯絡我們</h3>
              <p className="text-gray-400">
                網站：memorylab.vip<br />
                Instagram: @memorylab<br />
                Email: contact@memorylab.vip
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Memory Lab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
