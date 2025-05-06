import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import emailjs from "emailjs-com";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "請輸入您的姓名" }),
  email: z.string().email({ message: "請輸入有效的電子郵件" }),
  phone: z.string().min(8, { message: "請輸入有效的電話號碼" }),
  package: z.string().min(1, { message: "請選擇方案" }),
  contactMethod: z.string().min(1, { message: "請選擇聯絡方式" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);  // 新增狀態

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      package: "",
      contactMethod: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setFormStatus(null);  // 提交前清空狀態

    // 使用 emailjs 發送表單數據
    emailjs
      .send(
        "service_ndck8yt",        // 您的服務ID
        "template_9tvh0j6",       // 您的模板ID
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          package: data.package,
          contactMethod: data.contactMethod,
          message: data.message || "無留言",
        },
        "WMKgzrqJghOgEHtCa"       // 您的用戶ID
      )
      .then(
        (response) => {
          console.log("SUCCESS", response);
          setFormStatus("success"); // 設定成功狀態
          toast({
            title: "預約成功！",
            description: "感謝您的預約，我們將盡快與您聯繫確認詳情。",
          });
          form.reset();
        },
        (error) => {
          console.log("FAILED", error);
          setFormStatus("error"); // 設定錯誤狀態
          toast({
            title: "發送失敗",
            description: "抱歉，郵件發送失敗，請稍後再試。",
          });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-form p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6">預約表單</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入您的姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電子郵件</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電話</FormLabel>
                  <FormControl>
                    <Input placeholder="09xx-xxx-xxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid">
            <FormField
              control={form.control}
              name="package"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>方案選擇</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="請選擇方案" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="寫真方案 - NT$1,000" key="photo_basic">寫真方案 - NT$1,000</SelectItem>
                      <SelectItem value="形象照方案 - NT$2,000" key="portrait_basic">形象照方案 - NT$2,000</SelectItem>
                      <SelectItem value="形象照+專業妝容 - NT$2,500" key="portrait_makeup">形象照+專業妝容 - NT$2,500</SelectItem>
                      <SelectItem value="職涯諮詢 - NT$600" key="career_consult">職涯諮詢 - NT$600</SelectItem>
                      <SelectItem value="形象照+職涯諮詢 - NT$2,450" key="portrait_career">形象照+職涯諮詢 - NT$2,450</SelectItem>
                      <SelectItem value="形象照+職涯諮詢+專業妝容 - NT$2,950" key="portrait_career_makeup">形象照+職涯諮詢+專業妝容 - NT$2,950</SelectItem>
                      <SelectItem value="寫真+形象照套組 - NT$2,800" key="photo_portrait">寫真+形象照套組 - NT$2,800</SelectItem>
                      <SelectItem value="寫真+形象照+專業妝容 - NT$3,300" key="photo_portrait_makeup">寫真+形象照+專業妝容 - NT$3,300</SelectItem>
                      <SelectItem value="寫真+形象照+職涯諮詢 - NT$3,250" key="photo_portrait_career">寫真+形象照+職涯諮詢 - NT$3,250</SelectItem>
                      <SelectItem value="寫真+形象照+職涯諮詢+專業妝容 - NT$3,750" key="photo_portrait_career_makeup">寫真+形象照+職涯諮詢+專業妝容 - NT$3,750</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>聯絡方式</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="請選擇聯絡方式" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="email">電子郵件</SelectItem>
                    <SelectItem value="phone">電話</SelectItem>
                    <SelectItem value="both">兩者皆可</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>留言（選填）</FormLabel>
                <FormControl>
                  <Textarea placeholder="有任何問題或特殊需求，請在此留言..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "提交中..." : "送出預約"}
          </Button>
        </form>
      </Form>

      {/* 顯示送出結果 */}
      {formStatus && (
        <div className={`mt-4 p-4 text-center ${formStatus === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {formStatus === "success" ? "預約成功！" : "發送失敗，請稍後再試。"}
        </div>
      )}
    </div>
  );
};
