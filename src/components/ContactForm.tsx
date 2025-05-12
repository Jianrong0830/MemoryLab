import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import emailjs from "emailjs-com";

const formSchema = z.object({
  name: z.string().min(2, { message: "請輸入您的姓名" }),
  email: z.string().email({ message: "請輸入有效的電子郵件" }),
  phone: z.string().min(8, { message: "請輸入有效的電話號碼" }),
  package: z.array(z.string()).min(1, { message: "請選擇至少一個方案" }),
  photoTimeSlots: z.array(z.string()).default([]),
  imageTimeSlots: z.array(z.string()).default([]),
  consultTimeSlots: z.array(z.string()).default([]),
  ig: z.string().optional(),
  studentInfo: z.string().optional(),
  promoteCode: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const timeOptions = {
  photo: ["上午 (9:00-12:00)", "下午 (13:00-15:00)", "下午 (15:00-18:00)"],
  image: ["上午 (9:00-12:00)", "下午 (13:00-15:00)", "下午 (15:00-18:00)"],
  consult: ["下午 (13:00-15:00)", "下午 (15:00-17:00)"],
};

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      package: [],
      photoTimeSlots: [],
      imageTimeSlots: [],
      consultTimeSlots: [],
      ig: "",
      studentInfo: "",
      promoteCode: "",
      message: "",
    },
  });

  const selectedPackages = form.watch("package");

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setFormStatus(null);

    // 將陣列轉成字串，若為空陣列則顯示「無」
    const photoSlotsText = data.photoTimeSlots.length
      ? data.photoTimeSlots.join(", ")
      : "無";
    const imageSlotsText = data.imageTimeSlots.length
      ? data.imageTimeSlots.join(", ")
      : "無";
    const consultSlotsText = data.consultTimeSlots.length
      ? data.consultTimeSlots.join(", ")
      : "無";

    emailjs
      .send(
        "service_ndck8yt",
        "template_9tvh0j6",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          package: data.package.join(", "),
          photoTimeSlots: photoSlotsText,
          imageTimeSlots: imageSlotsText,
          consultTimeSlots: consultSlotsText,
          ig: data.ig || "無",
          studentInfo: data.studentInfo || "無",
          promoteCode: data.promoteCode || "無",
          message: data.message || "無留言",
        },
        "WMKgzrqJghOgEHtCa"
      )
      .then(() => {
        setFormStatus("success");
        toast({
          title: "預約成功！",
          description:
            "我們將根據您提供的方便時段安排服務，並提供訂金匯款方式。",
        });
        form.reset();
      })
      .catch(() => {
        setFormStatus("error");
        toast({
          title: "發送失敗",
          description: "抱歉，郵件發送失敗，請稍後再試。",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-form p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6">預約表單</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* 姓名 */}
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

          {/* Email + 電話 */}
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

          {/* 方案複選 */}
          <FormField
            control={form.control}
            name="package"
            render={() => (
              <FormItem>
                <FormLabel>方案選擇（複選）</FormLabel>
                <div className="grid gap-2">
                  {[
                    "寫真方案 (5/24)",
                    "形象照方案 (6/6)",
                    "形象照加購專業妝容",
                    "職涯諮詢 (6/6)",
                  ].map((pkg) => (
                    <FormField
                      key={pkg}
                      control={form.control}
                      name="package"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value.includes(pkg)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const newValue = checked
                                  ? [...field.value, pkg]
                                  : field.value.filter((item) => item !== pkg);
                                field.onChange(newValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{pkg}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 動態時段選擇 */}
          {selectedPackages.includes("寫真方案 (5/24)") && (
            <FormField
              control={form.control}
              name="photoTimeSlots"
              render={() => (
                <FormItem>
                  <FormLabel>寫真方案時段</FormLabel>
                  <div className="grid gap-2">
                    {timeOptions.photo.map((slot) => (
                      <FormField
                        key={slot}
                        control={form.control}
                        name="photoTimeSlots"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value.includes(slot)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const newValue = checked
                                    ? [...field.value, slot]
                                    : field.value.filter((item) => item !== slot);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{slot}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          )}
          {selectedPackages.includes("形象照方案 (6/6)") && (
            <FormField
              control={form.control}
              name="imageTimeSlots"
              render={() => (
                <FormItem>
                  <FormLabel>形象照方案時段</FormLabel>
                  <div className="grid gap-2">
                    {timeOptions.image.map((slot) => (
                      <FormField
                        key={slot}
                        control={form.control}
                        name="imageTimeSlots"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value.includes(slot)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const newValue = checked
                                    ? [...field.value, slot]
                                    : field.value.filter((item) => item !== slot);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{slot}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          )}
          {selectedPackages.includes("職涯諮詢 (6/6)") && (
            <FormField
              control={form.control}
              name="consultTimeSlots"
              render={() => (
                <FormItem>
                  <FormLabel>職涯諮詢時段</FormLabel>
                  <div className="grid gap-2">
                    {timeOptions.consult.map((slot) => (
                      <FormField
                        key={slot}
                        control={form.control}
                        name="consultTimeSlots"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value.includes(slot)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const newValue = checked
                                    ? [...field.value, slot]
                                    : field.value.filter((item) => item !== slot);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{slot}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          )}

          {/* 其他選填 */}
          <FormField
            control={form.control}
            name="ig"
            render={({ field }) => (
              <FormItem>
                <FormLabel>貼文按讚+追蹤+分享限動折價NT$100（選填）</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入您的Instagram帳號" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>學生優惠折價NT$200（選填）</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入您的學校 + 學號" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promoteCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>優惠碼（選填）</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入優惠碼" {...field} />
                </FormControl>
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
                  <Textarea
                    placeholder="有任何問題或特殊需求，請在此留言..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "送出預約"}
          </Button>
        </form>
      </Form>

      {/* 回饋訊息 */}
      {formStatus && (
        <div
          className={`mt-4 p-4 text-center ${
            formStatus === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {formStatus === "success" ? (
            <>
              <p>預約成功！</p>
              <p className="text-sm mt-2">
                團隊將依您填寫的時段聯繫安排，確認後會聯繫您並提供訂金匯款方式。
              </p>
            </>
          ) : (
            "發送失敗，請稍後再試。"
          )}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
